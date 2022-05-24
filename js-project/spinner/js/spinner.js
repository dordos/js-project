$(function () {
  const spinnerBtn = document.querySelector('.spinnerBtn');
  const startGameButton = document.querySelector('#startGameButton');
  function spinnerControlsInit() {
    setSpinner();
  }

  function setSpinner() {
    var _spinnerArray = document.getElementsByClassName('spinner');
    for (var i = 0; i < _spinnerArray.length; i++) {
      createSpinner(_spinnerArray[i]);
    }

    function createSpinner(spinner) {
      spinner.item = document.createElement('div');
      spinner.item.setAttribute('class', 'item');
      spinner.item.style.visibility = 'hidden';
      spinner.appendChild(spinner.item);

      spinner.isSpin = false;
      spinner.maxSpin = 4;
      spinner.currentDeg = { rotate: 0 };

      spinner.spin = function () {
        spinner.item.style.visibility = 'visible';
        spinner.isSpin = true;
        var _randomNumber =
          Math.round(Math.random() * 360 + 1) *
          Math.round(Math.random() * spinner.maxSpin + 1);
        var tween1 = new TWEEN.Tween(spinner.currentDeg)
          .to({ rotate: _randomNumber }, 1000)
          .easing(TWEEN.Easing.Cubic.Out)
          .onUpdate(update)
          .onComplete(complete);

        tween1.start();
        animate();

        setTimeout(deg, 1000);

        function animate(time) {
          var id = requestAnimationFrame(animate);

          var result = TWEEN.update(time);

          if (!result) cancelAnimationFrame(id);
        }

        function update() {
          spinner.item.style.webkitTransform =
            'rotate(' + spinner.currentDeg.rotate + 'deg)';
          spinner.item.style.MozTransform =
            'rotate(' + spinner.currentDeg.rotate + 'deg)';
          spinner.item.style.msTransform =
            'rotate(' + spinner.currentDeg.rotate + 'deg)';
          spinner.item.style.OTransform =
            'rotate(' + spinner.currentDeg.rotate + 'deg)';
          spinner.item.style.transform =
            'rotate(' + spinner.currentDeg.rotate + 'deg)';
        }
        function deg() {
          //3점 학교
          if (
            (_randomNumber >= 0 && _randomNumber <= 35) ||
            (_randomNumber >= 351 && _randomNumber <= 396) ||
            (_randomNumber >= 710 && _randomNumber <= 756) ||
            (_randomNumber >= 1070 && _randomNumber <= 1115) ||
            (_randomNumber >= 1430 && _randomNumber <= 1475) ||
            _randomNumber >= 1790
          ) {
            console.log(`3점 학교`);
          }
          //1점 기타장소
          if (
            (_randomNumber >= 36 && _randomNumber <= 83) ||
            (_randomNumber >= 397 && _randomNumber <= 443) ||
            (_randomNumber >= 757 && _randomNumber <= 803) ||
            (_randomNumber >= 1116 && _randomNumber <= 1163) ||
            (_randomNumber >= 1476 && _randomNumber <= 1522)
          ) {
            console.log(`1점 기타장소`);
          }

          //3점 집
          if (
            (_randomNumber >= 84 && _randomNumber <= 128) ||
            (_randomNumber >= 444 && _randomNumber <= 488) ||
            (_randomNumber >= 804 && _randomNumber <= 848) ||
            (_randomNumber >= 1164 && _randomNumber <= 1208) ||
            (_randomNumber >= 1523 && _randomNumber <= 1568)
          ) {
            console.log(`3점 집`);
          }

          //2점 학교
          if (
            (_randomNumber >= 129 && _randomNumber <= 172) ||
            (_randomNumber >= 489 && _randomNumber <= 532) ||
            (_randomNumber >= 849 && _randomNumber <= 891) ||
            (_randomNumber >= 1209 && _randomNumber <= 1252) ||
            (_randomNumber >= 1569 && _randomNumber <= 1612)
          ) {
            console.log(`2점 학교`);
          }

          //4점 기타장소
          if (
            (_randomNumber >= 173 && _randomNumber <= 216) ||
            (_randomNumber >= 533 && _randomNumber <= 576) ||
            (_randomNumber >= 892 && _randomNumber <= 936) ||
            (_randomNumber >= 1253 && _randomNumber <= 1296) ||
            (_randomNumber >= 1613 && _randomNumber <= 1656)
          ) {
            console.log(`4점 기타장소`);
          }

          //4점 집
          if (
            (_randomNumber >= 217 && _randomNumber <= 260) ||
            (_randomNumber >= 577 && _randomNumber <= 620) ||
            (_randomNumber >= 937 && _randomNumber <= 980) ||
            (_randomNumber >= 1297 && _randomNumber <= 1339) ||
            (_randomNumber >= 1657 && _randomNumber <= 1699)
          ) {
            console.log(`4점 집`);
          }

          //1점 학교
          if (
            (_randomNumber >= 261 && _randomNumber <= 304) ||
            (_randomNumber >= 621 && _randomNumber <= 665) ||
            (_randomNumber >= 981 && _randomNumber <= 1024) ||
            (_randomNumber >= 1340 && _randomNumber <= 1384) ||
            (_randomNumber >= 1700 && _randomNumber <= 1744)
          ) {
            console.log(`1점 집`);
          }

          //2점 집
          if (
            (_randomNumber >= 305 && _randomNumber <= 350) ||
            (_randomNumber >= 666 && _randomNumber <= 709) ||
            (_randomNumber >= 1025 && _randomNumber <= 1069) ||
            (_randomNumber >= 1385 && _randomNumber <= 1429) ||
            (_randomNumber >= 1743 && _randomNumber <= 1789)
          ) {
            console.log(`2점 집`);
          }
        }

        function complete() {
          spinner.isSpin = false;
        }
      };
    }
  }

  startGameButton.addEventListener('click', function (event) {
    // var _target = event.currentTarget;
    spinnerBtn.style.display = 'none';

    var _spinner = document.getElementById('spinner1');
    _spinner.style.display = 'inline';

    if (!_spinner.isSpin) _spinner.spin();
  });

  spinnerControlsInit();
});
