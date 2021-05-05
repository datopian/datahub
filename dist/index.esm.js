import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import createPlotlyComponent from 'react-plotly.js/factory';
import filesize from 'filesize';
import Link from 'next/link';
import parse from 'html-react-parser';

/**
 * Displays dataset in tabular form using data grid
 * @param columns: An array of column names with properties: e.g [{field: "col1", headerName: "col1"}, {field: "col2", headerName: "col2"}]
 * @param data: an array of data objects e.g. [ {col1: 1, col2: 2}, {col1: 5, col2: 7} ]
 */

var Table = function Table(_ref) {
  var columns = _ref.columns,
      data = _ref.data;
  return /*#__PURE__*/React.createElement("div", {
    "data-testid": "tableGrid",
    style: {
      height: 400,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(DataGrid, {
    rows: data,
    columns: columns,
    pageSize: 5
  }));
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
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

var PlotlyChart = function PlotlyChart(_ref) {
  var spec = _ref.spec;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      plotCreated = _useState2[0],
      setPlotCreated = _useState2[1]; //0: false, 1: true


  useEffect(function () {
    import('plotly.js-basic-dist').then(function (Plotly) {
      //import Plotly dist when Page has been generated
      Plot = createPlotlyComponent(Plotly);
      setPlotCreated(1);
    });
  }, []);

  if (!plotCreated) {
    return /*#__PURE__*/React.createElement("div", null, "Loading...");
  }

  return /*#__PURE__*/React.createElement("div", {
    "data-testid": "plotlyChart"
  }, /*#__PURE__*/React.createElement(Plot, _extends({}, spec, {
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

PlotlyChart.propTypes = {
  spec: PropTypes.object.isRequired
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

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "m-8",
    name: "key-info",
    id: "key-info"
  }, /*#__PURE__*/React.createElement("h1", {
    "data-testid": "datasetTitle",
    className: "text-3xl font-bold mb-8"
  }, descriptor.title), /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold mb-4"
  }, "Key info"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Files")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Size")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Format")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Created")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Updated")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Licence")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Source"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl"
  }, resources.length)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl"
  }, filesize(datasetSize, {
    bits: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl"
  }, resources[0].format, " zip")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl"
  }, descriptor.created)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl"
  }, descriptor.updated)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl"
  }, descriptor.license)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl"
  }, /*#__PURE__*/React.createElement("a", {
    className: "text-yellow-600",
    href: descriptor.sources[0].web
  }, descriptor.sources[0].title))))));
};

KeyInfo.propTypes = {
  descriptor: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired
};

/**
 * ResourceInfo component displays all resources in a data package 
 * @param {Array} resources A Frictionless datapackage resource object
 * @returns React Component
 */

var ResourcesInfo = function ResourcesInfo(_ref) {
  var resources = _ref.resources;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "m-8",
    name: "file-list"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold mb-4"
  }, "Data Files"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "File")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Description")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Size")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Last Changed")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Download"))), resources.map(function (resource, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: "".concat(index, "_").concat(resource.name),
      className: "grid grid-cols-7 gap-4"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-1xl"
    }, resource.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-1xl"
    }, resource.description || "No description")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-1xl"
    }, filesize(resource.size, {
      bits: true
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-1xl"
    }, resource.updated)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-1xl"
    }, /*#__PURE__*/React.createElement("a", {
      className: "text-yellow-600",
      href: "/dataset/".concat(resource.path)
    }, resource.format, " (", filesize(resource.size, {
      bits: true
    }), ")"))));
  })));
};

ResourcesInfo.propTypes = {
  resources: PropTypes.array.isRequired
};

/**
 * ReadMe component displays the markdown description of a datapackage
 * @param {string} readme parsed html of data package readme
 * @returns React Component
 */

var ReadMe = function ReadMe(_ref) {
  var readmeHtml = _ref.readmeHtml;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "m-8",
    name: "sample-table"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold mb-4"
  }, "README"), /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: readmeHtml
    }
  }))));
};

ReadMe.propTypes = {
  readmeHtml: PropTypes.string.isRequired
};

/**
 * Opens a frictionless resource in data explorer. Data explorer gives you
 * an interface to interact with a resource. That means you can do things like 
 * data filtering, sorting, e.t.c
 * @param {object} resource A frictionless Data resource
 * @returns React component
 */

var DataExplorer = function DataExplorer(_ref) {
  var resource = _ref.resource;
  // TODO: Add data explorer code
  return /*#__PURE__*/React.createElement(React.Fragment, null, JSON.stringify(resource));
};

DataExplorer.propTypes = {
  resource: PropTypes.object.isRequired
};

/**
 * Displays information about an organization in a dataset page
 * @param {Object} props object describing the dataset organization. 
 * organization: {
 *   image_url: The image url of the organization
 *   name: The name of the organization
 *   title: The title of the organization
 * } 
 * @returns 
 */

var Org = function Org(_ref) {
  var organization = _ref.organization;
  return /*#__PURE__*/React.createElement(React.Fragment, null, organization ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: organization.image_url || 'https://datahub.io/static/img/datahub-cube-edited.svg',
    className: "h-5 w-5 mr-2 inline-block",
    alt: "org_img"
  }), /*#__PURE__*/React.createElement(Link, {
    href: "/@".concat(organization.name)
  }, /*#__PURE__*/React.createElement("a", {
    className: "font-semibold text-primary underline"
  }, organization.title || organization.name))) : '');
};

Org.propTypes = {
  organization: PropTypes.object.isRequired
};

