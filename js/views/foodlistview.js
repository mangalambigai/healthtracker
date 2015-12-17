var app = app || {};

$(function() {
  'use strict';

  /**
   * View for the list of food entries in 'Daily View' tab
   **/
  app.FoodListView = Backbone.View.extend({
    el: '#daysection',

    /**
     * Initializes the view
     * @param: {object} - has the date to start with
     **/
    initialize: function(param) {
      this.$list = $('#foodlist');
      this.$date = $('#date');
      this.$totalcalories = $('#totalcalories');

      this.date = param.date;

      this.collection = new app.FoodEntryList(null, {
        id: this.date
      });

      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      this.listenTo(this.collection, 'add', this.addOne);

      //fetch throws error if the collection is not present,
      this.collection.fetch({
        error: function(model, response, options) {
          console.log('Food list error: response: ' + response);
        }
      });
    },

    events: {
      'click #addMore': 'addMore'
    },

    /**
     * Re-renders the list in 'Daily View'
     **/
    render: function() {
      this.$date.html(this.date);
      this.$totalcalories.html(Math.round(this.collection.dailyTotalCalories()));
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    /**
     * Shows the search view
     **/
    addMore: function() {
      app.searchView.show();
    },

    /**
     * Adds a single item to the list by creating a view for it, and
     * appending its element to the <table>.
     * @param: {data}
     **/
    addOne: function(data) {
      if (this.$list.html().trim().length == 0)
        this.$list.html('<tr><th>Item Name</th><th>Calories</th><th class="hidden-xs">Quantity</th><th  class="hidden-xs">Unit</th><th class="hidden-xs">Fat</th></tr>');

      var view = new app.FoodEntryView({
        model: data
      });
      this.$list.append(view.render().el);
    },

    /**
     * Adds all items in the collection at once.
     **/
    addAll: function() {
      this.$list.html('<tr><th>Item Name</th><th>Calories</th><th class="hidden-xs">Quantity</th><th  class="hidden-xs">Unit</th><th class="hidden-xs">Fat</th></tr>');
      this.collection.each(this.addOne, this);
    },

    /**
     * Creates a new Collection for the date
     * @param: {string} date in the YYYY-MM-DD format
     **/
    setDate: function(date) {
      this.date = date;

      this.$list.html('<tr><th>Item Name</th><th>Calories</th><th class="hidden-xs">Quantity</th><th  class="hidden-xs">Unit</th><th class="hidden-xs">Fat</th></tr>');
      this.$totalcalories.html('');
      this.$date.html('');

      this.collection = new app.FoodEntryList([], {
        id: this.date
      });
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      this.listenTo(this.collection, 'add', this.addOne);

//TODO: check: may be there is no need to create the date entry here!
      if (!app.dayTotalList.get(this.date))
        app.dayTotalList.create({
          id: this.date,
          calories: 0
        });
      else
        this.collection.fetch({
          reset: true,
          error: this.fetchError
        });
    },

    fetchError: function(collection, response, options) {
      console.log(response);
      console.log(options);
      console.log(collection);
    },

    /**
     * Adds a food from the search list to the current day's food entry list
     * Also updates the total calories and fat in the daily total collection
     * @param: {object} - Food item to add to the collection
     **/
    addFood: function(searchmodel) {
      this.collection.create({
        brand_name: searchmodel.get('brand_name'),
        item_id: searchmodel.get('item_id'),
        item_name: searchmodel.get('item_name'),
        nf_calories: searchmodel.get('nf_calories'),
        nf_serving_size_qty: searchmodel.get('nf_serving_size_qty'),
        nf_serving_size_unit: searchmodel.get('nf_serving_size_unit'),
        nf_total_fat: searchmodel.get('nf_total_fat'),
      });

      app.dayTotalList.set({
        id: this.date,
        calories: this.collection.dailyTotalCalories(),
        fat: this.collection.dailyTotalFat()
      }, {
        remove: false
      });
    }
  });
});