var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function() {
  'use strict';

  /**
   * Converts a date to string in YYYY-MM-DD format
   * @param - {date}
   **/
  app.getFormattedDate = function(date) {

    //getMonth returns 0 based index, so add 1
    var m = (Number(date.getMonth()) + 1);

    //if month < 10, add a padding 0
    if (m < 10)
      m = '0' + m;

    //if date < 0, add a padding 0
    var d = date.getDate();
    if (d < 10)
      d = '0' + d;

    var ret = date.getFullYear() + '-' + m + '-' + d;
    return ret;
  };

  // kick things off by creating the `App`
  app.appView = new app.AppView();

  //load google chart
  google.charts.load('current', {
    packages: ['corechart']
  });

  //call initializeCharts when google charts are loaded.
  google.charts.setOnLoadCallback(app.dayTotalListView.initializeCharts);

});