{
    const sliders = document.querySelectorAll(".slider");
    const interval = 3800;
    const animDuration = 600;
  
    for (let i = 0; i < sliders.length; ++i) {
      const slider = sliders[i];
      const dots = slider.querySelector(".dots");
      const sliderImgs = slider.querySelectorAll(".img");
  
      let currImg = 0;
      let prevImg = sliderImgs.length - 1;
      let intrvl;
      let timeout;
  
      // Creates dots and add listeners to them
      for (let i = 0; i < sliderImgs.length; ++i) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dots.appendChild(dot);
        dot.addEventListener("click", dotClick.bind(null, i), false);
      }
  
      const allDots = dots.querySelectorAll(".dot");
      allDots[0].classList.add("active-dot");
  
      sliderImgs[0].style.left = "0";
      timeout = setTimeout(() => {
        animateSlider();
        sliderImgs[0].style.left = "";
        intrvl = setInterval(animateSlider, interval);
      }, interval - animDuration);   
  
      /**
       * Animates images
       * @param {number} [nextImg] 
       * @param {boolean} [right = false] 
       */
      function animateSlider(nextImg, right) {
        if (!nextImg)
          nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;
  
        --nextImg;
        sliderImgs[prevImg].style.animationName = "";
  
        if (!right) {
          sliderImgs[nextImg].style.animationName = "leftNext";
          sliderImgs[currImg].style.animationName = "leftCurr";
        } 
        else {
          sliderImgs[nextImg].style.animationName = "rightNext";
          sliderImgs[currImg].style.animationName = "rightCurr";
        }
  
        prevImg = currImg;
        currImg = nextImg;
  
        currDot = allDots[currImg];
        currDot.classList.add("active-dot");
        prevDot = allDots[prevImg];
        prevDot.classList.remove("active-dot");
      }
  
      /**
       * Decides if animate to left or right and highlights clicked dot
       * @param {number} num - index of clicked dot
       */
      function dotClick(num) {
        if (num == currImg)
          return false;
  
        clearTimeout(timeout);
        clearInterval(intrvl);
  
        if (num > currImg)
          animateSlider(num + 1);
        else
          animateSlider(num + 1, true);
  
        intrvl = setInterval(animateSlider, interval);
      }
    }
  }
$(document).ready(function () {

    $('.tabmenu-wrap .tab-nav').find('a').on('click', function(e) {
        var $this = $(this);
       var $all_tab_nav = $this.parents('.tab-nav').find('.nav');
       var $tab_contents = $this.parents('.tabmenu-wrap').find('.con-box');
       var id = $this.attr('href');
     
       e.preventDefault();
       $all_tab_nav.removeClass('on');
       $this.parent().addClass('on');
       $tab_contents.hide();
       $(id).show();
    });


    $('.palceholder').click(function() {
        $(this).siblings('input').focus();
    });
    $('.form-controller').focus(function() {
        $(this).siblings('.palceholder').hide();
    });
    $('.form-controller').blur(function() {
        var $this = $(this);
        if ($this.val().length == 0)
          $(this).siblings('.palceholder').show();
    });
    $('.form-controller').blur();

    $('.courses-cards').slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        dots: false,
        arrows: true
    });
});

