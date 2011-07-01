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
    
    $( '.csv' ).live('click', ( function( e ) {      
      window.location.href = app.csvUrl;
      e.preventDefault();
    }))
    
  },
  page: function(id) {
    removalist.getPageSize()
  }
}

app.after = {
  tableContainer: function() {
    $( '.viewPanel-pagingControls-page' ).click(function( e ) {      
      $(".viewpanel-pagesize .selected").removeClass('selected');
      $(e.target).addClass('selected');
      removalist.fetchRows(app.newest);
    });
    $( '.viewpanel-paging a' ).click(function( e ) {
      // var action = $(e.target).attr('id').split('paging-')[1];
      removalist.fetchRows(app.oldest);
    });
    
  }
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