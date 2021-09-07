window.addEventListener('scroll',() => {
    const target = document.querySelectorAll('.scroll');
    for (let i =0;i < target.length; i++) {
        if (target[i].dataset.start < window.pageYOffset) {
        let pos =( window.pageYOffset-target[i].dataset.start) * target[i].dataset.rate;
        target[i].style.transform=`translate3d(0px,${-pos}px,0px)`;
        } else target[i].style.transform=`translate3d(0px,0px,0px)`;
    }
    console.log(window.pageYOffset)
})

// window.addEventListener('scroll',() => {
//     const target = document.querySelector('.scroll-med');
//     let scrolled = window.pageYOffset;
//     let rate = .1*scrolled
//     target.style.transform = `translate3d(0px,${-rate}px,0px)`;
// })