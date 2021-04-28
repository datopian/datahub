'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var dataGrid = require('@material-ui/data-grid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/* eslint-disable max-len */
/*
 * @param schema: Frictionless Table Schmea
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

exports.Table = Table;
