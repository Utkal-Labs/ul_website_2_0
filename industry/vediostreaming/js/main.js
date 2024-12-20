function openTab(evt, tabName) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  tabs.forEach((tab) => tab.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

//progress bar
function loading() {
  document.querySelectorAll(".bar").forEach(function (current) {
    let startWidth = 0;
    const endWidth = current.dataset.size;

    /* 
      setInterval() time sholud be set as trasition time / 100. 
      In our case, 2 seconds / 100 = 20 milliseconds. 
      */
    const interval = setInterval(frame, 20);

    function frame() {
      if (startWidth >= endWidth) {
        clearInterval(interval);
      } else {
        startWidth++;
        current.style.width = `${endWidth}%`;
        current.firstElementChild.innerText = `${startWidth}%`;
      }
    }
  });
}

setTimeout(loading, 1000);

(function ($) {
  "use strict";

  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(400)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });
})(jQuery);
