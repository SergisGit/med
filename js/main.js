(function () {
  'use strict';

  var reviewsSlider = document.querySelector('.reviews__slider'),
    advantages = document.querySelector('.advantages'),
    popupOverlay = document.querySelector('.popup-overlay'),
    checkIn = document.querySelector('.checkIn'),
    regLink = document.querySelector('.main-nav__link_reg'),
    signIn = document.querySelector('.signIn'),
    signLink = document.querySelector('.main-nav__link_enter'),
    popupRegLink = document.querySelector('.popup__reg-link'),
    popupSignLink = document.querySelector('.popup__sign-link'),
    checkInEmailBtn = document.querySelector('.checkIn__1-btn_email'),
    checkInPhoneBtn = document.querySelector('.checkIn__1-btn_phone'),
    forgotPassLink = document.querySelector('.signIn__1-forgot-pass'),
    bethinkedPassLink = document.querySelector('.signIn__2-bethinked-pass'),
    checkInSocial = document.querySelector('.checkIn__social-block');

  function popupShow(popup, openLink) {
    var close = popup.querySelector('.popup__close-btn'),
      popupItems = popup.querySelectorAll('.popup__item');

    function popupClose() {
      popup.classList.remove('popup_animated');
      popupOverlay.classList.remove('popup-overlay_showed');
      for (var i = 1; i < popupItems.length; i += 1) {
        popupItems[i].style.display = 'none';
      }
      popupItems[0].style.display = 'block';

      window.removeEventListener('keydown', popupEscClose);
      document.removeEventListener('click', popupClickClose);

      if (popup == checkIn) {
        checkInEmailBtn.removeEventListener('click', popupItems_0_1);
        checkInPhoneBtn.removeEventListener('click', popupItems_0_2);
        checkInSocial.style.display = 'block';
      }
      if (popup == signIn) {
        forgotPassLink.removeEventListener('click', popupItems_0_1);
        bethinkedPassLink.removeEventListener('click', popupItems_1_0);
      }
    }

    // Закрытие формы по нажатию на Esc
    function popupEscClose(event) {
      if (event.keyCode === 27 && popup.classList.contains('popup_animated')) {
        popupClose();
      }
    }

    // Закрытие формы входа по клику вне формы или на крестик
    function popupClickClose(event) {
      if (popup.classList.contains('popup_animated') && (event.target == popupOverlay || event.target == close)) {
        popupClose();
      }
    }

    function popupItems_0_1() {
      popupItems[0].style. display = 'none';
      popupItems[1].style. display = 'block';
    }

    function popupItems_1_0() {
      popupItems[1].style. display = 'none';
      popupItems[0].style. display = 'block';
    }

    function popupItems_0_2() {
      popupItems[0].style. display = 'none';
      popupItems[2].style. display = 'block';
    }

    function openLinkListener(event) {
      event.preventDefault();
      popupOverlay
        .classList
        .add('popup-overlay_showed');
      popup
        .classList
        .add('popup_animated');

      window.addEventListener('keydown', popupEscClose);
      document.addEventListener('click', popupClickClose);

      function checkInToSignIn(event) {
        event.preventDefault();
        popupClose();
        popupSignLink.removeEventListener('click', checkInToSignIn);
        signLink.click();
      }

      function SignInTocheckIn(event) {
        event.preventDefault();
        popupClose();
        popupRegLink.removeEventListener('click', SignInTocheckIn);
        regLink.click();
      }

      if (popup == checkIn) {
        popupSignLink.addEventListener('click', checkInToSignIn);
        checkInEmailBtn.addEventListener('click', popupItems_0_1);
        checkInPhoneBtn.addEventListener('click', popupItems_0_2);
      }

      if (popup == signIn) {
        popupRegLink.addEventListener('click', SignInTocheckIn);
        forgotPassLink.addEventListener('click', popupItems_0_1);
        bethinkedPassLink.addEventListener('click', popupItems_1_0);
      }
    }

    openLink.addEventListener('click', openLinkListener);
  }

  popupShow(checkIn, regLink);
  popupShow(signIn, signLink);

  //анимации при прокрутке

  var isScrolling = false;
  var isPartiallyVisible = function (el) {
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
  };

  var isFullyVisible = function (el) {
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
  };

  var throttleScroll = function (e) {
    if (isScrolling == false) {
      window
        .requestAnimationFrame(function () {
          scrolling(e);
          isScrolling = false;
        });
    }
    isScrolling = true;
  };

  if (advantages) {
    var advantagesItems = advantages.querySelectorAll(".advantages__description-wrapper");

    for (var i = 0; i < advantagesItems.length; i += 1) {
      advantagesItems[i].style.transform = "scale3d(.75,.75,1)";
    }

    document.addEventListener("DOMContentLoaded", scrolling, false);
    window.addEventListener("scroll", throttleScroll, false);

    var scrolling = function (e) {
      for (var i = 0; i < advantagesItems.length; i += 1) {
        if (isPartiallyVisible(advantagesItems[i])) {
          advantagesItems[i].style.animation = "zoomIn 2s forwards";
        }
      }
    };
  }

  //-----Слайдер-----
  var transValue,
    toggleIndex;

  function translateCalculation(toggles, sliderList, transValue, toggleIndex) {
    var trV;
    for (var i = 0; i < toggles.length; i += 1) {
      if (toggles[i].classList.contains(toggleIndex)) {
        trV = transValue * i;
        sliderList.style.transform = 'translateX(' + trV + '%)';
      }
    }
  }

  function toggleSlide(togglesContainer, toggles, sliderList, transValue, toggleIndex) {
    togglesContainer
      .addEventListener('click', function (event) {
        var clickedElement = event.target;
        if (clickedElement.classList.contains('slider__toggle')) {
          event.preventDefault();
          if (clickedElement.classList.contains(toggleIndex)) {
            return (false);
          } else {
            for (var i = 0; i < toggles.length; i += 1) {
              toggles[i]
                .classList
                .remove(toggleIndex);
            }
            clickedElement
              .classList
              .add(toggleIndex);
            translateCalculation(toggles, sliderList, transValue, toggleIndex);
          }
        }
      });
  }

  function swipeRight(toggles, sliderList, transValue, toggleIndex) {
    for (var i = 0; i < toggles.length; i += 1) {
      if (toggles[i].classList.contains(toggleIndex)) {
        if (i != toggles.length - 1) {
          toggles[i]
            .classList
            .remove(toggleIndex);
          toggles[i + 1]
            .classList
            .add(toggleIndex);
          translateCalculation(toggles, sliderList, transValue, toggleIndex);
          break;
        }
      }
    }
  }

  function swipeLeft(toggles, sliderList, transValue, toggleIndex) {
    for (var i = 0; i < toggles.length; i += 1) {
      if (toggles[i].classList.contains(toggleIndex)) {
        if (i != 0) {
          toggles[i]
            .classList
            .remove(toggleIndex);
          toggles[i - 1]
            .classList
            .add(toggleIndex);
          translateCalculation(toggles, sliderList, transValue, toggleIndex);
          break;
        }
      }
    }
  }

  function swipeSlide(toggles, sliderList, transValue, toggleIndex) {
    sliderList.addEventListener('touchstart', handleTouchStart, false);
    sliderList.addEventListener('touchmove', handleTouchMove, false);
    var xDown = null;
    var yDown = null;
    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }
    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
      if (Math.abs(xDiff) + Math.abs(yDiff) > 150) { //to deal with to short swipes

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
          if (xDiff > 0) {/* left swipe */
            swipeRight(toggles, sliderList, transValue, toggleIndex);
          } else {/* right swipe */
            swipeLeft(toggles, sliderList, transValue, toggleIndex);
          }
        }
        /* reset values */
        xDown = null;
        yDown = null;
      }
    }
  }

  function slider(sliderContainer, transValue, toggleIndex) {
    var sliderList = sliderContainer.querySelector('.slider__list'),
      togglesContainer = sliderContainer.querySelector('.slider__toggles'),
      toggles = togglesContainer.querySelectorAll('.slider__toggle'),
      sliderPrev = sliderContainer.querySelector('.slider__prev'),
      sliderNext = sliderContainer.querySelector('.slider__next');

    toggleSlide(togglesContainer, toggles, sliderList, transValue, toggleIndex);
    swipeSlide(toggles, sliderList, transValue, toggleIndex);

    if (sliderPrev && sliderNext) {
      sliderNext
        .addEventListener('click', function () {
          swipeRight(toggles, sliderList, transValue, toggleIndex);
        });
      sliderPrev.addEventListener('click', function () {
        swipeLeft(toggles, sliderList, transValue, toggleIndex);
      });
    }
  }

  if (reviewsSlider) {
    transValue = -100;
    toggleIndex = "reviews__toggle-index";
    slider(reviewsSlider, transValue, toggleIndex);
  }
})();

// Открыть поиск
(function(window) {
  'use strict';
  var pageContainer = document.querySelector('.body__inner'),
    openCtrl = document.querySelector('.main-nav__search-link'),
    closeCtrl = document.querySelector('.popup-search__close-btn'),
    searchContainer = document.querySelector('.popup-search'),
    inputSearch = searchContainer.querySelector('.popup-search__input_services');

  function init() {
    initEvents();	
  }

  function initEvents() {
    openCtrl.addEventListener('click', openSearch);
    closeCtrl.addEventListener('click', closeSearch);
    document.addEventListener('keyup', function(ev) {
      // escape key.
      if( ev.keyCode == 27 ) {
        closeSearch();
      }
    });
  }

  function openSearch() {
    pageContainer.classList.add('page-move');
    searchContainer.classList.add('search-open');
    //inputSearch.focus();
  }

  function closeSearch() {
    pageContainer.classList.remove('page-move');
    searchContainer.classList.remove('search-open');
    inputSearch.blur();
    inputSearch.value = '';
  }
  
   init();
  
})(window);