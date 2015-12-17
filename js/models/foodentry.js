var app = app || {};

$(function() {
  /**
   * Model representing a single food entry in firebase
   **/
  app.FoodEntry = Backbone.Model.extend({

    initialize: function() {
      item_name = '';
      nf_calories = 0;
      nf_serving_size_qty = 1;
      nf_serving_size_unit = "serving";
      nf_total_fat = 0;
    }
  });
});