/**
 * Returns an array of all of the keys in the document.
 * 
 * @author Max Ogden
 */
function(doc) {
  var keys = [];
  for (var key in doc) {
    keys.push(key);
  }
  emit(doc, keys);
}
