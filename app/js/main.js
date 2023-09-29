$(function () {
  $(".product-tabs__top-link").on("click", function (e) {
    e.preventDefault();
    $(".product-tabs__top-link").removeClass("product-tabs__top-link--active");
    $(this).addClass("product-tabs__top-link--active");

    $(".product-tabs__content-item").removeClass(
      "product-tabs__content-item--active"
    );
    $($(this).attr("href")).addClass("product-tabs__content-item--active");
  });

  $(".footer-top__slide").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass('active');
  });

  $(".blog-page__slider").slick({
    prevArrow:
      '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="9px" height="14px" viewBox="0 0 9 13" version="1.1"><g><path d="M 0.3125 5.8125 L 6.222656 0.289062 C 6.632812 -0.09375 7.292969 -0.09375 7.695312 0.289062 L 8.679688 1.207031 C 9.085938 1.589844 9.085938 2.207031 8.679688 2.582031 L 4.492188 6.503906 L 8.683594 10.417969 C 9.09375 10.796875 9.09375 11.417969 8.683594 11.792969 L 7.703125 12.710938 C 7.292969 13.09375 6.632812 13.09375 6.226562 12.710938 L 0.316406 7.1875 C -0.0976562 6.8125 -0.0976562 6.1875 0.3125 5.8125 Z M 0.3125 5.8125 "/></g></svg></button>',
    nextArrow:
      '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="14px" viewBox="0 0 9 13" version="1.1"><g><path d="M 8.6875 7.191406 L 2.773438 12.714844 C 2.367188 13.097656 1.707031 13.097656 1.300781 12.714844 L 0.320312 11.792969 C -0.0898438 11.410156 -0.0898438 10.792969 0.320312 10.417969 L 4.507812 6.503906 L 0.3125 2.589844 C -0.09375 2.210938 -0.09375 1.59375 0.3125 1.214844 L 1.296875 0.289062 C 1.707031 -0.09375 2.367188 -0.09375 2.769531 0.289062 L 8.679688 5.8125 C 9.089844 6.1875 9.089844 6.8125 8.6875 7.191406 Z M 8.6875 7.191406 "/></g></svg></button>',
    infinite: false,
  });

  $(".product-slide__thumb").slick({
    asNavFor: ".product-slide__big",
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    draggable: false,
  });
  $(".product-slide__big").slick({
    asNavFor: ".product-slide__thumb",
    draggable: false,
    arrows: false,
    fade: true,
  });

  $(".shop-content__filter-btn").on("click", function () {
    $(".shop-content__filter-btn").removeClass(
      "shop-content__filter-btn--active"
    );
    $(this).addClass("shop-content__filter-btn--active");
  });

  $(".button-list").on("click", function () {
    $(".product-item").addClass("product-item--list");
  });

  $(".button-grid").on("click", function () {
    $(".product-item").removeClass("product-item--list");
  });

  $(".filter-price__input").ionRangeSlider({
    type: "double",
    prefix: "$",
    onStart: function (data) {
      $(".filter-price__from").text(data.from);
      $(".filter-price__to").text(data.to);
    },
    onChange: function (data) {
      $(".filter-price__from").text(data.from);
      $(".filter-price__to").text(data.to);
    },
  });

  $(".select-style, .product-one__item-numb").styler();

  $(".top-slider__inner").slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2500,
  });

  $(".star").rateYo({
    starWidth: "17px",
    normalFill: "#ccccce",
    ratedFill: "#ffc35b",
    readOnly: true,
    starSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="17px" viewBox="0 0 18 17" version="1.1"> <g id="surface1"> <path d="M 8.09375 0.640625 L 5.964844 5.023438 L 1.0625 5.773438 C 0.101562 5.878906 -0.214844 6.949219 0.421875 7.589844 L 3.9375 11.011719 L 3.085938 15.824219 C 2.980469 16.679688 3.832031 17.320312 4.578125 17 L 8.945312 14.753906 L 13.316406 17 C 14.0625 17.425781 15.019531 16.785156 14.808594 15.824219 L 13.953125 11.011719 L 17.46875 7.589844 C 18.109375 6.949219 17.789062 5.878906 16.832031 5.773438 L 11.929688 5.023438 L 9.800781 0.640625 C 9.585938 -0.214844 8.414062 -0.214844 8.09375 0.640625 Z M 8.09375 0.640625 "/> </g> </svg>',
  });

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function initializeClock(id, endtime) {
    const clock = document.querySelector(".promo__clock");
    const daysSpan = clock.querySelector(".promo__days");
    const hoursSpan = clock.querySelector(".promo__hours");
    const minutesSpan = clock.querySelector(".promo__minutes");
    const secondsSpan = clock.querySelector(".promo__seconds");

    function updateClock() {
      const t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  const deadline = $(".promo__clock").attr("data-time");
  initializeClock("promo__clock", deadline);
});

document.querySelector(".menu__burger").addEventListener("click", function () {
  this.classList.toggle("menu__burger--active");
  document.querySelector(".menu__list").classList.toggle("menu__list--active");
});
