jQuery(function($) {
  var app = new ExplorerApp({
    el: $('.recline-app')
  })
  Backbone.history.start();
});

var ExplorerApp = Backbone.View.extend({
  events: {
    'submit form.js-import-url': '_onImportURL',
    'submit .js-import-dialog-file form': '_onImportFile'
  },

  initialize: function() {
    this.el = $(this.el);
    this.explorer = null;
    this.explorerDiv = $('.data-explorer-here');

    var state = recline.View.parseQueryString(window.location.search);
    if (state) {
      _.each(state, function(value, key) {
        try {
          value = JSON.parse(value);
        } catch(e) {}
        state[key] = value;
      });
      if (state.embed) {
        $('.navbar').hide();
        $('body').attr('style', 'padding-top: 0px');
      }
    }
    var dataset = null;
    if (state.dataset || state.url) {
      dataset = recline.Model.Dataset.restore(state);
    } else {
      dataset = localDataset();
    }
    this.createExplorer(dataset, state);
  },

  // make Explorer creation / initialization in a function so we can call it
  // again and again
  createExplorer: function(dataset, state) {
    var self = this;
    // remove existing data explorer view
    var reload = false;
    if (this.dataExplorer) {
      this.dataExplorer.remove();
      reload = true;
    }
    this.dataExplorer = null;
    var $el = $('<div />');
    $el.appendTo(this.explorerDiv);
    this.dataExplorer = new recline.View.DataExplorer({
      model: dataset,
      el: $el,
      state: state
    });
    this._setupPermaLink(this.dataExplorer);
    this._setupEmbed(this.dataExplorer);

    // HACK (a bit). Issue is that Backbone will not trigger the route
    // if you are already at that location so we have to make sure we genuinely switch
    if (reload) {
      // this.dataExplorer.router.navigate('graph');
      // this.dataExplorer.router.navigate('', true);
    }
  },

  _setupPermaLink: function(explorer) {
    var self = this;
    var $viewLink = this.el.find('.js-share-and-embed-dialog .view-link');
    explorer.state.bind('change', function() {
      $viewLink.val(self.makePermaLink(explorer.state));
    });
    $viewLink.val(self.makePermaLink(explorer.state));
  },

  _setupEmbed: function(explorer) {
    var self = this;
    var $embedLink = this.el.find('.js-share-and-embed-dialog .view-embed');
    function makeEmbedLink(state) {
      var link = self.makePermaLink(state);
      link = link + '&amp;embed=true';
      var out = $.mustache('<iframe src="{{link}}" width="100%" min-height="500px;"></iframe>', {link: link});
      return out;
    }
    explorer.state.bind('change', function() {
      $embedLink.val(makeEmbedLink(explorer.state));
    });
    $embedLink.val(makeEmbedLink(explorer.state));
  },

  makePermaLink: function(state) {
    var qs = recline.View.composeQueryString(state.toJSON());
    return window.location.origin + window.location.pathname + qs;
  },

  // setup the loader menu in top bar
  setupLoader: function(callback) {
    // pre-populate webstore load form with an example url
    var demoUrl = 'http://thedatahub.org/api/data/b9aae52b-b082-4159-b46f-7bb9c158d013';
    $('form.js-import-url input[name="source"]').val(demoUrl);
  },

  _onImportURL: function(e) {
    e.preventDefault();
    $('.modal.js-import-dialog-url').modal('hide');
    var $form = $(e.target);
    var source = $form.find('input[name="source"]').val();
    var type = $form.find('select[name="backend_type"]').val();
    var dataset = new recline.Model.Dataset({
        id: 'my-dataset',
        url: source,
        webstore_url: source
      },
      type
    );
    this.createExplorer(dataset);
  },

  _onImportFile: function(e) {
    var self = this;
    e.preventDefault();
    var $form = $(e.target);
    $('.modal.js-import-dialog-file').modal('hide');
    var $file = $form.find('input[type="file"]')[0];
    var file = $file.files[0];
    var options = {
      separator : $form.find('input[name="separator"]').val(),
      delimiter : $form.find('input[name="delimiter"]').val(),
      encoding : $form.find('input[name="encoding"]').val()
    };
    recline.Backend.loadFromCSVFile(file, function(dataset) {
        self.createExplorer(dataset)
      },
      options
    );
  }
});

// provide a demonstration in memory dataset
function localDataset() {
  var datasetId = 'test-dataset';
  var inData = {
    metadata: {
      title: 'My Test Dataset'
      , name: '1-my-test-dataset' 
      , id: datasetId
    },
    fields: [{id: 'x'}, {id: 'y'}, {id: 'z'}, {id: 'country'}, {id: 'label'},{id: 'lat'},{id: 'lon'}],
    documents: [
      {id: 0, x: 1, y: 2, z: 3, country: 'DE', label: 'first', lat:52.56, lon:13.40}
      , {id: 1, x: 2, y: 4, z: 6, country: 'UK', label: 'second', lat:54.97, lon:-1.60}
      , {id: 2, x: 3, y: 6, z: 9, country: 'US', label: 'third', lat:40.00, lon:-75.5}
      , {id: 3, x: 4, y: 8, z: 12, country: 'UK', label: 'fourth', lat:57.27, lon:-6.20}
      , {id: 4, x: 5, y: 10, z: 15, country: 'UK', label: 'fifth', lat:51.58, lon:0}
      , {id: 5, x: 6, y: 12, z: 18, country: 'DE', label: 'sixth', lat:51.04, lon:7.9}
    ]
  };
  var backend = new recline.Backend.Memory();
  backend.addDataset(inData);
  var dataset = new recline.Model.Dataset({id: datasetId}, backend);
  dataset.queryState.addFacet('country');
  return dataset;
}

