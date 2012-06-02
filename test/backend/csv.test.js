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
  var dataset = recline.Backend.CSV.csvToDataset(csv);
  dataset.query();
  equal(dataset.currentRecords.length, 3);
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


})(this.jQuery);
