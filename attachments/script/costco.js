// adapted from https://github.com/harthur/costco. heather rules

var costco = function() {

  function handleEditorChange(e) {
    mapDocs(app.cache, e.target.value, true);
  }

  function mapDocs(docs, funcString, preview) {
    if(preview) var errors = $('.expression-preview-parsing-status');
    try {
      eval("var editFunc = " + funcString);
      if(preview) errors.text('No syntax error.');
    } catch(e) {
      if(preview) errors.text(e+"");
      return;
    }

    var toUpdate = []
      , deleted = 0
      , edited = 0
      , failed = 0
      ;
    
    if(preview) var preview = [];
      
    _.each(docs, function(doc) {
      try {
        var updated = editFunc(_.clone(doc));
      } catch(e) {
        failed++; // ignore if it throws on this doc
        return;
      }
      if(updated === null) {
        doc._deleted = true;
        toUpdate.push(doc);
        deleted++;
      }
      else if(updated && !_.isEqual(updated, doc)) {
        toUpdate.push(updated);
        edited++;
      }
      
      if(preview) preview.push({before: JSON.stringify(doc[app.currentColumn]), after: JSON.stringify(updated[app.currentColumn])});
    });
    
    if(preview) util.render('editPreview', 'expression-preview-container', {rows: preview});
    return toUpdate;
  }

  function updateDocs(docs, callback) {
    if(!docs.length)
      return callback("Failed to update");    
    couch.request({url: app.baseURL + "api/_bulk_docs", type: "POST", data: JSON.stringify({docs: docs})}).then(callback);
  }

  return {
    handleEditorChange: handleEditorChange,
    mapDocs: mapDocs,
    updateDocs: updateDocs
  };
}();