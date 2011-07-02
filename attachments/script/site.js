var app = {
	baseURL: util.getBaseURL(document.location.pathname),
	container: 'main_content'
};

app.handler = function(route) {
  if (route.params && route.params.route) {
    var path = route.params.route;
    app.routes[path](route.params.id);
  } else {
    app.routes['home']();
  }  
};

app.routes = {
  home: function() {
    removalist.bootstrap();
  },
  page: function(id) {
    removalist.getPageSize();
  }
}

app.after = {
  tableContainer: function() {
    removalist.activateControls();
  },
  dataTable: function() {
    $('.column-header-menu').click(function(e) { 
      util.show('menu', e);
      util.render('columnActions', 'menu');
    });
  },
  actions: function() {
    $('.button').click(function(e) { 
      util.show('menu', e, {left: -60});
      util.render('exportActions', 'menu');
    });
  },
  exportActions: removalist.handleMenuClick,
  columnActions: removalist.handleMenuClick
}

app.sammy = $.sammy(function () {
  this.get('', app.handler);
  this.get("#/", app.handler);
  this.get("#:route", app.handler);
  this.get("#:route/:id", app.handler);
});

$(function() {
  app.sammy.run();  
})