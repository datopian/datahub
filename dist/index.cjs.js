'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dataGrid = require('@material-ui/data-grid');
var PropTypes = require('prop-types');
var jsxRuntime = require('react/jsx-runtime');
var createPlotlyComponent = require('react-plotly.js/factory');
var filesize = require('filesize');
var timeago = require('timeago.js');
var xDataGrid = require('@mui/x-data-grid');
var FileDownloadIcon = require('@mui/icons-material/FileDownload');
var InsertDriveFileIcon = require('@mui/icons-material/InsertDriveFile');
var FolderIcon = require('@mui/icons-material/Folder');
var Link = require('next/link');
var parse = require('html-react-parser');

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

var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var createPlotlyComponent__default = /*#__PURE__*/_interopDefaultLegacy(createPlotlyComponent);
var filesize__default = /*#__PURE__*/_interopDefaultLegacy(filesize);
var timeago__namespace = /*#__PURE__*/_interopNamespace(timeago);
var FileDownloadIcon__default = /*#__PURE__*/_interopDefaultLegacy(FileDownloadIcon);
var InsertDriveFileIcon__default = /*#__PURE__*/_interopDefaultLegacy(InsertDriveFileIcon);
var FolderIcon__default = /*#__PURE__*/_interopDefaultLegacy(FolderIcon);
var Link__default = /*#__PURE__*/_interopDefaultLegacy(Link);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

const Table = ({
  columns,
  data
}) => {
  let rows = [...data];
  rows = rows.map((row, i) => {
    row['id'] = i;
    return row;
  });
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    "data-testid": "tableGrid",
    children: /*#__PURE__*/jsxRuntime.jsx(dataGrid.DataGrid, {
      rows: rows,
      columns: columns,
      pageSize: 5
    })
  });
};

Table.propTypes = {
  columns: PropTypes__default['default'].array.isRequired,
  data: PropTypes__default['default'].array.isRequired
};

let Plot;

const PlotlyChart = ({
  spec
}) => {
  const [plotCreated, setPlotCreated] = react.useState(0); //0: false, 1: true

  react.useEffect(() => {
    Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('plotly.js-basic-dist')); }).then(Plotly => {
      //import Plotly dist when Page has been generated
      Plot = createPlotlyComponent__default['default'](Plotly);
      setPlotCreated(1);
    });
  }, []);

  if (!plotCreated) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      children: "Loading..."
    });
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", {
    "data-testid": "plotlyChart",
    children: /*#__PURE__*/jsxRuntime.jsx(Plot, { ...spec,
      layout: {
        autosize: true
      },
      style: {
        width: "100%",
        height: "100%"
      },
      useResizeHandler: true
    })
  });
};

PlotlyChart.propTypes = {
  spec: PropTypes__default['default'].object.isRequired
};

const KeyInfo = ({
  descriptor,
  resources
}) => {
  const formats = resources.map(item => item.format).join(', ');
  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: /*#__PURE__*/jsxRuntime.jsxs("section", {
      className: "m-8",
      name: "key-info",
      id: "key-info",
      children: [/*#__PURE__*/jsxRuntime.jsx("h2", {
        className: "text-xl font-bold mb-4",
        children: "Key info"
      }), /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "grid grid-cols-7 gap-4",
        children: [/*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Files"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Size"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Format"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Created"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Updated"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Licenses"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Sources"
          })
        })]
      }), /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "grid grid-cols-7 gap-4",
        children: [/*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl",
            children: resources.length
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl",
            children: descriptor.size || 'N/A'
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl",
            children: formats
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl",
            children: descriptor.created && timeago__namespace.format(descriptor.created)
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl",
            children: descriptor.updated && timeago__namespace.format(descriptor.updated)
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl",
            children: descriptor.licenses?.length && descriptor.licenses.map((item, index) => /*#__PURE__*/jsxRuntime.jsx("a", {
              className: "text-yellow-600",
              href: item.path || '#',
              title: item.title || '',
              children: item.name
            }, index))
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl",
            children: descriptor.sources?.length && descriptor.sources.map((item, index) => /*#__PURE__*/jsxRuntime.jsx("a", {
              className: "text-yellow-600",
              href: item.path,
              children: item.title
            }, index))
          })
        })]
      })]
    })
  });
};

KeyInfo.propTypes = {
  descriptor: PropTypes__default['default'].object.isRequired,
  resources: PropTypes__default['default'].array.isRequired
};

