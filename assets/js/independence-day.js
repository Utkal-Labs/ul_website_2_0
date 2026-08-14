/*! Independence Day tricolor effect — self-contained, vanilla JS + Canvas. */
(function () {
  'use strict';

  // ---- Adjust these to move the active window ----
  var START_DATE = '2026-08-14'; // inclusive, local date, YYYY-MM-DD
  var END_DATE   = '2026-08-18'; // inclusive, local date, YYYY-MM-DD

  var SAFFRON = '#FF9933';
  var WHITE   = '#FFFFFF';
  var GREEN   = '#138808';

  var BAR_HEIGHT = 5, SWEEP_DURATION = 1500;       // px, ms
  var CONFETTI_COUNT = 30, CONFETTI_DURATION = 2500; // count, ms
  var Z_BAR = 100000, Z_CONFETTI = 99999;

  function todayLocalISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function withinWindow() {
    var today = todayLocalISO();
    return today >= START_DATE && today <= END_DATE;
  }

  function injectStyles() {
    var css =
      '#id-tricolor-bar{position:fixed;top:0;left:0;width:100%;height:' + BAR_HEIGHT + 'px;' +
      'z-index:' + Z_BAR + ';pointer-events:none;overflow:hidden;background:transparent;}' +
      '#id-tricolor-bar-fill{position:absolute;top:0;left:0;width:100%;height:100%;' +
      'background:linear-gradient(90deg,' + SAFFRON + ' 0%,' + SAFFRON + ' 33.33%,' +
      WHITE + ' 33.33%,' + WHITE + ' 66.66%,' + GREEN + ' 66.66%,' + GREEN + ' 100%);' +
      'transform:scaleX(0);transform-origin:left center;}' +
      '#id-tricolor-bar-fill.id-sweep{animation:id-sweep-anim ' + SWEEP_DURATION + 'ms ease-out forwards;}' +
      '@keyframes id-sweep-anim{from{transform:scaleX(0);}to{transform:scaleX(1);}}' +
      '#id-confetti-canvas{position:fixed;top:0;left:0;width:100%;height:100%;' +
      'z-index:' + Z_CONFETTI + ';pointer-events:none;}';
    var style = document.createElement('style');
    style.id = 'id-tricolor-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createTopBar(reduceMotion) {
    var bar = document.createElement('div');
    bar.id = 'id-tricolor-bar';
    var fill = document.createElement('div');
    fill.id = 'id-tricolor-bar-fill';
    if (reduceMotion) {
      fill.style.transform = 'scaleX(1)'; // static, no animation
    } else {
      fill.className = 'id-sweep';
    }
    bar.appendChild(fill);
    document.body.appendChild(bar);
  }

  function runConfetti() {
    var canvas = document.createElement('canvas');
    canvas.id = 'id-confetti-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var colors = [SAFFRON, WHITE, GREEN];
    var particles = [];
    var i;
    for (i = 0; i < CONFETTI_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 40,
        w: 5 + Math.random() * 5,
        h: 3 + Math.random() * 4,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 1.5 + Math.random() * 2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        color: colors[i % colors.length]
      });
    }

    var start = null, rafId = null;

    function cleanup() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }

    function frame(ts) {
      if (!start) start = ts;
      var progress = (ts - start) / CONFETTI_DURATION;
      if (progress >= 1) { cleanup(); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var opacity = 1 - progress;
      var p;
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
  }

  function init() {
    if (!withinWindow()) return;
    var reduceMotion = !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    injectStyles();
    createTopBar(reduceMotion);
    if (!reduceMotion) runConfetti();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
