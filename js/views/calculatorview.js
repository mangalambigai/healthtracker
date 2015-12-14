var app = app || {};

$(function() {
  'use strict';

  app.CalculatorView = Backbone.View.extend({
    el:'#profile-section',

    initialize: function() {
      this.$formAge = $('#formAge');
      this.$formWeight = $('#formWeight');
      this.$formHeight = $('#formHeight');
      this.$formGender = $('#formGender');
      this.$formActivity = $('#formActivity');
      this.$bmr = $('#bmr');
      this.$calorie = $('#calorie');
    },

    events: {
      'click #calculate':'calculate'
    },

    calculate: function() {
 //men BMR = 66 + ( 6.2 x weight in pounds ) + ( 12.7 x height in inches ) – ( 6.76 x age in years )
//women BMR = 655.1 + ( 4.35 x weight in pounds ) + ( 4.7 x height in inches ) - ( 4.7 x age in years )
      var bmr = 0;
      if (this.$formGender.val()=='M')
      {
        bmr = 66 +
          6.2 * Number(this.$formWeight.val()) +
          12.7 * Number(this.$formHeight.val()) -
          6.76 * Number(this.$formAge.val());
      }
      else
      {
        bmr = 655.1 +
          4.35 * Number(this.$formWeight.val()) +
          4.7 * Number(this.$formHeight.val()) -
          4.7 * Number(this.$formAge.val());
      }
      this.$bmr.html(bmr);

      var calorie = bmr* this.$formActivity.val();
      this.$calorie.html(calorie);
    }
  });
});
