var app = app || {};

$(function() {
  'use strict';
  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  app.AppView = Backbone.View.extend({
    el: '#foodApp',
    initialize: function() {
      app.personDetails = new app.PersonDetails();
      app.calculatorView = new app.CalculatorView({
        model: app.personDetails
      });

      app.searchView = new app.SearchView();
      app.searchView.hide();
      app.$date = $('#dateinput');
      var todaysDate = this.today();
      app.$date.val(todaysDate);
      app.dayTotalList = new app.DayTotalList();

      app.dayTotalListView = new app.DayTotalListView();

      app.foodListView = new app.FoodListView({
        date: todaysDate
      });
    },

    events: {
      'change #dateinput': 'dateChanged'
    },
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    dateChanged: function() {
      app.foodListView.setDate(app.$date.val());
      app.searchView.hide();
    },

    today: function() {
      return app.getFormattedDate(new Date());
    }
  });
});