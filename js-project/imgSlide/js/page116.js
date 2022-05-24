$(function () {
  $('.videoBtn, .popupOpen1, .arrowLeft, .arrowRight, .videoBtn, .talkBtn').on(
    clickEvent,
    function () {
      $('#aniVideo').get(0).pause();
      $('#aniVideo').get(0).currentTime = 0;
      $('.convideoBox').hide();
      $('.playBtn').show();
    }
  );
});
