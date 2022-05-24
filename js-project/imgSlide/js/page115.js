window.addEventListener('load', function () {
  const container = document.querySelector('#container');
  const dragWrap = document.querySelector('.scrollBtn');
  const inputNone = document.querySelectorAll('.userValue');
  let scrollimg = document.querySelector('.scrollimg img');
  const imageArray = [];

  for (let i = 0; i < 45; i++) {
    const image = document.createElement('img');
    if (i < 9) image.src = './images/page115/seq/se000'+ (i + 1) +'.png';
    else image.src = './images/page115/seq/se00'+ (i + 1) +'.png';
    image.className = 'switchingImage';
    image.setAttribute('data-index', i);
    imageArray.push(image);
    document.querySelector('.scrollimg').appendChild(image);

    if (i === 44) image.classList.add('show');
  }
  
  let logIndex = 0;
  const el = document.createElement('div');
  document.body.appendChild(el);
  el.style.position = 'absolute';
  el.style.top = `${logIndex * 30}px`;
  el.style.left = '0px';
  el.style.fontSize = '20px';
  el.style.color = 'tomato';
  function log(text) {
    el.innerHTML = text;
    // logIndex++;
  }

  const dropAudio1 = new Audio('media/mp3/page115/325_115_sound1.mp3');
  const dropAudio2 = new Audio('media/mp3/page115/325_115_sound2.mp3');
  const dropAudio3 = new Audio('media/mp3/page115/325_115_sound3.mp3');

  // dropAudio.preload = 'metadata';
  // dropAudio.load();
  inputNone.forEach((item) => {
    item.style.display = 'none';
  });
  const itemImg = {
    dom: '',
    itemX: '',
    itemY: '',
  };

  const itemState = {
    startX: '',
    startY: '',
  };

  function blockedViewerSlide(e) {
    e.stopPropagation();
  }

  // 웹뷰 드래그 취소
  function dragMoveStop() {
    container.addEventListener('mousemove', blockedViewerSlide);
    container.addEventListener('touchmove', blockedViewerSlide);
  }

  // 웹뷰 드래그 가능
  function dragMoveResume() {
    container.removeEventListener('mousemove', blockedViewerSlide);
    container.removeEventListener('touchmove', blockedViewerSlide);
  }

  const getEventPosition = (event) => {
    const eventTarget = isTouchEvent(event)
      ? event.changedTouches[0] || event.touches[0]
      : event;

    return {
      x: eventTarget.clientX,
      y: eventTarget.clientY,
    };
  };

  const isTouchEvent = (event) => {
    return event.type.indexOf('touch') > -1;
  };

  let count = 1;
  let soundNumber = 3;
  const dragStart = function (event) {
    container.classList.add('dragwrapStop');
    if ($('.talkBtnDrag').hasClass('sMotion')) {
      $('.talkBtnDrag').attr('src', 'images/btn/talk_btn.png');
      $('.talkBtnDrag').removeClass('sMotion');
      dropAudio1.pause();
      dropAudio1.currentTime = 0;
      dropAudio2.pause();
      dropAudio2.currentTime = 0;
      dropAudio3.pause();
      dropAudio3.currentTime = 0;
    }
    getEventPosition(event);
    // dropAudio1.preload = 'metadata';
    // dropAudio1.load();
    // dropAudio2.preload = 'metadata';
    // dropAudio2.load();
    // dropAudio3.preload = 'metadata';
    // dropAudio3.load();

    itemImg.dom = this;
    itemImg.itemX = this.offsetLeft;
    itemImg.itemY = this.offsetTop;

    itemState.startX = getEventPosition(event).x;
    // itemState.startY = getEventPosition(event).y;

    container.addEventListener('mousemove', dragMove);
    container.addEventListener('touchmove', dragMove);
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('touchend', dragEnd);
    dragMoveStop();

    $('body').css({
      'user-select': 'none',
      '-ms-user-select': 'none',
      '-moz-user-select': 'none',
      '-webkit-user-select': 'none',
    });
  };

  const dragMove = function (event) {
    const eventX = getEventPosition(event).x;
    const moveX = eventX - itemState.startX;
    let moveSlide = itemImg.itemX + moveX;
    const largeValue = 125; // 오른쪽 최고값
    const smallValue = -35; // 왼쪽 최저값
    const imageLength = 44; // 이미지 갯수

    const maxValue = largeValue - smallValue;
    
    if (moveSlide >= largeValue) moveSlide = largeValue;
    else if (moveSlide < smallValue) moveSlide = smallValue;
    
    const currentValue = (moveSlide - smallValue);
    const rate = currentValue / maxValue;

    const imageIndex = Math.floor(rate * imageLength);

    function resetImage() {
      imageArray.forEach((image) => {
        image.classList.remove('show');
      });
    }

    resetImage();
    imageArray[imageIndex].classList.add('show');

    if (imageIndex < 11) soundNumber = 3;
    else if (imageIndex < 30) soundNumber = 2;
    else soundNumber = 1;
// log(soundNumber)
    itemImg.dom.style.left = `${moveSlide}px`;
  };
  const dragEnd = function (event) {
    // itemImg.dom.style.pointerEvents = 'none';
    container.removeEventListener('mousemove', dragMove);
    container.removeEventListener('touchmove', dragMove);
    container.removeEventListener('mouseup', dragEnd);
    container.removeEventListener('touchend', dragEnd);

    // itemImg.dom.style.pointerEvents = 'auto';

    dragMoveResume();
    container.classList.remove('dragwrapStop');

    $('body').css({
      'user-select': '',
      '-ms-user-select': '',
      '-moz-user-select': '',
      '-webkit-user-select': '',
    });
  };

  // function dragReset() {
  //   dragWrap.forEach((item) => {
  //     item.style.left = '';
  //     item.style.top = '';
  //   });
  //   soundFile.forEach((item, index) => {
  //     dropAudio.src = soundFile[index];
  //     dropAudio.pause();
  //     dropAudio.currentTime = 0;
  //   });
  // }

  // resetBtn.addEventListener('click', dragReset);

  dragWrap.addEventListener('mousedown', dragStart);
  dragWrap.addEventListener('touchstart', dragStart);

  $('.talkBtnDrag').on('click', function () {
    dropAudio1.preload = 'metadata';
    dropAudio1.load();
    dropAudio2.preload = 'metadata';
    dropAudio2.load();
    dropAudio3.preload = 'metadata';
    dropAudio3.load();
    // log(soundNumber)
    if ($('.talkBtnDrag').attr('src') == 'images/btn/talk_btn.png') {
      $('.talkBtnDrag').addClass('sMotion');
      $('.talkBtnDrag').attr('src', 'images/btn/butt_sound_stop.png');
      if (soundNumber == 1) dropAudio1.play();
      if (soundNumber == 2) dropAudio2.play();
      if (soundNumber == 3) dropAudio3.play();
    } else {
      $('.talkBtnDrag').attr('src', 'images/btn/talk_btn.png');
      $('.talkBtnDrag').removeClass('sMotion');
      dropAudio1.pause();
      dropAudio1.currentTime = 0;
      dropAudio2.pause();
      dropAudio2.currentTime = 0;
      dropAudio3.pause();
      dropAudio3.currentTime = 0;
    }
  });

  dropAudio1.addEventListener('ended', function () {
    $('.talkBtnDrag').attr('src', 'images/btn/talk_btn.png');
    $('.talkBtnDrag').removeClass('sMotion');
  });
  dropAudio2.addEventListener('ended', function () {
    $('.talkBtnDrag').attr('src', 'images/btn/talk_btn.png');
    $('.talkBtnDrag').removeClass('sMotion');
  });
  dropAudio3.addEventListener('ended', function () {
    $('.talkBtnDrag').attr('src', 'images/btn/talk_btn.png');
    $('.talkBtnDrag').removeClass('sMotion');
  });

  $(
    '.talkBtn, .gotosubBtn, .gotothinkBtn .talkBtn, .supreiBtn.simg_btn, .popupOpen1, .bigPopOpen'
  ).on('click', function () {
    $('.talkBtnDrag').attr('src', 'images/btn/talk_btn.png');
    $('.talkBtnDrag').removeClass('sMotion');
    dropAudio1.pause();
    dropAudio1.currentTime = 0;
    dropAudio2.pause();
    dropAudio2.currentTime = 0;
    dropAudio3.pause();
    dropAudio3.currentTime = 0;
  });

  // dropAudio.addEventListener('playing', function () {});
});
