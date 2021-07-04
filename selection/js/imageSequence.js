var first = false;
var img_arr = [];
var img_cnt = 0;
var int_v;

function setSequence(canvas, folder, file, totalFrame, type, dur, callback) {
  var base_time = totalFrame;

  canvas.context = canvas.getContext('2d');
  canvas.folder = folder;
  canvas.file = file;
  canvas.totalFrame = totalFrame;
  canvas.currentFrame = 0;

  canvas.callback = callback;

  canvas.fps = base_time / dur;

  canvas.image = new Image();
  canvas.width = canvas.scale
    ? canvas.offsetWidth * canvas.scale
    : canvas.offsetWidth;
  canvas.height = canvas.scale
    ? canvas.offsetHeight * canvas.scale
    : canvas.offsetHeight;

  if (!first) {
    for (var i = 1; i < canvas.totalFrame + 1; i++) {
      var _addText = '';
      if (i < 10) _addText = '000';
      else if (i < 100 && i > 9) _addText = '00';
      else if (i < 1000 && i > 99) _addText = '0';

      img_arr.push(new Image());

      img_arr[i - 1].onload = function () {
        img_cnt++;
        if (img_cnt == canvas.totalFrame) {
          first = true;
          canvas.playSequence();
        }
      };

      img_arr[i - 1].src =
        './images/' +
        canvas.folder +
        '/' +
        canvas.file +
        _addText +
        i +
        '.' +
        type;
    }
  } else canvas.playSequence();

  canvas.playSequence = function () {
    var stop = false;
    var fps, fpsInterval;
    // var int_v;

    function animate() {
      int_v = setInterval(function () {
        canvas.currentFrame = canvas.currentFrame + 1;
        if (canvas.currentFrame < canvas.totalFrame) {
          //속도 저하시 밑에 주석
          canvas.context.clearRect(0, 0, canvas.width, canvas.height);
          canvas.context.drawImage(
            img_arr[canvas.currentFrame - 1],
            0,
            0,
            canvas.width,
            canvas.height
          );
        } else {
          if (canvas.callback) canvas.callback();
          canvas.callback = null;

          // 종엽 추가
          first = false;
          img_arr = [];
          img_cnt = 0;

          clearInterval(int_v);
        }
      }, fpsInterval);
    }

    function startAnimating() {
      fpsInterval = 1000 / canvas.fps;
      animate();
    }
    startAnimating();
  };
}
