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
      'click':'selectRow',
      'dblclick':'addItem',
      'click #btnadd':'addItem'
    },

    // The View listens for changes to its model, re-rendering.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    selectRow: function(){
      this.$el.addClass('highlight').siblings().removeClass('highlight');
    },

    addItem: function(){
      app.foodEntries.create({
        item_name: this.model.get('item_name'),
        nf_calories: this.model.get('nf_calories'),
        nf_serving_size_qty: this.model.get('nf_serving_size_qty'),
        nf_serving_size_unit: this.model.get('nf_serving_size_unit'),
        nf_total_fat: this.model.get('nf_total_fat'),
      });
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