var app = app || {};
$(function() {
  'use strict';

  app.FoodEntryList = Backbone.Firebase.Collection.extend({

    model: app.FoodEntry,
    autoSync:false,

    initialize: function(models, options) {
      this.id = options.id;
    },

    url: function() {
      return 'https://flickering-torch-1240.firebaseio.com/food/' + this.id;
    },

    dailyTotalCalories: function() {
      if (this.length === 0)
        return 0;
      return this.reduce(function(memo, value) {
        return memo + value.get('nf_calories');
      }, 0);
    },

    dailyTotalFat: function() {
      if (this.length === 0)
        return 0;
      return this.reduce(function(memo, value) {
        return memo + value.get('nf_total_fat');
      }, 0);
    }
  });
});