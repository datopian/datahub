/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
  "use strict";

// ## SlickGrid Dataset View
//
// Provides a tabular view on a Dataset, based on SlickGrid.
//
// https://github.com/mleibman/SlickGrid
//
// Initialize it with a `recline.Model.Dataset`.
//
// Additional options to drive SlickGrid grid can be given through state.
// The following keys allow for customization:
// * gridOptions: to add options at grid level
// * columnsEditor: to add editor for editable columns
//
// For example:
//    var grid = new recline.View.SlickGrid({
//         model: dataset,
//         el: $el,
//         state: {
//          gridOptions: {
//            editable: true,
//            enableAddRow: true 
//            // Enable support for row delete
//            enabledDelRow: true,
//            // Enable support for row Reorder 
//            enableReOrderRow:true,
//            ...
//          },
//          columnsEditor: [
//            {column: 'date', editor: Slick.Editors.Date },
//            {column: 'title', editor: Slick.Editors.Text}
//          ]
//        }
//      });
//// NB: you need an explicit height on the element for slickgrid to work
my.SlickGrid = Backbone.View.extend({
  initialize: function(modelEtc) {
    var self = this;
    this.$el.addClass('recline-slickgrid');
  
    // Template for row delete menu , change it if you don't love 
    this.templates = {
      "deleterow" : '<a href="#" class="recline-row-delete btn" title="Delete row">X</a>'
    };

    _.bindAll(this, 'render', 'onRecordChanged');
    this.listenTo(this.model.records, 'add remove reset', this.render);
    this.listenTo(this.model.records, 'change', this.onRecordChanged);
    var state = _.extend({
        hiddenColumns: [],
        columnsOrder: [],
        columnsSort: {},
        columnsWidth: [],
        columnsEditor: [],
        options: {},
        fitColumns: false
      }, modelEtc.state

    );
    this.state = new recline.Model.ObjectState(state);
    this._slickHandler = new Slick.EventHandler();

    //add menu for new row , check if enableAddRow is set to true or not set
    if(this.state.get("gridOptions") 
  && this.state.get("gridOptions").enabledAddRow != undefined 
      && this.state.get("gridOptions").enabledAddRow == true ){
      this.editor    =  new  my.GridControl()
      this.elSidebar =  this.editor.$el
  this.listenTo(this.editor.state, 'change', function(){   
    this.model.records.add(new recline.Model.Record())
      });
    }
  },

  onRecordChanged: function(record) {
    // Ignore if the grid is not yet drawn
    if (!this.grid) {
      return;
    }
    // Let's find the row corresponding to the index
    var row_index = this.grid.getData().getModelRow( record );
    this.grid.invalidateRow(row_index);
    this.grid.getData().updateItem(record, row_index);
    this.grid.render();
  },

  render: function() {
    var self = this;
    var options = _.extend({
      enableCellNavigation: true,
      enableColumnReorder: true,
      explicitInitialization: true,
      syncColumnCellResize: true,
      forceFitColumns: this.state.get('fitColumns')
    }, self.state.get('gridOptions'));

    // We need all columns, even the hidden ones, to show on the column picker
    var columns = []; 

    // custom formatter as default one escapes html
    // plus this way we distinguish between rendering/formatting and computed value (so e.g. sort still works ...)
    // row = row index, cell = cell index, value = value, columnDef = column definition, dataContext = full row values
    var formatter = function(row, cell, value, columnDef, dataContext) {
      if(columnDef.id == "del"){
        return self.templates.deleterow 
      }
      var field = self.model.fields.get(columnDef.id);
      if (field.renderer) {
        return  field.renderer(value, field, dataContext);
      } else {
        return  value 
      }
    };

    // we need to be sure that user is entering a valid  input , for exemple if 
    // field is date type and field.format ='YY-MM-DD', we should be sure that 
    // user enter a correct value 
    var validator = function(field) {
      return function(value){
        if (field.type == "date" && isNaN(Date.parse(value))){
          return {
            valid: false,
            msg: "A date is required, check field field-date-format"
          };
        } else {
          return {valid: true, msg :null } 
        }
      }
    };

    // Add column for row reorder support
    if (this.state.get("gridOptions") && this.state.get("gridOptions").enableReOrderRow == true) {
      columns.push({
        id: "#",
        name: "",
        width: 22,
        behavior: "selectAndMove",
        selectable: false,
        resizable: false,
        cssClass: "recline-cell-reorder"
      })
    }
    // Add column for row delete support
    if (this.state.get("gridOptions") && this.state.get("gridOptions").enabledDelRow == true) {
      columns.push({
        id: 'del',
        name: '',
        field: 'del',
        sortable: true,
        width: 38,
        formatter: formatter,
        validator:validator
      })
    }

    _.each(this.model.fields.toJSON(),function(field){
      var column = {
        id: field.id,
        name: field.label,
        field: field.id,
        sortable: true,
        minWidth: 80,
        formatter: formatter,
        validator:validator(field)
      };
      var widthInfo = _.find(self.state.get('columnsWidth'),function(c){return c.column === field.id;});
      if (widthInfo){
        column.width = widthInfo.width;
      }
      var editInfo = _.find(self.state.get('columnsEditor'),function(c){return c.column === field.id;});
      if (editInfo){
        column.editor = editInfo.editor;
      } else {
        // guess editor type
        var typeToEditorMap = {
          'string': Slick.Editors.LongText,
          'integer': Slick.Editors.IntegerEditor,
          'number': Slick.Editors.Text,
          // TODO: need a way to ensure we format date in the right way
          // Plus what if dates are in distant past or future ... (?)
          // 'date': Slick.Editors.DateEditor,
          'date': Slick.Editors.Text,
          'boolean': Slick.Editors.YesNoSelectEditor
          // TODO: (?) percent ...
        };
        if (field.type in typeToEditorMap) {
          column.editor = typeToEditorMap[field.type]
        } else {
          column.editor = Slick.Editors.LongText;
        }
      }
      columns.push(column);
    });    
    // Restrict the visible columns
    var visibleColumns = _.filter(columns, function(column) {
      return _.indexOf(self.state.get('hiddenColumns'), column.id) === -1;
    });
    // Order them if there is ordering info on the state
    if (this.state.get('columnsOrder') && this.state.get('columnsOrder').length > 0) {
      visibleColumns = visibleColumns.sort(function(a,b){
        return _.indexOf(self.state.get('columnsOrder'),a.id) > _.indexOf(self.state.get('columnsOrder'),b.id) ? 1 : -1;
      });
      columns = columns.sort(function(a,b){
        return _.indexOf(self.state.get('columnsOrder'),a.id) > _.indexOf(self.state.get('columnsOrder'),b.id) ? 1 : -1;
      });
    }

    // Move hidden columns to the end, so they appear at the bottom of the
    // column picker
    var tempHiddenColumns = [];
    for (var i = columns.length -1; i >= 0; i--){
      if (_.indexOf(_.pluck(visibleColumns,'id'),columns[i].id) === -1){
        tempHiddenColumns.push(columns.splice(i,1)[0]);
      }
    }
    columns = columns.concat(tempHiddenColumns);

    // Transform a model object into a row
    function toRow(m) {
      var row = {};
      self.model.fields.each(function(field) {
        var render = "";
        //when adding row from slickgrid the field value is undefined
        if(!_.isUndefined(m.getFieldValueUnrendered(field))){
           render =m.getFieldValueUnrendered(field)
        }
        row[field.id] = render
      });
      return row;
    }

    function RowSet() {
      var models = [];
      var rows = [];

      this.push = function(model, row) {
        models.push(model);
        rows.push(row);
      };

      this.getLength = function() {return rows.length; };
      this.getItem = function(index) {return rows[index];};
      this.getItemMetadata = function(index) {return {};};
      this.getModel = function(index) {return models[index];};
      this.getModelRow = function(m) {return _.indexOf(models, m);};
      this.updateItem = function(m,i) {
        rows[i] = toRow(m);
        models[i] = m;
      };
    }

    var data = new RowSet();

    this.model.records.each(function(doc){
      data.push(doc, toRow(doc));
    });

    this.grid = new Slick.Grid(this.el, data, visibleColumns, options);
    // Column sorting
    var sortInfo = this.model.queryState.get('sort');
    if (sortInfo){
      var column = sortInfo[0].field;
      var sortAsc = sortInfo[0].order !== 'desc';
      this.grid.setSortColumn(column, sortAsc);
    }

    if (this.state.get("gridOptions") && this.state.get("gridOptions").enableReOrderRow) {
      this._setupRowReordering();
    }
    
    this._slickHandler.subscribe(this.grid.onSort, function(e, args){
      var order = (args.sortAsc) ? 'asc':'desc';
      var sort = [{
        field: args.sortCol.field,
        order: order
      }];
      self.model.query({sort: sort});
    });
    
    this._slickHandler.subscribe(this.grid.onColumnsReordered, function(e, args){
      self.state.set({columnsOrder: _.pluck(self.grid.getColumns(),'id')});
    });
    
    this.grid.onColumnsResized.subscribe(function(e, args){
        var columns = args.grid.getColumns();
        var defaultColumnWidth = args.grid.getOptions().defaultColumnWidth;
        var columnsWidth = [];
        _.each(columns,function(column){
          if (column.width != defaultColumnWidth){
            columnsWidth.push({column:column.id,width:column.width});
          }
        });
        self.state.set({columnsWidth:columnsWidth});
    });
    
    this._slickHandler.subscribe(this.grid.onCellChange, function (e, args) {
      // We need to change the model associated value
      var grid = args.grid;
      var model = data.getModel(args.row);
      var field = grid.getColumns()[args.cell].id;
      var v = {};
      v[field] = args.item[field];
      model.set(v);
    });  
    this._slickHandler.subscribe(this.grid.onClick,function(e, args){
      //try catch , because this fail in qunit , but no
      //error on browser.
      try{e.preventDefault()}catch(e){}

      // The cell of grid that handle row delete is The first cell (0) if
      // The grid ReOrder is not present ie  enableReOrderRow == false
      // else it is The the second cell (1) , because The 0 is now cell
      // that handle row Reoder.
      var cell =0
      if(self.state.get("gridOptions") 
  && self.state.get("gridOptions").enableReOrderRow != undefined 
        && self.state.get("gridOptions").enableReOrderRow == true ){
        cell =1
      }
      if (args.cell == cell && self.state.get("gridOptions").enabledDelRow == true){
          // We need to delete the associated model
          var model = data.getModel(args.row);
          model.destroy()
        }
    }) ;
    var columnpicker = new Slick.Controls.ColumnPicker(columns, this.grid,
                                                       _.extend(options,{state:this.state}));
    if (self.visible){
      self.grid.init();
      self.rendered = true;
    } else {
      // Defer rendering until the view is visible
      self.rendered = false;
    }
    return this;
  },

  // Row reordering support based on
  // https://github.com/mleibman/SlickGrid/blob/gh-pages/examples/example9-row-reordering.html
  _setupRowReordering: function() {
    var self = this;
    self.grid.setSelectionModel(new Slick.RowSelectionModel());

    var moveRowsPlugin = new Slick.RowMoveManager({
      cancelEditOnDrag: true
    });

    moveRowsPlugin.onBeforeMoveRows.subscribe(function (e, data) {
      for (var i = 0; i < data.rows.length; i++) {
        // no point in moving before or after itself
        if (data.rows[i] == data.insertBefore || data.rows[i] == data.insertBefore - 1) {
          e.stopPropagation();
          return false;
        }
      }
      return true;
    });
    
    moveRowsPlugin.onMoveRows.subscribe(function (e, args) {
      var extractedRows = [], left, right;
      var rows = args.rows;
      var insertBefore = args.insertBefore;

      var data = self.model.records.toJSON()      
      left = data.slice(0, insertBefore);
      right= data.slice(insertBefore, data.length);
      
      rows.sort(function(a,b) { return a-b; });

      for (var i = 0; i < rows.length; i++) {
          extractedRows.push(data[rows[i]]);
      }

      rows.reverse();

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row < insertBefore) {
          left.splice(row, 1);
        } else {
          right.splice(row - insertBefore, 1);
        }
      }

      data = left.concat(extractedRows.concat(right));
      var selectedRows = [];
      for (var i = 0; i < rows.length; i++)
        selectedRows.push(left.length + i);      

      self.model.records.reset(data)
      
    });
    //register The plugin to handle row Reorder
    if(this.state.get("gridOptions") && this.state.get("gridOptions").enableReOrderRow) {
      self.grid.registerPlugin(moveRowsPlugin);
    }
  },

  remove: function () {
    this._slickHandler.unsubscribeAll();
    Backbone.View.prototype.remove.apply(this, arguments);
  },

  show: function() {
    // If the div is hidden, SlickGrid will calculate wrongly some
    // sizes so we must render it explicitly when the view is visible
    if (!this.rendered){
      if (!this.grid){
        this.render();
      }
      this.grid.init();
      this.rendered = true;
    }
    this.visible = true;
  },

  hide: function() {
    this.visible = false;
  }
});

