var app = app || {};

$(function() {
  'use strict';

  /**
   * View for the Nutritionix Search
   **/
  app.SearchView = Backbone.View.extend({
    el: '#searchsection',
    $el: $(this.el),

    /**
     * Initializes the SearchView
     **/
    initialize: function() {
      this.$searchText = $('#searchText');
      this.$btnfind = $('#btnfind');
      this.$list = $('#searchresultlist');
      this.$header = $('#searchresult-header');
      this.collection = new app.SearchList();
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
    },

    // The DOM events specific to an item.
    events: {
      'click #btnfind': 'findFoods'
    },

    /**
     * Shows the SearchView, sets focus on the textbox
     **/
    show: function() {
      this.$searchText.val('');
      this.$list.html('');
      this.$el.show();
      this.$searchText.focus();
      //TODO: fix this, doesn't scrollIntoView!
      this.$searchText.get(0).scrollIntoView();
    },

    /**
     * Hides the SearchView
     **/
    hide: function() {
      this.$el.hide();
    },

    /**
     * Fetches data from Nutritionix for the search text
     **/
    findFoods: function() {
      this.collection.setSearchString(this.$searchText.val());
      this.collection.fetch({
        reset: true
      });
    },

    /**
     * Re-render the view
     **/
    render: function() {
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    /**
     * Adds a single item to the list by creating a view for it, and
     * appending its element to the <table>.
     * @param {object} - data from nutritionix
     **/
    addOne: function(nutritionix) {
      var view = new app.SearchItemView({
        model: nutritionix,
        parse: true
      });
      this.$list.append(view.render().el);
    },

    /**
     * Add all items in the collection at once.
     **/
    addAll: function() {
      this.$list.html('<tr><th></th><th>Item Name</th><th>Calories</th><th>Quantity</th><th>Unit</th><th>Fat</th></tr>');
      this.collection.each(this.addOne, this);
    }
  });
});