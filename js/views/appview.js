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
      app.searchView.hide();
      app.$date = $('#dateinput');
      var todaysDate = this.today();
      app.$date.val(todaysDate);
      app.dayView = new app.DayView({date:todaysDate});
    },

    events: { 'change #dateinput': 'dateChanged'},
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    dateChanged: function() {
      app.dayView.setDate(app.$date.val());
    },

    today: function() {
      var vtoday = new Date();
      var mon = (new Number(vtoday.getMonth()) + 1);
      if (mon<10)
        mon = '0'+mon;
      var date = vtoday.getDate();
      if (date<10)
        date = '0'+date;
      var ret = vtoday.getFullYear() + '-' + mon + '-' +date;
      console.log(ret);
      return ret;
    }
  });
});