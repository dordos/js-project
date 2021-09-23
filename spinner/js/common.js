var console = window.console || {
  log: function () {},
};

var isIPad = navigator.userAgent.match(/iPad/i) != null;

var isMobile;
var isAndroid;
var downEvent, moveEvent, upEvent, clickEvent;

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  isMobile = true;

  downEvent = 'touchstart';
  moveEvent = 'touchmove';
  upEvent = 'touchend';
  clickEvent = 'click';
} else {
  isMobile = false;

  downEvent = 'mousedown';
  moveEvent = 'mousemove';
  upEvent = 'mouseup';
  clickEvent = 'click';
}

if (/Android/i.test(navigator.userAgent)) {
  isAndroid = true;
}

var zoom = 1;
if (parent.ZOOMVALUE == undefined) {
  parent.ZOOMVALUE = 1;
}

function get_scale() {
  if (parent.ZOOMVALUE) {
    zoom = parent.ZOOMVALUE;
  }
}

$.fn.extend({
  animateCss: function (animationName, end_func) {
    var animationEnd =
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var _cb = end_func;
    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);
      if (_cb) {
        _cb();
        _cb = null;
      }
    });
    return this;
  },
});

//   말풍선 사운드 제어  ========================================================
var audio = new Audio();
var curImg;
var curIndex;
var arr = [];

