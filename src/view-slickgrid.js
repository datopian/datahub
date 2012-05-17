/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
// ## SlickGrid Dataset View
//
// Provides a tabular view on a Dataset, based on SlickGrid.
//
// https://github.com/mleibman/SlickGrid
//
// Initialize it with a `recline.Model.Dataset`.
my.SlickGrid = Backbone.View.extend({
  tagName:  "div",
  className: "recline-slickgrid-container",

  initialize: function(modelEtc) {
    var self = this;
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.model.currentDocuments.bind('add', this.render);
    this.model.currentDocuments.bind('reset', this.render);
    this.model.currentDocuments.bind('remove', this.render);

    var state = _.extend({ }, modelEtc.state
    );
    this.state = new recline.Model.ObjectState(state);

    this.bind('view:show',function(){
      // If the div is hidden, SlickGrid will calculate wrongly some
      // sizes so we must render it explicitly when the view is visible
      if (!self.rendered){
        self.grid.init();
        self.rendered = true;
      }
      self.visible = true;
    });
    this.bind('view:hide',function(){
      self.visible = false;
    });

  },

  events: {
  },

  // #### Templating
  template: ' \
  ',

  render: function() {
    var self = this;
    this.el = $(this.el);

    var options = {
      enableCellNavigation: true,
      enableColumnReorder: true,
      explicitInitialization: true

      // , forceFitColumns: true
    };

    var columns = [];
    _.each(this.model.fields.toJSON(),function(field){
      columns.push({id:field['id'],
                    name:field['label'],
                    field:field['id'],
                    sortable: true,
                    minWidth: 80});
    });

    var data = this.model.currentDocuments.toJSON();

    this.grid = new Slick.Grid(this.el, data, columns, options);
    this.grid.onSort.subscribe(function(e, args){

        var field = args.sortCol.field;

        data.sort(function(a, b){
            var result =
                a[field] > b[field] ? 1 :
                a[field] < b[field] ? -1 :
                0
            ;
            return args.sortAsc ? result : -result;
        });

        self.grid.setData(data);
        self.grid.updateRowCount();
        self.grid.render();
    });

    if (self.visible){
      self.grid.init();
      self.rendered = true;
    } else {
      // Defer rendering until the view is visible
      self.rendered = false;
    }

    return this;
 }
});

})(jQuery, recline.View);
