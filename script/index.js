attractHover();
locomotiveScroll();

function attractHover() {
    $.attractHover('.js-attract-hover',
      {
        proximity: 1,
        magnetism: 3,
        attractEasingClass:'attract-hover-easing'
      }
    );
}

function locomotiveScroll() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
}