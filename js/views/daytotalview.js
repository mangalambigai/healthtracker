app = app || {};

$(function() {
  'use strict';

  /**
   * Represents one row in the day totals table in 'Summary' tab
   **/
  app.DayTotalView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#daytotal-template').html()),

    /**
     * initializes DayTotalView
     **/
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    /**
     * Redraws the DayTotal model to the table's row
     **/
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
});