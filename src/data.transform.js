this.recline = this.recline || {};
this.recline.Data = this.recline.Data || {};

(function(my) {
// adapted from https://github.com/harthur/costco. heather rules

my.Transform = {};

my.Transform.evalFunction = function(funcString) {
  try {
    eval("var editFunc = " + funcString);
  } catch(e) {
    return {errorMessage: e+""};
  }
  return editFunc;
};

my.Transform.previewTransform = function(docs, editFunc, currentColumn) {
  var preview = [];
  var updated = my.Transform.mapDocs($.extend(true, {}, docs), editFunc);
  for (var i = 0; i < updated.docs.length; i++) {      
    var before = docs[i]
      , after = updated.docs[i]
      ;
    if (!after) after = {};
    if (currentColumn) {
      preview.push({before: before[currentColumn], after: after[currentColumn]});      
    } else {
      preview.push({before: before, after: after});      
    }
  }
  return preview;
};

my.Transform.mapDocs = function(docs, editFunc) {
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
    updates: edited, 
    docs: updatedDocs, 
    deletes: deleted, 
    failed: failed
  };
};

}(this.recline.Data))
