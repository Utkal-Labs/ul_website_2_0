document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".testimonial-hero");
  const cards = Array.from(container.querySelectorAll(".testimonial-card"));
  const hint = container.querySelector(".testimonial-hint");
  let currentCardIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let cardBeingDragged = null;
  let availableCards = [...cards];

  // Check if device is mobile/tablet
  const isMobile = () => window.innerWidth <= 991;

  // Reorder cards in the stack with smooth animations
  const reorderCards = () => {
    availableCards.forEach((card, index) => {
      // Only reorder cards that should be visible in the stack (top 5)
      if (index < 5) {
        card.classList.add("reordering");

        // Set the data-index attribute to control stacking order
        card.setAttribute("data-index", index);

        // Clear any inline styles that might interfere
        card.style.transform = "";
        card.style.opacity = "";
        card.style.zIndex = "";
        card.style.display = "";

        // Remove all animation classes except for cards that are off-screen
        card.classList.remove(
          "swiped-left",
          "swiped-right",
          "next-card",
          "moving-up",
          "hidden",
          "swiping",
          "swipe-indicator-left",
          "swipe-indicator-right"
        );

        // Remove reordering class after animation
        setTimeout(() => {
          card.classList.remove("reordering");
        }, 250);
      } else {
        // Cards beyond the 5th position should be hidden and positioned at the bottom
        card.setAttribute("data-index", "4");
        card.style.display = "none";
        card.classList.remove(
          "swiped-left",
          "swiped-right",
          "next-card",
          "moving-up",
          "hidden",
          "swiping",
          "swipe-indicator-left",
          "swipe-indicator-right",
          "reordering"
        );
      }
    });

    // Force CSS recalculation by triggering a reflow
    if (availableCards.length > 0) {
      availableCards[0].offsetHeight;
    }
  };

  // Ensure cards are properly initialized
  const initializeCards = () => {
    // Reset available cards array to original order
    availableCards = [...cards];
    currentCardIndex = 0;

    cards.forEach((card, index) => {
      // Remove any existing classes that might interfere
      card.classList.remove(
        "active",
        "swiped-left",
        "swiped-right",
        "next-card",
        "swiping",
        "moving-up",
        "hidden",
        "reordering",
        "swipe-indicator-left",
        "swipe-indicator-right"
      );
      card.style.filter = "none";
      card.style.backdropFilter = "none";
      card.style.webkitBackdropFilter = "none";
      card.style.transform = "";
      card.style.opacity = "";
      card.style.zIndex = "";

      // Store original positions
      const { left, top } = getComputedStyle(card);
      card.dataset.homeLeft = left;
      card.dataset.homeTop = top;

      // Set proper data-index for stacking
      card.setAttribute("data-index", index);
    });

    // Ensure container is in initial state
    container.classList.remove("stacked");

    // Update hint text based on device
    if (hint) {
      hint.textContent = isMobile()
        ? "Swipe left or right"
        : "Click a card to center it";
    }

    // Cards are now properly initialized for continuous looping
  };

  // Initialize on load with a small delay to ensure DOM is ready
  setTimeout(() => {
    initializeCards();
  }, 100);

  const handleSwipeStart = (e) => {
    if (!isMobile() || availableCards.length === 0) return;

    isDragging = true;
    cardBeingDragged = availableCards[0]; // Always the top card

    if (cardBeingDragged) {
      cardBeingDragged.classList.add("swiping");
      startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
      currentX = startX;
    }
  };

  const handleSwipeMove = (e) => {
    if (!isMobile() || !isDragging || !cardBeingDragged) return;

    e.preventDefault();
    currentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX - startX;
    const progress = Math.abs(deltaX) / 150; // Normalized progress

    // Natural rotation based on swipe direction and distance
    const rotation = deltaX * 0.1 + (deltaX > 0 ? 2 : -2); // Base tilt + swipe rotation
    const scale = Math.max(0.95, 1 - progress * 0.1);
    const opacity = Math.max(0.7, 1 - progress * 0.3);

    // Apply smooth transform with natural deck movement
    cardBeingDragged.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-52% + ${
      deltaX * 0.1
    }px)) rotate(${rotation}deg) scale(${scale})`;
    cardBeingDragged.style.opacity = opacity;

    // Visual feedback for swipe direction
    cardBeingDragged.classList.remove(
      "swipe-indicator-left",
      "swipe-indicator-right"
    );
    if (Math.abs(deltaX) > 50) {
      cardBeingDragged.classList.add(
        deltaX > 0 ? "swipe-indicator-right" : "swipe-indicator-left"
      );
    }
  };

  const handleSwipeEnd = () => {
    if (!isMobile() || !isDragging || !cardBeingDragged) return;

    isDragging = false;
    const deltaX = currentX - startX;
    const threshold = 80;
    const velocity = Math.abs(deltaX) / 100;

    // Remove visual indicators
    cardBeingDragged.classList.remove(
      "swipe-indicator-left",
      "swipe-indicator-right"
    );

    if (Math.abs(deltaX) > threshold || velocity > 1.5) {
      // Swipe detected - smooth exit animation
      const direction = deltaX > 0 ? "right" : "left";
      const swipedCard = cardBeingDragged;

      swipedCard.classList.add(`swiped-${direction}`);
      swipedCard.classList.remove("swiping");

      // Remove the swiped card from the front of available cards
      const removedCard = availableCards.shift();

      // Add the swiped card to the back of the deck for continuous loop
      availableCards.push(removedCard);

      // Smooth reordering of remaining cards
      setTimeout(() => {
        reorderCards();
      }, 50);

      // Reset the swiped card for future use after animation
      setTimeout(() => {
        swipedCard.classList.remove(`swiped-${direction}`, "hidden");
        swipedCard.style.transform = "";
        swipedCard.style.opacity = "";
        swipedCard.style.display = "";
      }, 500);

      cardBeingDragged = null;
    } else {
      // Smooth snap back animation
      cardBeingDragged.style.transform = "";
      cardBeingDragged.style.opacity = "";
      cardBeingDragged.classList.remove("swiping");
      cardBeingDragged = null;
    }
  };

  // Desktop click functionality
  const handleDesktopClick = (card) => {
    if (isMobile()) return;

    if (hint) hint.style.display = "none";
    if (card.classList.contains("active")) return;

    // clear any previous active and reset all cards
    cards.forEach((c) => {
      c.classList.remove("active");
      c.style.filter = "none";
      c.style.backdropFilter = "none";
      c.style.webkitBackdropFilter = "none";
    });

    // mark this as active
    card.classList.add("active");
    container.classList.add("stacked");
  };

  // Event listeners for each card
  cards.forEach((card) => {
    // Mouse events for desktop
    card.addEventListener("click", () => handleDesktopClick(card));

    // Touch events for mobile
    card.addEventListener("touchstart", handleSwipeStart, { passive: false });
    card.addEventListener("touchmove", handleSwipeMove, { passive: false });
    card.addEventListener("touchend", handleSwipeEnd);

    card.addEventListener("mousedown", handleSwipeStart);
    card.addEventListener("mousemove", handleSwipeMove);
    card.addEventListener("mouseup", handleSwipeEnd);
  });

  document.addEventListener("mouseup", handleSwipeEnd);
  document.addEventListener("touchend", handleSwipeEnd);

  setTimeout(() => {
    if (hint) hint.style.display = "none";
  }, 10000);

  // mouseleave-to-spread (desktop only)
  container.addEventListener("mouseleave", () => {
    if (isMobile()) return;

    container.classList.remove("stacked");
    cards.forEach((c) => {
      c.classList.remove("active");
      c.style.filter = "none";
      c.style.backdropFilter = "none";
      c.style.webkitBackdropFilter = "none";
    });
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    initializeCards();
  });
});
