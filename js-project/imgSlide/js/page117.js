$(function () {
  const aniVideo = document.querySelector('#aniVideo');
  const aniVideo2 = document.querySelector('#aniVideo2');

  $('.videoPlayBtn').on(clickEvent, function () {
    $(this).hide();
    $(this).siblings('.convideoBox').show();
    var video = $(this).siblings('.convideoBox').find('video').get(0);
    video.play();
  });

  $('.videoClose1, .videoClose2, .videoPlayBtn1, .videoPlayBtn2').on(
    clickEvent,
    function () {
      if (this.classList.contains('videoPlayBtn1')) {
        $('.videoPlayBtn2').show();
        $('.convideoBox2').hide();
        aniVideo2.pause();
        aniVideo2.currentTime = 0;
      }
      if (this.classList.contains('videoClose1')) {
        $('.videoPlayBtn1').show();
      }

      if (this.classList.contains('videoPlayBtn2')) {
        $('.videoPlayBtn1').show();
        $('.convideoBox1').hide();
        aniVideo.pause();
        aniVideo.currentTime = 0;
      }
      if (this.classList.contains('videoClose2')) {
        $('.videoPlayBtn2').show();
        aniVideo2.pause();
        aniVideo2.currentTime = 0;
      }
    }
  );

  $('.gotosubBtn, .talkBtn, .supreiBtn, .cleanupBtn, .studyBtn').on(
    clickEvent,
    function () {
      aniVideo.pause();
      aniVideo.currentTime = 0;
      aniVideo2.pause();
      aniVideo2.currentTime = 0;
      $('.convideoBox1').hide();
      $('.convideoBox2').hide();
      $('.videoPlayBtn1').show();
      $('.videoPlayBtn2').show();
    }
  );
});
