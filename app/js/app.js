jQuery(function($) {
  window.ReclineDataExplorer = new ExplorerApp({
    el: $('.recline-app')
  })
});

var ExplorerApp = Backbone.View.extend({
  events: {
    'click .nav .js-load-dialog-url': '_onLoadURLDialog',
    'submit form.js-load-url': '_onLoadURL',
    'submit .js-load-dialog-file form': '_onLoadFile',
    'submit .js-settings form': '_onSettingsSave'
  },

  initialize: function() {
    this.el = $(this.el);
    this.dataExplorer = null;
    this.explorerDiv = $('.data-explorer-here');
    _.bindAll(this, 'viewExplorer', 'viewHome');

    this.router = new Backbone.Router();
    this.router.route('', 'home', this.viewHome);
    this.router.route(/explorer/, 'explorer', this.viewExplorer);
    Backbone.history.start();

    var state = recline.View.parseQueryString(decodeURIComponent(window.location.search));
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
    // special cases for demo / memory dataset
    if (state.url === 'demo' || state.backend === 'memory') {
      dataset = localDataset();
    }
    else if (state.dataset || state.url) {
      dataset = recline.Model.Dataset.restore(state);
    }
    if (dataset) {
      this.createExplorer(dataset, state);
    }
    this._initializeSettings();
  },

  viewHome: function() {
    this.switchView('home');
  },

  viewExplorer: function() {
    this.router.navigate('explorer');
    this.switchView('explorer');
  },

  switchView: function(path) {
    $('.backbone-page').hide(); 
    var cssClass = path.replace('/', '-');
    $('.page-' + cssClass).show();
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
    var views = [
       {
         id: 'grid',
         label: 'Grid', 
         view: new recline.View.SlickGrid({
           model: dataset
         })
       },

       {
         id: 'graph',
         label: 'Graph',
         view: new recline.View.Graph({
           model: dataset
         })
       },
       {
         id: 'map',
         label: 'Map',
         view: new recline.View.Map({
           model: dataset
         })
       },
       {
         id: 'timeline',
         label: 'Timeline',
         view: new recline.View.Timeline({
           model: dataset
         })
       }
    ];

    this.dataExplorer = new recline.View.MultiView({
      model: dataset,
      el: $el,
      state: state,
      views: views
    });
    this._setupPermaLink(this.dataExplorer);
    this._setupEmbed(this.dataExplorer);

    this.viewExplorer();
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
      var out = Mustache.render('<iframe src="{{link}}" width="100%" min-height="500px;"></iframe>', {link: link});
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
    $('form.js-load-url input[name="source"]').val(demoUrl);
  },

  _onLoadURLDialog: function(e) {
    e.preventDefault();
    var $link = $(e.target);
    var $modal = $('.modal.js-load-dialog-url');
    $modal.find('h3').text($link.text());
    $modal.modal('show');
    $modal.find('input[name="source"]').val('');
    $modal.find('input[name="backend_type"]').val($link.attr('data-type'));
    $modal.find('.help-block').text($link.attr('data-help'));
  },

  _onLoadURL: function(e) {
    e.preventDefault();
    $('.modal.js-load-dialog-url').modal('hide');
    var $form = $(e.target);
    var source = $form.find('input[name="source"]').val();
    var datasetInfo = {
      id: 'my-dataset',
      url: source
    };
    var type = $form.find('input[name="backend_type"]').val();
    if (type === 'csv' || type === 'excel') {
      datasetInfo.format = type;
      type = 'dataproxy';
    }
    if (type === 'datahub') {
      // have a full resource url so convert to data API
      if (source.indexOf('dataset') != -1) {
        var parts = source.split('/');
        datasetInfo.url = parts[0] + '/' + parts[1] + '/' + parts[2] + '/api/data/' + parts[parts.length-1];
      }
      type = 'elasticsearch';
    }
    console.log(datasetInfo.url);
    var dataset = new recline.Model.Dataset(datasetInfo, type);
    this.createExplorer(dataset);
  },

  _onLoadFile: function(e) {
    var self = this;
    e.preventDefault();
    var $form = $(e.target);
    $('.modal.js-load-dialog-file').modal('hide');
    var $file = $form.find('input[type="file"]')[0];
    var file = $file.files[0];
    var options = {
      separator : $form.find('input[name="separator"]').val(),
      delimiter : $form.find('input[name="delimiter"]').val(),
      encoding : $form.find('input[name="encoding"]').val()
    };
    recline.Backend.CSV.load(file, function(dataset) {
        self.createExplorer(dataset)
      },
      options
    );
  },

  _getSettings: function() {
    var settings = localStorage.getItem('dataexplorer.settings');
    settings = JSON.parse(settings) || {};
    return settings;
  },

  _initializeSettings: function() {
    var settings = this._getSettings();
    $('.modal.js-settings form input[name="datahub_api_key"]').val(settings.datahubApiKey);
  },

  _onSettingsSave: function(e) {
    var self = this;
    e.preventDefault();
    var $form = $(e.target);
    $('.modal.js-settings').modal('hide');
    var datahubKey = $form.find('input[name="datahub_api_key"]').val();
    var settings = this._getSettings();
    settings.datahubApiKey = datahubKey;
    localStorage.setItem('dataexplorer.settings', JSON.stringify(settings));
  }
});

// provide a demonstration in memory dataset
function localDataset() {
  var dataset = Fixture.getDataset();
  return dataset;
}