const ResourcesInfo = ({
  resources
}) => {
  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: /*#__PURE__*/jsxRuntime.jsxs("section", {
      className: "m-8",
      name: "file-list",
      children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "grid grid-cols-7 gap-4",
        children: [/*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "File"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Description"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Size"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Created"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Updated"
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          children: /*#__PURE__*/jsxRuntime.jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Download"
          })
        })]
      }), resources.map((resource, index) => {
        return /*#__PURE__*/jsxRuntime.jsxs("div", {
          className: "grid grid-cols-7 gap-4",
          children: [/*#__PURE__*/jsxRuntime.jsx("div", {
            children: /*#__PURE__*/jsxRuntime.jsx("h3", {
              className: "text-1xl",
              children: resource.title || resource.name
            })
          }), /*#__PURE__*/jsxRuntime.jsx("div", {
            children: /*#__PURE__*/jsxRuntime.jsx("h3", {
              className: "text-1xl",
              children: resource.description || "No description"
            })
          }), /*#__PURE__*/jsxRuntime.jsx("div", {
            children: /*#__PURE__*/jsxRuntime.jsx("h3", {
              className: "text-1xl",
              children: resource.size ? filesize__default['default'](resource.size, {
                bits: true
              }) : 0
            })
          }), /*#__PURE__*/jsxRuntime.jsx("div", {
            children: /*#__PURE__*/jsxRuntime.jsx("h3", {
              className: "text-1xl",
              children: resource.created && timeago__namespace.format(resource.created)
            })
          }), /*#__PURE__*/jsxRuntime.jsx("div", {
            children: /*#__PURE__*/jsxRuntime.jsx("h3", {
              className: "text-1xl",
              children: resource.updated && timeago__namespace.format(resource.updated)
            })
          }), /*#__PURE__*/jsxRuntime.jsx("div", {
            children: /*#__PURE__*/jsxRuntime.jsx("h3", {
              className: "text-1xl",
              children: /*#__PURE__*/jsxRuntime.jsx("a", {
                className: "text-yellow-600",
                href: resource.path,
                children: resource.format
              })
            })
          })]
        }, `${index}_${resource.name}`);
      })]
    })
  });
};

ResourcesInfo.propTypes = {
  resources: PropTypes__default['default'].array.isRequired
};

const ReadMe = ({
  readme
}) => {
  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: /*#__PURE__*/jsxRuntime.jsx("section", {
      className: "m-8",
      name: "sample-table",
      children: /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "prose",
        children: /*#__PURE__*/jsxRuntime.jsx("div", {
          dangerouslySetInnerHTML: {
            __html: readme
          }
        })
      })
    })
  });
};

ReadMe.propTypes = {
  readme: PropTypes__default['default'].string.isRequired
};

