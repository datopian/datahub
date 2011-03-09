/**
 * A simple map function mocking _all, but allows usage with lists etc.
 * 
 */
function(doc) {
  emit(doc.id, doc);
}
