var $el = $('#mytimeline');
var timeline = new recline.View.Timeline({
  model: dataset
});
$el.append(timeline.el);
// set the headline/title for each record with x column
timeline.convertRecord = function(record, fields) {
  var out = this._convertRecord(record);
  if (out) {
    out.headline = record.get('x').toString();
  }
  return out;
}
timeline.render();