const DataExplorer = ({
  resources,
  columnHeaderStyle
}) => {
  const [activeTable, setActiveTable] = react.useState(0);
  const [previewMode, setPreviewMode] = react.useState(true);

  const handleTableNameClick = index => {
    setActiveTable(index);
  };

  const getDataGridTable = (resource, columnHeaderStyle) => {
    return /*#__PURE__*/jsxRuntime.jsx(xDataGrid.DataGrid, {
      sx: {
        '& .table-column-header-style-class': {
          backgroundColor: '#f5f5f5',
          color: 'black',
          ...columnHeaderStyle
        }
      },
      columns: generateColumns(resource),
      rows: prepareRows(resource),
      pageSize: 5,
      rowsPerPageOptions: [5]
    }, resource.name);
  };

  const getDataGridSchema = (resource, columnHeaderStyle) => {
    return /*#__PURE__*/jsxRuntime.jsx(xDataGrid.DataGrid, {
      sx: {
        '& .table-column-header-style-class': {
          backgroundColor: '#f5f5f5',
          color: 'black',
          ...columnHeaderStyle
        }
      },
      columns: generateSchemaColumns(),
      rows: prepareSchemaRows(resource),
      pageSize: 5,
      rowsPerPageOptions: [5]
    }, resource.name);
  };

  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    className: "grid grid-cols-12",
    children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "col-span-3",
      children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "flex",
        children: [/*#__PURE__*/jsxRuntime.jsx(FolderIcon__default['default'], {}), /*#__PURE__*/jsxRuntime.jsx("h1", {
          className: "font-bold ml-3",
          children: "Files"
        })]
      }), /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "flex-col",
        children: resources.map((resource, i) => {
          return /*#__PURE__*/jsxRuntime.jsxs("div", {
            className: "flex",
            children: [/*#__PURE__*/jsxRuntime.jsx(InsertDriveFileIcon__default['default'], {
              className: "ml-2"
            }), /*#__PURE__*/jsxRuntime.jsx("button", {
              className: "ml-3 focus:outline-none",
              id: i,
              onClick: () => handleTableNameClick(i),
              children: i === activeTable ? /*#__PURE__*/jsxRuntime.jsxs("h3", {
                children: [resource.name, ".", resource.format]
              }) : /*#__PURE__*/jsxRuntime.jsxs("h3", {
                className: "text-gray-400",
                children: [resource.name, ".", resource.format]
              })
            })]
          }, `res@${i}`);
        })
      })]
    }), /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "col-span-9 border-2",
      children: [/*#__PURE__*/jsxRuntime.jsx("h1", {
        className: "font-bold ml-3 mb-2 capitalize",
        children: resources[activeTable].name
      }), /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "flex",
        children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
          className: "flex mr-3",
          children: [/*#__PURE__*/jsxRuntime.jsx("a", {
            href: resources[activeTable].path,
            children: /*#__PURE__*/jsxRuntime.jsx(FileDownloadIcon__default['default'], {
              className: "ml-2"
            })
          }), /*#__PURE__*/jsxRuntime.jsx("span", {
            children: resources[activeTable].size ? formatResourceSize(resources[activeTable].size) : 'N/A'
          })]
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "mr-3 text-gray-500",
          children: "|"
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "flex mr-3",
          children: /*#__PURE__*/jsxRuntime.jsxs("span", {
            children: [resources[activeTable].sample.length, " rows"]
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "mr-3 text-gray-500",
          children: "|"
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "flex mr-3",
          children: /*#__PURE__*/jsxRuntime.jsxs("span", {
            children: [resources[activeTable].schema.fields.length, " columns"]
          })
        })]
      }), /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "flex mt-5 mb-4",
        children: [/*#__PURE__*/jsxRuntime.jsx("button", {
          className: `${previewMode && 'font-bold underline'} ml-3 mr-5 focus:outline-none`,
          onClick: () => setPreviewMode(!previewMode),
          children: "Preview"
        }), /*#__PURE__*/jsxRuntime.jsx("button", {
          className: `${!previewMode && 'font-bold underline'} ml-3 mr-5 focus:outline-none`,
          onClick: () => setPreviewMode(!previewMode),
          children: "Table Schema"
        })]
      }), previewMode && /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "ml-3",
        style: {
          height: "370px"
        },
        children: getDataGridTable(resources[activeTable], columnHeaderStyle)
      }), !previewMode && /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "ml-3",
        style: {
          height: "370px"
        },
        children: getDataGridSchema(resources[activeTable], columnHeaderStyle)
      })]
    })]
  });
};

const generateColumns = resource => {
  return resource.schema?.fields.map(field => {
    return {
      field: field.name,
      headerName: field.name,
      width: 150,
      description: field.description,
      headerClassName: 'table-column-header-style-class'
    };
  });
};

const prepareRows = resource => {
  return resource.sample.map((row, i) => {
    row['id'] = i;
    return row;
  });
};

const generateSchemaColumns = () => {
  return [{
    field: "name",
    headerName: "Field",
    flex: 0.5,
    description: "Field name",
    headerClassName: 'table-column-header-style-class'
  }, {
    field: "type",
    headerName: "Type",
    width: 150,
    description: "Field type",
    headerClassName: 'table-column-header-style-class'
  }, {
    field: "description",
    headerName: "Description",
    flex: 1,
    description: "Field description",
    headerClassName: 'table-column-header-style-class'
  }];
};

const prepareSchemaRows = resource => {
  return resource.schema?.fields.map((field, i) => {
    field['id'] = i;
    return field;
  });
};

const formatResourceSize = bytes => {
  if (bytes < 1024) {
    return bytes + ' b';
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + ' kb';
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + ' mb';
  } else {
    return bytes;
  }
};

DataExplorer.propTypes = {
  resources: PropTypes__default['default'].array.isRequired
};

const Org = ({
  organization
}) => {
  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: organization ? /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("img", {
        src: organization.image_url || 'https://datahub.io/static/img/datahub-cube-edited.svg',
        className: "h-5 w-5 mr-2 inline-block",
        alt: "org_img"
      }), /*#__PURE__*/jsxRuntime.jsx(Link__default['default'], {
        href: `/@${organization.name}`,
        children: /*#__PURE__*/jsxRuntime.jsx("a", {
          className: "font-semibold text-primary underline",
          children: organization.title || organization.name
        })
      })]
    }) : ''
  });
};

