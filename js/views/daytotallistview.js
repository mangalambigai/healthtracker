app = app || {};

app.DayTotalListView = Backbone.View.extend({
  el: $('#daytotal-section'),
  initialize: function() {
    this.list = this.$('#daytotal-list');
    this.collection = app.dayTotalList;
    this.listenTo(this.collection, 'add', this.addOne);
  },
  addOne: function(daytotal) {
    var view= new DayTotalView({model: daytotal});
    this.list.append(view.render().el);
  }
});