//ua判定
document.addEventListener('DOMContentLoaded', function () {

	const members = new Swiper('.js-members', {
		speed: 400,
		spaceBetween: 0,
		effect: 'fade',
		allowTouchMove: false,
		fadeEffect: {
			crossFade: true
		},
	});
	$('.js-membersBtn button').click(function () {
		$('.js-membersBtn button').removeClass('is-active')
		$(this).addClass('is-active')
		let target = $(this).data('target')
		members.slideTo(target)
		return false;
	})

	const studio = new Swiper('.js-studio', {
		speed: 400,
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: {
			delay: 5000,
		},
		loop: true,
	});

	$('.js-faq dt').click(function () {
		$(this).toggleClass('is-open');
		$(this).next('dd').stop().slideToggle();
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
