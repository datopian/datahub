(function() { 

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [];
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    }).toUpperCase();
  };
})();

// END Math.uuid.js

/**
*
*  MD5 (Message-Digest Algorithm)
*
*  For original source see http://www.webtoolkit.info/
*  Download: 15.02.2009 from http://www.webtoolkit.info/javascript-md5.html
*
*  Licensed under CC-BY 2.0 License
*  (http://creativecommons.org/licenses/by/2.0/uk/)
*
**/

var Crypto = {};
(function() {
  Crypto.MD5 = function(string) {

    function RotateLeft(lValue, iShiftBits) {
      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
      var lX4,lY4,lX8,lY8,lResult;
      lX8 = (lX & 0x80000000);
      lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000);
      lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
      if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        } else {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        }
      } else {
        return (lResult ^ lX8 ^ lY8);
      }
    }

    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1=lMessageLength + 8;
      var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
      var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
      var lWordArray=Array(lNumberOfWords-1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while ( lByteCount < lMessageLength ) {
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
        lByteCount++;
      }
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
      lWordArray[lNumberOfWords-2] = lMessageLength<<3;
      lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
      return lWordArray;
    };

    function WordToHex(lValue) {
      var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
      for (lCount = 0;lCount<=3;lCount++) {
        lByte = (lValue>>>(lCount*8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
      }
      return WordToHexValue;
    };

    //**	function Utf8Encode(string) removed. Aready defined in pidcrypt_utils.js

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    //	string = Utf8Encode(string); #function call removed

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
      AA=a; BB=b; CC=c; DD=d;
      a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
      d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
      c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
      b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
      a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
      d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
      c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
      b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
      a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
      d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
      c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
      b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
      a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
      d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
      c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
      b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
      a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
      d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
      c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
      b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
      a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
      d=GG(d,a,b,c,x[k+10],S22,0x2441453);
      c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
      b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
      a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
      d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
      c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
      b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
      a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
      d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
      c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
      b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
      a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
      d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
      c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
      b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
      a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
      d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
      c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
      b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
      a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
      d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
      c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
      b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
      a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
      d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
      c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
      b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
      a=II(a,b,c,d,x[k+0], S41,0xF4292244);
      d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
      c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
      b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
      a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
      d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
      c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
      b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
      a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
      d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
      c=II(c,d,a,b,x[k+6], S43,0xA3014314);
      b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
      a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
      d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
      c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
      b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
      a=AddUnsigned(a,AA);
      b=AddUnsigned(b,BB);
      c=AddUnsigned(c,CC);
      d=AddUnsigned(d,DD);
    }
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    return temp.toLowerCase();
  }
})();

// END Crypto.md5.js
// Basic wrapper for localStorage
var localJSON = (function(){
  if (!localStorage) {
    return false;
  }
  return {
    set: function(prop, val) {
      localStorage.setItem(prop, JSON.stringify(val));
    },
    get: function(prop, def) {
      try {
        if (localStorage.getItem(prop) === null) {
          return def;
        }
        return JSON.parse((localStorage.getItem(prop) || 'false'));
      } catch(err) {
        return def;
      }
    },
    remove: function(prop) {
      localStorage.removeItem(prop);
    }
  };
})();

