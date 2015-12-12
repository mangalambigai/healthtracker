var app = app || {};

$(function() {
  app.DayTotal = Backbone.Model.extend({
    //idAttribute: 'date',
    //urlRoot: 'https://flickering-torch-1240.firebaseio.com/dayEntry',
    initialize: function() {
      foodlist= new app.FoodEntryList();
    }
  });
});