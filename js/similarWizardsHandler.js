'use strict';
(function () {
  var playerCoatColor = window.playerWizard.defaultCoatColor;
  var playerEyesColor = window.playerWizard.defaultEyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === playerCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === playerEyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateSimilarWizards = function () {
    window.renderSimilarWizard(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  window.playerWizard.onEyesChange = window.debounce(function (color) {
    playerEyesColor = color;
    updateSimilarWizards();
  });

  window.playerWizard.onCoatChange = window.debounce(function (color) {
    playerCoatColor = color;
    updateSimilarWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    updateSimilarWizards();
  };

  window.backend.loadSimilar(successHandler, window.util.errorHandler);
})();
