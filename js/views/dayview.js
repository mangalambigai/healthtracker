var app = app || {};

$(function() {
  'use strict';
  app.DayView = Backbone.View.extend({
    el: '#daysection',
    initialize: function() {
      this.$list = $('#foodlist');
      this.$date = $('#date');
      this.collection = app.foodEntries;
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      this.listenTo(this.collection, 'add', this.addOne);
    },
    render: function() {
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    // Add a single item to the list by creating a view for it, and
    // appending its element to the <ul>.
    addOne: function(data) {
      var view = new app.FoodEntryView({
        model: data
      });
      this.$list.append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      this.$list.html('<tr><th>Item Name</th><th>Calories</th><th>Quantity</th><th>Unit</th><th>Fat</th></tr>');
      this.collection.each(this.addOne, this);
    }

    //TODO: save the day's data

  });
});