var app = app || {};

$(function() {
  'use strict';
  app.FoodEntryView = Backbone.View.extend({

    //... is a tr tag.
    tagName: 'tr',

    template: _.template($('#foodentry-template').html()),

    events: {
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-render the item.
    render: function() {
      if (this.model.changed.id !== undefined) {
        return;
      }

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});