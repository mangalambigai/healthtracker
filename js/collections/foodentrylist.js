var app = app || {};
$(function() {
  'use strict';

  app.FoodEntryList = Backbone.Collection.extend({

    model: app.FoodEntry,

    localStorage: new Backbone.LocalStorage('healthtracker'),

    setDate: function(date) {
      this.localStorage = new Backbone.LocalStorage('healthtracker' + date);
    },

    dailyTotal: function() {
      return this.reduce(function(memo, value) {
        return memo + value.get('nf_calories');
      }, 0);
    }
  });
  app.foodEntries = new app.FoodEntryList();
});