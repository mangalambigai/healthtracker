var app = app || {};
var nutritionixParams = '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=9b2a5194&appKey=51644adf0e04c084cbeb947465c2b102';
var nutritionixUrl = 'https://api.nutritionix.com/v1_1/search/';

$(function() {
  'use strict';

  /**
   * Represents the response from Nutritionix
   **/
  app.SearchList = Backbone.Collection.extend({
    model: app.SearchItem,
    url: nutritionixUrl + nutritionixParams,

    /**
     * Gets just the food items from the response
     * Nutritionix data is nested in a 'hits' node
     * @param: {response} - data from nutritionix
     **/
    parse: function(response) {
      return response.hits;
    },

    /**
     * Updates the url with search text
     * @param {string} - text to be searched
     **/
    setSearchString: function(text) {
      this.url = nutritionixUrl + text + nutritionixParams;
    }
  });
});