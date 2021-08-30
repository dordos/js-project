$(function () {
  const talkBtn = document.querySelector('.anitalkBtn');
  const targetAudio = Array.from(document.querySelectorAll('audio'));
  const stopBtn = document.querySelectorAll([
    '.videoBtn, .exviewBtn, .cleanupBtn, .learningBtn, .utilizeBtn, .gotosubBtn, .gotothinkBtn, .popupOpen1, .popupOpen2, .studyBtn, .addBtn, .clickBtn, .supreiBtn, .goTolabBtn,.drawBtn, .arrowLeft, .arrowRight',
  ]);

  let stopAudio = false; //오디오 상태
  let playCount = 0; // 영상 갯수
  let playAnimation = 0; // 애니메이션 프레임

  // 변환 위치, 속도, 상태
  let width = 0;
  let speed = 10;
  let flag = false;

  //캔버스
  const canvas = Array.from(document.querySelectorAll('.imgCanvas')).map(
    (el) => el
  );

  //캔버스 화면 변환 이미지
  const spreadImg = new Image();
  spreadImg.src = './images/page078/clear.png';

  const context = Array.from(canvas).map((item) => {
    item.style.backgroundSize = '100% 100%';
    return item.getContext('2d');
  });

  //캔버스 기본 이미지
  const backgroundImg = new Image();
  const backgroundImg2 = new Image();
  const backgroundImg3 = new Image();
  const backgroundImg4 = new Image();
  backgroundImg.src = './images/page078/78p_comic_03.png';
  backgroundImg2.src = './images/page078/78p_comic_04.png';
  backgroundImg3.src = './images/page078/78p_comic_05.png';
  backgroundImg4.src = './images/page078/78p_comic_06.png';

  function resetCanvas() {
    width = 0;
    speed = 10;
    context[0].clearRect(0, 0, 287, 262);
    context[0].globalCompositeOperation = 'source-over';
    context[0].drawImage(backgroundImg, 0, 0, 287, 262);

    context[1].clearRect(0, 0, 361, 269);
    context[1].globalCompositeOperation = 'source-over';
    context[1].drawImage(backgroundImg2, 0, 0, 361, 269);

    context[2].clearRect(0, 0, 332, 256);
    context[2].globalCompositeOperation = 'source-over';
    context[2].drawImage(backgroundImg3, 0, 0, 332, 256);

    context[3].clearRect(0, 0, 296, 260);
    context[3].globalCompositeOperation = 'source-over';
    context[3].drawImage(backgroundImg4, 0, 0, 296, 260);
  }

  $(window).on('load', function () {
    resetCanvas();
  });

  function diffusion(canvas, playCount) {
    if (flag) {
      if (canvas == undefined) return;
      flag = false;
      context[playCount].globalCompositeOperation = 'destination-out';
      window.requestAnimationFrame(draw);

      function draw() {
        width += speed;
        let x = canvas.offsetWidth / 2;
        let y = canvas.offsetHeight / 2;
        context[playCount].drawImage(
          spreadImg,
          x - width / 2,
          y - width / 2,
          width,
          width
        );
        playAnimation = window.requestAnimationFrame(draw);
      }
    }
  }

  class AnimationEffect {
    constructor() {}

    startAimation() {
      resetCanvas();
      targetAudio.forEach((item) => {
        item.pause();
        item.currentTime = 0;
        cancelAnimationFrame(playAnimation);
      });
      targetAudio[playCount].play();

      flag = true;
      stopAudio = true;
      diffusion(canvas[playCount], playCount);
    }

    stopAimiation() {
      resetCanvas();
    }
  }

  const start = new AnimationEffect();

  talkBtn.addEventListener('click', start.startAimation);
  stopBtn.forEach((item) => {
    item.addEventListener('click', start.stopAimiation);
  });
});
