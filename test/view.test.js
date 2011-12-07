(function ($) {

module("View");

test('new DataTableRow View', function () {
  var $el = $('<tr />');
  $('.fixtures .test-datatable').append($el);
  var doc = new recline.Document({
    'id': 1,
    'b': '2',
    'a': '1'
    });
  var view = new recline.DataTableRow({
    model: doc
    , el: $el
    , headers: ['a', 'b']
  });
  view.render();
  ok($el.attr('data-id'), '1');
  var tds = $el.find('td');
  equal(tds.length, 3);
  equal($(tds[1]).attr('data-header'), 'a');
});

})(this.jQuery);
