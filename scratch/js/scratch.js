$(function () {
  var canvas = [];
  var ctx = [];
  const canvasFence = document.querySelectorAll('.scratchBox');
  const scratchWidth = document.querySelectorAll('.scratch');
  const scratchImg = document.querySelector('title');
  const pageNumber = scratchImg.innerText.slice(-2);
  $('.scratch').each(function (idx) {
    var canvas = document.createElement('canvas');
    $(canvas).attr('id', 'scratch' + idx);
    $(canvas).attr('width', scratchWidth[idx].offsetWidth);
    $(canvas).attr('height', scratchWidth[idx].offsetHeight);
    $(canvas).css({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    });
    $(this).append(canvas);
    drawInit(idx);
  });

  var inaa; // setInterval Fuc
  function drawInit(idx) {
    canvas[idx] = document.getElementById('scratch' + idx);
    ctx[idx] = canvas[idx].getContext('2d');

    var img = new Image();
    img.src = `images/page0${pageNumber}/${pageNumber}p_pic${
      canvas.length + canvasFence.length
    }.png`;

    img.onload = function () {
      ctx[idx].drawImage(img, 0, 0, canvas[idx].width, canvas[idx].height);
    };
    ctx[idx].drawImage(img, 0, 0, canvas[idx].width, canvas[idx].height);

    $(canvas[idx]).on(downEvent, function (e) {
      get_scale();
      var _this = $(this);
      $('body').css('user-select', 'none');

      inaa = setInterval(function () {
        percent(idx, _this, _this.parent());
      }, 100);

      $(document.body).on(moveEvent, function (e) {
        e.preventDefault();
        e.stopPropagation();
        var x =
          ((isMobile ? e.touches[0].pageX : e.pageX) - $(_this).offset().left) /
          zoom;
        var y =
          ((isMobile ? e.touches[0].pageY : e.pageY) - $(_this).offset().top) /
          zoom;
        var radius = 20;
        ctx[idx].globalCompositeOperation = 'destination-out';
        ctx[idx].fillCircle(x, y, radius);
      });
      $(document).on(upEvent, function (e) {
        $('body').css('user-select', 'auto');
        if (inaa) {
          clearInterval(inaa);
          inaa = null;
        }
        $(document.body).off(moveEvent);
        $(document).off(upEvent);
      });
    });

    ctx[idx].fillCircle = function (x, y, radius) {
      this.beginPath();
      this.moveTo(x, y);
      this.arc(x, y, radius, 0, Math.PI * 2, false);
      this.fill();
    };
  }

  function percent(idx, _this, parent) {
    for (
      var a = 0,
        b = ctx[idx].getImageData(
          (200 - parent.width()) / 2,
          (200 - parent.height()) / 2,
          parent.width(),
          parent.height()
        ),
        c = 0,
        d = b.data.length;
      d > c;
      c += 4
    ) {
      0 === b.data[c] &&
        0 === b.data[c + 1] &&
        0 === b.data[c + 2] &&
        0 === b.data[c + 3] &&
        a++;
    }

    if (
      (a / (Math.ceil(parent.width()) * Math.ceil(parent.height()))) * 100 >
      70
    ) {
      if (inaa) {
        clearInterval(inaa);
        inaa = null;
      }
      parent.hide();
    } // 70퍼센트 이상 삭제
  }
}); // end
