(function ($) {
module("Backend Local CSV");

test("parseCSV", function() {
  var csv = '"Jones, Jay",10\n' +
  '"Xyz ""ABC"" O\'Brien",11:35\n' +
  '"Other, AN",12:35\n';

  var array = recline.Backend.CSV.parseCSV(csv);
  var exp = [
    ['Jones, Jay', 10],
    ['Xyz "ABC" O\'Brien', '11:35' ],
    ['Other, AN', '12:35' ]
  ];
  deepEqual(exp, array);

  var csv = '"Jones, Jay", 10\n' +
  '"Xyz ""ABC"" O\'Brien", 11:35\n' +
  '"Other, AN", 12:35\n';
  var array = recline.Backend.CSV.parseCSV(csv, {trim : true});
  deepEqual(exp, array);

  var csv = 'Name, Value\n' +
  '"Jones, Jay", 10\n' +
  '"Xyz ""ABC"" O\'Brien", 11:35\n' +
  '"Other, AN", 12:35\n';
  var dataset = new recline.Model.Dataset({
    data: csv,
    backend: 'csv'
  });
  dataset.fetch();
  equal(dataset.records.length, 3);
  var row = dataset.records.models[0].toJSON();
  deepEqual(row, {Name: 'Jones, Jay', Value: 10});
});

test("parseCSVsemicolon", function() {
  var csv = '"Jones; Jay";10\n' +
  '"Xyz ""ABC"" O\'Brien";11:35\n' +
  '"Other; AN";12:35\n';

  var array = recline.Backend.CSV.parseCSV(csv, {separator : ';'});
  var exp = [
    ['Jones; Jay', 10],
    ['Xyz "ABC" O\'Brien', '11:35' ],
    ['Other; AN', '12:35' ]
  ];
  deepEqual(exp, array);

});

test("parseCSVdelimiter", function() {
  var csv = "'Jones, Jay',10\n" +
  "'Xyz \"ABC\" O''Brien',11:35\n" +
  "'Other; AN',12:35\n";

  var array = recline.Backend.CSV.parseCSV(csv, {delimiter:"'"});
  var exp = [
    ["Jones, Jay", 10],
    ["Xyz \"ABC\" O'Brien", "11:35" ],
    ["Other; AN", "12:35" ]
  ];
  deepEqual(exp, array);

});

test("serializeCSV", function() {
  var csv = [
    ['Jones, Jay', 10],
    ['Xyz "ABC" O\'Brien', '11:35' ],
    ['Other, AN', '12:35' ]
  ];

  var array = recline.Backend.CSV.serializeCSV(csv);
  var exp = '"Jones, Jay",10\n' +
  '"Xyz \"ABC\" O\'Brien",11:35\n' +
  '"Other, AN",12:35\n';
  deepEqual(array, exp);
});


})(this.jQuery);