// Add new grid Control to display a new row add menu bouton
// It display a simple side-bar menu ,for user to add new 
// row to grid 
my.GridControl= Backbone.View.extend({
  className: "recline-row-add",
  // Template for row edit menu , change it if you don't love
  template: '<h1><a href="#" class="recline-row-add btn">Add row</a></h1>',
  
  initialize: function(options){
    var self = this;
    _.bindAll(this, 'render');
    this.state = new recline.Model.ObjectState();
    this.render();
  },

  render: function() {
    var self = this;
    this.$el.html(this.template)
  },

  events : {
    "click .recline-row-add" : "addNewRow"
  },

  addNewRow : function(e){
    e.preventDefault()
    this.state.trigger("change")
 }
});

})(jQuery, recline.View);

/*
* Context menu for the column picker, adapted from
* http://mleibman.github.com/SlickGrid/examples/example-grouping
*
*/
(function ($) {
  function SlickColumnPicker(columns, grid, options) {
    var $menu;
    var columnCheckboxes;

    var defaults = {
      fadeSpeed:250
    };

    function init() {
      grid.onHeaderContextMenu.subscribe(handleHeaderContextMenu);
      options = $.extend({}, defaults, options);

      $menu = $('<ul class="dropdown-menu slick-contextmenu" style="display:none;position:absolute;z-index:20;" />').appendTo(document.body);

      $menu.bind('mouseleave', function (e) {
        $(this).fadeOut(options.fadeSpeed);
      });
      $menu.bind('click', updateColumn);

    }

    function handleHeaderContextMenu(e, args) {
      e.preventDefault();
      $menu.empty();
      columnCheckboxes = [];

      var $li, $input;
      for (var i = 0; i < columns.length; i++) {
        $li = $('<li />').appendTo($menu);
        $input = $('<input type="checkbox" />').data('column-id', columns[i].id).attr('id','slick-column-vis-'+columns[i].id);
        columnCheckboxes.push($input);

        if (grid.getColumnIndex(columns[i].id) !== null) {
          $input.attr('checked', 'checked');
        }
        $input.appendTo($li);
        $('<label />')
            .text(columns[i].name)
            .attr('for','slick-column-vis-'+columns[i].id)
            .appendTo($li);
      }
      $('<li/>').addClass('divider').appendTo($menu);
      $li = $('<li />').data('option', 'autoresize').appendTo($menu);
      $input = $('<input type="checkbox" />').data('option', 'autoresize').attr('id','slick-option-autoresize');
      $input.appendTo($li);
      $('<label />')
          .text('Force fit columns')
          .attr('for','slick-option-autoresize')
          .appendTo($li);
      if (grid.getOptions().forceFitColumns) {
        $input.attr('checked', 'checked');
      }

      $menu.css('top', e.pageY - 10)
          .css('left', e.pageX - 10)
          .fadeIn(options.fadeSpeed);
    }

    function updateColumn(e) {
      var checkbox;

      if ($(e.target).data('option') === 'autoresize') {
        var checked;
        if ($(e.target).is('li')){
            checkbox = $(e.target).find('input').first();
            checked = !checkbox.is(':checked');
            checkbox.attr('checked',checked);
        } else {
          checked = e.target.checked;
        }

        if (checked) {
          grid.setOptions({forceFitColumns:true});
          grid.autosizeColumns();
        } else {
          grid.setOptions({forceFitColumns:false});
        }
        options.state.set({fitColumns:checked});
        return;
      }

      if (($(e.target).is('li') && !$(e.target).hasClass('divider')) ||
            $(e.target).is('input')) {
        if ($(e.target).is('li')){
            checkbox = $(e.target).find('input').first();
            checkbox.attr('checked',!checkbox.is(':checked'));
        }
        var visibleColumns = [];
        var hiddenColumnsIds = [];
        $.each(columnCheckboxes, function (i, e) {
          if ($(this).is(':checked')) {
            visibleColumns.push(columns[i]);
          } else {
            hiddenColumnsIds.push(columns[i].id);
          }
        });

        if (!visibleColumns.length) {
          $(e.target).attr('checked', 'checked');
          return;
        }

        grid.setColumns(visibleColumns);
        options.state.set({hiddenColumns:hiddenColumnsIds});
      }
    }
    init();
  }

  // Slick.Controls.ColumnPicker
  $.extend(true, window, {
    Slick: {
      Controls: {
        ColumnPicker: SlickColumnPicker
      }
    }
  });

})(jQuery);

