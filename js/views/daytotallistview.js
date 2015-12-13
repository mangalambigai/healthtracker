app = app || {};

$(function() {
  'use strict';
  app.DayTotalListView = Backbone.View.extend({

    el: $('#daytotal-section'),

    initialize: function() {
      this.$list = this.$('#daytotal-list');
      this.collection = app.dayTotalList;
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'all', this.render);
    },

    render: function() {
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    addAll: function() {
      this.$list.html('<tr><th>Date</th><th>Calories</th></tr>');
      this.collection.each(this.addOne, this);
    },

    addOne: function(daytotal) {
      //since daytotallist is an autoSync collection, addAll doesnt get fired,
      //set the table header manually
      var listtext = this.$list.html();
      if (!listtext || listtext.trim().length === 0) {
        this.$list.html('<tr><th>Date</th><th>Calories</th></tr>');
      }
      var view = new app.DayTotalView({
        model: daytotal
      });
      this.$list.append(view.render().el);
    }
  });
});