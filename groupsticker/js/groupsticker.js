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
    '.group_plus, .group_minus, .main_start, .stiker_plus, .stiker_minus, .go_main'
  )
    .on(overEvent, function () {
      $(this).addClass('ON');
    })
    .on(outEvent, function () {
      $(this).removeClass('ON');
    }); // 버튼 over

  $('.main_start').bind('click', function () {
    $('.main').hide();
    $('.main_stiker').show();
    $('.go_main').show();
  });

  $('.go_main').bind('click', function () {
    $('.main_stiker').hide();
    $('.main').show();
    $('.go_main').hide();
  });

  const main_start = document.querySelector('.main_start');
  const main_container = document.querySelector('.main_container');
  const group__inputValue = main_container.getElementsByTagName('input');
  const main_stiker = document.querySelector('.main_stiker');
  const group__inputValue2 = main_stiker.getElementsByTagName('input');

  const group_plus = document.querySelector('.group_plus');
  const group_minus = document.querySelector('.group_minus');

  const up_snd = new Audio('./media/up_snd.mp3');
  const down_snd = new Audio('./media/down_snd.mp3');
  let listNm = 0;

  var images = [];
  function preload() {
    for (var i = 0; i < arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
    }
  }

  //-- usage --//
  preload(
    './images/groupsticker/st_smile_no/smile001.png',
    './images/groupsticker/st_smile_no/smile002.png',
    './images/groupsticker/st_smile_no/smile003.png',
    './images/groupsticker/st_smile_no/smile004.png',
    './images/groupsticker/st_smile_no/smile005.png',
    './images/groupsticker/st_smile_no/smile006.png',
    './images/groupsticker/st_smile_no/smile007.png',
    './images/groupsticker/st_smile_no/smile008.png',
    './images/groupsticker/st_smile_no/smile009.png',
    './images/groupsticker/st_smile_no/smile0010.png',
    './images/groupsticker/st_smile_no/smile0011.png',
    './images/groupsticker/st_smile_no/smile0012.png',
    './images/groupsticker/st_smile_no/smile0013.png',
    './images/groupsticker/st_smile_no/smile0014.png',
    './images/groupsticker/st_smile_no/smile0015.png',
    './images/groupsticker/st_smile_no/smile0016.png',
    './images/groupsticker/st_smile_no/smile0017.png',
    './images/groupsticker/st_smile_no/smile0018.png',
    './images/groupsticker/st_smile_no/smile0019.png',
    './images/groupsticker/st_smile_no/smile0020.png',
    './images/groupsticker/st_smile_no/smile0021.png',
    './images/groupsticker/st_smile_no/smile0022.png',
    './images/groupsticker/st_smile_no/smile0023.png',
    './images/groupsticker/st_smile_no/smile0024.png',
    './images/groupsticker/st_smile_no/smile0025.png',
    './images/groupsticker/st_smile_ok/smile001.png',
    './images/groupsticker/st_smile_ok/smile002.png',
    './images/groupsticker/st_smile_ok/smile003.png',
    './images/groupsticker/st_smile_ok/smile004.png',
    './images/groupsticker/st_smile_ok/smile005.png',
    './images/groupsticker/st_smile_ok/smile006.png',
    './images/groupsticker/st_smile_ok/smile007.png',
    './images/groupsticker/st_smile_ok/smile008.png',
    './images/groupsticker/st_smile_ok/smile009.png',
    './images/groupsticker/st_smile_ok/smile0010.png',
    './images/groupsticker/st_smile_ok/smile0011.png',
    './images/groupsticker/st_smile_ok/smile0012.png',
    './images/groupsticker/st_smile_ok/smile0013.png',
    './images/groupsticker/st_smile_ok/smile0014.png',
    './images/groupsticker/st_smile_ok/smile0015.png',
    './images/groupsticker/st_smile_ok/smile0016.png',
    './images/groupsticker/st_smile_ok/smile0017.png',
    './images/groupsticker/st_smile_ok/smile0018.png',
    './images/groupsticker/st_smile_ok/smile0019.png',
    './images/groupsticker/st_smile_ok/smile0020.png',
    './images/groupsticker/st_smile_ok/smile0021.png',
    './images/groupsticker/st_smile_ok/smile0022.png',
    './images/groupsticker/st_smile_ok/smile0023.png',
    './images/groupsticker/st_smile_ok/smile0025.png',
    './images/groupsticker/st_smile_ok/smile0024.png',
    './media/down_snd.mp3',
    './media/up_snd.mp3'
  );

  function list__Addbtn() {
    const group__list = document.createElement('div');
    const group2_list = document.createElement('div');

    for (listNm = 0; listNm < group__inputValue.length; listNm++) {
      if (listNm > group__inputValue) {
        group__list.setAttribute('class', `group group_${listNm}`);
        group2_list.setAttribute('class', `group2`);
        group__list.innerHTML = `
        <p class="gp_${listNm}">${listNm}</p>
        <input
          type="text"
          name="group"
          class="g_${listNm}"
          placeholder="모둠1"
          autocomplete="off"
        />
      </div>
        `;

        group2_list.innerHTML = `
        <div class="group2_bg">
        <p class="gp_1">1</p>
        <input
          type="text"
          name="group2"
          class="g_1"
          disabled
          autocomplete="off"
        />
      </div>
      <div class="stiker_plus"></div>
      <div class="stiker_minus"></div>
      <div class="smile"></div>
      <div class="smile_count">
        <p>0</p>
      </div>
        `;
      } else group__list.setAttribute('class', `group group_${listNm + 1}`);
      group2_list.setAttribute('class', `group2`);
      group__list.innerHTML = `
        <p class="gp_${listNm + 1}">${listNm + 1}</p>
        <input
          type="text"
          name="group"
          class="g_${listNm + 1}"
          value="모둠${listNm + 1}"
          autocomplete="off"
        />
      </div>
        `;

      group2_list.innerHTML = `
        <div class="group2_bg">
        <p class="gp_1">${listNm + 1}</p>
        <input
          type="text"
          name="group2"
          class="g_1"
          disabled
          autocomplete="off"
        />
      </div>
      <div class="stiker_plus" id="plus${listNm + 1}"></div>
      <div class="stiker_minus" id="minus${listNm + 1}"></div>
      <div class="smile" id="smile${listNm + 1}"></div>
      <div class="smile_count">
        <p id="smile_value${listNm + 1}">0</p>
      </div>
        `;

      main_container.appendChild(group__list);
      main_stiker.appendChild(group2_list);
    }
  }

  group_plus.addEventListener('click', function () {
    if (group__inputValue.length < 12) {
      list__Addbtn();
    }
  });

  group_minus.addEventListener('click', function () {
    const list_removeBtn = group__inputValue[group__inputValue.length - 1];
    const list_removeBtn2 = group__inputValue2[group__inputValue2.length - 1];
    const finalGroup = 'g_1';
    if (list_removeBtn.className !== finalGroup) {
      list_removeBtn.parentNode.remove();
      list_removeBtn2.parentNode.parentNode.remove();
    }
  });

  main_start.addEventListener('click', function () {
    for (listNm = 0; listNm < group__inputValue.length; listNm++) {
      group__inputValue2[listNm].value = group__inputValue[listNm].value;

      const add_smileBtn = document.getElementById(`plus${listNm + 1}`);
      const minus_smileBtn = document.getElementById(`minus${listNm + 1}`);
      const smile_value = document.getElementById(`smile_value${listNm + 1}`);
      const smile_img = document.getElementById(`smile${listNm + 1}`);
      let smile_value_int = parseInt(smile_value.innerText);

      add_smileBtn.addEventListener('click', function () {
        ++smile_value_int;
        smile_value.innerText = smile_value_int;
        up_snd.play();

        let img_loop = 0;
        let it = setInterval(function () {
          if (img_loop++ < 25) {
            smile_img.style.backgroundImage = `url(./images/groupsticker/st_smile_ok/smile00${img_loop}.png)`;
          } else {
            clearInterval(it);
          }
        }, 27);
      });

      minus_smileBtn.addEventListener('click', function () {
        if (smile_value_int > 0) {
          --smile_value_int;
          smile_value.innerText = smile_value_int;
          down_snd.play();

          let img_loop = 0;
          let it = setInterval(function () {
            if (img_loop++ < 25) {
              smile_img.style.backgroundImage = `url(./images/groupsticker/st_smile_no/smile00${img_loop}.png)`;
            } else {
              clearInterval(it);
            }
          }, 27);
        }
      });
    }
  });
});