$(function () {
  $('.imgclickWrap').each(function (idx) {
    var _this = $(this);
    $(this)
      .find('.clickBtn')
      .on('click', function () {
        $(this).hide();
        $(_this)
          .find('.imgWrap')
          .each(function (i) {
            if (!$(_this).find('.imgWrap').eq(i).hasClass('opacity')) {
              var row = $(this);
              setTimeout(function () {
                row.addClass('opacity');
              }, 800 * i);
            }
          });
      });
  }); //clickBtn click

  $('.normal .tabTitle li').on(clickEvent, function () {
    var idx = $(this).index();
    $('.normal .tabTitle li').removeClass('selected');
    $('.normal .tabTitle li').eq(idx).addClass('selected');
    $('.normal .tabContent > div').hide();
    $('.normal .tabContent > div').eq(idx).show();
  }); // 탭 기능

  $(function () {
    var audio = new Audio();
    audio.src = 'media/effcet/click_2.mp3';

    $('.clickBtn').on(clickEvent, function () {
      audio.load();
      audio.play();
    });
  }); //클릭 버튼 소리

  $(function () {
    var audio = new Audio();
    audio.src = 'media/effcet/correct.mp3';

    $(".checkWrapperBox input[type='checkbox'] + label").on(
      clickEvent,
      function () {
        $(this).toggleClass('on').animateCss('jello');
        audio.load();
        audio.play();
      }
    );
  }); //셀프체크 애니메이션

  $('.safety .checkBox').on(clickEvent, function () {
    $(this).toggleClass('click');
  }); //잠깐 안전 클릭 했을 때 체크 표시

  $('.safety .checkBox').on(clickEvent, function () {
    var check = true;
    $('.safety .checkBox').each(function () {
      if (!$(this).hasClass('click')) check = false;
    });
    if ($('.safety .checkBox').length == $('.safety .checkBox.click').length) {
      $('.safety .safe').addClass('click');
    } else {
      $('.safety .safe').removeClass('click');
    }

    // if (check) $('.safety .safe').addClass('click');
  }); //잠깐 안전 클릭 했을 때 이미지 바뀌게

  $('.popupOpen1').on(clickEvent, function () {
    $('.miniPopup').removeClass('popupAni');
    $('.miniPopup').removeClass('popupAniHide');
    $('.openPopup1').addClass('popupAni');
  });
  $('.popupOpen2').on(clickEvent, function () {
    $('.miniPopup').removeClass('popupAni');
    $('.miniPopup').removeClass('popupAniHide');
    $('.openPopup2').addClass('popupAni');
  });
  $('.popupOpen3').on(clickEvent, function () {
    $('.miniPopup').removeClass('popupAni');
    $('.miniPopup').removeClass('popupAniHide');
    $('.openPopup3').addClass('popupAni');
  });

  $('.popupOpen4').on(clickEvent, function () {
    $('.miniPopup').removeClass('popupAni');
    $('.miniPopup').removeClass('popupAniHide');
    $('.openPopup4').addClass('popupAni');
  });

  $('.popupOpen5').on(clickEvent, function () {
    $('.miniPopup').removeClass('popupAni');
    $('.miniPopup').removeClass('popupAniHide');
    $('.openPopup5').addClass('popupAni');
  });
  //미니 팝업 클릭 했을 때 나타나기

  $('.glossaryBtn').on('click', function () {
    $('.glossary').find('.wordList ul li').removeClass('ON');
    $('.glossary').find('.wordList ul li').eq(0).addClass('ON');

    $('.glossary').find('.rightCont').hide();
    $('.glossary').find('.rightCont').eq(0).show();
  }); // 용어 사전

  $('.gotosubBtn').on(clickEvent, function () {
    if ($('.miniPopup').hasClass('popupAni')) {
      $('.miniPopup').removeClass('popupAni');
      $('.miniPopup').addClass('popupAniHide');
    }
  });

  $('.supreiBtn').on(clickEvent, function () {
    $('.miniPopup').removeClass('popupAni');
    $('.miniPopup').removeClass('popupAniHide');
    $('.supreiPopup').addClass('popupAni');
  });

  $('.bigPopOpen').on(clickEvent, function () {
    $('.bigPopup').not('.subPop').removeClass('popupAni');
    $('.bigPopup').not('.subPop').removeClass('popupAniHide');
    $('.bigPopup').not('.subPop').addClass('popupAni');
  }); //빅 팝업 클릭했을 때

  $('.bigPopOpen2').on(clickEvent, function () {
    if ($('.miniPopup').hasClass('popupAni')) {
      $('.miniPopup').removeClass('popupAni');
      $('.miniPopup').addClass('popupAniHide');
    }

    $('.bigPopup2').not('.subPop').removeClass('popupAni');
    $('.bigPopup2').not('.subPop').removeClass('popupAniHide');
    $('.bigPopup2').not('.subPop').addClass('popupAni');
  }); //빅 팝업 클릭했을 때

  $('.gotothinkBtn').on(clickEvent, function () {
    $('.thinkPop').removeClass('popupAni');
    $('.thinkPop').removeClass('popupAniHide');
    $('.thinkPop').addClass('popupAni');
  });

  $('.thisUnitBtn').on(clickEvent, function () {
    $('.thisUnitPop').removeClass('popupAni');
    $('.thisUnitPop').removeClass('popupAniHide');
    $('.thisUnitPop').addClass('popupAni');
  });

  $('.popupClose').on(clickEvent, function () {
    if ($(this).parents().hasClass('popupAni')) {
      $(this).parents('div.popupOverlay').addClass('popupAniHide');
      $(this).parents('div.popupOverlay').removeClass('popupAni');
    }
  }); //일반 팝업 클로즈 관련

  $('.miniPopup .popupClose').on(clickEvent, function () {
    if ($(this).parents().hasClass('popupAni')) {
      $(this).parents('div.miniPopup').addClass('popupAniHide');
      $(this).parents('div.miniPopup').removeClass('popupAni');
    }
  }); //미니 팝업 클로즈 관련

  $('.bigPopup .tabTitle li').on(clickEvent, function () {
    var idx = $(this).index();
    $('.bigPopup .tabTitle li')
      .not('.subPop .tabTitle li')
      .removeClass('selected');
    $('.bigPopup .tabTitle li')
      .not('.subPop .tabTitle li')
      .eq(idx)
      .addClass('selected');
    $('.bigPopup .tabContent > div').not('.subPop .tabContent > div').hide();
    $('.bigPopup .tabContent > div')
      .not('.subPop .tabContent > div')
      .eq(idx)
      .show();
  });

  $('.bigPopup2 .tabTitle li').on(clickEvent, function () {
    var idx = $(this).index();
    $('.bigPopup2 .tabTitle li')
      .not('.subPop .tabTitle li')
      .removeClass('selected');
    $('.bigPopup2 .tabTitle li')
      .not('.subPop .tabTitle li')
      .eq(idx)
      .addClass('selected');
    $('.bigPopup2 .tabContent > div').not('.subPop .tabContent > div').hide();
    $('.bigPopup2 .tabContent > div')
      .not('.subPop .tabContent > div')
      .eq(idx)
      .show();
  }); // 실험관찰 말고 나머지 팝업의 탭 기능

  //말풍선 클릭 ======================================================
  $('.soundWrap > .char').each(function (index, item) {
    arr[index] = $(this).find('img').attr('src');
  });

  $('.talkBtn').on(clickEvent, function () {
    resetChar();
    $(this).addClass('sMotion');
    audio.src = 'media/mp3/' + $(this).data('audio');
    audio.load();
    audio.play();
    curIndex = $(this).index();

    curImg = $(this).siblings('.char').find('img').attr('src');
    curIndex = $('.talkBtn').index(this);
    if (curImg != undefined) {
      $(this)
        .siblings('.char')
        .find('img')
        .attr('src', getFilename(curImg) + '.gif');
    }
  });

  audio.addEventListener('ended', function () {
    $('.char').eq(curIndex).find('img').attr('src', curImg);
    $('.sMotion').removeClass('sMotion');
  });

  audio.addEventListener('playing', function () {
    $(
      '.videoBtn, .anitalkBtn, .exviewBtn, .cleanupBtn, .learningBtn, .utilizeBtn, .gotosubBtn, .gotothinkBtn, .popupOpen1, .popupOpen2, .studyBtn, .addBtn, .clickBtn, .supreiBtn, .goTolabBtn,.drawBtn, .arrowLeft, .arrowRight, .playBtn'
    ).one(clickEvent, function () {
      resetChar();
    });
  });

  // 음성 나올 때 버튼 누르면 꺼지게

  function resetChar() {
    audio.pause();
    audio.currentTime = 0;
    if ($('.talkBtn').hasClass('sMotion')) $('.talkBtn').removeClass('sMotion');

    $('.soundWrap > .char').each(function (index, item) {
      $(item).find('img').attr('src', arr[index]);
    });
  }

  function getFilename(filename) {
    var _fileLen = filename.length;
    var _lastDot = filename.lastIndexOf('.');
    var _fileExt = filename.substring(0, _lastDot);
    return _fileExt;
  }

  //  팝업 o체크
  $('.checkText').on(clickEvent, function () {
    if ($(this).hasClass('borderD')) {
      $(this).removeClass('borderD');
    } else {
      $(this).siblings().removeClass('borderD');
      $(this).addClass('borderD');
    }
  });
  $('.checkText2').on(clickEvent, function () {
    if ($(this).hasClass('borderD2')) {
      $(this).removeClass('borderD2');
    } else {
      $(this).siblings().removeClass('borderD2');
      $(this).addClass('borderD2');
    }
  });

  var video = $('#aniVideo').get(0);
  $('.playBtn').on(clickEvent, function () {
    $(this).hide();
    $('.convideoBox').show();
    video.play();
  });

  $('.videoClose').on(clickEvent, function () {
    $('.scriptBox').hide();
    $(this).parent('.convideoBox').hide();
    $('.playBtn').show();
    video.pause();
    video.currentTime = 0;
  });
  // 컨텐츠 속 비디오 재생

  $('.scriptBtn').on(clickEvent, function () {
    $('.scriptBox').toggle();
  });

  $('.glossary .wordList ul li').on(clickEvent, function () {
    var idx = $(this).index();
    $('.glossary .wordList ul li').removeClass('ON');
    $(this).addClass('ON');
    //추가 == ++
    if ($(this).hasClass('plusNo') == true) {
      $('.glossary .miniPopT').addClass('afterNo');
    } else {
      $('.glossary .miniPopT').removeClass('afterNo');
    }

    $('.rightCont').hide();
    $('.rightCont').eq(idx).show();
  });

  $('.listBox .checkText').on(clickEvent, function () {
    var b = $(this).find('p').attr('class');
    if (b === 'redCheck') {
      $(this).find('p').remove();
      $(this).closest('.listBox').find('img').addClass('off').removeClass('on');
    } else {
      $(this).append("<p class='redCheck'></p>");
      $(this).closest('.listBox').find('img').addClass('on').removeClass('off');
    }
  });
});
