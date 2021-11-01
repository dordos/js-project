$(function () {
  let audioNumber = 1;
  let count = 0;

  const imgSerial = document.querySelectorAll('.scencont');
  $('.playMotionBtn').on(clickEvent, function () {
    const audioMotion = new Audio();
    $(this).hide();
    $('.stopMotionBtn').show();
    imgSerial.forEach((item) => {
      item.style.opacity = '0';
    });
    startAudio();

    function startAudio() {
      if (count <= 7) {
        audioMotion.src = `media/mp3/page120/120_0${audioNumber}.mp3`;
        audioMotion.play();
        imgSerial[count].style.opacity = '1';
      }

    }
    audioMotion.addEventListener('ended', function () {
      ++audioNumber;
      count += 1;
      startAudio();
    });
    audioMotion.addEventListener('playing', function () {
      $(
        '.stopMotionBtn, .gotosubBtn, .playBtn, .talkBtn, .popupOpen1, .popupOpen2, .videoBtn'
      ).on(clickEvent, function () {
        $('.stopMotionBtn').hide();
        $('.playMotionBtn').show();
        audioMotion.pause();
        imgSerial.forEach((item) => {
          item.style.opacity = 1;
        });
        count = 0;
        audioNumber = 1;
      });
    });
  });
});
