'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];
var setupPopup = document.querySelector('.setup');
var similarListElement = setupPopup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var WIZARDS_NUM = 4;
var MIN_NAME_LENGTH = 2;
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupPopup.querySelector('.setup-close');
var userNameInput = setupPopup.querySelector('.setup-user-name');
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var setupPlayer = setupPopup.querySelector('.setup-player');
var setupWizard = setupPlayer.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireBall = setupPlayer.querySelector('.setup-fireball-wrap');

var generateName = function () {
  return WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)];
};

var generateCoatColor = function () {
  return COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
};

var generateEyesColor = function () {
  return EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
};

var generateFireBallColor = function () {
  return FIREBALL_COLOR[Math.floor(Math.random() * FIREBALL_COLOR.length)];
};

var generateWizards = function () {
  for (var i = 0; i < WIZARDS_NUM; i++) {
    wizards.push({
      name: generateName(),
      coatColor: generateCoatColor(),
      eyesColor: generateEyesColor(),
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
  setupPopup.querySelector('.setup-similar').classList.remove('hidden');
};

setupOpen.addEventListener('click', function () {
  setupPopup.classList.remove('hidden');
});

setupClose.addEventListener('click', function () {
  setupPopup.classList.add('hidden');
});

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
    target.setCustomValidity(
        'Имя должно состоять минимум из ' +
      MIN_NAME_LENGTH +
      '-х символов'
    );
  } else {
    target.setCustomValidity('');
  }
});

var onPopupEscPress = function (evt) {
  if ((evt.target && evt.target.className !== 'setup-user-name') && evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setupPopup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

setupWizardCoat.addEventListener('click', function () {
  var color = generateCoatColor();
  setupWizardCoat.style.fill = color;
  setupPlayer.querySelector('input[name="coat-color"]').value = color;
});

setupWizardEyes.addEventListener('click', function () {
  var color = generateEyesColor();
  setupWizardEyes.style.fill = color;
  setupPlayer.querySelector('input[name="eyes-color"]').value = color;
});

setupWizardFireBall.addEventListener('click', function () {
  var color = generateFireBallColor();
  setupWizardFireBall.style.background = color;
  setupPlayer.querySelector('input[name="fireball-color"]').value = color;
});

generateWizards();
applyWizards();
showWizardsBlock();