Org.propTypes = {
  organization: PropTypes__default['default'].object.isRequired
};

const Post = ({
  post
}) => {
  const {
    title,
    content,
    createdAt,
    featuredImage
  } = post;
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("h1", {
      className: "text-3xl font-semibold text-primary my-6 inline-block",
      children: title
    }), /*#__PURE__*/jsxRuntime.jsxs("p", {
      className: "mb-6",
      children: ["Posted: ", createdAt]
    }), /*#__PURE__*/jsxRuntime.jsx("img", {
      src: featuredImage,
      className: "mb-6",
      alt: "featured_img"
    }), /*#__PURE__*/jsxRuntime.jsx("div", {
      children: parse__default['default'](content)
    })]
  });
};

Post.propTypes = {
  page: PropTypes__default['default'].shape({
    title: PropTypes__default['default'].string.isRequired,
    content: PropTypes__default['default'].string.isRequired,
    createdAt: PropTypes__default['default'].number,
    featuredImage: PropTypes__default['default'].string
  })
};

const PostList = ({
  posts
}) => {
  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: posts.map((post, index) => /*#__PURE__*/jsxRuntime.jsxs("div", {
      children: [/*#__PURE__*/jsxRuntime.jsx("a", {
        href: `/blog/${post.slug}`,
        className: "text-2xl font-semibold text-primary my-6 inline-block",
        children: parse__default['default'](post.title)
      }), /*#__PURE__*/jsxRuntime.jsx("p", {
        children: parse__default['default'](post.excerpt)
      })]
    }, index))
  });
};

PostList.propTypes = {
  posts: PropTypes__default['default'].object.isRequired
};

const ErrorMessage = ({
  message
}) => {
  return /*#__PURE__*/jsxRuntime.jsxs("aside", {
    children: [message, /*#__PURE__*/jsxRuntime.jsx("style", {
      jsx: true,
      children: `
        aside {
          padding: 1.5em;
          font-size: 14px;
          color: white;
          background-color: red;
        }
      `
    })]
  });
};

ErrorMessage.propTypes = {
  message: PropTypes__default['default'].string.isRequired
};

const CustomLink = ({
  url,
  title
}) => /*#__PURE__*/jsxRuntime.jsx("a", {
  href: url,
  className: "bg-white hover:bg-gray-200 border text-black font-semibold py-2 px-4 rounded",
  children: title
});

CustomLink.propTypes = {
  url: PropTypes__default['default'].string.isRequired,
  title: PropTypes__default['default'].string.isRequired
};

const Nav = ({
  logo,
  navMenu
}) => {
  const [open, setOpen] = react.useState(false);

  const handleClick = event => {
    event.preventDefault();
    setOpen(!open);
  };

  return /*#__PURE__*/jsxRuntime.jsxs("nav", {
    className: "flex items-center justify-between flex-wrap bg-white p-4 border-b border-gray-200",
    children: [/*#__PURE__*/jsxRuntime.jsx("div", {
      className: "flex items-center flex-shrink-0 text-gray-700 mr-6",
      children: /*#__PURE__*/jsxRuntime.jsx(Link__default['default'], {
        href: "/",
        children: /*#__PURE__*/jsxRuntime.jsx("img", {
          src: logo,
          alt: "portal logo",
          width: "40"
        })
      })
    }), /*#__PURE__*/jsxRuntime.jsx("div", {
      className: "block lg:hidden mx-4",
      children: /*#__PURE__*/jsxRuntime.jsx("button", {
        onClick: handleClick,
        className: "flex items-center px-3 py-2 border rounded text-gray-700 border-orange-400 hover:text-black hover:border-black",
        children: /*#__PURE__*/jsxRuntime.jsxs("svg", {
          className: "fill-current h-3 w-3",
          viewBox: "0 0 20 20",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/jsxRuntime.jsx("title", {
            children: "Menu"
          }), /*#__PURE__*/jsxRuntime.jsx("path", {
            d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
          })]
        })
      })
    }), /*#__PURE__*/jsxRuntime.jsx("div", {
      className: `${open ? `block` : `hidden`} lg:block`,
      children: navMenu.map((menu, index) => {
        return /*#__PURE__*/jsxRuntime.jsx(Link__default['default'], {
          href: menu.path,
          children: /*#__PURE__*/jsxRuntime.jsx("a", {
            className: "block mt-4 lg:inline-block lg:mt-0 active:bg-primary-background text-gray-700 hover:text-black mr-6",
            children: menu.title
          })
        }, index);
      })
    })]
  });
};

