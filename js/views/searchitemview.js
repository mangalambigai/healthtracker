var app = app || {};

$(function() {
  'use strict';
  app.SearchItemView = Backbone.View.extend({
    //... is a tr tag.
    tagName: 'tr',

    // Cache the template function for a single item.
    template: _.template($('#searchresult-template').html()),
    // The DOM events specific to an item.
    events: {
      'click': 'selectRow',
      'dblclick': 'addItem',
      'click #btnadd': 'addItem'
    },

    // The View listens for changes to its model, re-rendering.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    selectRow: function() {
      this.$el.addClass('highlight').siblings().removeClass('highlight');
    },

    addItem: function() {
      app.foodListView.addFood(this.model);
      app.searchView.hide();
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