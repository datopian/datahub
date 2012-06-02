(function ($) {
module("Util");

test('parseHashUrl', function () {
  var out = recline.View.parseHashUrl('graph?x=y');
  equal(out.path, 'graph');
  equal(out.query, '?x=y');
  var out = recline.View.parseHashUrl('graph');
  equal(out.path, 'graph');
  equal(out.query, '');
});

test('composeQueryString', function () {
  var params = {
    x: 'y',
    a: 'b'
  };
  var out = recline.View.composeQueryString(params);
  equal(out, '?x=y&a=b');
});

})(this.jQuery);
