// for cursor
let cursor = document.querySelector(".cursor"),
  cursorScale = document.querySelectorAll(".cursor-scale"),
  mouseX = 0,
  mouseY = 0

gsap.to({}, 0.016, {
  repeat: -1,

  onRepeat: function () {
    gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY
      }
    })
  }
});

window.addEventListener("mousemove", function (e) {
  mouseX = e.clientX
  mouseY = e.clientY
});

cursorScale.forEach(link => {
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
    cursor.classList.remove("grow-small");
    cursor.classList.remove("grow-large");
    cursor.classList.remove("mix-lighten");
    cursor.classList.remove("mix-difference");
  });
  link.addEventListener("mousemove", () => {
    cursor.classList.add("grow");
    if (link.classList.contains("blend-lighten")) {
      cursor.classList.add("mix-lighten");
    }
    if (link.classList.contains("blend-difference")) {
      cursor.classList.add("mix-difference");
    }
    if (link.classList.contains("small-scale")) {
      cursor.classList.remove("grow");
      cursor.classList.add("grow-small");
    }
    if (link.classList.contains("large-scale")) {
      cursor.classList.remove("grow");
      cursor.classList.remove("grow-small");
      cursor.classList.add("grow-large");
    }
  });
});

// =====================
// bg changes on scroll
window.sections = [...document.querySelectorAll('.section')];
window.lastScrollTop = window.pageYOffset;

document.body.style.background = window.sections[0].getAttribute('data-bg');

window.addEventListener('scroll', onScroll);

function onScroll() {
  const scrollTop = window.pageYOffset;

  const section = window.sections
    .map(section => {
      const el = section;
      const rect = el.getBoundingClientRect();
      return { el, rect };
    })
    .find(section => section.rect.bottom >= (window.innerHeight * 0.5));
  document.body.style.background = section.el.getAttribute('data-bg');
}

// for active btn
const btns = document.querySelectorAll('.is-active');
for (let i = 0; i < btns.length; i++) {
btns[i].addEventListener('click', function(){
  console.log(btns[i])
  // Button Activation
  myClass.removeCla(btns,'active-btn');
  this.classList.add('active-btn');
});
};
// class add and remove Object 
const myClass = {
  addCla: function(ele , cla){
    for (let i = 0; i < ele.length; i++) {
      ele[i].classList.add(cla);
  };
  },
  removeCla: function(ele , cla){
    for (let i = 0; i < ele.length; i++) {
      ele[i].classList.remove(cla);
  };
  },
};
// =======


// Simple Parallax image variable Banner
(() => {

  const image = document.querySelector('.banner');
  // Simple Parallax
  new simpleParallax(image, {
    scale: 1.8,
    orientation: "down"
  });

})();


// roadmap
// for swiper slider
(() => {

  let swiper = new Swiper('.roadmap-swiper', {
    effect: 'coverflow',
    grabCursor: false,
    mousewheel: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 0,
    spaceBetween: 80,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 80,
      modifier: 2,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });

  swiper.slideNext();
  swiper.slidePrev();

})();


// team members
// for swiper slider
(() => {

  let swiper = new Swiper('.member-swiper', {
    effect: 'coverflow',
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 1,
    spaceBetween: 100,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 120,
      modifier: 2,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });

  swiper.slideNext();
  swiper.slidePrev();

})();

//for parallax
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".showcase__hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.timeline({
  scrollTrigger: {
    trigger: ".goals",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});


gsap.utils.toArray(".parallax").forEach(layer => {
  const depth = layer.dataset.depth;
  const movement = -(layer.offsetHeight * depth)
  tl.to(layer, { y: movement, ease: "none" }, 0)
});



//skew nft thumbnail
let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
  clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
    }
  }
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });


// this whole thing is for goals section activity
// button changes
(() => {

  const wrapper = document.querySelector(".paragraph-wrapper");
  const isActive = document.querySelectorAll(".is-active");


  // change btn between community and future
  wrapper.addEventListener('click', function (e) {
    const id = e.target.dataset.btn;

    if (id) {
      // remove active from other buttons
      isActive.forEach(function (btn) {
        btn.classList.remove("active-btn")
        e.target.classList.add("active-btn")
      })
    }

  });

  // from here after changes stuff
  let goalsSwiper = new Swiper('.goals-swiper', {

    grabCursor: true,
    centeredSlides: true,
    initialSlide: 0,
    slidesPerView: '2',
    spaceBetween: 0,

    effect: 'coverflow',
    keyboard: true,

    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 4,
      slideShadows: false,
    },

  });


  // change content between community and future
  function onSwiperChange() {
    goalsSwiper.on('slideChange', function (e) {
      let index = this.activeIndex;

      // add active paragraph
      $('.paragraph__item').removeClass('active-paragraph').eq(this.activeIndex).addClass('active-paragraph');
      // add active btn
      $('.button .is-active').removeClass('active-btn').eq(this.activeIndex).addClass('active-btn');


    });

    $('.slideNext').click(function (argument) {
      goalsSwiper.slideNext()
    });
    $('.slidePrev').click(function (argument) {
      goalsSwiper.slidePrev();
    });
  }

  onSwiperChange();

})();


(() => {
})();

// Cursor change color on top of Faq section
(() => {

  const isOnFaq = document.getElementById("faq");

  isOnFaq.addEventListener("mouseleave", () => {
    cursor.classList.remove('difference');
  });

  isOnFaq.addEventListener("mousemove", () => {
    cursor.classList.add('difference');
  });

})();