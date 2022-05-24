$(function () {
  let audio = new Audio();
  $('.talkBtn').each(function (i) {
    let _this = $(this);
    audio.src = 'media/mp3/' + $(_this).data('audio');
    $(this).on(clickEvent, function () {
      $(this).siblings('.gifimg').show();
    });
    audio.addEventListener('playing', function () {
      $(
        '.videoBtn, .anitalkBtn, .exviewBtn, .cleanupBtn, .learningBtn, .utilizeBtn, .gotosubBtn, .gotothinkBtn, .popupOpen1, .popupOpen2, .studyBtn, .addBtn, .clickBtn, .supreiBtn, .goTolabBtn,.drawBtn, .arrowLeft, .arrowRight, .playBtn'
      ).one(clickEvent, function () {
        $('.talkBtn').eq(i).siblings('.gifimg').hide();
      });
    });
    audio.addEventListener('ended', function () {
      $('.talkBtn').eq(i).siblings('.gifimg').hide();
    });
  });
  $('#gifImgSound1').on('click', function () {
    const stopInterval = setInterval(function () {
      if (!$('#gifImgSound1').hasClass('sMotion')) {
        $('.offMotion1 .gifimg').css('display', '');
        clearInterval(stopInterval);
      }
    }, 200);
  });
  $('#gifImgSound2').on('click', function () {
    const stopInterval2 = setInterval(function () {
      if (!$('#gifImgSound2').hasClass('sMotion')) {
        $('.offMotion2 .gifimg').css('display', '');
        clearInterval(stopInterval2);
      }
    }, 200);
  });
});
