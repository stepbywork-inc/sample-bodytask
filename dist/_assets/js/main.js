//ua判定
document.addEventListener('DOMContentLoaded', function () {
	const trainerTab = new Swiper('.js-trainerTab', {
		slidesPerView: 1,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		allowTouchMove: false,
	})
	$('.js-trainerTabBtn button').click(function () {
		$('.js-trainerTabBtn button').removeClass('is-active')
		$(this).addClass('is-active')
		let target = $(this).data('target')
		trainerTab.slideTo(target);
	})

	const studioSlider = new Swiper('.js-studioSlider', {
		slidesPerView: 1,
		spaceBetween: 15,
		autoplay: {
			delay: 5000,
		},
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
	})
	$('.js-faq').click(function () {
		$(this).toggleClass('is-open')
		$(this).next('dd').stop().slideToggle();
		return false;
	})
})
window.addEventListener('load', function () {
})
window.addEventListener('scroll', function () {
	if ($(window).scrollTop() > 100) {
		$('.l-hdr').addClass('is-scroll')
	} else {
		$('.l-hdr').removeClass('is-scroll')
	}
});
