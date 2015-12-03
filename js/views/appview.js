var app = app || {};

$(function() {
  'use strict';
  // The Application
  // ---------------


  // Our overall **AppView** is the top-level piece of UI.
  app.AppView = Backbone.View.extend({
    el: '#foodApp',
    initialize: function() {
      app.searchView = new app.SearchView();
      app.dayView = new app.DayView();
    },
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    }
  });
});