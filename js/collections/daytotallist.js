var app = app || {};
$(function() {
  'use strict';

  /**
   * Collection of Daily totals in firebase
   **/
  app.DayTotalList = Backbone.Firebase.Collection.extend({
    model: app.DayTotal,
    url: 'https://flickering-torch-1240.firebaseio.com/dates'
  });
});