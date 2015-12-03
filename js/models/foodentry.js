var app = app || {};

$(function() {
  app.FoodEntry = Backbone.Model.extend({
    item_name: '',
    nf_calories: 0,
    nf_serving_size_qty: 1,
    nf_serving_size_unit: "serving",
    nf_total_fat: 0
    /*,
    //Default food entry attribute value
    defaults: {
      item_name:'test'
    },
    initialize: function() {
    },
    validate: function(attributes) {
    }*/
  });
});