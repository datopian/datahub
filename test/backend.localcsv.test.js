(function ($) {
module("Backend Local CSV");

test("parseCSV", function() { 
  var csv = '"Jones, Jay",10\n' +
  '"Xyz ""ABC"" O\'Brien",11:35\n' +
  '"Other, AN",12:35\n';

  var array = recline.Backend.parseCSV(csv);
  var exp = [
    ['Jones, Jay', 10],
    ['Xyz "ABC" O\'Brien', '11:35' ],
    ['Other, AN', '12:35' ]
  ];
  deepEqual(exp, array);

  var csv = '"Jones, Jay", 10\n' +
  '"Xyz ""ABC"" O\'Brien", 11:35\n' +
  '"Other, AN", 12:35\n';
  var array = recline.Backend.parseCSV(csv, true);
  deepEqual(exp, array);
});

})(this.jQuery);
