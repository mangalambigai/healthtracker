app = app || {};

app.DayTotalView = Backbone.View.extend({
  tagname: 'tr',
  template: _.template($('#daytotal-template').html()),
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});