var app = app || {};

$(function() {
  'use strict';

  app.CalculatorView = Backbone.View.extend({
    el:'#profile-section',

    initialize: function() {
      this.$rowAge = $('#rowAge');
      this.$rowWeight = $('#rowWeight');
      this.$rowHeight = $('#rowHeight');

      this.$formAge = $('#formAge');
      this.$formWeight = $('#formWeight');
      this.$formHeight = $('#formHeight');
      this.$formGender = $('#formGender');
      this.$formActivity = $('#formActivity');

      this.$bmr = $('#bmr');
      this.$calorie = $('#calorie');
    },

    events: {
      'click #calculate': 'calculate',
      'change #formAge': 'validateAge',
      'change #formWeight': 'validateWeight',
      'change #formHeight': 'validateHeight',
    },

    validateAge: function() {
      var age = Number(this.$formAge.val());
      if (age<1 || age>100)
      {
        this.$rowAge.removeClass('has-success');
        this.$rowAge.addClass('has-error');
      }
      else
      {
        this.$rowAge.removeClass('has-error');
        this.$rowAge.addClass('has-success');
      }
    },

    validateWeight: function() {
      var weight = Number(this.$formWeight.val());
      if (weight<1 || weight>1000)
      {
        this.$rowWeight.removeClass('has-success');
        this.$rowWeight.addClass('has-error');
      }
      else
      {
        this.$rowWeight.removeClass('has-error');
        this.$rowWeight.addClass('has-success');
      }
    },

    validateHeight: function() {
      var height = Number(this.$formHeight.val());
      if (height<1 || height>100)
      {
        this.$rowHeight.removeClass('has-success');
        this.$rowHeight.addClass('has-error');
      }
      else
      {
        this.$rowHeight.removeClass('has-error');
        this.$rowHeight.addClass('has-success');
      }
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
      this.$bmr.html(Math.round(bmr));

      var calorie = bmr* this.$formActivity.val();
      this.$calorie.html(Math.round(calorie));
    }
  });
});
