(function () {
  'use strict';

  var body = document.querySelector('.body'),
    mainSearch = document.querySelector('.main-search'),
    pageWrapper = document.querySelector('.body__wrapper'),
    pageContainer = document.querySelector('.body__inner'),
    mainNav = document.querySelector('.main-nav'),
    mainNavCheck = document.querySelector('.main-nav__check'),
    reviewsSlider = document.querySelector('.reviews__slider'),
    advantages = document.querySelector('.advantages'),
    popupOverlay = document.querySelector('.popup-overlay'),
    popupWrapper = document.querySelector('.popup-wrapper'),
    checkIn = document.querySelector('.checkIn'),
    regLink = document.querySelector('.main-nav__link_reg'),
    signIn = document.querySelector('.signIn'),
    signLink = document.querySelector('.main-nav__link_enter'),
    cityLink = document.querySelector('.main-nav__location-link'),
    cityLink2 = document.querySelector('.main-nav__location-link2'),
    popupCity = document.querySelector('.popup-city'),
    popupRegLink = document.querySelector('.popup__reg-link'),
    popupSignLink = document.querySelector('.popup__sign-link'),
    checkInEmailBtn = document.querySelector('.checkIn__1-btn_email'),
    checkInPhoneBtn = document.querySelector('.checkIn__1-btn_phone'),
    popupBackBtn = document.querySelector('.popup__input-svg_back'),
    forgotPassLink = document.querySelector('.signIn__1-forgot-pass'),
    bethinkedPassLink = document.querySelector('.signIn__2-bethinked-pass'),
    checkInSocial = document.querySelector('.checkIn__social-block'),
    PopupCityInput = document.querySelector('.popup-city__input'),
    PopupCityItems = document.querySelector('.popup-city__items');

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
    document
      .querySelector('html')
      .classList
      .add('is-ios');
  }

  mainNavCheck
    .addEventListener('change', function () {
      if (mainNavCheck.checked) {
        body
          .classList
          .add('overflow-mobile');
      } else {
        body
          .classList
          .remove('overflow-mobile');
      }
    });

  function scrollnav() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      if ($(window).scrollTop() === 0) {
        mainNav.style.position = 'absolute';
        mainNav.style.animation = "";
        mainNav.style.transform = "translate3d(0,0,0)";
      }
      if ($(window).scrollTop() >= 350) {
        mainNav.style.position = 'fixed';
        mainNav.style.transform = "";
        mainNav.style.animation = "animateMenu 0.5s forwards";
      }
    }
  }

  window.addEventListener("scroll", scrollnav, false);

  function popupShow(popup, openLink) {
    var close = popup.querySelector('.popup__close-btn'),
      popupItems = popup.querySelectorAll('.popup__item');

    function popupClose() {
      popupWrapper.style.display = '';
      popup
        .classList
        .remove('popup_animated');
      popupOverlay
        .classList
        .remove('popup-overlay_showed');
      body
        .classList
        .remove('overflow');
      for (var i = 1; i < popupItems.length; i += 1) {
        popupItems[i].style.display = 'none';
      }

      if (popup == checkIn || popup == signIn) {
        popupItems[0].style.display = 'block';
      }

      window.removeEventListener('keydown', popupEscClose);
      document.removeEventListener('click', popupClickClose);

      if (popup == checkIn) {
        checkInEmailBtn.removeEventListener('click', popupItems_0_1);
        checkInPhoneBtn.removeEventListener('click', popupItems_0_2);
        popupBackBtn.removeEventListener('click', popupItems_3_2);
      }
      if (popup == signIn) {
        forgotPassLink.removeEventListener('click', popupItems_0_1);
        bethinkedPassLink.removeEventListener('click', popupItems_1_0);
      }
      if (popup == popupCity) {
        PopupCityInput.removeEventListener('focus', openCities);
        document.removeEventListener('click', chooseCity);
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
      if (popup.classList.contains('popup_animated') && (event.target == popupWrapper || event.target == close)) {
        popupClose();
      }
    }

    function popupItems_0_1() {
      popupItems[0].style.display = 'none';
      popupItems[1].style.display = 'block';
    }

    function popupItems_1_0() {
      popupItems[1].style.display = 'none';
      popupItems[0].style.display = 'block';
    }

    function popupItems_0_2() {
      popupItems[0].style.display = 'none';
      popupItems[2].style.display = 'block';
    }

    function popupItems_3_2() {
      popupItems[3].style.display = 'none';
      popupItems[2].style.display = 'block';
    }

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

    function openCities() {
      PopupCityItems.style.display = 'block';
    }
    function chooseCity(event) {
      var clickedElement = event.target;
      if (clickedElement.classList.contains('popup-city__item') || clickedElement.classList.contains('popup-city__popular-city')) {
        event.preventDefault();
        PopupCityInput.value = clickedElement.textContent;
      }
      if (event.target != PopupCityInput) {
        setTimeout(function () {
          PopupCityItems.style.display = '';
        }, 10);
      }
    }

    function openLinkListener(event) {
      event.preventDefault();
      popupWrapper.style.display = 'flex';
      popupOverlay
        .classList
        .add('popup-overlay_showed');
      popup
        .classList
        .add('popup_animated');
      body
        .classList
        .add('overflow');

      window.addEventListener('keydown', popupEscClose);
      document.addEventListener('click', popupClickClose);

      if (popup == checkIn) {
        popupSignLink.addEventListener('click', checkInToSignIn);
        checkInEmailBtn.addEventListener('click', popupItems_0_1);
        checkInPhoneBtn.addEventListener('click', popupItems_0_2);
        popupBackBtn.addEventListener('click', popupItems_3_2);

      }

      if (popup == signIn) {
        popupRegLink.addEventListener('click', SignInTocheckIn);
        forgotPassLink.addEventListener('click', popupItems_0_1);
        bethinkedPassLink.addEventListener('click', popupItems_1_0);
      }

      if (popup == popupCity) {
        PopupCityInput.addEventListener('focus', openCities);
        document.addEventListener('click', chooseCity);
      }
    }
    openLink.addEventListener('click', openLinkListener);
  }

  popupShow(checkIn, regLink);
  popupShow(signIn, signLink);
  popupShow(popupCity, cityLink);
  popupShow(popupCity, cityLink2);

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
    var advantagesItems = advantages.querySelectorAll(".advantages__description-wrapper"),
      advantagesNumbers = advantages.querySelectorAll(".advantages__number"),
      advantagesPre = advantages.querySelectorAll(".advantages__number-pre-in"),
      advantagesPast = advantages.querySelectorAll(".advantages__number-past-in");

    for (var i = 0; i < advantagesItems.length; i += 1) {
      advantagesItems[i].style.transform = "translate3d(0,100px,0)";
      advantagesItems[i].style.opacity = "0";
    }

    document.addEventListener("DOMContentLoaded", scrolling, false);
    window.addEventListener("scroll", throttleScroll, false);

    var animate = function (i) {
      advantagesItems[i].style.animation = "toUp 1s forwards";
      advantagesNumbers[i].style.animation = "rubberBand 1s forwards";
      advantagesPast[i].style.transform = 'scaleY(1)';
    };

    var scrolling = function (e) {
      if (isFullyVisible(advantagesPre[0])) {
        advantagesPre[0].style.transform = 'scaleY(1)';
        setTimeout(function () {
          advantagesNumbers[0].style.animation = "rubberBand 1s forwards";
          advantagesItems[0].style.animation = "toUp 0.3s forwards";
          setTimeout(function () {
            advantagesPast[0].style.transform = 'scaleY(1)';
            setTimeout(function () {
              advantagesPre[1].style.transform = 'scaleY(1)';
              setTimeout(function () {
                advantagesNumbers[1].style.animation = "rubberBand 1s forwards";
                advantagesItems[1].style.animation = "toUp 0.3s forwards";
                setTimeout(function () {
                  advantagesPast[1].style.transform = 'scaleY(1)';
                  setTimeout(function () {
                    advantagesPre[2].style.transform = 'scaleY(1)';
                    setTimeout(function () {
                      advantagesNumbers[2].style.animation = "rubberBand 1s forwards";
                      advantagesItems[2].style.animation = "toUp 0.3s forwards";
                    }, 300);
                  }, 300);
                }, 300);
              }, 300);
            }, 300);
          }, 300);
        }, 500);
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

  //Работа с поисковой строкой
  var inputS = document.querySelector('.main-index__search-input_services'),
    inputC = document.querySelector('.main-index__search-input_city'),
    inputWrapper = document.querySelector('.main-index__search-wrapper'),
    contextHistory = document.querySelector('.main-index__search-context_services-and-history'),
    contextLocation = document.querySelector('.main-index__search-context_location-and-history'),

    inputPopupS = document.querySelector('.popup-search__input_services'),
    inputPopupC = document.querySelector('.popup-search__input_city'),
    contextHistoryPopup = document.querySelector('.popup-search__context_services-and-history'),
    contextLocationPopup = document.querySelector('.popup-search__context_location-and-history');

  function shadowToBorder() {
    inputWrapper.style.boxShadow = "none";
    inputWrapper.style.borderColor = "#e7eaec";
  }
  function BorderToShadow() {
    inputWrapper.style.boxShadow = "";
    inputWrapper.style.borderColor = "";
  }

  function chooseItem(searchInput, contextList) {
    contextList.style.display = "block";
    var lastSearch = contextList.querySelector('.search-context__last'),
      SearchBox = contextList.querySelector('.search-context__search'),
      ClearSvg = searchInput.nextElementSibling;

    function changeSearchBox() {
      SearchBox.style.display = "block";
      lastSearch.style.display = "none";
    }

    searchInput.addEventListener('input', changeSearchBox);

    function pushValue(event) {
      var clickedElement = event.target;
      event.preventDefault();
      if (clickedElement.classList.contains('search-context__item')) {
        if (clickedElement.classList.contains('search-context__item_doctor')) {
          var doctorName = clickedElement
            .querySelector('.search-context__doctor-name')
            .textContent;
          var doctorKind = clickedElement
            .querySelector('.search-context__doctor-kind')
            .textContent;
          searchInput.value = doctorName + ' - ' + doctorKind;
        } else {
          searchInput.value = clickedElement.textContent;
        }
        contextList.removeEventListener('click', pushValue);
      }
    }
    contextList.addEventListener('click', pushValue);

    function closeList(event) {
      if (event.target != searchInput && event.target != ClearSvg) {
        if (event.target != inputC && event.target != inputS) {
          BorderToShadow();
        }
        searchInput.removeEventListener('input', changeSearchBox);
        contextList.removeEventListener('click', pushValue);
        document.removeEventListener('click', closeList);
        contextList.style.display = "";
        SearchBox.style.display = "";
        lastSearch.style.display = "";
      }
    }
    document.addEventListener('click', closeList);
  }

  if (inputS) {
    inputS.onclick = function () {
      shadowToBorder();
      chooseItem(inputS, contextHistory);
    };
  }

  if (inputC) {
    inputC.onclick = function () {
      shadowToBorder();
      chooseItem(inputC, contextLocation);
    };
  }

  inputPopupS.onclick = function () {
    chooseItem(inputPopupS, contextHistoryPopup);
  };

  inputPopupC.onclick = function () {
    chooseItem(inputPopupC, contextLocationPopup);
  };

  function clearInput(event) {
    var clickedElement = event.target,
      previosEl = clickedElement.previousElementSibling;
    while (previosEl.tagName != 'INPUT') {
      previosEl = previosEl.previousElementSibling;
    }
    previosEl.value = "";
  }

  var clearInputBtns = document.querySelectorAll('.clear-svg');
  for (var j = 0; j < clearInputBtns.length; j += 1) {
    clearInputBtns[j].addEventListener('click', clearInput);
  }

  function showPass(event) {
    var clickedElement = event.target,
      previosEl = clickedElement.previousElementSibling;
    while (previosEl.tagName != 'INPUT') {
      previosEl = previosEl.previousElementSibling;
    }
    if (previosEl.type == "password") {
      previosEl.setAttribute('type', 'text');
    } else {
      previosEl.setAttribute('type', 'password');
    }
  }

  var passwBtns = document.querySelectorAll('.password-svg');
  for (var l = 0; l < passwBtns.length; l += 1) {
    passwBtns[l].addEventListener('click', showPass);
  }

  // Открыть поиск
  var openCtrl = document.querySelector('.main-nav__search-link'),
    openCtrl2 = document.querySelector('.main-index__search-input-trick'),
    closeCtrl = document.querySelector('.popup-search__close-btn'),
    closeCtrl2 = document.querySelector('.close-search-btn'),
    searchContainer = document.querySelector('.popup-search'),
    pageShadow1 = document.querySelector('.page-shadow1'),
    pageShadow2 = document.querySelector('.page-shadow2');

  function initEvents() {
    openCtrl.addEventListener('click', openSearch);
    if (openCtrl2) {
      openCtrl2.addEventListener('click', openSearch);
    }
    closeCtrl.addEventListener('click', closeSearch);
    closeCtrl2.addEventListener('click', closeSearch);
    document.addEventListener('keyup', function (ev) {
      // escape key.
      if (ev.keyCode == 27) {
        closeSearch();
      }
    });
  }

  function openSearch() {
    mainNav.style.position = 'absolute';
    window.removeEventListener("scroll", scrollnav, false);
    popupOverlay
      .classList
      .add('popup-overlay_showed-mobile');
    pageContainer
      .classList
      .add('overflow-mobile');
    pageContainer
      .classList
      .add('page-move');
    pageWrapper
      .classList
      .add('add-perspective');
    pageShadow1
      .classList
      .add('shadow1-change');
    pageShadow2
      .classList
      .add('shadow2-change');
    closeCtrl2
      .classList
      .add('scale-tablet');

    searchContainer
      .classList
      .add('search-open');
    searchContainer.scrollIntoView(false);
  }

  function closeSearch() {
    popupOverlay
      .classList
      .remove('popup-overlay_showed-mobile');
    pageContainer
      .classList
      .remove('overflow-mobile');
    pageContainer
      .classList
      .remove('page-move');
    pageShadow1
      .classList
      .remove('shadow1-change');
    pageShadow2
      .classList
      .remove('shadow2-change');
    closeCtrl2
      .classList
      .remove('scale-tablet');
    pageWrapper
      .classList
      .remove('add-perspective');

    searchContainer
      .classList
      .remove('search-open');

    if (window.matchMedia("(min-width: 768px)").matches) {
      setTimeout(function () {
        if ($(window).scrollTop() >= 350) {
          mainNav.style.position = 'fixed';
          mainNav.style.transform = "";
          mainNav.style.animation = "animateMenu 0.5s forwards";
        }
      }, 1100);
    } else {
      mainNav.style.position = 'fixed';
    }
    setTimeout(function () {
      window.addEventListener("scroll", scrollnav, false);
    }, 1200);
  }

  initEvents();

  //custom scroll

  var scrolSet = {
    prefix: 'custom-scroll_',

    /* vertical */
    barMinHeight: 10,
    offsetTop: 0,
    offsetBottom: 0,
    /* will be added to offsetBottom in case of horizontal scroll */
    trackWidth: 10,

    /* horizontal */
    barMinWidth: 10,
    offsetLeft: 0,
    offsetRight: 0,
    /* will be added to offsetRight in case of vertical scroll */
    trackHeight: 10,

    /* each bar will have custom-scroll_bar-x or y class */
    barHtml: '<div />',

    /* both vertical or horizontal bar can be disabled */
    vertical: true,
    horizontal: false
  };

  var scrolSet2 = {
    prefix: 'custom-scroll-2_',

    /* vertical */
    barMinHeight: 10,
    offsetTop: 0,
    offsetBottom: 0,
    /* will be added to offsetBottom in case of horizontal scroll */
    trackWidth: 10,

    /* horizontal */
    barMinWidth: 10,
    offsetLeft: 0,
    offsetRight: 0,
    /* will be added to offsetRight in case of vertical scroll */
    trackHeight: 10,

    /* each bar will have custom-scroll_bar-x or y class */
    barHtml: '<div />',

    /* both vertical or horizontal bar can be disabled */
    vertical: true,
    horizontal: false
  };

  $('#scroll-1').customScroll(scrolSet);
  $('#scroll-2').customScroll(scrolSet);
  $('#scroll-3').customScroll(scrolSet2);
  $('#scroll-4').customScroll(scrolSet2);
  $('#scroll-5').customScroll(scrolSet2);

  //Поисковые страницы закрытие выпадающео меню
  function filtersFunc(event) {
    var i;
    if ((!cardSorting.contains(event.target) || event.target.classList.contains('card-sorting__variant')) && cardSortingCheck.checked == true) {
      cardSortingCheck.checked = '';
    }
    if (mainSearchFiltersToggle.contains(event.target)) {
      searchFilters
        .classList
        .add('visible-block');
      body
        .classList
        .add('overflow-no-widescreen');
    }
    if (filtersClose.contains(event.target)) {
      searchFilters
        .classList
        .remove('visible-block');
      body
        .classList
        .remove('overflow-no-widescreen');

        for (i = 0; i < searchFiltersForms.length; i += 1) {
          searchFiltersForms[i].classList.remove('visible-block');
        }
    }

    for (i = 0; i < searchFiltersAll.length; i += 1) {
      if (searchFiltersAll[i].contains(event.target)) {
        searchFiltersForms[i].classList.add('visible-block');
      }
    }

    for (i = 0; i < searchFiltersFormsCancel.length; i += 1) {
      if (searchFiltersFormsCancel[i].contains(event.target)) {
        searchFiltersForms[i].classList.remove('visible-block');
      }
    }
  }

  if (mainSearch) {
    var cardSortingCheck = document.querySelector('.card-sorting__check'),
      cardSorting = document.querySelector('.card-sorting'),
      mainSearchFiltersToggle = document.querySelector('.main-search__filters-toggle'),
      searchFilters = document.querySelector('.search-filters'),
      filtersClose = document.querySelector('.search-filters__close-btn'),
      searchFiltersAll = document.querySelectorAll('.search-filters__filter'),
      searchFiltersForms = document.querySelectorAll('.search-filters__form'),
      searchFiltersFormsCancel = document.querySelectorAll('.search-filters__form-cancel');

    document.addEventListener('click', filtersFunc);
  }

  //nouislider
  if (document.querySelector('.price-block')) {

    var range = document.getElementById('filter-range'),
      inputMin = document.getElementById('filter-price-min'),
      inputMax = document.getElementById('filter-price-max'),
      inputs = [
        inputMin, inputMax
      ],
      left = parseInt(range.dataset.left),
      right = parseInt(range.dataset.right),
      min = parseInt(range.dataset.min),
      max = parseInt(range.dataset.max);

    inputMin.oninput = function () {
      inputMin.style.width = ((inputMin.value.length) * 8) + 'px';
    };

    inputMax.oninput = function () {
      inputMax.style.width = ((inputMax.value.length) * 8) + 'px';
    };

    noUiSlider.create(range, {
      start: [
        left, right
      ],
      connect: true,
      step: 10,
      range: {
        'min': min,
        'max': max
      },
      format: wNumb({decimals: 0})
    });

    range
      .noUiSlider
      .on('update', function (values, handle) {
        inputs[handle].value = values[handle];
        inputMin.style.width = ((inputMin.value.length) * 8) + 'px';
        inputMax.style.width = ((inputMax.value.length) * 8) + 'px';
      });

    var setSliderHandle = function (i, value) {
      var r = [null, null];
      r[i] = value;
      range
        .noUiSlider
        .set(r);
    };

    // Listen to keydown events on the input field.
    inputs.forEach(function (input, handle) {

      input
        .addEventListener('change', function () {
          setSliderHandle(handle, this.value);
        });

      input.addEventListener('keydown', function (e) {

        var values = range
          .noUiSlider
          .get();
        var value = Number(values[handle]);

        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
        var steps = range
          .noUiSlider
          .steps();

        // [down, up]
        var step = steps[handle];

        var position;

        // 13 is enter, 38 is key up, 40 is key down.
        switch (e.which) {

          case 13:
            setSliderHandle(handle, this.value);
            e.preventDefault();
            break;

          case 38:

            // Get step to go increase slider value (up)
            position = step[1];

            // false = no step is set
            if (position === false) {
              position = 1;
            }

            // null = edge of slider
            if (position !== null) {
              setSliderHandle(handle, value + position);
            }

            break;

          case 40:

            position = step[0];

            if (position === false) {
              position = 1;
            }

            if (position !== null) {
              setSliderHandle(handle, value - position);
            }
            break;
        }
      });
    });

    var rangeWidth = range.clientWidth;

    var bar = $('.bar');

    $.fn.peity.defaults.bar = {
      delimiter: ",",
      fill: ["#e6e6e6"],
      height: 40,
      max: null,
      min: 0,
      padding: 0.1,
      width: rangeWidth
    };

    bar.peity("bar");

    $(window).resize(function () {
     bar.peity("bar", {width: 0});
     rangeWidth = range.clientWidth;
     bar.peity("bar", {width: rangeWidth});
    });
  }
})();

// dotdotdot - обрезание многострочного текста

$(document).ready(function () {
  if (document.querySelector(".cutted-text")) {
    $(".cutted-text").dotdotdot({

      ellipsis: "\u2026 ",
      /* The text to add as ellipsis. */

      truncate: "word",
      /* How to truncate the text: By "node", "word" or "letter". */

      keep: null,
      /* jQuery-selector for elements to keep after the ellipsis. */

      watch: "window",
      /* Whether to update the ellipsis:
         true: Monitors the wrapper width and height.
         "window": Monitors the window width and height.
      */

      tolerance: 0
      /* Deviation for the measured wrapper height. */
    });
  }
});