this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

my.Actions = Backbone.View.extend({
  className: 'recline-actions', 
  template: ' \
    <div class="actions"> \
      <div class="btn-group"> \
        <a id="addRecord" href="#addNewRecord" class="btn" data-toggle="modal">Add</a> \
        <a id="removeRecord" class="btn">Remove</a> \
      </div> \
    </div> \
    <div class="modal hide fade" id="addNewRecord" tabindex="-1" role="dialog" aria-labelledby="addNewRecordLabel" aria-hidden="true"> \
      <div class="modal-header"> \
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> \
        <h3 id="addNewRecordLabel">Add new record</h3> \
      </div> \
      <div class="modal-body"> \
        <form class="form-horizontal" id="addNewRecordForm" action="#" method="post"> \
          {{{tpl}}} \
        </form> \
      </div> \
      <div class="modal-footer"> \
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button> \
        <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" id="addNewRecordBtn">Submit</button> \
      </div> \
    </div> \
  ',

  events: {
    'click #addNewRecordBtn': 'onAdd',
    'click #removeRecord': 'onRemove',
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.el = $(this.el);
    this.render();
  },
  onRemove: function(e) {
    e.preventDefault();
    var rowNumber = $('.slick-row .active').parent().attr('row');
    this.model.remove(this.model['models'][rowNumber]);
  },
  onAdd: function(e) {
    e.preventDefault();
    var formValues = $('#addNewRecord input');
    var record = {};
    $.map(formValues, function(n, i) {
        record[n.name] = $(n).val();
    });
    this.model.add(record);
    document.getElementById("addNewRecordForm").reset();
  },
  render: function() {
    var fields = this.model['models'][0]['fields']['models'];
    var tpl = '', 
    type;
    for (var i = 0; i < fields.length; i++) {
      switch (fields[i]['attributes']['type']){
        case 'string':
          type = 'text';
          break;
        case 'number':
          type = 'number';
          break;
        case 'integer':
          type = 'number';
          break;
        case 'date':
          type = 'date';
          break;
        case 'time':
          type = 'time';
          break;
        case 'date-time':
          type = 'datetime';
          break;
        case 'boolean':
          type = 'checkbox';
          break;
        case 'geo_point':
          type = 'text';
          break;
        default:
          type = 'text';
          break;
      }
      tpl += '<div class="control-group"> \
            <label class="control-label" for="' + fields[i]['id'] + '"></label> \
            <div class="controls"> \
              <input type="' + type + '" id="' + fields[i]['id'] + '" placeholder="' + fields[i]['id'] + ' field" name="' + fields[i]['id'] + '" value=""> \
            </div> \
          </div>';
    }
    var tmplData = {
          "tpl" : tpl
        };
    var templated = Mustache.render(this.template,tmplData);
    this.el.html(templated);
  }
});

})(jQuery, recline.View);