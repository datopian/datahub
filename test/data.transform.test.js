module("Data.Transform");

test('previewTransform', function () {
  var docs = [
    {
      'date': '2012/2013 - 1'
    }
  ];
  var func = function(doc) {
    return doc;
  };
  var exp = [
    {
      "after": {
        "date": "2012/2013 - 1"
      },
      "before": {
        "date": "2012/2013 - 1"
      }
    }
  ];
  var out = recline.Data.Transform.previewTransform(docs, func);
  deepEqual(out, exp);

  var func = function(doc) {
    var d = doc['date'];
    doc['date']  = d.split('/')[0];
    return doc;
  };
  var exp = [
    {
      "after": {
        "date": "2012"
      },
      "before": {
        "date": "2012/2013 - 1"
      }
    }
  ];
  var out = recline.Data.Transform.previewTransform(docs, func);
  deepEqual(out, exp);

  var func = function(doc) {
    var d = doc['date'];
    doc['date']  = d.split('/')[0] + '-' + d.split(' - ')[1];
    return doc;
  };
  var exp = [
    {
      "after": {
        "date": "2012-1"
      },
      "before": {
        "date": "2012/2013 - 1"
      }
    }
  ];
  var out = recline.Data.Transform.previewTransform(docs, func);
  deepEqual(out, exp);
});

