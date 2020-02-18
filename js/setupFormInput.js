'use strict';
window.setup = (function () {
  var form = window.dialog.setupPopup.querySelector('.setup-wizard-form');

  var MIN_NAME_LENGTH = 2;
  var userNameInput = window.dialog.setupPopup.querySelector('.setup-user-name');

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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.savePlayerWizard(new FormData(form), function () {
      window.dialog.setupPopup.classList.add('hidden');
    }, window.util.errorHandler);
  });

})();
