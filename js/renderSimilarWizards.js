'use strict';
(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarListElement = window.dialog.setupPopup.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var element = similarWizardTemplate.content.cloneNode(true);

    var wizardElement = element.querySelector('.wizard');
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    element.querySelector('.setup-similar-label').innerText = wizard.name;

    return element;
  };

  var showWizardsBlock = function () {
    window.dialog.setupPopup.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.renderSimilarWizard = function (data) {
    var takeNumber = data.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }

    showWizardsBlock();
  };
})();
