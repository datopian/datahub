// adapted from https://github.com/harthur/costco. heather rules

var costco = function() {

  var toUpdate = [];

  function handleEditorChange(e) {
    console.log(e.target.value);
  }
  
  function computeChanges() {
    $("#notification-message").text("Computing changes...");

    var text = $("#map-function").val();
    var docs;
    try {
      docs = JSON.parse(text);
    }
    catch(e) {
      try {
        docs = JSON.parse("[" + text + "]");
      }   
      catch(e) {
        // not JSON, must be an edit function
        return mapDocs(text);
      }
    }  
    if(!docs.length) docs = [docs];
    
    toUpdate = docs;
    
    $("#notification-message").text("Computing changes...");
    
    $("#status").html("<span class='warning'>About to add " + docs.length
            + " docs to " + getDb().name  + "</span>");
    $("#update-container").show();
  }

  function mapDocs(funcString) {
    try {
      eval("var editFunc = " + funcString);
    } catch(e) {
      $("#status").html("<span class='error'>error evaluating function: "
        + e + "</span>");
      return;
    }

    toUpdate = [];
    var deleted = 0
      , edited = 0
      , failed = 0;

    getDocs(function(data) {
      var rows = data.rows;
      rows.forEach(function(row) {
        var doc = row.doc;
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
      });
      // todo: make template for this
      $("#status").html("<span class='warning'>About to edit " + edited
              + " docs and delete " + deleted + " docs from "
              + getDb().name  + "</span>");
      if(failed)
        $("#status").append(". Edit function threw on " + failed + " docs");
      $("#update-container").show();
    });
  }

  function updateDocs(callback) {
    if(!toUpdate.length)
      return callback();

    getDb().bulkSave({docs: toUpdate}, {
      success: callback,
      error: function(req, status, err) {
        $("#status").html("<span class='error'>error updating docs: "
           + err + "</span>");
      }
    });
  }

  function getDocs(callback) {
    getDb().allDocs({
      include_docs : true,
      success : callback,
      error: function(req, status, err) {
        $("#status").html("<span class='error'>error retrieving docs: "
           + err + "</span>");
      }
    });
  }

  return {
    handleEditorChange: handleEditorChange,
    computeChanges: computeChanges,
    mapDocs: mapDocs,
    updateDocs: updateDocs,
    getDocs: getDocs
  };
}();