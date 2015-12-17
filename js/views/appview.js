var app = app || {};

$(function() {
  'use strict';

  /**
   * Overall view of the application - Top piece of UI
   **/
  app.AppView = Backbone.View.extend({

    el: '#foodApp',

    /**
     * Initializes the AppView
     * Creates the views for the tabs
     **/
    initialize: function() {

      //personDetails is the model for calorie needs calculator
      app.personDetails = new app.PersonDetails();
      app.calculatorView = new app.CalculatorView({
        model: app.personDetails
      });

      //create and hide searchview
      app.searchView = new app.SearchView();
      app.searchView.hide();

      //we are going to start with today's date
      app.$date = $('#dateinput');
      var todaysDate = this.today();
      app.$date.val(todaysDate);

      //create the dayTotalList - this is the summary tab
      app.dayTotalList = new app.DayTotalList();
      app.dayTotalListView = new app.DayTotalListView();

      //create food list, initialize with today's date
      app.foodListView = new app.FoodListView({
        date: todaysDate
      });
    },

    events: {
      'change #dateinput': 'dateChanged'
    },

    /**
     * Renders the app
     */
    render: function() {
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    /**
     * Calls foodListView to set the chosen date
     **/
    dateChanged: function() {
      app.foodListView.setDate(app.$date.val());
      app.searchView.hide();
    },

    /**
     * returns todays date in YYYY-MM-DD format
     */
    today: function() {
      return app.getFormattedDate(new Date());
    }
  });
});