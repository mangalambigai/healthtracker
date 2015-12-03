var app = app || {};
$(function() {
  'use strict';

  app.FoodEntryList = Backbone.Collection.extend({
    model: app.FoodEntry,
    url:'',
    localStorage: new Backbone.LocalStorage('healthtracker')
  });
  app.foodEntries = new app.FoodEntryList();
});