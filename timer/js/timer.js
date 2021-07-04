$(function () {
  var isMobile;
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

  var hour, min, sec, milisec;
  var stTime, endTime;
  var selectTime = 0;
  var videoIdx = 2;
  var timerStart;
  var stopWatchStart;

  /* 비디오 돌리기 */
  var init_time;
  var dur_time = 0;
  var cur_time = 0.0;
  var inter_time = 10.0; // 비디오 인터벌 시간
  var intervalId;
  /* 비디오 돌리기 */

  var sound = [
    new Audio('media/sound_1.mp3'),
    new Audio('media/sound_2.mp3'),
    new Audio('media/sound_3.mp3'),
    new Audio('media/sound_4.mp3'),
  ]; // 타이머 끝 사운드
  var numCount = 5; // 숫자 순서대로 입력
  var count = 0; // record 카운트
  function pad(n, width) {
    n = n + '';
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join('0') + n;
  }

  $(
    '.stopwatch, .timer, .timer_choice ul li, .key_number ul li, .btn_start, .btn_clear, .btn_restart, .btn_pause, .btn_reset, .btn_s_start, .btn_s_record, .btn_s_stop, .btn_s_restart, .btn_s_reset'
  )
    .on(overEvent, function () {
      $(this).addClass('ON');
    })
    .on(outEvent, function () {
      $(this).removeClass('ON');
    }); // 버튼 over

  $('.main_title > div').on('click', function () {
    $('.main_title > div').removeClass('DOWN');
    $(this).addClass('DOWN');

    timerReset();
    dur_time = 0;
    cur_time = 0.0;
    for (var i = 0; i < $('video').length; i++) {
      $('#video' + (i + 1)).get(0).currentTime = 0;
    }
    $('video').css('opacity', 0);
    $('#video4').css('opacity', 0);
    $('.timer_box').hide();
    timerSoundNo();

    if ($(this).hasClass('timer')) {
      $('.main_timer').show();
      $('.main_stopwatch').hide();
      $('body').removeClass('stopwatchs');
      $('.timer_choice ul li').eq(1).click();
    } else {
      $('.main_timer').hide();
      $('.main_stopwatch').show();
      $('body').addClass('stopwatchs');
    }
  }); // 상단 메뉴 클릭

  /* 타이머 시작 */
  $('.timer_choice ul li').on('click', function () {
    videoIdx = $(this).attr('data-index');
    $('.timer_choice ul li').removeClass('DOWN');
    $(this).addClass('DOWN');
  }); // 타이머 종류 클릭

  $('.key_number li').on('click', function () {
    var num = $(this).attr('data-value');
    if (numCount == 0) {
      $('.timer_number input[type=text]').eq(numCount).val(num);
      numCount = 5;
    } else {
      $('.timer_number input[type=text]').eq(numCount).val(num);
      numCount--;
    }
  }); // 타이머 숫자 클릭

  $('.btn_clear').on('click', function () {
    $('.timer_number input[type=text]').val('');
    numCount = 5;
  }); // 타이머 초기화

  var inputHour, inputMin, inputSec;
  $('.btn_start').on('click', function () {
    inputHour = Number(
      $('.timer_number input[type=text]').eq(0).val() +
        $('.timer_number input[type=text]').eq(1).val()
    );
    inputMin = Number(
      $('.timer_number input[type=text]').eq(2).val() +
        $('.timer_number input[type=text]').eq(3).val()
    );
    inputSec = Number(
      $('.timer_number input[type=text]').eq(4).val() +
        $('.timer_number input[type=text]').eq(5).val()
    );

    selectTime = inputHour * 3600 + inputMin * 60 + inputSec;

    if (selectTime > 0) {
      $('.timer_box').removeClass('Type4');
      $('.main_timer').hide();
      $('#video' + videoIdx).css('opacity', 1);
      if (videoIdx != 4) {
        if (document.getElementById('video' + videoIdx)) {
          init_time = selectTime;

          document.getElementById('video' + videoIdx).play();
          document.getElementById('video' + videoIdx).pause();
          dur_time = document.getElementById('video' + videoIdx).duration;

          time_control(document.getElementById('video' + videoIdx));
        }
      } else {
        $('.timer_box').addClass('Type4');
      }
      $('.timer_box').show();

      if (!stTime) {
        stTime = Date.now() + selectTime * 1000; // 최초 START
      } else {
        stTime += Date.now() - endTime; // RESTART
      }
      timerStart = setInterval(function () {
        var nowTime = new Date(stTime - Date.now());
        if (stTime - Date.now() <= 0) {
          timerReset();
          sound[videoIdx - 1].play();

          if (videoIdx == 2) $('.boomGif').show();
        } else if (stTime - Date.now() > 0) {
          hour = pad(nowTime.getHours() - 9, 2);
          min = pad(nowTime.getMinutes(), 2);
          sec = pad(nowTime.getSeconds(), 2);
          milisec = pad(Math.floor(nowTime.getMilliseconds() / 10), 2);
          $('#time_H').html(hour);
          $('#time_M').html(min);
          $('#time_S').html(sec);
          $('#time_Ms').html(milisec);
        }
      }, 10);
    } // 시간이 있을 때
  }); // 타이머 시작

  function time_control(obj) {
    intervalId = setInterval(function () {
      cur_time = cur_time + inter_time / 1000;

      if (cur_time > init_time) {
        obj.currentTime = dur_time;
        clearInterval(intervalId);
      }

      obj.currentTime = (cur_time * dur_time) / init_time;
    }, inter_time);
  } // time_control

  function timerReset() {
    $('.btn_clear').click();
    stTime = 0;
    endTime = Date.now();
    selectTime = 0;
    if (timerStart) {
      clearInterval(timerStart);
      timerStart = null;
    }
    if (stopWatchStart) {
      clearInterval(stopWatchStart);
      stopWatchStart = null;
    }
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    numCount = 5;
    count = 0;

    hour = 0;
    min = 0;
    sec = 0;
    milisec = 0;

    $('#time_H').html('00');
    $('#time_M').html('00');
    $('#time_S').html('00');
    $('#time_Ms').html('00');

    $('#stopwatch_hour').html('00');
    $('#stopwatch_min').html('00');
    $('#stopwatch_sec').html('00');
    $('#stopwatch_ms').html('00');

    $('.btn_restart').hide();
    $('.btn_pause').show();

    $('.btn_s_stop').hide();
    $('.btn_s_restart').hide();
    $('.btn_s_start').show();

    $('#stopwatch_record_ul li').remove();
  } // 리셋

  $('.btn_pause').on('click', function () {
    if (timerStart) {
      clearInterval(timerStart);
      clearInterval(intervalId);
      endTime = Date.now();
      $(this).hide();
      $('.btn_restart').show();
    }
  }); // 타이머 안 일시정지

  $('.btn_restart').on('click', function () {
    if (!stTime) {
      stTime = Date.now() + selectTime * 1000; // 최초 START
    } else {
      stTime += Date.now() - endTime; // RESTART
    }
    timerStart = setInterval(function () {
      var nowTime = new Date(stTime - Date.now());
      if (stTime - Date.now() <= 0) {
        timerReset();
        sound[videoIdx - 1].play();

        if (videoIdx == 2) $('.boomGif').show();
      } else if (stTime - Date.now() > 0) {
        hour = pad(nowTime.getHours() - 9, 2);
        min = pad(nowTime.getMinutes(), 2);
        sec = pad(nowTime.getSeconds(), 2);
        milisec = pad(Math.floor(nowTime.getMilliseconds() / 10), 2);
        $('#time_H').html(hour);
        $('#time_M').html(min);
        $('#time_S').html(sec);
        $('#time_Ms').html(milisec);
      }
    }, 10);

    if (videoIdx != 4) {
      document.getElementById('video' + videoIdx).play();
      document.getElementById('video' + videoIdx).pause();
      dur_time = document.getElementById('video' + videoIdx).duration;

      time_control(document.getElementById('video' + videoIdx));
    }

    $(this).hide();
    $('.btn_pause').show();
  }); // 타이머 안 재시작

  $('.btn_reset').on('click', function () {
    $('.btn_pause').hide();
    $('.btn_restart').show();
    timerSoundNo();

    if (timerStart) {
      clearInterval(timerStart);
      timerStart = null;
    }
    if (stopWatchStart) {
      clearInterval(stopWatchStart);
      stopWatchStart = null;
    }
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    dur_time = 0;
    cur_time = 0.0;
    stTime = 0;
    endTime = Date.now();
    selectTime = inputHour * 3600 + inputMin * 60 + inputSec;

    setTimeout(function () {
      $('#time_H').html(pad(inputHour, 2));
      $('#time_M').html(pad(inputMin, 2));
      $('#time_S').html(pad(inputSec, 2));
      $('#time_Ms').html('00');
      for (var i = 0; i < $('video').length; i++) {
        $('#video' + (i + 1)).get(0).currentTime = 0;
      }
    }, 10);
  }); // 타이머 안 초기화

  function timerSoundNo() {
    for (var i = 0; i < sound.length; i++) {
      if (!sound[i].paused) {
        sound[i].currentTime = 0;
        sound[i].pause();
      }
    }
    $('.boomGif').each(function () {
      var d = new Date();
      var imgSrc = $(this).attr('src') + '?' + d.getTime();
      $(this).attr('src', imgSrc);
      $(this).hide();
    });
  } // 타이머 사운드 끄기
  /* 타이머 끝 */

  /* 스톱워치 시작 */
  $('.btn_s_start, .btn_s_restart').on('click', function () {
    if (!stTime) {
      stTime = Date.now(); // 최초 START
    } else {
      stTime += Date.now() - endTime; // RESTART
    }
    stopWatchStart = setInterval(function () {
      var nowTime = new Date(Date.now() - stTime);
      hour = pad(nowTime.getHours() - 9, 2);
      min = pad(nowTime.getMinutes(), 2);
      sec = pad(nowTime.getSeconds(), 2);
      milisec = pad(Math.floor(nowTime.getMilliseconds() / 10), 2);
      $('.stopwatch_hour').html(hour);
      $('.stopwatch_min').html(min);
      $('.stopwatch_sec').html(sec);
      $('.stopwatch_ms').html(milisec);
    }, 10);
    $('.btn_s_stop').show();
    $(this).hide();
  }); // 스톱워치 스타트

  $('.btn_s_stop').on('click', function () {
    if (stopWatchStart) {
      clearInterval(stopWatchStart);
      endTime = Date.now();
    }
    $('.btn_s_restart').show();
    $(this).hide();
  }); // 스톱워치 일시 정지

  $('.btn_s_reset').on('click', function () {
    timerReset();
  }); // 스톱워치 초기화

  $('.btn_s_record').on('click', function () {
    var newH, newM, newS, newMi;
    if ($('#stopwatch_record_ul li:last-child').length > 0) {
      var prevTime, newTime;
      var prevHour = Number(
        $('#stopwatch_record_ul li:last-child')
          .find('.record_now')
          .html()
          .substring(0, 2)
      );
      var prevMin = Number(
        $('#stopwatch_record_ul li:last-child')
          .find('.record_now')
          .html()
          .substring(3, 5)
      );
      var prevSec = Number(
        $('#stopwatch_record_ul li:last-child')
          .find('.record_now')
          .html()
          .substring(6, 8)
      );
      var prevMiliSec = Number(
        $('#stopwatch_record_ul li:last-child').find('.record_now_ms').html()
      );
      prevTime = (prevHour * 3600 + prevMin * 60 + prevSec) * 100 + prevMiliSec;
      newTime =
        (Number(pad(hour, 2)) * 3600 +
          Number(pad(min, 2)) * 60 +
          Number(pad(sec, 2))) *
          100 +
        Number(pad(milisec, 2));

      var newMilisec = String(newTime - prevTime);
      newMi = newMilisec.substring(newMilisec.length - 2, newMilisec.length);
      var newTimes = newMilisec.substring(0, newMilisec.length - 2);
      newS = newTimes % 60;
      newM = Math.floor((newTimes % 3600) / 60);
      newH = Math.floor(newTimes / 3600);
    }
    count++;

    var addHTML = '<li>';
    addHTML += '<div class="record_number">' + pad(count, 2) + '</div>';
    addHTML +=
      '<div class="record_now">' +
      pad(hour, 2) +
      ':' +
      pad(min, 2) +
      ':' +
      pad(sec, 2) +
      '</div>';
    addHTML += '<div class="record_now_ms">' + pad(milisec, 2) + '</div>';
    if ($('#stopwatch_record_ul li:last-child').length > 0) {
      addHTML +=
        '<div class="record_diff">' +
        pad(newH, 2) +
        ':' +
        pad(newM, 2) +
        ':' +
        pad(newS, 2) +
        '</div>';
      addHTML += '<div class="record_diff_ms">' + pad(newMi, 2) + '</div>';
    } else {
      addHTML += '<div class="record_diff">00:00:00</div>';
      addHTML += '<div class="record_diff_ms">00</div>';
    }
    addHTML += '<div class="record_del"></div>';
    addHTML += '</li>';

    $(addHTML).appendTo('#stopwatch_record_ul');

    $('.stopwatch_record')[0].scrollTop =
      $('.stopwatch_record')[0].scrollHeight;
  }); // 스톱워치 기록
  $(document).on('click', '.record_del', function () {
    $(this).parent().remove();
  }); // 스톱워치 기록 삭제
  /* 스톱워치 끝 */
}); // end
