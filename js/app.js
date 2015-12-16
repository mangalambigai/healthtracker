var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function() {
  'use strict';

  app.getFormattedDate = function(date) {
    var m = (new Number(date.getMonth()) + 1);
    if (m < 10)
      m = '0' + m;
    var d = date.getDate();
    if (d < 10)
      d = '0' + d;
    var ret = date.getFullYear() + '-' + m + '-' + d;
    return ret;
  };

  // kick things off by creating the `App`
  new app.AppView();
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(app.dayTotalListView.initializeCharts);
});