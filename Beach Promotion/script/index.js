gsap.registerPlugin(ScrollTrigger);
locomotiveScroll();

function locomotiveScroll() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        getDirection: true,
    });

    scroll.on('scroll', (instance) => {
        document.documentElement.setAttribute('data-direction', instance.direction)
    });

    window.onresize = scroll.update();  
    scroll.on("scroll", () => ScrollTrigger.update());
    ScrollTrigger.defaults({
        scroller: document.querySelector('[data-scroll-container]'),
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener('refresh', () => scroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
