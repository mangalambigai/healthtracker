app = app || {};

$(function() {
  'use strict';

  /**
   * Represents the Summary tab
   * holds the charts and the daily totals table
   **/
  app.DayTotalListView = Backbone.View.extend({

    self: this,

    el: $('#daytotal-section'),

    /**
     * Initializes the DayTotalListView
     **/
    initialize: function() {
      this.$chartCalorie = this.$('#calorie-chart');
      this.$list = this.$('#daytotal-list');
      this.$weekpicker = this.$('#weekpicker');

      this.collection = app.dayTotalList;
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'all', this.render);
    },

    /**
     * Initializes the charts, data and options
     * Call this only when the chart package is loaded
     * Rows are not loaded yet.
     **/
    initializeCharts: function() {
      self = app.dayTotalListView;
      self.chartCalorie = new google.visualization.ComboChart(document.getElementById('calorie-chart'));
      self.chartFat = new google.visualization.ComboChart(document.getElementById('fat-chart'));
      // Create the data tables.
      self.dataCalorie = new google.visualization.DataTable();
      self.dataFat = new google.visualization.DataTable();

      self.dataCalorie.addColumn('string', 'Dates');
      self.dataCalorie.addColumn('number', 'Calories');
      self.dataCalorie.addColumn('number', 'Calories Needed');

      self.dataFat.addColumn('string', 'Dates');
      self.dataFat.addColumn('number', 'Fat Calories');
      self.dataFat.addColumn('number', '20%');
      self.dataFat.addColumn('number', '35%');

      // Set chart options
      self.optionsCalorie = {
        vAxis: {
          title: 'kiloCalories'
        },
        hAxis: {
          title: 'Dates'
        },
        seriesType: 'bars',
        series: {
          1: {
            type: 'line'
          }
        }
      };

      self.optionsFat = {
        vAxis: {
          title: 'kiloCalories'
        },
        hAxis: {
          title: 'Dates'
        },
        seriesType: 'bars',
        series: {
          1: {
            type: 'line'
          },
          2: {
            type: 'line'
          }
        }
      };

      //resize fires too frequently,
      //let's wait till it ends to redraw the chart
      //create trigger to resizeEnd event
      $(window).resize(function() {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
          $(this).trigger('resizeEnd');
        }, 500);
      });

      //redraw graph when window resize is completed
      $(window).on('resizeEnd', function() {
        self.redrawCharts();
      });
    },

    events: {
      'change #weekpicker': 'weekChanged'
    },

    /**
     * Redraws the charts
     * Call when window resizes
     */
    redrawCharts: function() {
      if (self.dataCalorie.getNumberOfRows() > 0)
        self.chartCalorie.draw(self.dataCalorie, self.optionsCalorie);
      if (self.dataFat.getNumberOfRows() > 0)
        self.chartFat.draw(self.dataFat, self.optionsFat);
    },

    /**
     * Converts week picker's value to an array of YYYY-MM-DD
     * @param: {string} week - week in YYYY-Www format.
     **/
    convertWeekToDates: function(week) {
      var dates = [];

      //get the year
      var y = week.slice(0, 4);

      //get the week number
      var w = week.slice(6);

      //http://www.wufoo.com/html5/types/4-date.html
      //A "week" goes from Monday to Sunday,
      //with week 1 being the week containing the first Wednesday of the year,
      //so could start on December 30 or even January 2.
      //check the first day of January, if it is > wednesday, next week is week 1?

      //This logic can be refactored to be concise,
      //but let's keep it verbose so it is easy for bug fixing!
      var firstDayOfYear = new Date(y, 0, 1);
      var newYearDay = firstDayOfYear.getDay();

      //This is going to hold the first day of Week 1
      var w1start;

      //Jan 1 was Wednesday, week1 is the monday 2 days before
      //week1 starts on dec 30th monday
      if (newYearDay === 3)
        w1start = new Date(y - 1, 11, 30);

      //Jan 1 was Tuesday,
      //week1 starts on 31 Dec
      if (newYearDay === 2)
        w1start = new Date(y - 1, 11, 31);

      //Jan 1 was Monday,
      //week1 starts on 1st the Monday
      if (newYearDay === 1)
        w1start = new Date(y, 0, 1);

      //Jan 1 was Sunday
      //week1 starts on Jan 2 the Monday
      if (newYearDay === 0)
        w1start = new Date(y, 0, 2);

      //Jan 1 was Saturday
      //week1 starts on Jan 3 the Monday
      if (newYearDay === 6)
        w1start = new Date(y, 0, 3);

      //Jan 1 was Friday
      //week1 starts on Jan 4 the Monday
      if (newYearDay === 5)
        w1start = new Date(y, 0, 4);

      //Jan 1 was Thursday
      //week1 starts on Dec 29th the Monday
      if (newYearDay === 4)
        w1start = new Date(y - 1, 11, 29);

      //now add the weeks. valueOf gets milliseconds,
      //so convert the number of weeks to milliseconds
      //and add it to the first weeks monday
      var d = w1start.valueOf() + (w - 1) * 7 * 24 * 60 * 60 * 1000;

      //we are going to return the 7 days of this week
      for (var i = 0; i < 7; i++) {
        //now convert these dates to the format of data in firebase
        dates.push(app.getFormattedDate(new Date(d)));
        d += 24 * 60 * 60 * 1000;
      }
      return dates;
    },

    /**
     * Handles the week changed events
     * adds the new week's dates, and calorie totals to the calorie chart
     * adds the new week's dates and fats to the fat chart
     * then redraws both the charts
     **/
    weekChanged: function() {
      self = this;
      var dates = this.convertWeekToDates(this.$weekpicker.val());

      var calorieNeeded = app.personDetails.get('calorie');
      var calorie20percent = calorieNeeded * 0.2;
      var calorie35percent = calorieNeeded * 0.35;

      //clear the data
      var numrows = this.dataCalorie.getNumberOfRows();
      if (numrows > 0)
        self.dataCalorie.removeRows(0, numrows);

      numrows = this.dataFat.getNumberOfRows();
      if (numrows > 0)
        self.dataFat.removeRows(0, numrows);

      dates.forEach(function(date) {
        var daytotal = app.dayTotalList.get(date);
        if (daytotal) {
          //slice just month and date for display
          //it is just too crowded with year displayed in x axis
          var md = date.slice(5);

          var calorie = daytotal.get('calories');
          var fat = daytotal.get('fat');

          //add data to calorie chart
          self.dataCalorie.addRows([
            [md, calorie, calorieNeeded]
          ]);

          //add data to fat chart
          //each gram of fat is 9 kilocalories
          //https://en.wikipedia.org/wiki/Food_energy
          //20% to 35% of daily calories can come from fat.
          self.dataFat.addRows([
            [md, 9 * fat, calorie20percent, calorie35percent]
          ]);
        }
      });

      //set the chart titles
      self.optionsCalorie.title = 'Calories for the week starting ' + dates[0];
      self.optionsFat.title = 'Fat calories for the week starting ' + dates[0];

      // draw our chart, passing in some options.
      self.chartCalorie.draw(this.dataCalorie, self.optionsCalorie);

      // draw our chart, passing in some options.
      self.chartFat.draw(this.dataFat, self.optionsFat);
      $('#fatRecommendation').removeClass('hidden');
    },

    /**
     * Redraws the Summary tab
     **/
    render: function() {
      // Returning the object is a good practice
      // that makes chaining possible
      return this;
    },

    /**
     * adds all data from Collection to the list
     **/
    addAll: function() {
      this.$list.html('<tr><th>Date</th><th class="text-right">Calories</th><th class="text-right">Fat</th></tr>');
      this.collection.each(this.addOne, this);
    },

    /**
     * adds one row to the list
     **/
    addOne: function(daytotal) {
      //since daytotallist is an autoSync collection, addAll doesnt get fired,
      //set the table header manually
      var listtext = this.$list.html();
      if (!listtext || listtext.trim().length === 0) {
        this.$list.html('<tr><th>Date</th><th class="text-right">Calories</th><th class="text-right">Fat</th></tr>');
      }
      var view = new app.DayTotalView({
        model: daytotal
      });
      this.$list.append(view.render().el);
    }
  });
});