var app = app || {};

$(function() {
  app.PersonDetails = Backbone.Firebase.Model.extend({
    url: "https://flickering-torch-1240.firebaseio.com/persondetails"
  });
});