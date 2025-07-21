document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".testimonial-hero");
  const cards = Array.from(container.querySelectorAll(".testimonial-card"));
  const hint = container.querySelector(".testimonial-hint");

  // store original positions
  cards.forEach((card) => {
    const { left, top } = getComputedStyle(card);
    card.dataset.homeLeft = left;
    card.dataset.homeTop = top;
  });

  // click-to-stack
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (hint) hint.style.display = "none";
      // prevent re-stacking if already active
      if (card.classList.contains("active")) return;

      // clear any previous active
      cards.forEach((c) => c.classList.remove("active"));
      // mark this as active
      card.classList.add("active");
      container.classList.add("stacked");

      // set CSS vars for the click target
      container.style.setProperty("--stack-left", card.dataset.homeLeft);
      container.style.setProperty("--stack-top", card.dataset.homeTop);
    });
  });

  setTimeout(() => {
    if (hint) hint.style.display = "none";
  }, 10000);

  // mouseleave-to-spread
  container.addEventListener("mouseleave", () => {
    container.classList.remove("stacked");
    cards.forEach((c) => c.classList.remove("active"));
  });
});
