'use strict';
window.setup = (function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var randomWizzArr = [];
  var form = window.dialog.setupPopup.querySelector('.setup-wizard-form');
  var similarListElement = window.dialog.setupPopup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var MIN_NAME_LENGTH = 2;
  var userNameInput = window.dialog.setupPopup.querySelector('.setup-user-name');
  var setupPlayer = window.dialog.setupPopup.querySelector('.setup-player');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupWizardFireBall = setupPlayer.querySelector('.setup-fireball-wrap');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var showWizardsBlock = function () {
    window.dialog.setupPopup.querySelector('.setup-similar').classList.remove('hidden');
  };

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_NAME_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('keydown', function (evt) {
    window.util.doEscEvent(evt, function () {
      evt.preventDefault();
      evt.stopPropagation();
    });
  });

  var colorizePlayer = function () {
    window.colorize.colorize(setupWizardCoat, setupPlayer);
    window.colorize.colorize(setupWizardEyes, setupPlayer);
    window.colorize.colorize(setupWizardFireBall, setupPlayer);
  };

  colorizePlayer();

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      window.dialog.setupPopup.classList.add('hidden');
    }, errorHandler);
  });

  var genRandomWizzArr = function (wizards) {
    if (!wizards.length) {
      return;
    }

    var randomWizz = wizards[Math.floor(Math.random() * wizards.length)];
    while (randomWizzArr.length < MAX_SIMILAR_WIZARD_COUNT) {
      if (randomWizzArr.indexOf(randomWizz) === -1) {
        randomWizzArr.push(randomWizz);
      } else {
        wizards.splice(wizards.indexOf(randomWizz), 1);
        genRandomWizzArr(wizards);
      }
    }
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    genRandomWizzArr(wizards);
    for (var i = 0; i < randomWizzArr.length; i++) {
      fragment.appendChild(renderWizard(randomWizzArr[i]));
    }
    similarListElement.appendChild(fragment);

    showWizardsBlock();
  };

  window.backend.load(successHandler, errorHandler);
})();
