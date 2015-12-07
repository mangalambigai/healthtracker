/**
 * Polyfill for Array.reduce
 */
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback /*, initialValue*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
/**
 * Polyfill ends
 */
var app = app || {};

$(function() {
  'use strict';
  app.DayView = Backbone.View.extend({
    el: '#daysection',
    initialize: function() {
      this.$list = $('#foodlist');
      this.$date = $('#date');
      this.$totalcalories = $('#totalcalories');
      this.collection = app.foodEntries;
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      this.listenTo(this.collection, 'add', this.addOne);
      this.collection.fetch();
    },
    render: function() {
      this.$date.html(new Date().toDateString());
      var totalCalories = 0;
      if (app.foodEntries && app.foodEntries.length>0)
      {
        totalCalories = app.foodEntries.pluck('nf_calories').reduce(function(prev, curr) {
          return prev + curr;
        });
      }
      this.$totalcalories.html(Math.round(totalCalories));
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    // Add a single item to the list by creating a view for it, and
    // appending its element to the <ul>.
    addOne: function(data) {
      var view = new app.FoodEntryView({
        model: data
      });
      this.$list.append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      this.$list.html('<tr><th>Item Name</th><th>Calories</th><th>Quantity</th><th>Unit</th><th>Fat</th></tr>');
      this.collection.each(this.addOne, this);
    }

    //TODO: save the day's data

  });
});