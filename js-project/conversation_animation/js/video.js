$(function () {
  var ios;
  if (
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) {
    ios = true;
  } else {
    ios = false;
  }

  var video = $('#video1').get(0);
  video.load();
  var playing = false;
  var endingTime;

  video.addEventListener('loadedmetadata', function () {
    endingTime = this.duration;
    autoEnd();
  });

  function autoEnd() {
    var eTime = endingTime;
    var eMin = pad(Math.floor(eTime / 60), 2);
    var eSec = pad(Math.floor(eTime % 60), 2);
    $('.timeCount')
      .children()
      .each(function (i) {
        switch (i) {
          /*총재생 분 */
          case 6:
            $(this).text(eMin.slice(0, -1));
            break;
          case 7:
            $(this).text(eMin.substr(1, 1));
            break;

          /*총재생 초 */
          case 9:
            $(this).text(eSec.slice(0, -1));
            break;
          case 10:
            $(this).text(eSec.substr(1, 1));
            break;
        }
      });
  } // 자동으로 종료 타임

  $('.videoBtn').on('click', function () {
    $('.videoBg').show();
  }); // 비디오 열기 버튼

  $('.videoPlay').on('click', function () {
    video.play();
    playing = true;
  }); // 영상 가운데 재생 버튼 클릭

  $('.play').on('click', function () {
    video.play();
    playing = true;
  }); // 하단 플레이 클릭
  $('.pause').on('click', function () {
    pauseVideo();
    playing = false;
  }); // 하단 일시정지 클릭

  $('.stop').on('click', function () {
    stopVideo();
  }); // 하단 정지 클릭

  function pauseVideo() {
    video.pause();
    $('.play').show();
    $('.videoPlay').show();
    $('.pause').hide();
  } // 비디오 퍼즈

  function stopVideo() {
    video.currentTime = 0;
    video.pause();
    $('.play').show();
    $('.videoPlay').show();
    $('.pause').hide();
    playing = false;

    video.load();
  } // 비디오 정지

  // 비디오 플레이
  function pad(n, width) {
    n = n + '';
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join('0') + n;
  }

  video.addEventListener('timeupdate', function () {
    var eTime = endingTime;
    var sTime = video.currentTime;
    var pTime = 0;
    onPlaying(sTime, eTime, pTime);
  }); // 비디오 플레이 중 이벤트

  video.addEventListener('pause', function () {
    pauseVideo();
  }); // 비디오 플레이 중 이벤트
  video.addEventListener('play', function () {
    $('.play').hide();
    $('.pause').show();
    $('.videoPlay').hide();
  }); // 비디오 플레이 중 이벤트

  video.addEventListener('ended', function () {
    if (playing) stopVideo();

    if (ios) $('#video1').get(0).webkitExitFullscreen();
  }); // 비디오 끝났을 때

  onPlaying = function (sTime, eTime, pTime) {
    if (sTime < 0) sTime = 0;
    $('.timebar').stop(true);
    $('.timebar').css('width', 3 + 97 * (sTime / eTime) + '%');
    if (pTime > 0) {
      $('.timebar')
        .stop(true)
        .animate(
          {
            width: 100 + '%',
          },
          pTime * 1000,
          'linear',
          function () {}
        );
    }
    var pMin = pad(Math.floor(sTime / 60), 2);
    var pSec = pad(Math.floor(sTime % 60), 2);
    $('.timeCount')
      .children()
      .each(function (i) {
        switch (i) {
          /*플레이 분 */
          case 0:
            $(this).text(pMin.slice(0, -1));
            break;
          case 1:
            $(this).text(pMin.substr(1, 1));
            break;

          /*플레이 초 */
          case 3:
            $(this).text(pSec.slice(0, -1));
            break;
          case 4:
            $(this).text(pSec.substr(1, 1));
            break;
        }
      });
  }; // 플레이 중

  $('.bar').on(downEvent, function (e) {
    if (!$(e.target).hasClass('timeControl')) {
      get_scale();
      var barWidth = Number($('.bar').css('width').replace('px', ''));

      var self = this;
      var x = isMobile ? e.touches[0].pageX : e.pageX;
      self.mouseX = x / zoom;
      self.parentOffset = $(this).offset();
      self.parentOffset.left = self.parentOffset.left / zoom;
      var tx = self.mouseX - self.parentOffset.left;
      var per = (tx / barWidth) * 100 * (97 / 100);
      $('.timebar').css('width', 3 + per + '%');
      video.currentTime = (endingTime / 100) * ((tx / barWidth) * 100);
    }
  }); // 하단 플레이 바 클릭

  $('.timeControl').on(downEvent, function (e) {
    get_scale();
    var mx = isMobile ? e.touches[0].pageX : e.pageX;
    var parentLeft =
      $('.control .bar').offset().left -
      $('.control').offset().left +
      $('.control').offset().left;
    var parentWidth = parseInt($('.control .bar').css('width')) / zoom;
    var thisPos = (mx / zoom - parentLeft / zoom) / zoom;
    $('.videoBg').addClass('userNone');
    video.pause();
    $(document).on(moveEvent, function (e) {
      mx = isMobile ? e.touches[0].pageX : e.pageX;
      thisPos = (mx / zoom - parentLeft / zoom) / zoom;

      if (thisPos > parentWidth) {
        thisPos = parentWidth;
      }
      if (thisPos < 0) {
        thisPos = 0;
      }

      var soundWidth = (thisPos / parentWidth) * 100 * (95 / 100);

      $('.timebar').css('width', 5 + soundWidth + '%');
      video.currentTime = (endingTime / 100) * ((thisPos / parentWidth) * 100);
    });
    $(document).on(upEvent, function () {
      $(document).off(moveEvent);
      $(document).off(upEvent);
      $('.videoBg').removeClass('userNone');
      if (playing) video.play();
    });
  }); // 타임 컨트롤 바

  $('.videoWrap .videoCloseBtn').on('click', function () {
    stopVideo();
    $('.videoBg').hide();
  }); // 팝업 오픈 클로즈

  $('.zoom').on('click', function () {
    var elem = document.getElementById('video1');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }); // 확대버튼

  $('.script').on('click', function () {
    $(this).hide();
    if ($(this).hasClass('scriptON')) {
      $('.scriptBox').show();
      $('.scriptOFF').show();
    } else if ($(this).hasClass('scriptOFF')) {
      $('.scriptBox').hide();
      $('.scriptON').show();
    }
  }); // 확대버튼

  $('.popupOpen').on('click', function () {
    stopVideo();
  }); // 팝업 오픈 눌렀을 때 비디오 정지
}); // end
