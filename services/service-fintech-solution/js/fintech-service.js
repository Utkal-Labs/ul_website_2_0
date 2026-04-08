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


// <!--//fintech// usecase-section--> 
const track = document.querySelector('.finuse-track');
const originalCards = Array.from(document.querySelectorAll('.finuse-card'));

originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});

const allCards = document.querySelectorAll('.finuse-card');

allCards.forEach(card => {
    card.addEventListener('click', function(){

        allCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        document.getElementById('mainTitle').innerText = this.dataset.title;
        document.getElementById('mainImage').src = this.dataset.image;
        document.getElementById('mainDesc').innerText = this.dataset.desc;
    });
});
// <!--//fintech// usecase-section-end--> 

// <!--//fintech// Tech Stack Hover Pause--> 
document.querySelectorAll('.logo-marquee').forEach(marquee=>{
  marquee.addEventListener('mouseenter',()=>{
    marquee.querySelector('.logo-track').style.animationPlayState='paused';
  });

  marquee.addEventListener('mouseleave',()=>{
    marquee.querySelector('.logo-track').style.animationPlayState='running';
  });
});

// <!--//fintech// Tech Stack-end--> 

 
// /* <!-- //fintech// FAQ-section-//// --> */
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {

    const currentItem = button.parentElement;

    document.querySelectorAll('.faq-item').forEach(item => {
      if(item !== currentItem){
        item.classList.remove('active');
      }
    });

    currentItem.classList.toggle('active');

  });
});
 
// /* <!-- //fintech// FAQ-section-end//// --> */

// /* <!-- //fintech// Solutions//// --> */
(function () {
  'use strict';
 
  /* ── SliderController: one instance per panel ── */
  class SliderController {
    constructor(panelEl) {
      this.slides  = Array.from(panelEl.querySelectorAll('.utk-slide'));
      this.dots    = Array.from(panelEl.querySelectorAll('.utk-dot'));
      this.current = 0;
      this.timer   = null;
 
      this.dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          this.goTo(i);
          this.resetTimer();
        });
      });
 
      /* pause on hover */
      const sliderEl = panelEl.querySelector('.utk-slider');
      sliderEl.addEventListener('mouseenter', () => clearInterval(this.timer));
      sliderEl.addEventListener('mouseleave', () => this.resetTimer());
    }
 
    goTo(n) {
      this.slides[this.current].classList.remove('active');
      this.dots[this.current].classList.remove('active');
      this.current = (n + this.slides.length) % this.slides.length;
      this.slides[this.current].classList.add('active');
      this.dots[this.current].classList.add('active');
    }
 
    resetTimer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.goTo(this.current + 1), 4000);
    }
 
    start() { this.resetTimer(); }
 
    reset() {
      this.goTo(0);
      this.resetTimer();
    }
  }
 
  /* ── Boot: create a controller for each panel ── */
  const panelMap = {};
  document.querySelectorAll('.utk-panel').forEach(panel => {
    const ctrl = new SliderController(panel);
    panelMap[panel.id] = ctrl;
  });
 
  /* Start the visible panel's slider */
  const activePanel = document.querySelector('.utk-panel.active');
  if (activePanel) panelMap[activePanel.id].start();
 
  /* ── Tab switching ── */
  const tabs = document.querySelectorAll('.utk-tab');
  const panels = document.querySelectorAll('.utk-panel');
 
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = 'panel-' + tab.dataset.panel;
 
      /* deactivate all */
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => {
        if (p.classList.contains('active')) {
          /* pause outgoing slider */
          clearInterval(panelMap[p.id].timer);
        }
        p.classList.remove('active');
      });
 
      /* activate clicked */
      tab.classList.add('active');
      const targetPanel = document.getElementById(target);
      targetPanel.classList.add('active');
 
      /* reset & start incoming slider */
      panelMap[target].reset();
    });
  });
 
})();