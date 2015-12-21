var app = app || {};

$(function() {
  'use strict';

  /**
   * Represents a single food entry in the 'DailyView' tab
   **/
  app.FoodEntryView = Backbone.View.extend({

    //... is a tr tag.
    tagName: 'tr',

    template: _.template($('#foodentry-template').html()),

    events: {
      'click #btndel': 'deleteItem'
    },

    /**
     * Initializes the food entry view
     **/
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    /**
     * Deletes the food Item
     **/
    deleteItem: function() {
      app.foodListView.removeFood(this.model);
    },

    /**
     * Re-render the item
     **/
    render: function() {
      if (this.model.changed.id !== undefined) {
        return;
      }

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});