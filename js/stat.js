'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 20;
  var TEXT_WIDTH = 50;
  var COLUMN_WIDTH = 40;
  var HIST_HEIGHT = 150;
  var CLOUD_GAP = 10;
  var COLUMN_GAP = 50;
  var MESSAGE_OFFSET = 30;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';

    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + MESSAGE_OFFSET);
    ctx.fillText('Список результатов: ', CLOUD_X + 2 * GAP, CLOUD_Y + MESSAGE_OFFSET + FONT_GAP);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = 'black';
      ctx.fillText(names[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + TEXT_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y);

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
      }

      ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + TEXT_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y - FONT_GAP, COLUMN_WIDTH, -(HIST_HEIGHT * times[i]) / maxTime);
      ctx.fillStyle = 'black';
      ctx.fillText(parseInt(times[i], 10), CLOUD_X + COLUMN_GAP + (COLUMN_GAP + TEXT_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y - FONT_GAP - (HIST_HEIGHT * times[i]) / maxTime - 10);
    }
  };
})();
