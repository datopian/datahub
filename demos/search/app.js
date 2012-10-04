jQuery(function($) {
  window.dataExplorer = null;
  window.explorerDiv = $('.search-here');

  // var url = 'http://openspending.org/api/search';
  // var url = 'http://localhost:9200/tmp/sfpd-last-month';
  var dataset = new recline.Model.Dataset({
    records: simpleData
  });
  createSearch(dataset);
});

var createSearch = function(dataset, state) {
  // remove existing data explorer view
  var $el = $('<div />');
  $el.appendTo(window.explorerDiv);
  var template = ' \
    {{#records}} \
      <div class="record"> \
        <h3> \
          {{title}} <em>by {{Author}}</em> \
        </h3> \
        <p>{{description}}</p> \
        <p><code>${{price}}</code></p> \
      </div> \
    {{/records}} \
  ';

  window.dataExplorer = new SearchView({
    el: $el,
    model: dataset,
    template: template 
  });

  dataset.queryState.set({
      size: 10
    },
    {silent: true}
  );
  dataset.queryState.addFacet('Author');
  dataset.query();
}

// Simple Search View
//
// Pulls together various Recline UI components and the central Dataset and Query (state) object
//
// Plus support for customization e.g. of item template
var SearchView = Backbone.View.extend({
  initialize: function(options) {
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.recordTemplate = options.template || this.defaultTemplate;
    this.model.records.bind('reset', this.render);
    this.templateResults = options.template;
  },

  template: ' \
    <div class="controls"> \
      <div class="query-here"></div> \
    </div> \
    <div class="body"> \
      <div class="sidebar"></div> \
      <div class="results"> \
        {{{results}}} \
      </div> \
    </div> \
    <div class="pager-here"></div> \
  ',

  render: function() {
    var results = Mustache.render(this.templateResults, {
      records: this.model.records.toJSON()
    });
    var html = Mustache.render(this.template, {
      results: results
    });
    this.el.html(html);

    var view = new recline.View.FacetViewer({
      model: this.model
    });
    view.render();
    this.el.find('.sidebar').append(view.el);

    var pager = new recline.View.Pager({
      model: this.model.queryState
    });
    this.el.find('.pager-here').append(pager.el);

    var queryEditor = new recline.View.QueryEditor({
      model: this.model.queryState
    });
    this.el.find('.query-here').append(queryEditor.el);
  }
});

var simpleData = [
  {
    title: 'War and Peace',
    description: 'The epic tale of love, war and history',
    Author: 'Tolstoy',
    price: 7.99
  },
  {
    title: 'Anna Karenina',
    description: 'How things go wrong in love and ultimately lead to suicide. This is why you should not have affairs, girls!',
    Author: 'Tolstoy',
    price: 8.50
  },
  {
    title: "Fathers and Sons",
    description: "Another 19th century Russian novel",
    Author: "Turgenev",
    price: 11
  }
];

