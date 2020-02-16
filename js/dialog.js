'use strict';

window.dialog = (function () {
  var setupPopup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupPopup.querySelector('.setup-close');
  var defaultCoords = {};
  var dialogHandler = setupPopup.querySelector('.upload');
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  setupOpen.addEventListener('click', function () {
    setupPopup.classList.remove('hidden');
  });

  setupClose.addEventListener('click', function () {
    setupPopup.classList.add('hidden');
  });

  var onPopupEscPress = function (evt) {
    window.util.doEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    setupPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    defaultCoords.x = setupPopup.style.left;
    defaultCoords.y = setupPopup.style.top;
  };

  var closePopup = function () {
    setupPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupPopup.style.left = defaultCoords.x;
    setupPopup.style.top = defaultCoords.y;
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.doEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.doEnterEvent(evt, closePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupPopup.style.top = (setupPopup.offsetTop - shift.y) + 'px';
      setupPopup.style.left = (setupPopup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  shopElement.addEventListener('dragstart', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'img') {
      draggedItem = target;
      evt.dataTransfer.setData('text/plain', target.alt);
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    var target = evt.target;
    target.style.backgroundColor = '';
    target.appendChild(draggedItem);
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  return {
    setupPopup: setupPopup
  };
})();
