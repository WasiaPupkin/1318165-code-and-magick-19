'use strict';
(function () {
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizardElement = document.querySelector('.setup-wizard');
  var setupPlayer = window.dialog.setupPopup.querySelector('.setup-player');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var setupWizardFireBall = setupPlayer.querySelector('.setup-fireball-wrap');

  var playerWizard = {
    defaultCoatColor: wizardCoatElement.style.fill,
    defaultEyesColor: wizardEyesElement.style.fill,
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  wizardCoatElement.addEventListener('click', function () {
    var newColor = getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = newColor;
    playerWizard.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = getRandomElement(EYES_COLORS);
    wizardEyesElement.style.fill = newColor;
    playerWizard.onEyesChange(newColor);
  });

  setupWizardFireBall.addEventListener('click', function () {
    setupWizardFireBall.style.backgroundColor = getRandomElement(FIREBALL_COLOR);
  });

  window.playerWizard = playerWizard;
})();
