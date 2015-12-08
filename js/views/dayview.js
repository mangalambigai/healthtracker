var app = app || {};

$(function() {
  'use strict';
  app.DayView = Backbone.View.extend({
    el: '#daysection',
    initialize: function() {
      this.date = '';
      this.$list = $('#foodlist');
      this.$date = $('#date');
      this.$totalcalories = $('#totalcalories');
      this.collection = app.foodEntries;
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      this.listenTo(this.collection, 'add', this.addOne);
      this.collection.fetch();
    },
    render: function() {
      this.$date.html(this.date);
      this.$totalcalories.html(Math.round(app.foodEntries.dailyTotal()));
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
      console.log('addAll');
      this.$list.html('<tr><th>Item Name</th><th>Calories</th><th>Quantity</th><th>Unit</th><th>Fat</th></tr>');
      this.collection.each(this.addOne, this);
    },

    setDate: function(date) {
      this.date = date;
      this.collection.setDate(date);
      this.collection.fetch({reset: true});
      this.render();
    }

  });
});