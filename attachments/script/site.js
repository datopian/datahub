var app = {
	baseURL: util.getBaseURL(document.location.pathname),
	container: 'main_content'
};

app.handler = function(route) {
  route = route.path.slice(1, route.path.length);
  if (route.length < 1) route = "home";
  util.render( route, app.container);
  window.scrollTo(0, 0);
};

// var query = {
//   "descending" : true,
//   "limit" : 20,
//   success: function( data ) {
//     if( data.rows.length === 0 ) {
//       monocles.oldestDoc = false;
//       monocles.hideLoader();
//       posts = [];
//     } else {
//       monocles.oldestDoc = data.rows[ data.rows.length - 1 ];
//       posts = data.rows;
//     }
//     renderStream();
//   }
// }
// 
// if ( opts.offsetDoc ) {
//   $.extend( query, {
//     "startkey": opts.offsetDoc.key,
//     "startkey_docid": opts.offsetDoc.id,
//     "skip": 1
//   })
// }

app.after = {
  home: function() {

    couch.request({url: app.baseURL + "api"}).then(function(db) {
      removalist.gotDb(db);
      couch.request({url: app.baseURL + 'api/headers'}).then(function(headers) {
        removalist.gotHeaders(headers);
        couch.request({url: app.baseURL + 'api/rows?limit=10'}).then(function(response) {
          removalist.renderRows(response.rows);
        });
      });
    });
    
    $( '.csv' ).live('click', ( function( e ) {      
      window.location.href = app.csvUrl;
      e.preventDefault();
    }))
  }
}

app.sammy = $.sammy(function () {
  this.get('', app.handler);
  this.get("#/", app.handler);
  this.get("#:route", app.handler);
});

$(function() {
  app.sammy.run();  
})