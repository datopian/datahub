// this element will need to exist!
var $el = $('#map-infobox');
var view = new recline.View.Map({
  el: $el,
  model: dataset
});
// record is the recline.Model.Record object
view.infobox = function(record) {
  var html = '<h3>' + record.get('country') + ' &ndash; ' + record.get('date') + '</h3>';
  html += 'id: ' + record.get('id');
  return html;
}
view.render();

