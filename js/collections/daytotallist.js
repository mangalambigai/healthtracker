var app = app || {};
$(function() {
  'use strict';

  app.DayTotalList = Backbone.Firebase.Collection.extend({
    model: app.DayTotal,
    url: 'https://flickering-torch-1240.firebaseio.com/food'
  });
});