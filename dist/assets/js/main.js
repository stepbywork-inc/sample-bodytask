document.addEventListener("DOMContentLoaded",(function(){const e=new Swiper(".js-trainerTab",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},allowTouchMove:!1});$(".js-trainerTabBtn button").click((function(){$(".js-trainerTabBtn button").removeClass("is-active"),$(this).addClass("is-active");let t=$(this).data("target");e.slideTo(t)}));new Swiper(".js-studioSlider",{slidesPerView:1,spaceBetween:15,autoplay:{delay:5e3},loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"}});$(".js-faq").click((function(){return $(this).toggleClass("is-open"),$(this).next("dd").stop().slideToggle(),!1}))})),window.addEventListener("load",(function(){})),window.addEventListener("scroll",(function(){$(window).scrollTop()>100?$(".l-hdr").addClass("is-scroll"):$(".l-hdr").removeClass("is-scroll")}));
//# sourceMappingURL=map/main.js.map