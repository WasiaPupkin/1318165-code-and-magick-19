'use strict';
window.setup = (function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var wizards = [];
  var similarListElement = window.dialog.setupPopup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var WIZARDS_NUM = 4;
  var MIN_NAME_LENGTH = 2;
  var userNameInput = window.dialog.setupPopup.querySelector('.setup-user-name');
  var setupPlayer = window.dialog.setupPopup.querySelector('.setup-player');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupWizardFireBall = setupPlayer.querySelector('.setup-fireball-wrap');

  var generateName = function () {
    return WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)];
  };

  var generateWizards = function () {
    for (var i = 0; i < WIZARDS_NUM; i++) {
      wizards.push({
        name: generateName(),
        coatColor: window.colorize.getRandomCoatColor(),
        eyesColor: window.colorize.getRandomEyesColor(),
      });
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var getWizardsFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return fragment;
  };

  var applyWizards = function () {
    similarListElement.appendChild(getWizardsFragment());
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

  generateWizards();
  applyWizards();
  colorizePlayer();
  showWizardsBlock();

})();
