var app = app || {};

$(function() {
  /**
   * Model representing age, height, weight, bmi, bmr, calorie need in firebase
   **/
  app.PersonDetails = Backbone.Firebase.Model.extend({
    url: "https://flickering-torch-1240.firebaseio.com/persondetails"
  });
});