'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var dataGrid = require('@material-ui/data-grid');
var createPlotlyComponent = require('react-plotly.js/factory');
var filesize = require('filesize');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var createPlotlyComponent__default = /*#__PURE__*/_interopDefaultLegacy(createPlotlyComponent);
var filesize__default = /*#__PURE__*/_interopDefaultLegacy(filesize);

/**
 * Displays a table from a Frictionless dataset
 * @param schema: Frictionless Table Schema
 * @param data: an array of data objects e.g. [ {a: 1, b: 2}, {a: 5, b: 7} ]
 */

var Table = function Table(_ref) {
  var schema = _ref.schema,
      data = _ref.data;
  var columns = schema.fields.map(function (field) {
    return {
      field: field.title || field.name,
      headerName: field.name,
      width: 300
    };
  });
  data = data.map(function (item, index) {
    item.id = index; //Datagrid requires every row to have an ID

    return item;
  });
  return /*#__PURE__*/React__default['default'].createElement("div", {
    "data-testid": "tableGrid",
    style: {
      height: 400,
      width: '100%'
    }
  }, /*#__PURE__*/React__default['default'].createElement(dataGrid.DataGrid, {
    rows: data,
    columns: columns,
    pageSize: 5
  }));
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Plot;

var PlotlyChart = function PlotlyChart(props) {
  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      plotCreated = _useState2[0],
      setPlotCreated = _useState2[1]; //0: false, 1: true


  React.useEffect(function () {
    Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('plotly.js-basic-dist')); }).then(function (Plotly) {
      //import Plotly dist when Page has been generated
      Plot = createPlotlyComponent__default['default'](Plotly);
      setPlotCreated(1);
    });
  }, []);

  if (!plotCreated) {
    return /*#__PURE__*/React__default['default'].createElement("div", null, "Loading...");
  }

  return /*#__PURE__*/React__default['default'].createElement("div", {
    "data-testid": "plotlyChart"
  }, /*#__PURE__*/React__default['default'].createElement(Plot, _extends({}, props.spec, {
    layout: {
      autosize: true
    },
    style: {
      width: "100%",
      height: "100%"
    },
    useResizeHandler: true
  })));
};

/**
 * KeyInfo component receives two arguments. 
 * @param {Object} descriptor A Frictionless datapackage descriptor object with the following fields:
 * {
 *  title: "Title of the data package",
 *  length: "The number of resources present in the data package"
 *  datasetSize: The combined size of the data package resources
 *  format: The format of resources in the dataset. e.g csv, json, excel
 *  created: The date the dataset was created
 *  updated: The date the dataset was last updated
 *  licence: The licence of the dataset
 *  sources: An array of the data set sources
 * }
 * @param {Array} resources A Frictionless datapackage resource array
 * @returns React Component
 */

var KeyInfo = function KeyInfo(_ref) {
  var descriptor = _ref.descriptor,
      resources = _ref.resources;
  var datasetSize = 0;

  if (resources) {
    datasetSize = resources.length == 1 ? resources[0].size : resources.reduce(function (accumulator, currentValue) {
      return accumulator.size + currentValue.size;
    });
  }

  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("section", {
    className: "m-8",
    name: "key-info",
    id: "key-info"
  }, /*#__PURE__*/React__default['default'].createElement("h1", {
    "data-testid": "datasetTitle",
    className: "text-3xl font-bold mb-8"
  }, descriptor.title), /*#__PURE__*/React__default['default'].createElement("h1", {
    className: "text-2xl font-bold mb-4"
  }, "Key info"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Files")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Size")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Format")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Created")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Updated")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Licence")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Source"))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, resources.length)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, filesize__default['default'](datasetSize, {
    bits: true
  }))), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, resources[0].format, " zip")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, descriptor.created)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, descriptor.updated)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, descriptor.license)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, /*#__PURE__*/React__default['default'].createElement("a", {
    className: "text-yellow-600",
    href: descriptor.sources[0].web
  }, descriptor.sources[0].title))))));
};

/**
 * ResourceInfo component displays all resources in a data package 
 * @param {Array} resources A Frictionless datapackage resource object
 * @returns React Component
 */

var ResourcesInfo = function ResourcesInfo(_ref) {
  var resources = _ref.resources;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("section", {
    className: "m-8",
    name: "file-list"
  }, /*#__PURE__*/React__default['default'].createElement("h1", {
    className: "text-2xl font-bold mb-4"
  }, "Data Files"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "File")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Description")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Size")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Last Changed")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Download"))), resources.map(function (resource, index) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      key: "".concat(index, "_").concat(resource.name),
      className: "grid grid-cols-7 gap-4"
    }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, resource.name)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, resource.description || "No description")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, filesize__default['default'](resource.size, {
      bits: true
    }))), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, resource.updated)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, /*#__PURE__*/React__default['default'].createElement("a", {
      className: "text-yellow-600",
      href: "/dataset/".concat(resource.path)
    }, resource.format, " (", filesize__default['default'](resource.size, {
      bits: true
    }), ")"))));
  })));
};

/**
 * ReadMe component displays the markdown description of a datapackage
 * @param {string} readme parsed html of data package readme
 * @returns React Component
 */

var ReadMe = function ReadMe(_ref) {
  var readmeHtml = _ref.readmeHtml;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("section", {
    className: "m-8",
    name: "sample-table"
  }, /*#__PURE__*/React__default['default'].createElement("h1", {
    className: "text-2xl font-bold mb-4"
  }, "README"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    dangerouslySetInnerHTML: {
      __html: readmeHtml
    }
  }))));
};

exports.KeyInfo = KeyInfo;
exports.PlotlyChart = PlotlyChart;
exports.ReadMe = ReadMe;
exports.ResourceInfo = ResourcesInfo;
exports.Table = Table;
