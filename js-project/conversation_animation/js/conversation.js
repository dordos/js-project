window.addEventListener('load', () => {
  const talkBtn = document.querySelector('.anitalkBtn');
  const wrap = document.querySelector('#wrap');
  const selectImgs = Array.prototype.map.call(
    document.querySelectorAll('.selectImg'),
    (el) => el
  );
  // const selectAudio = Array.from(document.querySelectorAll('audio'));

  //오디오 영상 갯수
  // const selectAudio = [
  //   //   new Audio('./media/mp3/page028/s01_1.mp3'),
  //     new Audio('./media/mp3/page028/test1.mp3'),
  //     new Audio('./media/mp3/page028/test2.mp3'),
  //     new Audio('./media/mp3/page028/test3.mp3'),
  //   ];

  // const targetAudio = selectAudio.map((item) => item);
  const targetAudio = Array.from(document.querySelectorAll('audio'));

  console.log(targetAudio);
  const init = () => {
    let playCount = 0;
    targetAudio.forEach((item) => {
      item.pause();
      item.currentTime = 0;
    });
    selectImgs.forEach((item) => {
      item.style.display = 'none';
    });
    animationStart(playCount);
  };

  const animationStart = (playCount) => {
    if (!targetAudio[playCount]) {
      talkBtn.classList.remove('sMotion');
      return;
    }

    targetAudio[playCount].play();
    selectImgs[playCount].style.display = 'block';
    targetAudio[playCount].addEventListener('ended', () => {
      selectImgs[playCount].style.display = 'none';

      animationCountAdd(playCount);
    });
    targetAudio[playCount].addEventListener('playing', (e) => {
      wrap.addEventListener('click', animationStop);
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
        item.pause();
        item.currentTime = 0;
        talkBtn.classList.remove('sMotion');
      });
      selectImgs.forEach((item) => {
        item.style.display = 'none';
      });
    }
  };

  talkBtn.addEventListener('click', init);
});