Nav.propTypes = {
  logo: PropTypes__default['default'].string.isRequired,
  navMenu: PropTypes__default['default'].array.isRequired
};

const Recent = ({
  datasets
}) => {
  return /*#__PURE__*/jsxRuntime.jsx("section", {
    className: "my-10 mx-4 lg:my-20",
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      className: "recent flex flex-col lg:flex-row",
      children: datasets.map((dataset, index) => /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm",
        children: [/*#__PURE__*/jsxRuntime.jsx("h1", {
          className: "text-2xl font-thin",
          children: dataset.title
        }), /*#__PURE__*/jsxRuntime.jsx("p", {
          className: "text-gray-500",
          children: dataset.organization && dataset.organization.description
        }), /*#__PURE__*/jsxRuntime.jsx(Link__default['default'], {
          href: `/@${dataset.organization ? dataset.organization.name : 'dataset'}/${dataset.name}`,
          children: /*#__PURE__*/jsxRuntime.jsx("a", {
            className: "pt-3 flex justify-end text-orange-500",
            children: "View Dataset"
          })
        })]
      }, index))
    })
  });
};

Recent.propTypes = {
  datasets: PropTypes__default['default'].array.isRequired
};

const Form = ({
  handleSubmit
}) => {
  const [searchQuery, setSearchQuery] = react.useState("");
  return /*#__PURE__*/jsxRuntime.jsx("form", {
    onSubmit: e => e.preventDefault(),
    className: "items-center",
    children: /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "flex",
      children: [/*#__PURE__*/jsxRuntime.jsx("input", {
        type: "text",
        name: "search#q",
        value: searchQuery,
        onChange: e => {
          setSearchQuery(e.target.value);
        },
        placeholder: "Search",
        "aria-label": "Search",
        className: "bg-white focus:outline-none focus:shadow-outline border border-gray-300 w-1/2 rounded-lg py-2 px-4 block appearance-none leading-normal"
      }), /*#__PURE__*/jsxRuntime.jsx("button", {
        onClick: () => handleSubmit(searchQuery),
        type: "button",
        className: "inline-block text-sm px-4 py-3 mx-3 leading-none border rounded text-white bg-black border-black lg:mt-0",
        children: "Search"
      })]
    })
  });
};

Form.propTypes = {
  handleSubmit: PropTypes__default['default'].func.isRequired
};

const Item = ({
  dataset
}) => {
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    className: "mb-6",
    children: [/*#__PURE__*/jsxRuntime.jsx("h3", {
      className: "text-xl font-semibold",
      children: /*#__PURE__*/jsxRuntime.jsx(Link__default['default'], {
        href: `/@${dataset.organization ? dataset.organization.name : 'dataset'}/${dataset.name}`,
        children: /*#__PURE__*/jsxRuntime.jsx("a", {
          className: "text-primary",
          children: dataset.title || dataset.name
        })
      })
    }), /*#__PURE__*/jsxRuntime.jsx(Link__default['default'], {
      href: `/@${dataset.organization ? dataset.organization.name : 'dataset'}`,
      children: /*#__PURE__*/jsxRuntime.jsx("a", {
        className: "text-gray-500 block mt-1",
        children: dataset.organization ? dataset.organization.title : 'dataset'
      })
    }), /*#__PURE__*/jsxRuntime.jsx("div", {
      className: "leading-relaxed mt-2",
      children: dataset.description || dataset.notes
    })]
  });
};

Item.propTypes = {
  dataset: PropTypes__default['default'].object.isRequired
};

const Total = ({
  count
}) => {
  return /*#__PURE__*/jsxRuntime.jsxs("h1", {
    className: "text-3xl font-semibold text-primary my-6 inline-block",
    children: [count, " results found"]
  });
};

Total.propTypes = {
  count: PropTypes__default['default'].number.isRequired
};

exports.CustomLink = CustomLink;
exports.DataExplorer = DataExplorer;
exports.Error = ErrorMessage;
exports.Form = Form;
exports.Item = Item;
exports.ItemTotal = Total;
exports.KeyInfo = KeyInfo;
exports.Nav = Nav;
exports.Org = Org;
exports.PlotlyChart = PlotlyChart;
exports.Post = Post;
exports.PostList = PostList;
exports.ReadMe = ReadMe;
exports.Recent = Recent;
exports.ResourceInfo = ResourcesInfo;
exports.Table = Table;
