'use strict';

window.colorize = (function () {

  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var getRandomEyesColor = function () {
    return EYES_COLORS[Math.floor(EYES_COLORS.length * Math.random())];
  };

  var getRandomFireballColor = function () {
    return FIREBALL_COLOR[Math.floor(FIREBALL_COLOR.length * Math.random())];
  };

  var getRandomCoatColor = function () {
    return COAT_COLORS[Math.floor(COAT_COLORS.length * Math.random())];
  };

  var colorize = function (element, dialog) {
    element.addEventListener('click', function () {
      var color;
      if (element.classList.contains('wizard-coat')) {
        color = getRandomCoatColor();
        if (dialog) {
          dialog.querySelector('input[name="coat-color"]').value = color;
        }
      } else if (element.classList.contains('wizard-eyes')) {
        color = getRandomEyesColor();
        if (dialog) {
          dialog.querySelector('input[name="eyes-color"]').value = color;
        }
      } else if (element.classList.contains('setup-fireball-wrap')) {
        color = getRandomFireballColor();
        if (dialog) {
          dialog.querySelector('input[name="fireball-color"]').value = color;
        }
      }

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };

  return {
    colorize: colorize,
    getRandomEyesColor: getRandomEyesColor,
    getRandomFireballColor: getRandomFireballColor,
    getRandomCoatColor: getRandomCoatColor
  };
})();
