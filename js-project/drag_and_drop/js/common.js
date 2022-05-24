var console = window.console || {
    log: function () {}
};

var isIPad = navigator.userAgent.match(/iPad/i) != null;

var isMobile;
var isAndroid;
var downEvent, moveEvent, upEvent, clickEvent;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;

    downEvent = "touchstart";
    moveEvent = "touchmove";
    upEvent = "touchend";
    clickEvent = "click";
} else {

    isMobile = false;

    downEvent = "mousedown";
    moveEvent = "mousemove";
    upEvent = "mouseup";
    clickEvent = "click"
}

if (/Android/i.test(navigator.userAgent)) {
    isAndroid = true;
}

var zoom = 1;
if( parent.ZOOMVALUE == undefined ) { parent.ZOOMVALUE = 1; }
function get_scale() {
    if( parent.ZOOMVALUE ) {
        zoom = parent.ZOOMVALUE;
    }
};

$.fn.extend({
    animateCss: function (animationName, end_func) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        var _cb = end_func;
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (_cb) {
                _cb();
                _cb = null;
            }
        });
        return this;
    }
});

//   말풍선 사운드 제어  ========================================================
var audio = new Audio();
var curImg;
var curIndex;
var arr = [];

$(function () {
    $('.clickBtn').on(clickEvent, function () {
        $(this).hide();
        $(this).siblings('.imgWrap').addClass('opacity')
    }); //클릭하면 나타나는 기능

    $(".normal .tabTitle li").on(clickEvent, function () {
        var idx = $(this).index();
        $(".normal .tabTitle li").removeClass("selected");
        $(".normal .tabTitle li").eq(idx).addClass("selected");
        $(".normal .tabContent > div").hide();
        $(".normal .tabContent > div").eq(idx).show();
    }) // 탭 기능

    $(".checkWrapperBox input[type='checkbox'] + label").on(clickEvent, function () {
        $(this).toggleClass('on').animateCss("jello");
    }); //셀프체크 애니메이션

    $('.safety .checkBox').on(clickEvent, function () {
        $(this).addClass('click');
    }); //잠깐 안전 클릭 했을 때 체크 표시

    $('.safety .checkBox').on(clickEvent,function(){
        var check = true;
        $('.safety .checkBox').each(function() {
            if(!$(this).hasClass('click')) check = false;
        });

        if( check ) $('.safety .safe').addClass('click');
    });//잠깐 안전 클릭 했을 때 이미지 바뀌게
      

    $('.popupOpen1').on(clickEvent, function () {
        $('.miniPopup').removeClass('popupAni');
        $('.miniPopup').removeClass('popupAniHide');
        $('.openPopup1').addClass('popupAni');
    });
    $('.popupOpen2').on(clickEvent, function () {
        $('.miniPopup').removeClass('popupAni');
        $('.miniPopup').removeClass('popupAniHide');
        $('.openPopup2').addClass('popupAni');
    }); //미니 팝업 클릭 했을 때 나타나기
    $('.miniPopup .popupClose').on(clickEvent, function () {
        $('.miniPopup').addClass('popupAniHide');
    }); //클로즈

    $('.gotosubBtn').on(clickEvent, function () {
       if ($('.miniPopup').hasClass('popupAni')) {
           $('.miniPopup').removeClass('popupAni');
           $('.miniPopup').addClass('popupAniHide');
       } 
   });
   $('.bigPopOpen').on(clickEvent, function () {
       if ($('.miniPopup').hasClass('popupAni')) {
           $('.miniPopup').removeClass('popupAni');
           $('.miniPopup').addClass('popupAniHide');
       } 
   });
   //다른 팝업 클릭 했을 때 미니 팝업 닫히게

    $('.bigPopOpen').on(clickEvent, function () {
       $('.bigPopup').not('.subPop').removeClass('popupAni');
       $('.bigPopup').not('.subPop').removeClass('popupAniHide');
       $('.bigPopup').not('.subPop').addClass('popupAni');
   });
   //빅 팝업 클릭했을 때
   $('.bigPopup .popupClose').on(clickEvent, function () {
       $('.bigPopup').not('.subPop').removeClass('popupAni');
       $('.bigPopup').not('.subPop').addClass('popupAniHide');
   }); //클로즈

   $(".bigPopup .tabTitle li").on(clickEvent, function () {
        var idx = $(this).index();
        $(".bigPopup .tabTitle li").not('.subPop .tabTitle li').removeClass("selected");
        $(".bigPopup .tabTitle li").not('.subPop .tabTitle li').eq(idx).addClass("selected");
        $(".bigPopup .tabContent > div").not('.subPop .tabContent > div').hide();
        $(".bigPopup .tabContent > div").not('.subPop .tabContent > div').eq(idx).show();
    }) // 실험관찰 말고 나머지 팝업의 탭 기능


    //말풍선 클릭 ======================================================
    $('.soundWrap > .char').each(function (index, item) {
        arr[index] = $(this).find("img").attr("src");

    });

    $('.talkBtn').on(clickEvent, function () {
        resetChar();
        audio.src = 'media/mp3/' + $(this).data("audio");
        audio.load();
        audio.play();
        curIndex = $(this).index();

        curImg = $(this).siblings(".char").find('img').attr("src");
        curIndex = $(".talkBtn").index(this);
        $(this).siblings(".char").find('img').attr("src", getFilename(curImg) + ".gif");
    });

    audio.addEventListener('ended', function () {
        $('.char').eq(curIndex).find("img").attr("src", curImg);
    });


    function resetChar() {
        audio.pause();
        audio.currentTime = 0;
        //for(i = 0; i < arr.length; i ++){
        //$('.char').eq(i).find("img").attr("src", arr[i]);
        //}
        $('.soundWrap > .char').each(function (index, item) {
            $(item).find("img").attr("src", arr[index]);
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

    var video = $("#aniVideo").get(0);
    $('.playBtn').on(clickEvent, function(){
      $(this).hide();
      $('.convideoBox').show();
      video.play();
    });
    
    $('.videoClose').on(clickEvent, function(){
      $('.convideoBox').hide();
      $('.playBtn').show();
      video.pause();
      video.currentTime = 0;
    });
    // 컨텐츠 속 비디오 재생
});
