import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import createPlotlyComponent from 'react-plotly.js/factory';
import filesize from 'filesize';
import * as timeago from 'timeago.js';
import { DataGrid as DataGrid$1 } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import Link from 'next/link';
import parse from 'html-react-parser';

const Table = ({
  columns,
  data,
  height,
  width
}) => {
  let rows = [...data];
  rows = rows.map((row, i) => {
    row['id'] = i;
    return row;
  });
  return /*#__PURE__*/jsx("div", {
    style: {
      height,
      width
    },
    "data-testid": "tableGrid",
    children: /*#__PURE__*/jsx(DataGrid, {
      rows: rows,
      columns: columns,
      pageSize: 5
    })
  });
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

let Plot;

const PlotlyChart = ({
  spec
}) => {
  const [plotCreated, setPlotCreated] = useState(0); //0: false, 1: true

  useEffect(() => {
    import('plotly.js-basic-dist').then(Plotly => {
      //import Plotly dist when Page has been generated
      Plot = createPlotlyComponent(Plotly);
      setPlotCreated(1);
    });
  }, []);

  if (!plotCreated) {
    return /*#__PURE__*/jsx("div", {
      children: "Loading..."
    });
  }

  return /*#__PURE__*/jsx("div", {
    "data-testid": "plotlyChart",
    children: /*#__PURE__*/jsx(Plot, { ...spec,
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
  spec: PropTypes.object.isRequired
};

const KeyInfo = ({
  descriptor,
  resources
}) => {
  const formats = resources.map(item => item.format).join(', ');
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs("section", {
      className: "m-8",
      name: "key-info",
      id: "key-info",
      children: [/*#__PURE__*/jsx("h2", {
        className: "text-xl font-bold mb-4",
        children: "Key info"
      }), /*#__PURE__*/jsxs("div", {
        className: "grid grid-cols-7 gap-4",
        children: [/*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Files"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Size"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Format"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Created"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Updated"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Licenses"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Sources"
          })
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: "grid grid-cols-7 gap-4",
        children: [/*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl",
            children: resources.length
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl",
            children: descriptor.size || 'N/A'
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl",
            children: formats
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl",
            children: descriptor.created && timeago.format(descriptor.created)
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl",
            children: descriptor.updated && timeago.format(descriptor.updated)
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl",
            children: descriptor.licenses?.length && descriptor.licenses.map((item, index) => /*#__PURE__*/jsx("a", {
              className: "text-yellow-600",
              href: item.path || '#',
              title: item.title || '',
              children: item.name
            }, index))
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl",
            children: descriptor.sources?.length && descriptor.sources.map((item, index) => /*#__PURE__*/jsx("a", {
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
  descriptor: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired
};

const ResourcesInfo = ({
  resources
}) => {
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs("section", {
      className: "m-8",
      name: "file-list",
      children: [/*#__PURE__*/jsxs("div", {
        className: "grid grid-cols-7 gap-4",
        children: [/*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "File"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Description"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Size"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Created"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Updated"
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("h3", {
            className: "text-1xl font-bold mb-2",
            children: "Download"
          })
        })]
      }), resources.map((resource, index) => {
        return /*#__PURE__*/jsxs("div", {
          className: "grid grid-cols-7 gap-4",
          children: [/*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("h3", {
              className: "text-1xl",
              children: resource.title || resource.name
            })
          }), /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("h3", {
              className: "text-1xl",
              children: resource.description || "No description"
            })
          }), /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("h3", {
              className: "text-1xl",
              children: resource.size ? filesize(resource.size, {
                bits: true
              }) : 0
            })
          }), /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("h3", {
              className: "text-1xl",
              children: resource.created && timeago.format(resource.created)
            })
          }), /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("h3", {
              className: "text-1xl",
              children: resource.updated && timeago.format(resource.updated)
            })
          }), /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("h3", {
              className: "text-1xl",
              children: /*#__PURE__*/jsx("a", {
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
  resources: PropTypes.array.isRequired
};

const ReadMe = ({
  readme
}) => {
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("section", {
      className: "m-8",
      name: "sample-table",
      children: /*#__PURE__*/jsx("div", {
        className: "prose",
        children: /*#__PURE__*/jsx("div", {
          dangerouslySetInnerHTML: {
            __html: readme
          }
        })
      })
    })
  });
};

ReadMe.propTypes = {
  readme: PropTypes.string.isRequired
};

const DataExplorer = ({
  resources,
  columnHeaderStyle
}) => {
  const [activeTable, setActiveTable] = useState(0);
  const [previewMode, setPreviewMode] = useState(true);

  const handleTableNameClick = index => {
    setActiveTable(index);
  };

  const getDataGridTable = (resource, columnHeaderStyle) => {
    return /*#__PURE__*/jsx(DataGrid$1, {
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
    return /*#__PURE__*/jsx(DataGrid$1, {
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

  return /*#__PURE__*/jsxs("div", {
    className: "grid grid-cols-12",
    children: [/*#__PURE__*/jsxs("div", {
      className: "col-span-3",
      children: [/*#__PURE__*/jsxs("div", {
        className: "flex",
        children: [/*#__PURE__*/jsx(FolderIcon, {}), /*#__PURE__*/jsx("h1", {
          className: "font-bold ml-3",
          children: "Files"
        })]
      }), /*#__PURE__*/jsx("div", {
        className: "flex-col",
        children: resources.map((resource, i) => {
          return /*#__PURE__*/jsxs("div", {
            className: "flex",
            children: [/*#__PURE__*/jsx(InsertDriveFileIcon, {
              className: "ml-2"
            }), /*#__PURE__*/jsx("button", {
              className: "ml-3 focus:outline-none",
              id: i,
              onClick: () => handleTableNameClick(i),
              children: i === activeTable ? /*#__PURE__*/jsxs("h3", {
                children: [resource.name, ".", resource.format]
              }) : /*#__PURE__*/jsxs("h3", {
                className: "text-gray-400",
                children: [resource.name, ".", resource.format]
              })
            })]
          }, `res@${i}`);
        })
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: "col-span-9 border-2",
      children: [/*#__PURE__*/jsx("h1", {
        className: "font-bold ml-3 mb-2 capitalize",
        children: resources[activeTable].name
      }), /*#__PURE__*/jsxs("div", {
        className: "flex",
        children: [/*#__PURE__*/jsxs("div", {
          className: "flex mr-3",
          children: [/*#__PURE__*/jsx("a", {
            href: resources[activeTable].path,
            children: /*#__PURE__*/jsx(FileDownloadIcon, {
              className: "ml-2"
            })
          }), /*#__PURE__*/jsx("span", {
            children: resources[activeTable].size ? formatResourceSize(resources[activeTable].size) : 'N/A'
          })]
        }), /*#__PURE__*/jsx("div", {
          className: "mr-3 text-gray-500",
          children: "|"
        }), /*#__PURE__*/jsx("div", {
          className: "flex mr-3",
          children: /*#__PURE__*/jsxs("span", {
            children: [resources[activeTable].sample.length, " rows"]
          })
        }), /*#__PURE__*/jsx("div", {
          className: "mr-3 text-gray-500",
          children: "|"
        }), /*#__PURE__*/jsx("div", {
          className: "flex mr-3",
          children: /*#__PURE__*/jsxs("span", {
            children: [resources[activeTable].schema.fields.length, " columns"]
          })
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: "flex mt-5 mb-4",
        children: [/*#__PURE__*/jsx("button", {
          className: `${previewMode && 'font-bold underline'} ml-3 mr-5 focus:outline-none`,
          onClick: () => setPreviewMode(!previewMode),
          children: "Preview"
        }), /*#__PURE__*/jsx("button", {
          className: `${!previewMode && 'font-bold underline'} ml-3 mr-5 focus:outline-none`,
          onClick: () => setPreviewMode(!previewMode),
          children: "Table Schema"
        })]
      }), previewMode && /*#__PURE__*/jsx("div", {
        className: "ml-3",
        style: {
          height: "370px"
        },
        children: getDataGridTable(resources[activeTable], columnHeaderStyle)
      }), !previewMode && /*#__PURE__*/jsx("div", {
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
  resources: PropTypes.array.isRequired
};

const Org = ({
  organization
}) => {
  return /*#__PURE__*/jsx(Fragment, {
    children: organization ? /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx("img", {
        src: organization.image_url || 'https://datahub.io/static/img/datahub-cube-edited.svg',
        className: "h-5 w-5 mr-2 inline-block",
        alt: "org_img"
      }), /*#__PURE__*/jsx(Link, {
        href: `/@${organization.name}`,
        children: /*#__PURE__*/jsx("a", {
          className: "font-semibold text-primary underline",
          children: organization.title || organization.name
        })
      })]
    }) : ''
  });
};

Org.propTypes = {
  organization: PropTypes.object.isRequired
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
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("h1", {
      className: "text-3xl font-semibold text-primary my-6 inline-block",
      children: title
    }), /*#__PURE__*/jsxs("p", {
      className: "mb-6",
      children: ["Posted: ", createdAt]
    }), /*#__PURE__*/jsx("img", {
      src: featuredImage,
      className: "mb-6",
      alt: "featured_img"
    }), /*#__PURE__*/jsx("div", {
      children: parse(content)
    })]
  });
};

Post.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.number,
    featuredImage: PropTypes.string
  })
};

const PostList = ({
  posts
}) => {
  return /*#__PURE__*/jsx(Fragment, {
    children: posts.map((post, index) => /*#__PURE__*/jsxs("div", {
      children: [/*#__PURE__*/jsx("a", {
        href: `/blog/${post.slug}`,
        className: "text-2xl font-semibold text-primary my-6 inline-block",
        children: parse(post.title)
      }), /*#__PURE__*/jsx("p", {
        children: parse(post.excerpt)
      })]
    }, index))
  });
};

PostList.propTypes = {
  posts: PropTypes.object.isRequired
};

const ErrorMessage = ({
  message
}) => {
  return /*#__PURE__*/jsxs("aside", {
    children: [message, /*#__PURE__*/jsx("style", {
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
  message: PropTypes.string.isRequired
};

const CustomLink = ({
  url,
  title
}) => /*#__PURE__*/jsx("a", {
  href: url,
  className: "bg-white hover:bg-gray-200 border text-black font-semibold py-2 px-4 rounded",
  children: title
});

CustomLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const Nav = ({
  logo,
  navMenu
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = event => {
    event.preventDefault();
    setOpen(!open);
  };

  return /*#__PURE__*/jsxs("nav", {
    className: "flex items-center justify-between flex-wrap bg-white p-4 border-b border-gray-200",
    children: [/*#__PURE__*/jsx("div", {
      className: "flex items-center flex-shrink-0 text-gray-700 mr-6",
      children: /*#__PURE__*/jsx(Link, {
        href: "/",
        children: /*#__PURE__*/jsx("img", {
          src: logo,
          alt: "portal logo",
          width: "40"
        })
      })
    }), /*#__PURE__*/jsx("div", {
      className: "block lg:hidden mx-4",
      children: /*#__PURE__*/jsx("button", {
        onClick: handleClick,
        className: "flex items-center px-3 py-2 border rounded text-gray-700 border-orange-400 hover:text-black hover:border-black",
        children: /*#__PURE__*/jsxs("svg", {
          className: "fill-current h-3 w-3",
          viewBox: "0 0 20 20",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/jsx("title", {
            children: "Menu"
          }), /*#__PURE__*/jsx("path", {
            d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
          })]
        })
      })
    }), /*#__PURE__*/jsx("div", {
      className: `${open ? `block` : `hidden`} lg:block`,
      children: navMenu.map((menu, index) => {
        return /*#__PURE__*/jsx(Link, {
          href: menu.path,
          children: /*#__PURE__*/jsx("a", {
            className: "block mt-4 lg:inline-block lg:mt-0 active:bg-primary-background text-gray-700 hover:text-black mr-6",
            children: menu.title
          })
        }, index);
      })
    })]
  });
};

Nav.propTypes = {
  logo: PropTypes.string.isRequired,
  navMenu: PropTypes.array.isRequired
};

const Recent = ({
  datasets
}) => {
  return /*#__PURE__*/jsx("section", {
    className: "my-10 mx-4 lg:my-20",
    children: /*#__PURE__*/jsx("div", {
      className: "recent flex flex-col lg:flex-row",
      children: datasets.map((dataset, index) => /*#__PURE__*/jsxs("div", {
        className: "border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm",
        children: [/*#__PURE__*/jsx("h1", {
          className: "text-2xl font-thin",
          children: dataset.title
        }), /*#__PURE__*/jsx("p", {
          className: "text-gray-500",
          children: dataset.organization && dataset.organization.description
        }), /*#__PURE__*/jsx(Link, {
          href: `/@${dataset.organization ? dataset.organization.name : 'dataset'}/${dataset.name}`,
          children: /*#__PURE__*/jsx("a", {
            className: "pt-3 flex justify-end text-orange-500",
            children: "View Dataset"
          })
        })]
      }, index))
    })
  });
};

Recent.propTypes = {
  datasets: PropTypes.array.isRequired
};

const Form = ({
  handleSubmit
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  return /*#__PURE__*/jsx("form", {
    onSubmit: e => e.preventDefault(),
    className: "items-center",
    children: /*#__PURE__*/jsxs("div", {
      className: "flex",
      children: [/*#__PURE__*/jsx("input", {
        type: "text",
        name: "search#q",
        value: searchQuery,
        onChange: e => {
          setSearchQuery(e.target.value);
        },
        placeholder: "Search",
        "aria-label": "Search",
        className: "bg-white focus:outline-none focus:shadow-outline border border-gray-300 w-1/2 rounded-lg py-2 px-4 block appearance-none leading-normal"
      }), /*#__PURE__*/jsx("button", {
        onClick: () => handleSubmit(searchQuery),
        type: "button",
        className: "inline-block text-sm px-4 py-3 mx-3 leading-none border rounded text-white bg-black border-black lg:mt-0",
        children: "Search"
      })]
    })
  });
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const Item = ({
  dataset
}) => {
  return /*#__PURE__*/jsxs("div", {
    className: "mb-6",
    children: [/*#__PURE__*/jsx("h3", {
      className: "text-xl font-semibold",
      children: /*#__PURE__*/jsx(Link, {
        href: `/@${dataset.organization ? dataset.organization.name : 'dataset'}/${dataset.name}`,
        children: /*#__PURE__*/jsx("a", {
          className: "text-primary",
          children: dataset.title || dataset.name
        })
      })
    }), /*#__PURE__*/jsx(Link, {
      href: `/@${dataset.organization ? dataset.organization.name : 'dataset'}`,
      children: /*#__PURE__*/jsx("a", {
        className: "text-gray-500 block mt-1",
        children: dataset.organization ? dataset.organization.title : 'dataset'
      })
    }), /*#__PURE__*/jsx("div", {
      className: "leading-relaxed mt-2",
      children: dataset.description || dataset.notes
    })]
  });
};

Item.propTypes = {
  dataset: PropTypes.object.isRequired
};

const Total = ({
  count
}) => {
  return /*#__PURE__*/jsxs("h1", {
    className: "text-3xl font-semibold text-primary my-6 inline-block",
    children: [count, " results found"]
  });
};

Total.propTypes = {
  count: PropTypes.number.isRequired
};

export { CustomLink, DataExplorer, ErrorMessage as Error, Form, Item, Total as ItemTotal, KeyInfo, Nav, Org, PlotlyChart, Post, PostList, ReadMe, Recent, ResourcesInfo as ResourceInfo, Table };
