'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ReactTable = require('react-table-v6');
var Plotly = require('plotly.js-basic-dist');
var createPlotlyComponent = require('react-plotly.js/factory');
var reactPdfJs = require('react-pdf-js');
var reactI18next = require('react-i18next');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactTable__default = /*#__PURE__*/_interopDefaultLegacy(ReactTable);
var Plotly__default = /*#__PURE__*/_interopDefaultLegacy(Plotly);
var createPlotlyComponent__default = /*#__PURE__*/_interopDefaultLegacy(createPlotlyComponent);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
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

var Table = /*#__PURE__*/function (_React$Component) {
  _inherits(Table, _React$Component);

  var _super = _createSuper(Table);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _super.call(this, props);
    _this.state = {
      data: _this.props.data,
      schema: Object.assign({}, _this.props.schema)
    };
    return _this;
  }

  _createClass(Table, [{
    key: "updateData",
    value: function updateData(newData) {
      this.setState({
        data: newData
      });
    }
  }, {
    key: "getFields",
    value: function getFields() {
      if (this.state.schema && this.state.schema.fields) {
        return this.state.schema.fields;
      }

      var fields = [];

      for (var key in this.state.data[0]) {
        fields.push({
          name: key
        });
      }

      return fields;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement(ReactTable__default['default'], {
        data: this.state.data,
        columns: this.getFields().map(function (field) {
          return {
            Header: field.name,
            id: field.name,
            accessor: function accessor(val) {
              return val[field.name];
            },
            Cell: function Cell(props) {
              return /*#__PURE__*/React__default['default'].createElement("div", {
                className: field.type || ''
              }, /*#__PURE__*/React__default['default'].createElement("span", null, props.value));
            }
          };
        }),
        getTheadThProps: function getTheadThProps() {
          return {
            style: {
              "wordWrap": "break-word",
              "whiteSpace": "initial"
            }
          };
        },
        showPagination: false,
        defaultPageSize: 100,
        showPageSizeOptions: false,
        minRows: 10
      });
    }
  }]);

  return Table;
}(React__default['default'].Component);

function Chart (props) {
  var Plot = createPlotlyComponent__default['default'](Plotly__default['default']); // removes produced with plotly logo by default

  if (!props.spec.config || !props.spec.config.displaylogo) {
    props.spec.config = Object.assign(props.spec.config || {}, {
      displaylogo: false
    });
  }

  return /*#__PURE__*/React__default['default'].createElement(Plot, _extends({}, props.spec, {
    layout: {
      autosize: true
    },
    style: {
      width: "100%",
      height: "100%"
    },
    useResizeHandler: "true"
  }));
}

var PdfViewer = function PdfViewer(props) {
  var _useState = React.useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      pages = _useState4[0],
      setPages = _useState4[1];

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var renderPagination = function renderPagination(page, pages) {
    if (!pages) {
      return null;
    }

    var previousButton = /*#__PURE__*/React__default['default'].createElement("li", {
      className: "previous",
      onClick: function onClick() {
        return setPage(page - 1);
      }
    }, /*#__PURE__*/React__default['default'].createElement("a", {
      href: "#previous"
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "arrow-left"
    }), " Previous"));

    if (page === 1) {
      previousButton = /*#__PURE__*/React__default['default'].createElement("li", {
        className: "previous disabled"
      }, /*#__PURE__*/React__default['default'].createElement("a", {
        href: "#previous"
      }, /*#__PURE__*/React__default['default'].createElement("span", {
        className: "arrow-left"
      }), " Previous"));
    }

    var nextButton = /*#__PURE__*/React__default['default'].createElement("li", {
      className: "next",
      onClick: function onClick() {
        return setPage(page + 1);
      }
    }, /*#__PURE__*/React__default['default'].createElement("a", {
      href: "#next"
    }, "Next ", /*#__PURE__*/React__default['default'].createElement("span", {
      className: "arrow-right"
    })));

    if (page === pages) {
      nextButton = /*#__PURE__*/React__default['default'].createElement("li", {
        className: "next disabled"
      }, /*#__PURE__*/React__default['default'].createElement("a", {
        href: "#next"
      }, "Next ", /*#__PURE__*/React__default['default'].createElement("span", {
        className: "arrow-right"
      })));
    }

    return /*#__PURE__*/React__default['default'].createElement("nav", {
      "aria-label": "Navigate pages: Previous/Next"
    }, /*#__PURE__*/React__default['default'].createElement("ul", {
      className: "pager"
    }, previousButton, nextButton));
  };

  var canvasEl = React.useRef(null);

  var _usePdf = reactPdfJs.usePdf({
    file: props.file,
    page: page,
    canvasEl: canvasEl
  }),
      _usePdf2 = _slicedToArray(_usePdf, 2),
      loading = _usePdf2[0],
      numPages = _usePdf2[1];

  React.useEffect(function () {
    setPages(numPages);
  }, [numPages]);
  return /*#__PURE__*/React__default['default'].createElement("div", null, loading && /*#__PURE__*/React__default['default'].createElement("span", null, t('Loading...')), /*#__PURE__*/React__default['default'].createElement("canvas", {
    ref: canvasEl
  }), renderPagination(page, pages));
};

exports.Chart = Chart;
exports.Document = PdfViewer;
exports.Table = Table;
