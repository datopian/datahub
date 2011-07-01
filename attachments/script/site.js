var app = {
	baseURL: util.getBaseURL(document.location.pathname),
	container: 'main_content'
};

app.reqOpts = {
  uri: app.baseURL + "api",
  method: "GET",
  headers: {"Content-type": "application/json"},
  cache: true
}

app.handler = function(route) {
  route = route.path.slice(1, route.path.length);
  if (route.length < 1) route = "home";
  util.render( route, app.container);
  window.scrollTo(0, 0);
};

app.after = {
  home: function() {

    $.request(app.reqOpts, removalist.gotDb);

    $( '.csv' ).live('click', ( function( e ) {      
      window.location.href = app.csvUrl;
      e.preventDefault();
    }))
  }
}

app.s = $.sammy(function () {
  this.get('', app.handler);
  this.get("#/", app.handler);
  this.get("#:route", app.handler);
});

$(function() {
  app.s.run();  
})