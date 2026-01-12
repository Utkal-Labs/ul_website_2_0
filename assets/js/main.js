 // form js
$(document).ready(function () {
  $("#contactForm").on("submit", function (e) {
    $(".loader-container").show();
    var formData = new FormData($(this)[0]);
    $.ajax({
      type: "post",
      url: "sendmail.php",
      data: formData,
      processData: false,
      contentType: false,
      success: function (res) {
        let data = JSON.parse(res);
        grecaptcha.reset();
        if (data.responseCode == 200) {
          $("#responseMsg").html(
            '<div class="alert alert-success" role="alert">' +
              data.message +
              "</div>"
          );
          $("#contactForm")[0].reset();
          $("#chooseFile").val("");
        } else {
          $("#responseMsg").html(
            '<div class="alert alert-danger" role="alert">' +
              data.message +
              "</div>"
          );
        }
      },
      complete: function () {
        // Hide loader
        $(".loader-container").hide();
      },
    });
    e.preventDefault();
  });
});
 // form js end //

//  // Init AOS
!(function ($) {
  "use strict";

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);
 // Init AOS //

// Smooth scroll for the navigation menu and links with .scrollto classes
var scrolltoOffset = $("#header").outerHeight() - 1;
$(document).on("click", ".nav-menu a, .mobile-nav a, .scrollto", function (e) {
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();

      var scrollto = target.offset().top - scrolltoOffset;

      if ($(this).attr("href") == "#header") {
        scrollto = 0;
      }

      $("html, body").animate(
        {
          scrollTop: scrollto,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".nav-menu, .mobile-nav").length) {
        $(".nav-menu .active, .mobile-nav .active").removeClass("active");
        $(this).closest("li").addClass("active");
      }

      if ($("body").hasClass("mobile-nav-active")) {
        $("body").removeClass("mobile-nav-active");
        $(".mobile-nav-toggle i").toggleClass(
          "icofont-navigation-menu icofont-close"
        );
        $(".mobile-nav-overly").fadeOut();
      }
      return false;
    }
  }
});
// Smooth scroll for the navigation menu end ///

// Mobile Navigation js
if ($(".nav-menu").length) {
  var $mobile_nav = $(".nav-menu").clone().prop({
    class: "mobile-nav d-lg-none",
  });
  $("body").append($mobile_nav);
  $("body").prepend(
    '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fas fa-bars"></i></button>'
  );
  $("body").append('<div class="mobile-nav-overly"></div>');

  $(document).on("click", ".mobile-nav-toggle", function (e) {
    $("body").toggleClass("mobile-nav-active");
    $(".mobile-nav-toggle i").toggleClass(
      "icofont-navigation-menu icofont-close"
    );
    $(".mobile-nav-overly").toggle();
  });

  $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
    e.preventDefault();
    $(this).next().slideToggle(300);
    $(this).parent().toggleClass("active");
  });

  $(document).click(function (e) {
    var container = $(".mobile-nav, .mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("mobile-nav-active")) {
        $("body").removeClass("mobile-nav-active");
        $(".mobile-nav-toggle i").toggleClass(
          "icofont-navigation-menu icofont-close"
        );
        $(".mobile-nav-overly").fadeOut();
      }
    }
  });
} else if ($(".mobile-nav, .mobile-nav-toggle").length) {
  $(".mobile-nav, .mobile-nav-toggle").hide();
}
// Mobile Navigation js end


$(".nav-list").click(function () {
  //console.log("Clicked");
  $(".nav-list li.active").removeClass("active");
  $(this).addClass("active");
});

// accordion
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
// accordion //