/**
 * Displays a blog post page
 * @param {object} props 
 * {
 *  title: <The title of the blog post>
 *  content: <The body of the blog post>
 *  modified: <The utc date when the post was last modified.
 *  featured_image: <Url/relative url to post cover image
 * }
 * @returns 
 */

var Post = function Post(_ref) {
  var page = _ref.page;
  var title = page.title,
      content = page.content,
      modified = page.modified,
      featured_image = page.featured_image;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-semibold text-primary my-6 inline-block"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "mb-6"
  }, "Edited: ", modified), /*#__PURE__*/React.createElement("img", {
    src: featured_image,
    className: "mb-6",
    alt: "featured_img"
  }), /*#__PURE__*/React.createElement("div", null, parse(content)));
};

Post.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    modified: PropTypes.string,
    featured_image: PropTypes.string
  })
};

/**
 * Displays a list of blog posts with the title and a short excerp from the content. 
 * @param {object} props 
 * {
 *  posts: {
 *    title: <The title of the blog post>
 *    excerpt: <A short excerpt from the post content>
 *   }
 * } 
 * @returns 
 */

var PostList = function PostList(_ref) {
  var posts = _ref.posts;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-semibold text-primary my-6 inline-block"
  }, posts.length, " posts found"), posts.map(function (post, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index
    }, /*#__PURE__*/React.createElement("a", {
      href: "/blog/".concat(post.slug),
      className: "text-2xl font-semibold text-primary my-6 inline-block"
    }, parse(post.title)), /*#__PURE__*/React.createElement("p", null, parse(post.excerpt)));
  }));
};

PostList.propTypes = {
  posts: PropTypes.object.isRequired
};

/**
 * Error message component with consistent portal style
 * @param {object} props 
 * {
 *  message: The error message to display
 * } 
 * @returns 
 */

var ErrorMessage = function ErrorMessage(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/React.createElement("aside", null, message, /*#__PURE__*/React.createElement("style", {
    jsx: true
  }, "\n        aside {\n          padding: 1.5em;\n          font-size: 14px;\n          color: white;\n          background-color: red;\n        }\n      "));
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

/**
 * Creates a custom link with title
 * @param {object} props 
 * {
 *  url: The url of the custom link
 *  title: The title for the custom link
 * } 
 * @returns React Component
 */

var CustomLink = function CustomLink(_ref) {
  var url = _ref.url,
      title = _ref.title;
  return /*#__PURE__*/React.createElement("a", {
    href: url,
    className: "bg-white hover:bg-gray-200 border text-black font-semibold py-2 px-4 rounded"
  }, title);
};

CustomLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

/**
 * Displays a navigation bar with logo and menu links
 * @param {Object} props object with the following properties:
 * {
 *  logo: The relative url to the logo image
 *  navMenu: An array of objects with menu items. E.g : [{ title: 'Blog', path: '/blog' },{ title: 'Search', path: '/search' }]
 * }
 * @returns React Component
 */

var Nav = function Nav(_ref) {
  var logo = _ref.logo,
      navMenu = _ref.navMenu;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var handleClick = function handleClick(event) {
    event.preventDefault();
    setOpen(!open);
  };

  return /*#__PURE__*/React.createElement("nav", {
    className: "flex items-center justify-between flex-wrap bg-white p-4 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center flex-shrink-0 text-gray-700 mr-6"
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "portal logo",
    width: "40"
  })), /*#__PURE__*/React.createElement("div", {
    className: "block lg:hidden mx-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick,
    className: "flex items-center px-3 py-2 border rounded text-gray-700 border-orange-400 hover:text-black hover:border-black"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "fill-current h-3 w-3",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("title", null, "Menu"), /*#__PURE__*/React.createElement("path", {
    d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "".concat(open ? "block" : "hidden", " lg:block")
  }, navMenu.map(function (menu, index) {
    return /*#__PURE__*/React.createElement(Link, {
      href: menu.path,
      key: index
    }, /*#__PURE__*/React.createElement("a", {
      className: "block mt-4 lg:inline-block lg:mt-0 active:bg-primary-background text-gray-700 hover:text-black mr-6"
    }, menu.title));
  })));
};

Nav.propTypes = {
  logo: PropTypes.string.isRequired,
  navMenu: PropTypes.string
};

/**
 * Displays a list of recent datasets
 * @param {object} props
 * datasets = {
 *    organization: {name: <some name>, title: <some title> },
 *    title: <Data package title>
 *    name:  <Data package name>
 *    description: <description of data package>
 *    notes: <Notes associated with the data package>
 * } 
 * @returns React Component
 */

var Recent = function Recent(_ref) {
  var datasets = _ref.datasets;
  return /*#__PURE__*/React.createElement("section", {
    className: "my-10 mx-4 lg:my-20"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-thin mb-4"
  }, "Recent Datasets"), /*#__PURE__*/React.createElement("div", {
    className: "recent flex flex-col lg:flex-row"
  }, datasets.map(function (dataset, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "text-2xl font-thin"
    }, dataset.title), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-500"
    }, dataset.organization && dataset.organization.description), /*#__PURE__*/React.createElement(Link, {
      href: "/@".concat(dataset.organization ? dataset.organization.name : 'dataset', "/").concat(dataset.name)
    }, /*#__PURE__*/React.createElement("a", {
      className: "pt-3 flex justify-end text-orange-500"
    }, "View Dataset")));
  })));
};

Recent.propTypes = {
  datasets: PropTypes.object.isRequired
};

export { CustomLink, DataExplorer, ErrorMessage as Error, KeyInfo, Nav, Org, PlotlyChart, Post, PostList, ReadMe, Recent, ResourcesInfo as ResourceInfo, Table };
