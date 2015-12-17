var app = app || {};
$(function() {
  'use strict';

  /**
   * Represents the collection of Food entries in firebase
   * There is a collection for every day
   **/
  app.FoodEntryList = Backbone.Firebase.Collection.extend({

    model: app.FoodEntry,
    autoSync: false,

    /**
     * Initializes the collection
     * @param: {models} - this is going to be empty, we just want the date in options.id
     * @param: {options} - this is going to have the date in options.id
     **/
    initialize: function(models, options) {
      this.id = options.id;
    },

    /**
     * Url for the date
     **/
    url: function() {
      return 'https://flickering-torch-1240.firebaseio.com/food/' + this.id;
    },

    /**
     * Calculates the total calories
     **/
    dailyTotalCalories: function() {
      if (this.length === 0)
        return 0;
      return this.reduce(function(memo, value) {
        return memo + value.get('nf_calories');
      }, 0);
    },

    /**
     * Calculates the total fat in grams
     **/
    dailyTotalFat: function() {
      if (this.length === 0)
        return 0;
      return this.reduce(function(memo, value) {
        return memo + value.get('nf_total_fat');
      }, 0);
    }
  });
});