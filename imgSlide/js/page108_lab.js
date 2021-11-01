$(function () {
  $('.help').show();

  var timeId = setTimeout(function () {
    $('.help').hide();
    $('.help_start').show();
    $(
      '.help_box, .help_start_text, .help_box2, .help_start_text2'
    ).hide();
    $('.help_box, .help_start_text').fadeIn(1000, '', function () {
      if ($('.help_box2').length == 0) {
        $('.start').fadeIn(1000);
      } else {
        $('.help_box2, .help_start_text2').fadeIn(1000, '', function () {
          $('.start').fadeIn(1000);
        });
      }
    });
  }, 4500);

  var video1 = $('#video1').get(0);
  var factor = 0;

  //설명 닫기
  $('.start').on('click', function () {
    $(this).hide();
    video1.load();
		if(timeId){
			clearTimeout(timeId);
			$(".help").fadeOut();

		}
		$(".help_start").fadeOut();
  });

  $('.scrollbar').css('cursor', 'pointer');

  var pdmS = $('.scrollbar').width() / 10;

  $('.scrolldot').css('cursor', 'pointer');

  var start_offset = $('.scrolldot').offset().left;
  //세로
  var remember_s_p_l;

  function getZoomRate(target) {
    return parent.GO_PAGE_LOAD
      ? parent.ZOOMVALUE
      : target.getBoundingClientRect().width / target.offsetWidth;
  }

  function aniplaybtn() {
    $('.aniplaybtn').on(clickEvent, function () {
      
      if (!video1.paused) {
        video1.pause();
        $(this).removeClass('anipausebtn');
      } else {
        //video1.currentTime = 0;
        video1.play();
        $(this).addClass('anipausebtn');
      }
    });
  }
  
  function anireplaybtn() {
    $('.anireplaybtn').on(clickEvent, function () {
      video1.currentTime = 0;
      video1.pause();
      video1.load();

      $('.aniplaybtn').removeClass('anipausebtn');

    });
  }

  $('.scrolldot').on(downEvent, function (e) {
    var tx = isMobile ? e.touches[0].pageX : e.pageX;
    const scaleV = getZoomRate(this);

    factor = scaleV;
    var self = this;
    my = isMobile ? e.touches[0].pageX : e.pageX;
    self.mouseX = my / factor;
    self.parentOffset = $('.scrolldot').offset();
    self.parentOffset.left = self.parentOffset.left / factor;

    if (remember_s_p_l != undefined) {
      self.parentOffset.left = remember_s_p_l;
    }
    remember_s_p_l = self.parentOffset.left;

    var tx = self.mouseX - start_offset;

    tx += pdmS;
    var maxX = 500;
    if (tx - 50 < pdmS) tx = 0;
    else if (tx > maxX) tx = maxX;

    // start_x=self.parentOffset.left-390;
    // if(start_x<=0) start_x=390;

    $(document).on(moveEvent, function (e) {
      my = isMobile ? e.touches[0].pageX : e.pageX;
      self.mouseX = my / factor;
      var tx = self.mouseX - self.parentOffset.left;
      tx += pdmS;
      var maxX = 500;

      if (tx - 50 < pdmS) tx = 0;
      else if (tx > maxX) tx = maxX;
      else tx = tx - pdmS;

      var i = Math.floor((self.mouseX - self.parentOffset.left) / pdmS);

      if (i >= 1 && i <= 10) {
        video1.currentTime = i;
        if (i != 10) {
          $('.scrolldot').css('left', pdmS * i);
        } else {
          $('.scrolldot').css('left', 470);
        }

        if (i < 5) {
          $('.scrollTxt p').eq(0).fadeIn();
          $('.scrollTxt p').eq(1).fadeOut();
        }
        if (i >= 5) {
          $('.scrollTxt p').eq(1).fadeIn();
          $('.scrollTxt p').eq(0).fadeOut();
        }
      }
      if (i <= 0) {
        $('.scrolldot').css('left', 0);
      }
      $(document).on(upEvent, function (e) {
        $(document).off(moveEvent);
        $(document).off(upEvent);
      });
      $(document).on('dragstart', function () {
        return false;
      });
    });
  });

  $('.labReplayBtn').on('click', function () {
    video1.load();
    //글자 숨기기
    $('.scrollTxt p').hide();
    $('.scrolldot').css('left', 0);
  });

  var z;
  var endTimeMode = false;
  var endTime = 0;
  var startTime = 0;

  video1.addEventListener('timeupdate', function () {
    if (endTimeMode) return;
    var sTime = video1.currentTime - startTime;
    if (sTime == 0) {
      $('.scrolldot').css('left', '0px');
    } else {
      z = Math.floor(sTime);
      if (z != 10) {
        $('.scrolldot').css('left', z * pdmS);
      } else {
        $('.scrolldot').css('left', 470);
      }
      if (z < 5) {
        $('.scrollTxt p').eq(0).fadeIn();
        $('.scrollTxt p').eq(1).fadeOut();
      }
      if (z >= 5) {
        $('.scrollTxt p').eq(1).fadeIn();
        $('.scrollTxt p').eq(0).fadeOut();
      }
    }

    if (video1.ended == true) {
      $('.scrollTxt p').hide();
      $('.aniplaybtn').removeClass('anipausebtn');
    }
  });

  $('.anireplaybtn').on('click', function () {
    $('.scrollTxt p').hide();
  });
   aniplaybtn();
   anireplaybtn();
});
