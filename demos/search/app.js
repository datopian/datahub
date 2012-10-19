jQuery(function($) {
  var $el = $('.search-here');

  // Check for config from url query string
  // (this allows us to point to specific data sources backends)
  var config = recline.View.parseQueryString(decodeURIComponent(window.location.search));
  if (config.backend) {
    setupMoreComplexExample(config);
    return;
  }

  // the simple example case

  // Create our Recline Dataset
  // We'll just use some sample local data (see end of this file)
  var dataset = new recline.Model.Dataset({
    records: sampleData
  });

  // Set up the search View
  
  // We give it a custom template for rendering the example records
  var template = ' \
    <div class="record"> \
      <h3> \
        {{title}} <em>by {{Author}}</em> \
      </h3> \
      <p>{{description}}</p> \
      <p><code>${{price}}</code></p> \
    </div> \
  ';
  var searchView = new SearchView({
    el: $el,
    model: dataset,
    template: template 
  });
  searchView.render();

  // Optional - we configure the initial query a bit and set up facets
  dataset.queryState.set({
      size: 10
    },
    {silent: true}
  );
  dataset.queryState.addFacet('Author');
  // Now do the first query
  // After this point the Search View will take over handling queries
  dataset.query();
});


// Simple Search View
//
// Pulls together various Recline UI components and the central Dataset and Query (state) object
//
// Plus support for customization e.g. of template for list of results
//
// 
//      var view = new SearchView({
//        el: $('some-element'),
//        model: dataset
//        template: mustache-template-or-function
//      });
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
    // templateResults is just for one result ...
    var tmpl = '{{#records}}' + this.templateResults + '{{/records}}'; 
    var results = Mustache.render(tmpl, {
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

// --------------------------------------------------------
// Stuff very specific to this demo

function setupMoreComplexExample(config) {
};

var sampleData = [
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

