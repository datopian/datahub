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
    return preview;
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
    util.notify("Download entire database into Recline. This could take a while...", {persist: true, loader: true});
    couch.request({url: app.baseURL + "api/json"}).then(function(docs) {
      util.notify("Updating " + docs.docs.length + " documents. This could take a while...", {persist: true, loader: true});
      var toUpdate = costco.mapDocs(docs.docs, editFunc).edited;
      costco.uploadDocs(toUpdate).then(
        function(updatedDocs) { 
          util.notify(updatedDocs.length + " documents updated successfully");
          recline.initializeTable(app.offset);
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
  
  function updateDoc(doc) {
    return couch.request({type: "PUT", url: app.baseURL + "api/" + doc._id, data: JSON.stringify(doc)})    
  }

  function uploadDocs(docs) {
    var dfd = $.Deferred();
    if(!docs.length) dfd.resolve("Failed: No docs specified");
    couch.request({url: app.baseURL + "api/_bulk_docs", type: "POST", data: JSON.stringify({docs: docs})})
      .then(
        function(resp) {ensureCommit().then(function() { 
          var error = couch.responseError(resp);
          if (error) {
            dfd.reject(error);
          } else {
            dfd.resolve(resp);            
          }
        })}, 
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
  
  function uploadCSV() {
    var file = $('#file')[0].files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var payload = {
          url: window.location.href + "/api/_bulk_docs", // todo more robust url composition
          data: event.target.result
        };
        var worker = new Worker('script/costco-csv-worker.js');
        worker.onmessage = function(event) {
          var message = event.data;
          if (message.done) {
            var error = couch.responseError(JSON.parse(message.response))
            console.log('e',error)
            if (error) {
              app.emitter.emit(error, 'error');
            } else {
              util.notify("Data uploaded successfully!");
              recline.initializeTable(app.offset);
            }
            util.hide('dialog');
          } else if (message.percent) {
            if (message.percent === 100) {
              util.notify("Waiting for CouchDB...", {persist: true, loader: true})
            } else {
              util.notify("Uploading... " + message.percent + "%");            
            }
          } else {
            util.notify(JSON.stringify(message));
          }
        };
        worker.postMessage(payload);
      };
    } else {
      util.notify('File not selected. Please try again');
    }
  };

  return {
    evalFunction: evalFunction,
    previewTransform: previewTransform,
    mapDocs: mapDocs,
    updateDocs: updateDocs,
    updateDoc: updateDoc,
    uploadDocs: uploadDocs,
    deleteColumn: deleteColumn,
    ensureCommit: ensureCommit,
    uploadCSV: uploadCSV 
  };
}();
