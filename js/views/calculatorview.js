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
      this.$bmi = $('#bmi');

      this.listenTo(this.model, 'change', this.render);
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
      var age = Number(this.$formAge.val());
      var height = Number(this.$formHeight.val());
      var weight = Number(this.$formWeight.val());
      var gender = this.$formGender.val();
      var activity = this.$formActivity.val();

      var bmi = (weight * 703) / (height * height);

      var bmr = (gender == 'M') ?
        (66 + 6.2 * weight + 12.7 * height - 6.76 * age) :
        (655.1 + 4.35 * weight + 4.7 * height - 4.7 * age);

      this.$bmi.html(bmi);
      this.$bmr.html(Math.round(bmr));

      var calorie = bmr * activity;
      this.$calorie.html(Math.round(calorie));

      this.model.set('age', age);
      this.model.set('height', height);
      this.model.set('weight', weight);
      this.model.set('gender', gender);
      this.model.set('activity', activity);
      this.model.set('bmi', bmi);
      this.model.set('bmr', bmr);
      this.model.set('calorie', calorie);
    },

    render: function() {
      this.$formAge.val(this.model.get('age'));
      this.$formHeight.val(this.model.get('height'));
      this.$formWeight.val(this.model.get('weight'));
      this.$formGender.val(this.model.get('gender'));
      this.$formActivity.val(this.model.get('activity'));
      this.$bmr.html(Math.round(this.model.get('bmr')));
      this.$bmi.html(Math.round(this.model.get('bmi')));
      this.$calorie.html(Math.round(this.model.get('calorie')));
    }
  });
});