(function ($) {
  "user strict";

  // Preloader 
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });
  // Preloader End

  $("select").niceSelect(),
    // aos
    AOS.init();

  $(".video").lightcase();

  $(".img-popup").lightcase();

  // scroll-to-top
  var ScrollTop = $(".scrollToTop");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() < 100) {
      ScrollTop.removeClass("active");
    } else {
      ScrollTop.addClass("active");
    }
  });

  // scroll-to-top //

  //plan-tab-switcher
  $(".plan-tab-switcher").on("click", function () {
    $(this).toggleClass("active");

    $(".plan-area").toggleClass("change-subs-duration");
  });
})(jQuery);

  // slider // client testimonial //indexpage
  // var swiper = new Swiper(".banner-slider", {
  //   slidesPerView: 2,
  //   spaceBetween: 30,
  //   centeredSlides: true,
  //   loop: true,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  //   autoplay: {
  //     speeds: 2000,
  //     delay: 4000,
  //   },
  //   speed: 1000,
  //   breakpoints: {
  //     991: {
  //       slidesPerView: 2,
  //     },
  //     767: {
  //       slidesPerView: 2,
  //     },
  //     575: {
  //       slidesPerView: 2,
  //     },
  //   },
  // });

  // var swiper = new Swiper(".project-slider", {
  //   slidesPerView: 3,
  //   spaceBetween: 30,
  //   centeredSlides: true,
  //   loop: true,
  //   navigation: {
  //     nextEl: ".slider-next",
  //     prevEl: ".slider-prev",
  //   },
  //   autoplay: {
  //     speeds: 2000,
  //     delay: 4000,
  //   },
  //   speed: 1000,
  //   breakpoints: {
  //     1300: {
  //       slidesPerView: 2,
  //       centeredSlides: false,
  //     },
  //     1199: {
  //       slidesPerView: 2,
  //       centeredSlides: false,
  //     },
  //     991: {
  //       slidesPerView: 2,
  //       centeredSlides: false,
  //     },
  //     767: {
  //       slidesPerView: 2,
  //     },
  //     575: {
  //       slidesPerView: 1,
  //       centeredSlides: false,
  //     },
  //   },
  // });

  // var swiper = new Swiper(".testimonials-slider", {
  //   slidesPerView: 1,
  //   spaceBetween: 10,
  //   loop: true,
  //   pagination: {
  //     el: ".testimonials-pagination",
  //     clickable: true,
  //     renderBullet: function (index, className) {
  //       return '<span class="' + className + '">' + (index + 1) + "</span>";
  //     },
  //   },
  //   navigation: {
  //     nextEl: ".slider-next",
  //     prevEl: ".slider-prev",
  //   },
  //   autoplay: {
  //     speeds: 2000,
  //     delay: 4000,
  //   },
  //   speed: 1000,
  //   breakpoints: {
  //     1199: {
  //       slidesPerView: 2,
  //     },
  //     991: {
  //       slidesPerView: 2,
  //     },
  //     767: {
  //       slidesPerView: 1,
  //     },
  //     575: {
  //       slidesPerView: 1,
  //     },
  //   },
  // });


// Close handlers
// function closeVideo(){
//   document.getElementById('videoModal').style.display='none';
//   document.getElementById('videoFrame').src="";
//   testimonialSwiper.allowTouchMove = true;
//   testimonialSwiper.autoplay.start();
// }
// document.querySelector('.video-close').onclick = closeVideo;
// document.getElementById('videoModal').onclick = e=>{
//   if(e.target.id==="videoModal") closeVideo();
// };



  


//// sliderhome
// const slides = document.querySelectorAll(".mySlides");
// const dots = document.querySelectorAll(".dot");

// let counter = 0;
// const intervalTime = 2000;

// const handlePrev = () => {
//   counter = (counter - 1 + slides.length) % slides.length;
//   slideImage();
// };
// const handleNext = () => {
//   counter = (counter + 1) % slides.length;
//   slideImage();
// };

// const slideImage = () => {
//   slides.forEach((slide, index) => {
//     slide.style.display = "none";
//     dots[index].classList.remove("active");
//   });

//   slides[counter].style.display = "block";
//   dots[counter].classList.add("active");
// };

// slideImage();

// When user click on dot

// const currentSlide = (value) => {
//   counter = value - 1;
//   slideImage();
// };

// To stop the slider on hover

// let sliderTime = setInterval(handleNext, intervalTime);

// let slideshowContainer = document.querySelector(".slideshow-container");

// function stopSlider() {
//   clearInterval(sliderTime);
// }

// function startSlider() {
//   sliderTime = setInterval(handleNext, intervalTime);
// }

// slideshowContainer.addEventListener("mouseenter", stopSlider);

// slideshowContainer.addEventListener("mouseleave", startSlider);

//// sliderhome////
/////////////////testimonial vedio// indexpage///////////////////
const testimonialSwiper = new Swiper(".testimonials-slider", {
  slidesPerView:1,
  spaceBetween:20,
  loop:true,
  speed:900,
  autoplay:{ delay:4000, disableOnInteraction:false },
  pagination:{ el:".testimonials-pagination", clickable:true },
  breakpoints:{ 991:{ slidesPerView:2 } }
});

const modal = document.getElementById("videoModal");
const video = document.getElementById("localVideo");
let isVideoOpen = false;

document.querySelectorAll(".video-testimonial-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(isVideoOpen) return;
    isVideoOpen = true;

    testimonialSwiper.autoplay.stop();
    testimonialSwiper.allowTouchMove = false;

    modal.style.display="flex";
    video.src = btn.dataset.video;
    video.currentTime = 0;
    video.play();
  });
});
// Close button
function closeLocalVideo(){
  isVideoOpen = false;

  video.pause();
  video.currentTime = 0;
  video.src="";
  modal.style.display="none";

  testimonialSwiper.allowTouchMove = true;
  testimonialSwiper.autoplay.start();
}

document.querySelector(".video-close").addEventListener("click", function(e){
  e.stopPropagation();
  closeLocalVideo();
});

modal.addEventListener("click", function(e){
  if(e.target === modal) closeLocalVideo();
});


