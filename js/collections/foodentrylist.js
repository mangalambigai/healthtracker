var app = app || {};
$(function() {
  'use strict';

  app.FoodEntryList = Backbone.Collection.extend({

    model: app.FoodEntry,

    dailyTotal: function() {
      return this.reduce(function(memo, value) {
        return memo + value.get('nf_calories');
      }, 0);
    }
  });
});