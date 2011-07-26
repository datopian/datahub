// adapted from https://github.com/harthur/costco. heather rules

var costco = function() {
  
  function evalFunction(funcString) {
    try {
      eval("var editFunc = " + funcString);
    } catch(e) {
      return {errorMessage: e+""};
    }
    return editFunc;
  }
  
  function previewTransform(docs, editFunc, currentColumn) {
    var preview = [];
    var updated = mapDocs($.extend(true, {}, docs), editFunc);
    for (var i = 0; i < updated.docs.length; i++) {      
      var before = docs[i]
        , after = updated.docs[i]
        ;
      if (!after) after = {};
      if (currentColumn) {
        preview.push({before: JSON.stringify(before[currentColumn]), after: JSON.stringify(after[currentColumn])});      
      } else {
        preview.push({before: JSON.stringify(before), after: JSON.stringify(after)});      
      }
    }
    util.render('editPreview', 'expression-preview-container', {rows: preview});
  }

  function mapDocs(docs, editFunc) {
    var edited = []
      , deleted = []
      , failed = []
      ;
    
    var updatedDocs = _.map(docs, function(doc) {
      try {
        var updated = editFunc(_.clone(doc));
      } catch(e) {
        failed.push(doc);
        return;
      }
      if(updated === null) {
        updated = {_deleted: true};
        edited.push(updated);
        deleted.push(doc);
      }
      else if(updated && !_.isEqual(updated, doc)) {
        edited.push(updated);
      }
      return updated;      
    });
    
    return {
      edited: edited, 
      docs: updatedDocs, 
      deleted: deleted, 
      failed: failed
    };
  }
  
  function updateDocs(editFunc) {
    var dfd = $.Deferred();
    util.notify("Updating documents...", {persist: true, loader: true});
    couch.request({url: app.baseURL + "api/json"}).then(function(docs) {
      var toUpdate = costco.mapDocs(docs.docs, editFunc).edited;
      costco.uploadDocs(toUpdate).then(
        function(updatedDocs) { 
          util.notify(updatedDocs.length + " documents updated successfully");
          recline.initializeTable(app.offset);
          recline.updateDocCount();
          dfd.resolve(updatedDocs);
        },
        function(err) {
          util.notify("Errorz! " + err);
          dfd.reject(err);
        }
      );
    });
    return dfd.promise();
  }

  function uploadDocs(docs) {
    var dfd = $.Deferred();
    if(!docs.length) dfd.resolve("Failed: No docs specified");
    couch.request({url: app.baseURL + "api/_bulk_docs", type: "POST", data: JSON.stringify({docs: docs})})
      .then(
        function(resp) {ensureCommit().then(function() { dfd.resolve(resp) })}, 
        function(err) { dfd.reject(err.responseText) }
      );
    return dfd.promise();
  }
  
  function ensureCommit() {
    return couch.request({url: app.baseURL + "api/_ensure_full_commit", type:'POST', data: "''"});
  }
  
  function deleteColumn(name) {
    var deleteFunc = function(doc) {
      delete doc[name];
      return doc;
    }
    return updateDocs(deleteFunc);
  }

  return {
    evalFunction: evalFunction,
    previewTransform: previewTransform,
    mapDocs: mapDocs,
    updateDocs: updateDocs,
    uploadDocs: uploadDocs,
    deleteColumn: deleteColumn,
    ensureCommit: ensureCommit
  };
}();