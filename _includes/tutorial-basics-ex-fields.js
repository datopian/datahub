var $el = $('.ex-fields');

// Now list the Fields of this Dataset (these will have be automatically extracted from the data)
$el.append('Fields: ');
// Dataset.fields is a Backbone collection of Fields (i.e. record attributes)
dataset.fields.each(function(field) {
  $el.append(field.id + ' || ');
});

$el.append('<hr />');

// Show all field info
var json = dataset.fields.toJSON();
$el.append(
  $('<pre />')
    .append(
      JSON.stringify(json, null, 2)
    )
);

