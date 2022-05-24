$(function () {
  const talkBtn = document.querySelector('.anitalkBtn');
  const wrap = document.querySelector('#wrap');
  const targetAudio = Array.from(document.querySelectorAll('audio'));

  //오디오 상태
  let stopAudio = false;

  //캔버스
  const canvas = Array.from(document.querySelectorAll('.imgCanvas')).map(
    (el) => el
  );

  //캔버스 화면 변환 이미지
  const spreadImg = new Image();
  spreadImg.src = './images/page028/clear.png';
  // 변환 위치, 속도, 상태
  let width = 0;
  let speed = 25;
  let flag = false;

  //캔버스 기본 이미지
  const backgroundImg = new Image();
  backgroundImg.src = './images/page028/28_pic01_g.png';

  const context = Array.from(canvas).map((item) => {
    item.style.backgroundSize = '100% 100%';
    return item.getContext('2d');
  });

  Array.from(context).map((item) => {
    item.globalCompositeOperation = 'source-over';
    item.drawImage(backgroundImg, 0, 0, 677, 573.5);
  });

  $(window).on('load', function () {
    resetCanvas();
  });

  function resetCanvas() {
    width = 0;
    // speed = 25;
    context[0].clearRect(0, 0, 677, 573.5);
    context[0].globalCompositeOperation = 'source-over';
    context[0].drawImage(backgroundImg, 0, 0, 677, 573.5);
  }
  const init = () => {
    let playCount = 0;
    targetAudio.forEach((item) => {
      item.pause();
      item.currentTime = 0;
    });
    animationStart(playCount);

    flag = true;
    stopAudio = true;
    cancelAnimationFrame(testAnimation);
    resetCanvas();

    diffusion(canvas[0]);
  };

  const animationStart = (playCount) => {
    if (!targetAudio[playCount]) {
      talkBtn.classList.remove('sMotion');
      return;
    }

    targetAudio[playCount].play();
    targetAudio[playCount].addEventListener('ended', () => {
      animationCountAdd(playCount);
      stopAudio = false;
    });
    targetAudio[playCount].addEventListener('playing', (e) => {
      wrap.addEventListener('click', animationStop);
      // talkBtn.addEventListener('click', resetCanvas);
    });
  };

  const animationCountAdd = (playCount) => {
    //영상이 다 돌았을때
    if (targetAudio.length <= playCount) {
      targetAudio.forEach((item) => {
        item.pause();
        item.currentTime = 0;
      });

      playCount = 0;
      return;
    }

    //영상 하나씩 증가
    if (targetAudio.length != playCount) {
      ++playCount;
      animationStart(playCount);
    }
  };

  const animationStop = (e) => {
    if (!e.target.classList.contains('anitalkBtn')) {
      targetAudio.forEach((item) => {
        console.log('1');
        item.pause();
        item.currentTime = 0;
        stopAudio = false;
        resetCanvas();
        talkBtn.classList.remove('sMotion');
      });
    }
  };
  let testAnimation;

  function diffusion(canvas) {
    if (flag) {
      flag = false;
      context[0].globalCompositeOperation = 'destination-out';
      window.requestAnimationFrame(draw);
      function draw() {
        // var eClient = isMobile ? e.touches[0].pageX : e.pageX;
        if (!stopAudio) {
          resetCanvas();
          return;
        }
        width += speed;
        var x = canvas.offsetWidth / 2;
        var y = canvas.offsetHeight / 2;

        context[0].drawImage(
          spreadImg,
          x - width / 2,
          y - width / 2,
          width,
          width
        );
        testAnimation = window.requestAnimationFrame(draw);
      }
    }
  }

  talkBtn.addEventListener('click', init);
});
