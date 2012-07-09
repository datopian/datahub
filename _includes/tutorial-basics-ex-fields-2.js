var $el = $('.ex-fields-2');

dataset.fields.models[6] = new recline.Model.Field({
  id: 'geo',
  label: 'Location',
  type: 'geo_point'
});
var rec = dataset.records.at(0);
$el.append(record.summary());

