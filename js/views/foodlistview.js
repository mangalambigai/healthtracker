var app = app || {};

$(function() {
  'use strict';
  app.FoodListView = Backbone.View.extend({
    el: '#daysection',
    initialize: function(param) {
      this.$list = $('#foodlist');
      this.$date = $('#date');
      this.$totalcalories = $('#totalcalories');

      this.date = param.date;

      if(!app.dayTotalList.get(this.date))
        app.dayTotalList.create({id: this.date, calories: 0});

      this.collection = new app.FoodEntryList(null,{id:this.date});

      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      this.listenTo(this.collection, 'add', this.addOne);
      this.collection.fetch();
    },

    events: {
      'click #addMore':'addMore'
    },

    render: function() {
      this.$date.html(this.date);
      this.$totalcalories.html(Math.round(this.collection.dailyTotal()));
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    addMore: function() {
      app.searchView.show();
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
      this.$list.html('<tr><th>Item Name</th><th>Calories</th><th class="xshide">Quantity</th><th  class="xshide">Unit</th><th class="xshide">Fat</th></tr>');
      this.collection.each(this.addOne, this);
    },

    setDate: function(date) {
      this.date = date;

      this.$list.html('<tr><th>Item Name</th><th>Calories</th><th class="xshide">Quantity</th><th  class="xshide">Unit</th><th class="xshide">Fat</th></tr>');
      this.$totalcalories.html('');
      this.$date.html('');

      this.collection = new app.FoodEntryList([],{id:this.date});
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      this.listenTo(this.collection, 'add', this.addOne);

      if (!app.dayTotalList.get(this.date))
        app.dayTotalList.create({id: this.date, calories:0 });

      this.collection.fetch({reset: true, error: this.fetchError});
    },

    fetchError: function(collection, response, options){
      console.log(response);
      console.log(options);
      console.log(collection);
    },

    addFood: function(searchmodel) {
        this.collection.create({
        item_name: searchmodel.get('item_name'),
        nf_calories: searchmodel.get('nf_calories'),
        nf_serving_size_qty: searchmodel.get('nf_serving_size_qty'),
        nf_serving_size_unit: searchmodel.get('nf_serving_size_unit'),
        nf_total_fat: searchmodel.get('nf_total_fat'),
      });
      app.dayTotalList.set({id: this.date, calories:this.collection.dailyTotal()}, {remove: false});
    }
  });
});