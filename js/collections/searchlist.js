var app = app || {};
var nutritionixParams = '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=9b2a5194&appKey=51644adf0e04c084cbeb947465c2b102';
var nutritionixUrl = 'https://api.nutritionix.com/v1_1/search/';

$(function() {
  'use strict';
  app.SearchList = Backbone.Collection.extend({
    model: app.SearchItem,
    url: nutritionixUrl + nutritionixParams,
    parse: function(response) {
      return response.hits;
    },
    setSearchString(text) {
      this.url= nutritionixUrl + text + nutritionixParams;
    }
  });
});