(function() {

  // While most of the IDB behaviors match between implementations a
  // lot of the names still differ. This section tries to normalize the
  // different objects & methods.
  window.indexedDB = window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB;

  window.IDBCursor = window.IDBCursor ||
    window.webkitIDBCursor;

  window.IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange;

  window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction;

  window.IDBDatabaseException = window.IDBDatabaseException ||
    window.webkitIDBDatabaseException;

  var root = this;
  var pouch = {};

  if (typeof exports !== 'undefined') {
    exports.pouch = pouch;
  } else {
    root.pouch = pouch;
  }

  // IndexedDB requires a versioned database structure, this is going to make
  // it hard to dynamically create object stores if we needed to for things
  // like views
  var POUCH_VERSION = 1;

  // Cache for open databases
  var pouchCache = {};

  // The object stores created for each database
  // DOC_STORE stores the document meta data, its revision history and state
  var DOC_STORE = 'document-store';
  // BY_SEQ_STORE stores a particular version of a document, keyed by its
  // sequence id
  var BY_SEQ_STORE = 'by-sequence';

  // Enumerate errors, add the status code so we can reflect the HTTP api
  // in future
  var Errors = {
    MISSING_BULK_DOCS: {
      status: 400,
      error: 'bad_request',
      reason: "Missing JSON list of 'docs'"
    },
    MISSING_DOC: {
      status: 404,
      error: 'not_found',
      reason: 'missing'
    },
    REV_CONFLICT: {
      status: 409,
      error: 'conflict',
      reason: 'Document update conflict'
    }
  };

  var ajax = function (options, callback) {
    options.success = function (obj) {
      callback(null, obj);
    };
    options.error = function (err) {
      if (err) callback(err);
      else callback(true);
    };
    if (options.data && typeof options.data !== 'string') {
      options.data = JSON.stringify(options.data);
    }
    options.dataType = 'json';
    options.contentType = 'application/json';
    $.ajax(options);
  };

  // Pretty dumb name for a function, just wraps callback calls so we dont
  // to if (callback) callback() everywhere
  var call = function() {
    var fun = arguments[0];
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    if (typeof fun === typeof Function) {
      fun.apply(this, args);
    }
  };

  // Preprocess documents, parse their revisions, assign an id and a
  // revision for new writes that are missing them, etc
  var parseDoc = function(doc, newEdits) {
    if (newEdits) {
      if (!doc._id) {
        doc._id = Math.uuid();
      }
      var newRevId = Math.uuid(32, 16);
      var nRevNum;
      if (doc._rev) {
        var revInfo = /^(\d+)-(.+)$/.exec(doc._rev);
        if (!revInfo) {
          throw "invalid value for property '_rev'";
        }
        doc._revisions = [{
          pos: parseInt(revInfo[1], 10),
          ids: [revInfo[2], [[newRevId, []]]]
        }];
        nRevNum = parseInt(revInfo[1], 10) + 1;
      } else {
        doc._revisions = [{
          pos: 1,
          ids : [newRevId, []]
        }];
        nRevNum = 1;
      }
    } else {
      if (!doc._revisions) {
        var revInfo = /^(\d+)-(.+)$/.exec(doc._rev);
        nRevNum = parseInt(revInfo[1], 10);
        newRevId = revInfo[2];
        doc._revisions = [{
          pos: parseInt(revInfo[1], 10),
          ids: [revInfo[2], []]
        }];
      }
    }
    doc._id = decodeURIComponent(doc._id);
    doc._rev = [nRevNum, newRevId].join('-');
    return Object.keys(doc).reduce(function(acc, key) {
      if (/^_/.test(key))
        acc.metadata[key.slice(1)] = doc[key];
      else
        acc.data[key] = doc[key];
      return acc;
    }, {metadata : {}, data : {}});
  };


  var compareRevs = function(a, b) {
    // Sort by id
    if (a.id !== b.id) {
      return (a.id < b.id ? -1 : 1);
    }
    // Then by deleted
    if (a.deleted ^ b.deleted) {
      return (a.deleted ? -1 : 1);
    }
    // Then by rev id
    if (a.revisions[0].pos === b.revisions[0].pos) {
      return (a.revisions[0].ids < b.revisions[0].ids ? -1 : 1);
    }
    // Then by depth of edits
    return (a.revisions[0].start < b.revisions[0].start ? -1 : 1);
  };

  var parseUrl = function(url) {
    var a = document.createElement('a');
    a.href = url;
    return a;
  }

  var getHost = function(name) {
    if (/http:/.test(name)) {
      var url = parseUrl(name);
      return {
        host: url.protocol + '//' + url.hostname + ':' + url.port + '/',
        db: url.pathname.replace('/', '')
      };
    }
    return {host: '/', db: url};
  }

  var fetchCheckpoint = function(src, target, callback) {
    var id = Crypto.MD5(src.id() + target.id());
    src.get('_local/' + id, function(err, doc) {
      if (err && err.status === 404) {
        callback(0);
      } else {
        callback(doc.last_seq);
      }
    });
  };

  var writeCheckpoint = function(src, target, checkpoint, callback) {
    var check = {
      _id: '_local/' + Crypto.MD5(src.id() + target.id()),
      last_seq: checkpoint
    };
    src.get(check._id, function(err, doc) {
      if (doc && doc._rev) {
        check._rev = doc._rev;
      }
      src.put(check, function(err, doc) {
        callback();
      });
    });
  };

  var replicate = function(src, target, callback) {
    fetchCheckpoint(src, target, function(checkpoint) {
      var results = [];
      var completed = false;
      var pending = 0;
      var last_seq = 0;
      var result = {
        ok: true,
        start_time: new Date(),
        docs_read: 0,
        docs_written: 0
      };

      function isCompleted() {
        if (completed && pending === 0) {
          result.end_time = new Date();
          writeCheckpoint(src, target, last_seq, function() {
            call(callback, null, result);
          });
        }
      }

      src.changes({
        since: checkpoint,
        onChange: function(change) {
          results.push(change);
          result.docs_read++;
          pending++;
          var diff = {};
          diff[change.id] = change.changes.map(function(x) { return x.rev; });
          target.revsDiff(diff, function(err, diffs) {
            for (var id in diffs) {
              diffs[id].missing.map(function(rev) {
                src.get(id, {revs: true, rev: rev}, function(err, doc) {
                  target.post(doc, {newEdits: false}, function() {
                    result.docs_written++;
                    pending--;
                    isCompleted();
                  });
                });
              });
            }
          });
        },
        complete: function(err, res) {
          last_seq = res.last_seq;
          completed = true;
          isCompleted();
        }
      });
    });
  };

  // This code is all ugly as hell, just making it work for what we need it
  // for right now then will fix it up
  var makeCouch = function(name, opts, callback) {

    var host = getHost(name);
    var db = {};
    var dbUrl = host.host + host.db;

    db.id = function() {
      return dbUrl;
    };

    db.info = function(callback) {
    };
    db.get = function(id, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }
      var params = [];
      if (opts.revs) {
        params.push('revs=true');
      }
      if (opts.rev) {
        params.push('rev=' + opts.rev);
      }
      params = params.join('&');
      params = params === '' ? '' : '?' + params;

      ajax({type: 'GET', url: dbUrl + id + params}, function(err, doc) {
        if (err) {
          return call(callback, Errors.MISSING_DOC);
        }
        call(callback, null, doc);
      });
    };
    db.remove = function(doc, opts, callback) {
    };
    db.put = db.post = function(doc, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }
      var params = '';
      if (opts.newEdits) {
        params = '?newEdits=' + opts.newEdits;
      }
      ajax({type:'PUT', url: dbUrl + doc._id + params, data: doc}, callback);
    };
    db.bulkDocs = function(req, opts, callback) {
      ajax({type:'POST', url: dbUrl + '_bulk_docs', data: req}, callback);
    };
    db.allDocs = function(opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }
      ajax({type:'GET', url: dbUrl + '_all_docs'}, callback);
    };

    db.changes = function(opts, callback) {
      if (opts instanceof Function) {
        opts = {complete: opts};
      }
      if (callback) {
        opts.complete = callback;
      }

      var params = '?style=all_docs'
      if (opts.include_docs) {
        params += '&include_docs=true'
      }
      if (opts.since) {
        params += '&since=' + opts.since;
      }
      ajax({type:'GET', url: dbUrl + '_changes' + params}, function(err, res) {
        res.results.forEach(function(c) {
          call(opts.onChange, c);
        });
        call(opts.complete, null, res);
      });
    };

    db.revsDiff = function(req, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }
      ajax({type:'POST', url: dbUrl + '_revs_diff', data: req}, function(err, res) {
        call(callback, null, res);
      });
    };


    ajax({type: 'PUT', url: dbUrl}, function(err, ret) {
      if (!err || err.status === 412) {
        call(callback, null, db);
      }
    });
  }

  // This opens a database, creating it if needed and returns the api
  // used to access the database
  var makePouch = function(idb, name) {

    // Firefox requires a unique key for every idb object we store, the
    // BY_SEQ_STORE doesnt have a natural key (the autoIncrement is supposed
    // to be its key) so we just give it the current time + an incrementing
    // number
    var junkSeed = 0;

    // Now we create the PouchDB interface
    var db = {update_seq: 0};

    // Wrapper for functions that call the bulkdocs api with a single doc,
    // if the first result is an error, return an error
    var singularErr = function(callback) {
      return function(err, results) {
        if (err || results[0].error) {
          call(callback, err || results[0]);
        } else {
          call(callback, null, results[0]);
        }
      };
    };

    // Pretty much all below can be combined into a higher order function to
    // traverse revisions
    // Turn a tree into a list of rootToLeaf paths
    var expandTree = function(all, i, tree) {
      all.push({rev: i + '-' + tree[0], status: 'available'});
      tree[1].forEach(function(child) {
        expandTree(all, i + 1, child);
      });
    }

    var collectRevs = function(path) {
      var revs = [];
      expandTree(revs, path.pos, path.ids);
      return revs;
    }

    var collectLeavesInner = function(all, pos, tree) {
      if (!tree[1].length) {
        all.push({rev: pos + '-' + tree[0]});
      }
      tree[1].forEach(function(child) {
        collectLeavesInner(all, pos+1, child);
      });
    }

    var collectLeaves = function(revs) {
      var leaves = [];
      revs.forEach(function(tree) {
        collectLeavesInner(leaves, tree.pos, tree.ids);
      });
      return leaves;
    }

    var collectConflicts = function(revs) {
      var leaves = collectLeaves(revs);
      // First is current rev
      leaves.shift();
      return leaves.map(function(x) { return x.rev; });
    }

    // Each database needs a unique id so that we can store the sequence
    // checkpoint without having other databases confuse itself, since
    // localstorage is per host this shouldnt conflict, if localstorage
    // gets wiped it isnt fatal, replications will just start from scratch
    db.id = function() {
      var id = localJSON.get(name + '_id', null);
      if (id === null) {
        id = Math.uuid();
        localJSON.set(name + '_id', id);
      }
      return id;
    };

    // Looping through all the documents in the database is a terrible idea
    // easiest to implement though, should probably keep a counter
    db.info = function(callback) {
      var count = 0;
      idb.transaction([DOC_STORE], IDBTransaction.READ)
        .objectStore(DOC_STORE).openCursor().onsuccess = function(e) {
          var cursor = e.target.result;
          if (!cursor) {
            return callback(null, {
              db_name: name.replace(/^pouch:/, ''),
              doc_count: count,
              update_seq: db.update_seq
            });
          }
          if (cursor.value.deleted !== true) {
            count++;
          }
          cursor['continue']();
        };
    };

    // First we look up the metadata in the ids database, then we fetch the
    // current revision(s) from the by sequence store
    db.get = function(id, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }

      var req = idb.transaction([DOC_STORE], IDBTransaction.READ)
        .objectStore(DOC_STORE).get(id);

      req.onsuccess = function(e) {
        var metadata = e.target.result;
        if (!e.target.result || metadata.deleted) {
          return call(callback, Errors.MISSING_DOC);
        }

        var nreq = idb.transaction([BY_SEQ_STORE], IDBTransaction.READ)
          .objectStore(BY_SEQ_STORE).get(metadata.seq);
        nreq.onsuccess = function(e) {
          var doc = e.target.result;
          delete doc._junk;
          doc._id = metadata.id;
          doc._rev = metadata.rev;
          if (opts.revs_info) {
            doc._revs_info = metadata.revisions.reduce(function(prev, current) {
              return prev.concat(collectRevs(current));
            }, []);
          }
          callback(null, doc);
        };
      };
    };

    db.remove = function(doc, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }
      var newDoc = JSON.parse(JSON.stringify(doc));
      newDoc._deleted = true;
      return db.bulkDocs({docs: [newDoc]}, opts, singularErr(callback));
    };

    db.put = db.post = function(doc, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }
      return db.bulkDocs({docs: [doc]}, opts, singularErr(callback));
    };

    db.revsDiff = function(req, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }

      var ids = Object.keys(req);
      var count = 0;
      var missing = {};

      function readDoc(err, doc, id) {
        req[id].map(function(revId) {
          if (!doc || doc._revs_info.every(function(x) { return x.rev !== revId; })) {
            if (!missing[id]) {
              missing[id] = {missing: []};
            }
            missing[id].missing.push(revId);
          }
        });

        if (++count === ids.length) {
          return call(callback, null, missing);
        }
      }

      ids.map(function(id) {
        db.get(id, {revs_info: true}, function(err, doc) {
          readDoc(err, doc, id);
        });
      });
    };

    db.bulkDocs = function(req, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }

      if (!req.docs) {
        return call(callback, Errors.MISSING_BULK_DOCS);
      }

      var newEdits = 'new_edits' in opts ? opts.new_edits : true;
      // We dont want to modify the users variables in place, JSON is kinda
      // nasty for a deep clone though

      var docs = JSON.parse(JSON.stringify(req.docs));

      // Parse and sort the docs
      var docInfos = docs.map(function(doc, i) {
        var newDoc = parseDoc(doc, newEdits);
        // We want to ensure the order of the processing and return of the docs,
        // so we give them a sequence number
        newDoc._bulk_seq = i;
        return newDoc;
      });

      docInfos.sort(function(a, b) {
        return compareRevs(a.metadata, b.metadata);
      });

      var keyRange = IDBKeyRange.bound(
        docInfos[0].metadata.id, docInfos[docInfos.length-1].metadata.id,
        false, false);

      // This groups edits to the same document together
      var buckets = docInfos.reduce(function(acc, docInfo) {
        if (docInfo.metadata.id === acc[0][0].metadata.id) {
          acc[0].push(docInfo);
        } else {
          acc.unshift([docInfo]);
        }
        return acc;
      }, [[docInfos.shift()]]);

      //The reduce screws up the array ordering
      buckets.reverse();
      buckets.forEach(function(bucket) {
        bucket.sort(function(a, b) { return a._bulk_seq - b._bulk_seq; });
      });

      var txn = idb.transaction([DOC_STORE, BY_SEQ_STORE],
                               IDBTransaction.READ_WRITE);
      var results = [];

      txn.oncomplete = function(event) {
        results.sort(function(a, b) {
          return a._bulk_seq - b._bulk_seq;
        });

        results.forEach(function(result) {
          delete result._bulk_seq;
          db.changes.emit(result);
        });
        call(callback, null, results);
      };

      txn.onerror = function(event) {
        if (callback) {
          var code = event.target.errorCode;
          var message = Object.keys(IDBDatabaseException)[code-1].toLowerCase();
          callback({
            error : event.type,
            reason : message
          });
        }
      };

      txn.ontimeout = function(event) {
        if (callback) {
          var code = event.target.errorCode;
          var message = Object.keys(IDBDatabaseException)[code].toLowerCase();
          callback({
            error : event.type,
            reason : message
          });
        }
      };

      function winningRev(pos, tree) {
        if (!tree[1].length) {
          return pos + '-' + tree[0];
        }
        return winningRev(pos + 1, tree[1][0]);
      }

      var writeDoc = function(docInfo, callback) {
        // The doc will need to refer back to its meta data document
        docInfo.data._id = docInfo.metadata.id;
        if (docInfo.metadata.deleted) {
          docInfo.data._deleted = true;
        }
        docInfo.data._junk = new Date().getTime() + (++junkSeed);
        var dataReq = txn.objectStore(BY_SEQ_STORE).put(docInfo.data);
        dataReq.onsuccess = function(e) {
          docInfo.metadata.seq = e.target.result;
          // We probably shouldnt even store the winning rev, just figure it
          // out on read
          docInfo.metadata.rev = winningRev(docInfo.metadata.revisions[0].pos,
                                            docInfo.metadata.revisions[0].ids);
          var metaDataReq = txn.objectStore(DOC_STORE).put(docInfo.metadata);
          metaDataReq.onsuccess = function() {
            results.push({
              ok: true,
              id: docInfo.metadata.id,
              rev: docInfo.metadata.rev,
              _bulk_seq: docInfo._bulk_seq
            });
            call(callback);
          };
        };
      };

      var makeErr = function(err, seq) {
        err._bulk_seq = seq;
        return err;
      };

      var cursReq = txn.objectStore(DOC_STORE)
        .openCursor(keyRange, IDBCursor.NEXT);

      var update = function(cursor, oldDoc, docInfo, callback) {
        var mergedRevisions = pouch.merge(oldDoc.revisions,
                                          docInfo.metadata.revisions[0], 1000);
        var inConflict = (oldDoc.deleted && docInfo.metadata.deleted) ||
          (!oldDoc.deleted && newEdits && mergedRevisions.conflicts !== 'new_leaf');
        if (inConflict) {
          results.push(makeErr(Errors.REV_CONFLICT, docInfo._bulk_seq));
          call(callback);
          return cursor['continue']();
        }

        docInfo.metadata.revisions = mergedRevisions.tree;

        writeDoc(docInfo, function() {
          cursor['continue']();
          call(callback);
        });
      };

      var insert = function(docInfo, callback) {
        if (docInfo.metadata.deleted) {
          results.push(Errors.MISSING_DOC);
          return;
        }
        writeDoc(docInfo, function() {
          call(callback);
        });
      };

      // If we receive multiple items in bulkdocs with the same id, we process the
      // first but mark rest as conflicts until can think of a sensible reason
      // to not do so
      var markConflicts = function(docs) {
        for (var i = 1; i < docs.length; i++) {
          results.push(makeErr(Errors.REV_CONFLICT, docs[i]._bulk_seq));
        }
      };

      cursReq.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          var bucket = buckets.shift();
          update(cursor, cursor.value, bucket[0], function() {
            markConflicts(bucket);
          });
        } else {
          // Cursor has exceeded the key range so the rest are inserts
          buckets.forEach(function(bucket) {
            insert(bucket[0], function() {
              markConflicts(bucket);
            });
          });
        }
      };
    };

    db.allDocs = function(opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }

      var start = 'startkey' in opts ? opts.startkey : false;
      var end = 'endkey' in opts ? opts.endkey : false;

      var descending = 'descending' in opts ? opts.descending : false;
      descending = descending ? IDBCursor.PREV : null;

      var keyRange = start && end ? IDBKeyRange.bound(start, end, false, false)
        : start ? IDBKeyRange.lowerBound(start, true)
        : end ? IDBKeyRange.upperBound(end) : false;
      var transaction = idb.transaction([DOC_STORE, BY_SEQ_STORE], IDBTransaction.READ);
      var oStore = transaction.objectStore(DOC_STORE);
      var oCursor = keyRange ? oStore.openCursor(keyRange, descending)
        : oStore.openCursor(null, descending);
      var results = [];
      oCursor.onsuccess = function(e) {
        if (!e.target.result) {
          return callback(null, {
            total_rows: results.length,
            rows: results
          });
        }
        var cursor = e.target.result;
        function allDocsInner(metadata, data) {
          if (metadata.deleted !== true) {
            var doc = {
              id: metadata.id,
              key: metadata.id,
              value: {rev: metadata.rev}
            };
            if (opts.include_docs) {
              doc.doc = data;
              doc.doc._rev = metadata.rev;
              delete doc.doc._junk;
              if (opts.conflicts) {
                doc.doc._conflicts = collectConflicts(metadata.revisions);
              }
            }
            results.push(doc);
          }
          cursor['continue']();
        }

        if (!opts.include_docs) {
          allDocsInner(cursor.value);
        } else {
          var index = transaction.objectStore(BY_SEQ_STORE);
          index.get(cursor.value.seq).onsuccess = function(event) {
            allDocsInner(cursor.value, event.target.result);
          };
        }
      }
    };

    db.changes = function(opts, callback) {
      if (opts instanceof Function) {
        opts = {complete: opts};
      }
      if (callback) {
        opts.complete = callback;
      }
      if (!opts.seq) {
        opts.seq = 0;
      }
      var descending = 'descending' in opts ? opts.descending : false;
      descending = descending ? IDBCursor.PREV : null;

      var results = [];
      var transaction = idb.transaction([DOC_STORE, BY_SEQ_STORE]);
      var request = transaction.objectStore(BY_SEQ_STORE)
        .openCursor(IDBKeyRange.lowerBound(opts.seq), descending);
      request.onsuccess = function(event) {
        if (!event.target.result) {
          if (opts.continuous) {
            db.changes.addListener(opts.onChange);
          }
          return call(opts.complete, null, {results: results});
        }
        var cursor = event.target.result;
        var index = transaction.objectStore(DOC_STORE);
        index.get(cursor.value._id).onsuccess = function(event) {
          var doc = event.target.result;
          var c = {
            id: doc.id,
            seq: cursor.key,
            changes: collectLeaves(doc.revisions)
          };
          if (doc.deleted) {
            c.deleted = true;
          }
          if (opts.include_docs) {
            c.doc = cursor.value;
            c.doc._rev = c.changes[0].rev;
            if (opts.conflicts) {
              c.doc._conflicts = collectConflicts(doc.revisions);
            }
          }
          // Dedupe the changes feed
          results = results.filter(function(doc) {
            return doc.id !== c.id;
          });
          results.push(c);
          call(opts.onChange, c);
          cursor['continue']();
        };
      };
      request.onerror = function(error) {
        // Cursor is out of range
        // NOTE: What should we do with a sequence that is too high?
        if (opts.continuous) {
          db.changes.addListener(opts.onChange);
        }
        call(opts.complete);
      };
    };

    db.changes.listeners = [];

    db.changes.emit = function() {
      var a = arguments;
      db.changes.listeners.forEach(function(l) {
        l.apply(l, a);
      });
    };
    db.changes.addListener = function(l) {
      db.changes.listeners.push(l);
    };

    db.replicate = {};

    db.replicate.from = function (url, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }

      pouch.open(url, function(err, remote) {
        if (err) {
          return call(callback, {error: 'borked'});
        }
        replicate(remote, db, callback);
      });
    };

    db.replicate.to = function(dbName, opts, callback) {
      if (opts instanceof Function) {
        callback = opts;
        opts = {};
      }

      pouch.open(dbName, function(err, remote) {
        if (err) {
          return call(callback, {error: 'borked'});
        }
        replicate(db, remote, callback);
      });
    };

    return db;
  };

  pouch.open = function(name, opts, callback) {
    if (opts instanceof Function) {
      callback = opts;
      opts = {};
    }

    if (opts.http || /^http:/.test(name)) {
      return makeCouch(name, opts, callback);
    }

    name = 'pouch:' + name;

    if (name in pouchCache) {
      return call(callback, null, pouchCache[name]);
    }

    var req = indexedDB.open(name, POUCH_VERSION);

    req.onupgradeneeded = function(e) {
      var db = e.target.result;
      db.createObjectStore(DOC_STORE, {keyPath : 'id'})
        .createIndex('seq', 'seq', {unique : true});
      // We are giving a _junk key because firefox really doesnt like
      // writing without a key
      db.createObjectStore(BY_SEQ_STORE, {keyPath: '_junk', autoIncrement : true});
    };

    req.onsuccess = function(e) {

      var db = e.target.result;

      db.onversionchange = function() {
        db.close();
        delete pouchCache[name];
      };

      // polyfill the new onupgradeneeded api for chrome
      if (db.setVersion && Number(db.version) !== POUCH_VERSION) {
        var versionReq = db.setVersion(POUCH_VERSION);
        versionReq.onsuccess = function() {
          req.onupgradeneeded(e);
          req.onsuccess(e);
        };
        return;
      }

      pouchCache[name] = makePouch(db, name);
      call(callback, null, pouchCache[name]);
    };

    req.onerror = function(e) {
      call(callback, {error: 'open', reason: e.toString()});
    };
  };


  pouch.deleteDatabase = function(name, opts, callback) {

    if (opts instanceof Function) {
      callback = opts;
      opts = {};
    }

    if (opts.http || /^http:/.test(name)) {
      var host = getHost(name);
      ajax({type: 'DELETE', url: host.host + host.db}, callback);
    } else {
      var req = indexedDB.deleteDatabase('pouch:' + name);

      req.onsuccess = function() {
        call(callback, null);
      };

      req.onerror = function(e) {
        call(callback, {error: 'delete', reason: e.toString()});
      };
    }
  };

}).call(this);
(function() {

  var pouch = this.pouch;

  // for a better overview of what this is doing, read:
  // https://github.com/apache/couchdb/blob/master/src/couchdb/couch_key_tree.erl
  //
  // But for a quick intro, CouchDB uses a revision tree to store a documents
  // history, A -> B -> C, when a document has conflicts, that is a branch in the
  // tree, A -> (B1 | B2 -> C), We store these as a nested array in the format
  //
  // KeyTree = [Path ... ]
  // Path = {pos: position_from_root, ids: Tree}
  // Tree = [Key, Tree]

  // Turn a path as a flat array into a tree with a single branch
  function pathToTree(path) {
    var root = [path.shift(), []];
    var leaf = root;
    while (path.length) {
      nleaf = [path.shift(), []];
      leaf[1].push(nleaf);
      leaf = nleaf;
    }
    return root;
  }

  // Turn a tree into a list of rootToLeaf paths
  function expandTree(all, current, pos, arr) {
    current = current.slice(0);
    current.push(arr[0]);
    if (!arr[1].length) {
      all.push({pos: pos, ids: current});
    }
    arr[1].forEach(function(child) {
      expandTree(all, current, pos, child);
    });
  }

  function rootToLeaf(tree) {
    var all = [];
    tree.forEach(function(path) {
      expandTree(all, [], path.pos, path.ids);
    });
    return all;
  }

  // To ensure we dont grow the revision tree infinitely, we stem old revisions
  function stem(tree, depth) {
    // First we break out the tree into a complete list of root to leaf paths,
    // we cut off the start of the path and generate a new set of flat trees
    var stemmedPaths = rootToLeaf(tree).map(function(path) {
      var stemmed = path.ids.slice(-depth);
      return {
        pos: path.pos + (path.ids.length - stemmed.length),
        ids: pathToTree(stemmed)
      };
    });
    // Then we remerge all those flat trees together, ensuring that we dont
    // connect trees that would go beyond the depth limit
    return stemmedPaths.reduce(function(prev, current, i, arr) {
      return doMerge(prev, current, true).tree;
    }, [stemmedPaths.shift()]);
  }

  // Merge two trees together
  function mergeTree(tree1, tree2) {
    var conflicts = false;
    for (var i = 0; i < tree2[1].length; i++) {
      if (!tree1[1][0]) {
        conflicts = 'new_leaf';
        tree1[1][0] = tree2[1][i];
      }
      if (tree1[1][0].indexOf(tree2[1][i][0]) === -1) {
        conflicts = 'new_branch';
        tree1[1].push(tree2[1][i]);
        tree1[1].sort();
      } else {
        var result = mergeTree(tree1[1][0], tree2[1][i]);
        conflicts = result.conflicts || conflicts;
        tree1[1][0] = result.tree;
      }
    }
    return {conflicts: conflicts, tree: tree1};
  }

  function doMerge(tree, path, dontExpand) {
    var restree = [];
    var conflicts = false;
    var merged = false;
    var res, branch;

    if (!tree.length) {
      return {tree: [path], conflicts: 'new_leaf'};
    }

    tree.forEach(function(branch) {
      if (branch.pos === path.pos && branch.ids[0] === path.ids[0]) {
        // Paths start at the same position and have the same root, so they need
        // merged
        res = mergeTree(branch.ids, path.ids);
        restree.push({pos: branch.pos, ids: res.tree});
        conflicts = conflicts || res.conflicts;
        merged = true;
      } else if (dontExpand !== true) {
        // The paths start at a different position, take the earliest path and
        // traverse up until it as at the same point from root as the path we want to
        // merge if the keys match we return the longer path with the other merged
        // After stemming we dont want to expand the trees

        // destructive assignment plz
        var t1 = branch.pos < path.pos ? branch : path;
        var t2 = branch.pos < path.pos ? path : branch;
        var diff = t2.pos - t1.pos;
        var parent, tmp = t1.ids;

        while(diff--) {
          parent = tmp[1];
          tmp = tmp[1][0];
        }

        if (tmp[0] !== t2.ids[0]) {
          restree.push(branch);
        } else {
          res = mergeTree(tmp, t2.ids);
          parent[0] = res.tree;
          restree.push({pos: t1.pos, ids: t1.ids});
          conflicts = conflicts || res.conflicts;
          merged = true;
        }
      } else {
        restree.push(branch);
      }
    });

    // We didnt find
    if (!merged) {
      restree.push(path);
    }

    restree.sort(function(a, b) {
      return a.pos - b.pos;
    });

    return {
      tree: restree,
      conflicts: conflicts || 'internal_node'
    };
  }

  pouch.merge = function(tree, path, depth) {
    // Ugh, nicer way to not modify arguments in place?
    tree = JSON.parse(JSON.stringify(tree));
    path = JSON.parse(JSON.stringify(path));
    var newTree = doMerge(tree, path);
    return {
      tree: stem(newTree.tree, depth),
      conflicts: newTree.conflicts
    };
  };

}).call(this);
 })(this);
