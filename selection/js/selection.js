$(function () {
  var isMobile;
  var isAndroid;
  var downEvent, moveEvent, upEvent, clickEvent, overEvent, outEvent;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) {
    isMobile = true;
    downEvent = 'touchstart';
    moveEvent = 'touchmove';
    upEvent = 'touchend';
    clickEvent = 'click';
  } else {
    isMobile = false;
    downEvent = 'mousedown';
    moveEvent = 'mousemove';
    overEvent = 'mouseover';
    outEvent = 'mouseout';
    upEvent = 'mouseup';
    clickEvent = 'click';
  }
  $(
    '.btn_ok, .ch_btn_ok, .ch_btn_cancel, .re_btn_ok, .re_btn_cancel, .btn_go, .btn_reset'
  )
    .on(overEvent, function () {
      $(this).addClass('ON');
    })
    .on(outEvent, function () {
      $(this).removeClass('ON');
    }); // 버튼 over

  $('.btn_ok, .ch_btn_ok, .ch_btn_cancel, .re_btn_ok, .re_btn_cancel')
    .on(downEvent, function () {
      $(this).addClass('DOWN');
    })
    .on(outEvent, function () {
      $(this).removeClass('DOWN');
    }); // 버튼 down

  $('.btn_go, .btn_reset')
    .on(downEvent, function () {
      $(this).addClass('DOWN');
      $('.btn_go_over').hide();
      $('.btn_reset_over').hide();
    })
    .on(outEvent, function () {
      $(this).removeClass('DOWN');
    }); // 버튼 down

  $('.btn_go')
    .on(overEvent, function () {
      $('.btn_go_over').show();
    })
    .on(outEvent, function () {
      $('.btn_go_over').hide();
    });

  $('.btn_reset')
    .on(overEvent, function () {
      $('.btn_reset_over').show();
    })
    .on(outEvent, function () {
      $('.btn_reset_over').hide();
    });

  $('.btn_ok').bind('click', function () {
    $('.input-number ul li').show();
    $('.btn_go').show();
    $('.btn_reset').show();
  });

  $('.btn_reset').bind('click', function () {
    $('.ch_reset').show();
  });

  $('.re_btn_ok').bind('click', function () {
    // $('.input-number ul li').hide();
    $('.ch_reset').hide();
  });

  $('.re_btn_cancel').bind('click', function () {
    $('.ch_reset').hide();
  });

  $('.ch_btn_ok').bind('click', function () {
    $('.ch_help').hide();
    $('.input-number ul li').hide();
  });
  $('.ch_btn_cancel').bind('click', function () {
    $('.ch_help').hide();
  });

  var images = [];
  function preload() {
    for (var i = 0; i < arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
    }
  }

  //-- usage --//
  preload(
    './images/selection/choice/se2/cho0001.png',
    './images/selection/choice/se2/cho0002.png',
    './images/selection/choice/se2/cho0003.png',
    './images/selection/choice/se2/cho0004.png',
    './images/selection/choice/se2/cho0005.png',
    './images/selection/choice/se2/cho0006.png',
    './images/selection/choice/se2/cho0007.png',
    './images/selection/choice/se2/cho0008.png',
    './images/selection/choice/se2/cho0009.png',
    './images/selection/choice/se2/cho0010.png',
    './images/selection/choice/se2/cho0011.png',
    './images/selection/choice/se2/cho0012.png',
    './images/selection/choice/se2/cho0013.png',
    './images/selection/choice/se2/cho0014.png',
    './images/selection/choice/se2/cho0015.png',
    './images/selection/choice/se2/cho0016.png',
    './images/selection/choice/se2/cho0017.png',
    './images/selection/choice/se2/cho0018.png',
    './images/selection/choice/se2/cho0019.png',
    './images/selection/choice/se2/cho0020.png',
    './images/selection/choice/se2/cho0021.png',
    './images/selection/choice/se2/cho0022.png',
    './images/selection/choice/se2/cho0023.png',
    './images/selection/choice/se2/cho0024.png',
    './images/selection/choice/se2/cho0025.png',
    './images/selection/choice/se2/cho0026.png',
    './images/selection/choice/se2/cho0027.png',
    './images/selection/choice/se2/cho0028.png',
    './images/selection/choice/se2/cho0029.png',
    './images/selection/choice/se2/cho0030.png',
    './images/selection/choice/se2/cho0031.png',
    './images/selection/choice/se2/cho0032.png',
    './images/selection/choice/se2/cho0033.png',
    './images/selection/choice/se2/cho0034.png',
    './images/selection/choice/se2/cho0035.png',
    './images/selection/choice/se2/cho0036.png',
    './images/selection/choice/se2/cho0037.png',
    './images/selection/choice/se2/cho0038.png',

    './images/selection/choice/se5/cho0001.png',
    './images/selection/choice/se5/cho0002.png',
    './images/selection/choice/se5/cho0003.png',
    './images/selection/choice/se5/cho0004.png',
    './images/selection/choice/se5/cho0005.png',
    './images/selection/choice/se5/cho0006.png',
    './images/selection/choice/se5/cho0007.png',
    './images/selection/choice/se5/cho0008.png',
    './images/selection/choice/se5/cho0009.png',
    './images/selection/choice/se5/cho0010.png',
    './images/selection/choice/se5/cho0011.png',
    './images/selection/choice/se5/cho0012.png',
    './images/selection/choice/se5/cho0013.png',
    './images/selection/choice/se5/cho0014.png',
    './images/selection/choice/se5/cho0015.png',
    './images/selection/choice/se5/cho0016.png',
    './images/selection/choice/se5/cho0017.png',
    './images/selection/choice/se5/cho0018.png',
    './images/selection/choice/se5/cho0019.png',
    './images/selection/choice/se5/cho0020.png',
    './images/selection/choice/se5/cho0021.png',
    './images/selection/choice/se5/cho0022.png',
    './images/selection/choice/se5/cho0023.png',
    './images/selection/choice/se5/cho0024.png',
    './images/selection/choice/se5/cho0025.png',
    './images/selection/choice/se5/cho0026.png',
    './images/selection/choice/se5/cho0027.png',
    './images/selection/choice/se5/cho0028.png',
    './images/selection/choice/se5/cho0029.png',
    './images/selection/choice/se5/cho0030.png',
    './images/selection/choice/se5/cho0031.png',
    './images/selection/choice/se5/cho0032.png',
    './images/selection/choice/se5/cho0033.png',
    './images/selection/choice/se5/cho0034.png',
    './images/selection/choice/se5/cho0035.png',
    './images/selection/choice/se5/cho0036.png',
    './images/selection/choice/se5/cho0037.png',
    './images/selection/choice/se5/cho0038.png',

    './images/selection/choice/se9/cho0001.png',
    './images/selection/choice/se9/cho0002.png',
    './images/selection/choice/se9/cho0003.png',
    './images/selection/choice/se9/cho0004.png',
    './images/selection/choice/se9/cho0005.png',
    './images/selection/choice/se9/cho0006.png',
    './images/selection/choice/se9/cho0007.png',
    './images/selection/choice/se9/cho0008.png',
    './images/selection/choice/se9/cho0009.png',
    './images/selection/choice/se9/cho0010.png',
    './images/selection/choice/se9/cho0011.png',
    './images/selection/choice/se9/cho0012.png',
    './images/selection/choice/se9/cho0013.png',
    './images/selection/choice/se9/cho0014.png',
    './images/selection/choice/se9/cho0015.png',
    './images/selection/choice/se9/cho0016.png',
    './images/selection/choice/se9/cho0017.png',
    './images/selection/choice/se9/cho0018.png',
    './images/selection/choice/se9/cho0019.png',
    './images/selection/choice/se9/cho0020.png',
    './images/selection/choice/se9/cho0021.png',
    './images/selection/choice/se9/cho0022.png',
    './images/selection/choice/se9/cho0023.png',
    './images/selection/choice/se9/cho0024.png',
    './images/selection/choice/se9/cho0025.png',
    './images/selection/choice/se9/cho0026.png',
    './images/selection/choice/se9/cho0027.png',
    './images/selection/choice/se9/cho0028.png',
    './images/selection/choice/se9/cho0029.png',
    './images/selection/choice/se9/cho0030.png',
    './images/selection/choice/se9/cho0031.png',
    './images/selection/choice/se9/cho0032.png',
    './images/selection/choice/se9/cho0033.png',
    './images/selection/choice/se9/cho0034.png',
    './images/selection/choice/se9/cho0035.png',
    './images/selection/choice/se9/cho0036.png',
    './images/selection/choice/se9/cho0037.png',
    './images/selection/choice/se9/cho0038.png'
  );

  var sequence = document.getElementById('result_canvas');

  const writePerson = document.getElementById('writePerson');
  const btn_ok = document.getElementById('btn_ok');
  const btn_go = document.getElementById('btn_go');
  const btn_reset = document.querySelector('.btn_reset');

  const ul_number = document.querySelector('.ul-number');

  const list_item = document.getElementsByClassName('list-item');

  const ch_reset = document.getElementById('ch_reset');
  const re_btn_ok = document.getElementById('re_btn_ok');

  const choice_ball = document.querySelector('.choice_ball');

  const cong = document.querySelector('.cong');
  const cong_n = document.querySelector('.cong_n');
  const result_canvas = document.getElementById('result_canvas');

  const choice_audio = new Audio('./media/selection/choice.mp3');
  const ing_audio = new Audio('./media/selection/ing.mp3');
  const ok_audio = new Audio('./media/selection/ok.mp3');

  let pickNumbers = [];

  function ClassNumber() {
    const personNum = parseInt(writePerson.value);

    if (51 > personNum && personNum > 0) {
      startBtn(personNum);
    }
  }

  function startBtn(number) {
    const didValue = btn_ok.classList.contains('didValue');

    if (didValue) {
      for (i = 0; i < number; i++) {
        let li_number = document.createElement('li');
        li_number.setAttribute('class', `list-item`);
        li_number.setAttribute('id', `list-item${i + 1}`);
        li_number.setAttribute('style', 'display: list-item;');
        ul_number.appendChild(li_number);
        li_number.innerText += i + 1;
      }
      btn_ok.classList.remove('didValue');
    } else if (!didValue) {
      ch_reset.style.display = 'block';
      re_btn_ok.addEventListener('click', () => {
        pickNumbers = [];
        ul_number.innerHTML = '';
        for (i = 0; i < number; i++) {
          let li_number = document.createElement('li');
          li_number.setAttribute('class', `list-item`);
          li_number.setAttribute('id', `list-item${i + 1}`);
          li_number.setAttribute('style', 'display: list-item;');
          ul_number.appendChild(li_number);
          li_number.innerText += i + 1;
        }
      });
    }
  }

  function randomNum() {
    let randomNumber = Math.floor(Math.random() * list_item.length) + 1;
    return randomNumber;
  }

  function animation(count) {
    const randomColor = Math.floor(Math.random() * 3) + 1;
    const listCount = count[count.length - 1];
    const redColor = 'url(./images/selection/07.png)';
    const blueColor = 'url(./images/selection/10.png)';
    const greenColor = 'url(./images/selection/14.png)';

    choice_ball.style.display = 'none';
    btn_go.style.pointerEvents = 'none';

    switch (randomColor) {
      case 1:
        setTimeout(function () {
          result_canvas.style.backgroundImage = 'none';
        }, 100);
        setSequence(
          sequence,
          'selection/choice/se2',
          'cho',
          38,
          'png',
          3,
          function () {
            setTimeout(function () {
              cong.style.display = 'block';
              ok_audio.play();
            }, 1000);
            cong_n.style.backgroundImage = redColor;
            cong_n.innerText = listCount;
            choice_ball.style.display = 'block';
            choice_ball.innerText = listCount;
            list_item[listCount - 1] = list_item[
              listCount - 1
            ].style.backgroundImage = redColor;
            choice_ball.classList = 'choice_ball ANI';
            choice_ball.style.backgroundImage = redColor;
            choice_audio.play();
          }
        );
        break;
      case 2:
        setTimeout(function () {
          result_canvas.style.backgroundImage = 'none';
        }, 100);
        setSequence(
          sequence,
          'selection/choice/se5',
          'cho',
          38,
          'png',
          3,
          function () {
            setTimeout(function () {
              cong.style.display = 'block';
              ok_audio.play();
            }, 1000);
            cong_n.style.backgroundImage = blueColor;
            cong_n.innerText = listCount;
            choice_ball.style.display = 'block';
            choice_ball.innerText = listCount;
            list_item[listCount - 1] = list_item[
              listCount - 1
            ].style.backgroundImage = blueColor;
            choice_ball.classList = 'choice_ball ANI';
            choice_ball.style.backgroundImage = blueColor;
            choice_audio.play();
          }
        );
        break;
      case 3:
        setTimeout(function () {
          result_canvas.style.backgroundImage = 'none';
        }, 100);
        setSequence(
          sequence,
          'selection/choice/se9',
          'cho',
          38,
          'png',
          3,
          function () {
            setTimeout(function () {
              cong.style.display = 'block';
              ok_audio.play();
            }, 1000);
            cong_n.style.backgroundImage = greenColor;
            cong_n.innerText = listCount;
            choice_ball.style.display = 'block';
            choice_ball.innerText = listCount;
            list_item[listCount - 1] = list_item[
              listCount - 1
            ].style.backgroundImage = greenColor;
            choice_ball.classList = 'choice_ball ANI';
            choice_ball.style.backgroundImage = greenColor;
            choice_audio.play();
          }
        );
        break;
      default:
        console.log('ERROR');
    }
  }

  btn_ok.addEventListener('click', ClassNumber);

  btn_go.addEventListener('click', () => {
    let number;
    result_canvas.style.backgroundImage = '';

    while (pickNumbers.length < list_item.length) {
      number = randomNum();

      if (!pickNumbers.includes(number)) {
        pickNumbers.push(number);
        break;
      } else {
        continue;
      }
    }
    ing_audio.play();
    setTimeout(() => {
      ing_audio.play();
    }, 1300);

    animation(pickNumbers);
    setTimeout(function () {
      cong.style.display = 'none';
      btn_go.style.pointerEvents = 'auto';
    }, 7500);
  });

  btn_reset.addEventListener('click', () => {
    re_btn_ok.addEventListener('click', () => {
      pickNumbers = [];
      for (i = 0; i < list_item.length; i++) {
        list_item[i].style.backgroundImage = 'url(./images/selection/05.png)';
      }
    });
  });
});
