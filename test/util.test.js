(function ($) {
module("Util");

test('parseHashUrl', function () {
  var out = recline.Util.parseHashUrl('graph?x=y');
  equal(out.path, 'graph');
  equal(out.query, '?x=y');
  var out = recline.Util.parseHashUrl('graph');
  equal(out.path, 'graph');
  equal(out.query, '');
});

test('composeQueryString', function () {
  var params = {
    x: 'y',
    a: 'b'
  };
  var out = recline.Util.composeQueryString(params);
  equal(out, '?x=y&a=b');
});

})(this.jQuery);
