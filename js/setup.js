'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var WIZARDS_NUM = 4;

var showSetupBlock = function () {
  userDialog.classList.remove('hidden');
};

var generateName = function () {
  return WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)];
};

var generateCoatColor = function () {
  return COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
};

var generateEyesColor = function () {
  return EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
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
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

generateWizards();
applyWizards();
showWizardsBlock();
showSetupBlock();
