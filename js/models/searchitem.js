var app = app || {};

$(function() {
  'use strict';
  /**
   * Model representing a single search item from nutritionix
   **/
  app.SearchItem = Backbone.Model.extend({
    item_name: '',
    nf_calories: 0,
    nf_serving_size_qty: 1,
    nf_serving_size_unit: 'serving',
    nf_total_fat: 0,

    parse: function(data, options) {
      return data.fields;
    }
  });
});