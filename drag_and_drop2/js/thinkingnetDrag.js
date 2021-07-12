window.addEventListener('load', function () {
  const contents = document.querySelector('#contents');

  const targetImgs = document.querySelectorAll('.imgItem');
  const targetTexts = document.querySelectorAll('.dragtext div');

  const resetBtn = document.querySelector('.resetBtn');
  const answerBtn = document.querySelector('.answerBtn');


  const effOk = new Audio('./media/drag/eff_ok.mp3');
  const effFail = new Audio('./media/drag/eff_fail.mp3');

  effOk.preload = 'metadata';
  effFail.preload = 'metadata';
  effOk.load();
  effFail.load();
  effOk.muted = true;
  effFail.muted = true;

  setTimeout(() => {
    effOk.play();
    effFail.play();
  }, 500);

  let itemImg = {
    dom: '',
    itemX: '',
    itemY: '',
  };

  let itemTxt = {
    dom: '',
    itemX: '',
    itemY: '',
  };

  let itemState = {
    startX: '',
    startY: '',
  };
  const getEventPosition = (event) => {
    const eventTarget = isTouchEvent(event)
      ? event.changedTouches[0] || event.touches[0]
      : event;

    return {
      x: eventTarget.clientX,
      y: eventTarget.clientY,
    };
  };

  function blockedViewerSlide(e) {
    e.stopPropagation();
  }

  // 웹뷰 드래그 취소
  function dragMoveStop() {
    contents.addEventListener('mousemove', blockedViewerSlide);
    contents.addEventListener('touchmove', blockedViewerSlide);
  }

  // 웹뷰 드래그 가능
  function dragMoveResume() {
    contents.removeEventListener('mousemove', blockedViewerSlide);
    contents.removeEventListener('touchmove', blockedViewerSlide);
  }

  const isTouchEvent = (event) => {
    return event.type.indexOf('touch') > -1;
  };
  //드래그 시작
  const dragStart = function (event) {
    getEventPosition(event);
    //이미지
    itemImg.dom = this;
    itemImg.itemX = this.offsetLeft;
    itemImg.itemY = this.offsetTop;

    itemState.startX = getEventPosition(event).x;
    itemState.startY = getEventPosition(event).y;

    contents.addEventListener('mousemove', dragMove);
    contents.addEventListener('touchmove', dragMove);
    contents.addEventListener('mouseup', dragEnd);
    contents.addEventListener('touchend', dragEnd);
    effOk.muted = false;
    effFail.muted = false;
    dragMoveStop();
  };

  const dragStartText = function (event) {
    getEventPosition(event);
    //텍스트
    itemTxt.dom = this;
    itemTxt.itemX = this.offsetLeft;
    itemTxt.itemY = this.offsetTop;

    itemState.startX = getEventPosition(event).x;
    itemState.startY = getEventPosition(event).y;

    contents.addEventListener('mousemove', dragMoveText);
    contents.addEventListener('touchmove', dragMoveText);
    contents.addEventListener('mouseup', dragEndText);
    contents.addEventListener('touchend', dragEndText);
    effOk.muted = false;
    effFail.muted = false;
    dragMoveStop();
  };

  //드래그 중
  const dragMove = function (event) {
    const eventX = getEventPosition(event).x;
    const eventY = getEventPosition(event).y;

    const moveX = (eventX - itemState.startX) / scale;
    const moveY = (eventY - itemState.startY) / scale;

    itemImg.dom.style.left = `${itemImg.itemX + moveX}px`;
    itemImg.dom.style.top = `${itemImg.itemY + moveY}px`;
  };

  const dragMoveText = function (event) {
    const eventX = getEventPosition(event).x;
    const eventY = getEventPosition(event).y;

    const moveX = (eventX - itemState.startX) / scale;
    const moveY = (eventY - itemState.startY) / scale;

    itemTxt.dom.style.left = `${itemTxt.itemX + moveX}px`;
    itemTxt.dom.style.top = `${itemTxt.itemY + moveY}px`;
  };

  //드래그 끝
  const dragEnd = (event) => {
    itemImg.dom.style.pointerEvents = 'none';
    const element = document.elementFromPoint(
      getEventPosition(event).x,
      getEventPosition(event).y
    );
    if (
      itemImg.dom.getAttribute('data-item') ===
      element.getAttribute('data-img-item-point')
    ) {
      itemImg.dom.style.display = 'none';
      effOk.pause();
      effOk.currentTime = 0;
      effOk.play();
      element.querySelector('img').style.display = 'block';
      resetBtn.style.display = 'block';
      answerBtn.style.display = 'none'
    } else {
      effFail.pause();
      effFail.currentTime = 0;
      effFail.play();
      itemImg.dom.style.left = '';
      itemImg.dom.style.top = '';
      itemImg.dom.style.pointerEvents = 'auto';
    }
    contents.removeEventListener('mousemove', dragMove);
    contents.removeEventListener('touchmove', dragMove);
    contents.removeEventListener('mouseup', dragEnd);
    contents.removeEventListener('touchend', dragEnd);

    dragMoveResume();
  };

  const dragEndText = (event) => {
    itemTxt.dom.style.pointerEvents = 'none';
    const element = document.elementFromPoint(
      getEventPosition(event).x,
      getEventPosition(event).y
    );

    if (
      itemTxt.dom.getAttribute('data-item-txt') ==
      element.getAttribute('data-text')
    ) {
      itemTxt.dom.style.display = 'none';
      effOk.pause();
      effOk.currentTime = 0;
      effOk.play();
      element.value = itemTxt.dom.querySelector('span').innerText;
      resetBtn.style.display = 'block';
      answerBtn.style.display = "none"
    } else {
      effFail.pause();
      effFail.currentTime = 0;
      effFail.play();
      itemTxt.dom.style.left = '';
      itemTxt.dom.style.top = '';
      itemTxt.dom.style.pointerEvents = 'auto';
    }

    contents.removeEventListener('mousemove', dragMoveText);
    contents.removeEventListener('touchmove', dragMoveText);
    contents.removeEventListener('mouseup', dragEndText);
    contents.removeEventListener('touchend', dragEndText);

    dragMoveResume();
  };

  //리셋
  function dragReset() {
    const answerImg = document.querySelectorAll('.answer > img');
    const answerTxt = document.querySelectorAll('.answer > input');

    answerImg.forEach((item) => {
      item.style.display = 'none';
    });
    targetImgs.forEach((item) => {
      item.style.display = 'block';
      item.style.left = '';
      item.style.top = '';
      item.style.pointerEvents = 'auto';
    });

    answerTxt.forEach((item) => {
      item.value = '';
    });
    targetTexts.forEach((item) => {
      item.style.display = 'block';
      item.style.left = '';
      item.style.top = '';
      item.style.pointerEvents = 'auto';
    });

    resetBtn.style.display = 'none';
  }

  //타겟 시작
  targetImgs.forEach((itemImg) => {
    itemImg.addEventListener('mousedown', dragStart);
    itemImg.addEventListener('touchstart', dragStart);
  });
  targetTexts.forEach((itemTxt) => {
    itemTxt.addEventListener('mousedown', dragStartText);
    itemTxt.addEventListener('touchstart', dragStartText);
  });

  resetBtn.addEventListener('click', dragReset);
});

$(function () {
  $('.answerBtn').on('click', function () {
    $(this).hide();
    $('.resetBtn').show();
    $('.answer img').show();
    $('.answer input').each(function () {
      $(this).val($(this).attr('data-answer'));
    });

    var items = $('.dragItem').get();
    for (var i = 0; i < items.length; i++) {
      items[i].style.display = 'none';
    }

    // $('.dragItem txtItem').hide();
  });
  $('.resetBtn').on('click', function () {
    $('.answerBtn').show();
  });
});
