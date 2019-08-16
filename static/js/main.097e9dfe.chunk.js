(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-3-1!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-2!./node_modules/postcss-loader/src??postcss!./src/App.css ***!
  \************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-3-1!../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-2!../node_modules/postcss-loader/src??postcss!./App.css */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Components_ToggleButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/ToggleButton */ "./src/Components/ToggleButton.js");
/* harmony import */ var _Components_Navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/Navigation */ "./src/Components/Navigation.js");
/* harmony import */ var _Components_ShowMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Components/ShowMenu */ "./src/Components/ShowMenu.js");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Settings */ "./src/Settings.js");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "D:\\wamp\\www\\ambr2\\wp-content\\themes\\ambrosia-react\\react-src\\src\\App.js";










class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.div_state_handler = this.div_state_handler.bind(this);
    this.checked_menu_url_handler = this.checked_menu_url_handler.bind(this);
    this.set_search_str = this.set_search_str.bind(this);
    this.search_str = '';
    this.state = {
      div_state: '',
      checked_menu_url: '',
      rest_menus: []
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillMount() {
    let current_url = this.props.location.pathname;

    if (current_url.includes(_Settings__WEBPACK_IMPORTED_MODULE_7__["default"].MENU_URL)) {
      this.div_state_handler('-open');
      let curr_url_array = current_url.split("/");
      this.setState({
        checked_menu_url: curr_url_array[curr_url_array.length - 2]
      });
    }
  }

  componentDidMount() {
    /*
      * get the list of menus from API
      * use it for getting th first menu url for ToggleButton Component
      * pass the list to the Navigation Component as props to render menu navigation
    */
    this._isMounted = true;
    const url = _Settings__WEBPACK_IMPORTED_MODULE_7__["default"].BASE_FULL + _Settings__WEBPACK_IMPORTED_MODULE_7__["default"].API_URL + '/';
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(url).then(response => response.data).then(data => {
      if (this._isMounted) {
        this.setState({
          rest_menus: data
        });

        if (this.state.checked_menu_url === '') {
          //set checeked_menu_url for toggle button
          this.setState({
            checked_menu_url: this.state.rest_menus[0].url
          });
        }
      }
    }).catch(error => {
      console.log(error.response);
    }); //
  }
  /*
  * function to open and close menu div. 
  * Open called from ToggleButton component. 
  * Close called from Navigation component
  */


  div_state_handler(div_state = '') {
    this.setState({
      div_state: div_state
    });
  }
  /*
  * function to change selected menu url for ToggleButton component. 
  * Called from Navigation Component
  */


  checked_menu_url_handler(checked_menu_url) {
    this.setState({
      checked_menu_url: checked_menu_url
    });
  }

  set_search_str(search_str) {
    this.search_str = search_str;
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ToggleButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      open_div: this.div_state_handler,
      checked_menu_url: this.state.checked_menu_url,
      search_str: this.search_str,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "menu-slider",
      className: 'p-3 sidenav' + this.state.div_state,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: _Settings__WEBPACK_IMPORTED_MODULE_7__["default"].BASE_URL,
      onClick: () => this.div_state_handler('-close'),
      className: "closebtn",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 116
      },
      __self: this
    }, "\u2717"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-100 h-100 main-background",
      style: {
        'backgroundImage': "url('" + _Settings__WEBPACK_IMPORTED_MODULE_7__["default"].BASE_URL + "/wp-content/themes/ambrosia-react/images/pea.jpg')"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Navigation__WEBPACK_IMPORTED_MODULE_5__["default"], {
      rest_menus: this.state.rest_menus,
      checked_menu: this.state.checked_menu_url,
      change_checked_menu_url: this.checked_menu_url_handler,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124
      },
      __self: this
    }), this._isMounted ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
      exact: true,
      path: _Settings__WEBPACK_IMPORTED_MODULE_7__["default"].BASE_URL + _Settings__WEBPACK_IMPORTED_MODULE_7__["default"].MENU_URL,
      render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-fluid text-center pt-5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, "Choose menu"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
      path: _Settings__WEBPACK_IMPORTED_MODULE_7__["default"].BASE_URL + _Settings__WEBPACK_IMPORTED_MODULE_7__["default"].MENU_URL + "/:menu_slug",
      render: props => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ShowMenu__WEBPACK_IMPORTED_MODULE_6__["default"], Object.assign({
        key: shortid__WEBPACK_IMPORTED_MODULE_3___default.a.generate(),
        set_search_str: this.set_search_str
      }, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      })),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 134
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
      path: "*",
      render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-fluid text-center pt-5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      }, "Choose menu"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 143
      },
      __self: this
    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 145
      },
      __self: this
    }, "Wait..."))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(App));

/***/ }),

/***/ "./src/Components/Navigation.js":
/*!**************************************!*\
  !*** ./src/Components/Navigation.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Settings */ "./src/Settings.js");
var _jsxFileName = "D:\\wamp\\www\\ambr2\\wp-content\\themes\\ambrosia-react\\react-src\\src\\Components\\Navigation.js";




class Navigation extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.renderMenuLink = this.renderMenuLink.bind(this);
  }

  renderMenuLink(rest_menu) {
    if (rest_menu.url !== this.props.checked_menu) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: rest_menu.url,
        className: "rest-menu-list-item",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: _Settings__WEBPACK_IMPORTED_MODULE_2__["default"].BASE_URL + _Settings__WEBPACK_IMPORTED_MODULE_2__["default"].MENU_URL + '/' + rest_menu.url + '/',
        onClick: () => this.props.change_checked_menu_url(rest_menu.url),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      }, rest_menu.title));
    } else {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: rest_menu.url,
        className: "rest-menu-list-item-selected",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }, rest_menu.title);
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row text-center justify-content-center",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, this.props.rest_menus.map(rest_menu => this.renderMenuLink(rest_menu)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Navigation);

/***/ }),

/***/ "./src/Components/ShowMenu.js":
/*!************************************!*\
  !*** ./src/Components/ShowMenu.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_image_lightbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-image-lightbox */ "./node_modules/react-image-lightbox/dist/index.es.js");
/* harmony import */ var react_image_lightbox_style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-image-lightbox/style.css */ "./node_modules/react-image-lightbox/style.css");
/* harmony import */ var react_image_lightbox_style_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_image_lightbox_style_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Settings */ "./src/Settings.js");
var _jsxFileName = "D:\\wamp\\www\\ambr2\\wp-content\\themes\\ambrosia-react\\react-src\\src\\Components\\ShowMenu.js";








class ShowMenu extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this._isDataReceived = false;
    this.msg = '';

    const queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");

    const query = queryString.parse(this.props.location.search);
    this.search_str = query.search ? encodeURIComponent(query.search) : '';

    if (this.search_str.length > 0) {
      this.props.set_search_str(this.search_str);
    }

    this.filterSearchItems = this.filterSearchItems.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.images = [];
    this.state = {
      chosen_menu: [],
      _isErrorLoading: false,
      search_str: this.search_str,
      photoIndex: 0,
      isOpen: false,
      _isSearchResults: false
    };
  }

  componentDidMount() {
    const url = _Settings__WEBPACK_IMPORTED_MODULE_6__["default"].BASE_FULL + _Settings__WEBPACK_IMPORTED_MODULE_6__["default"].API_URL + "/" + this.props.match.params.menu_slug;
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(response => response.data).then(data => {
      this._isDataReceived = true;

      if (this.state.search_str.length > 0 && this.state.search_str !== "undefined") {
        this.filterSearchItems(data);
      } else {
        this.setState({
          chosen_menu: data
        });
      }
    }).catch(error => {
      this.setState({
        _isErrorLoading: true
      });
    });
  } //function to filter menu items for matching search string


  filterSearchItems(data) {
    let new_data = [];
    new_data.menu_items = [];
    new_data.title = data.title;
    let title_to_compare = '';
    let content_to_compare = '';
    let search_str_to_compare = this.state.search_str.replace(/%20/g, " ").toUpperCase();
    let regEx = new RegExp(search_str_to_compare, "ig");
    let replaceMask = "<span class='search_hightlight'>$&</span>";
    data.menu_items.forEach(menu_item => {
      title_to_compare = menu_item.title.toUpperCase();
      content_to_compare = menu_item.content.toUpperCase();

      if (menu_item.type === 'product' && (title_to_compare.includes(search_str_to_compare) || content_to_compare.includes(search_str_to_compare))) {
        menu_item.title = menu_item.title.replace(regEx, replaceMask);
        menu_item.content = menu_item.content.replace(regEx, replaceMask);
        new_data.menu_items.push(menu_item);
      }
    });

    if (new_data.menu_items.length > 0) {
      new_data.header_content = data.header_content;
      new_data.footer_content = data.footer_content;
    } else {
      this.msg += "Sorry, no match. Try new search";
    }

    this.setState({
      chosen_menu: new_data,
      _isSearchResults: true
    });
  } //function to render menu item view


  renderMenuItem(menu_item) {
    //used for lightbox. contains image index number 
    let set_photoIndex = 0;

    if (menu_item.type === 'product') {
      //add image to array to show in the lightbox
      if (menu_item.img.src) {
        this.images.push(menu_item.img.src);
        set_photoIndex = this.images.length - 1;
      } //render menu item


      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: shortid__WEBPACK_IMPORTED_MODULE_2___default.a.generate(),
        id: "downloadmenu",
        className: "pb-5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, menu_item.img.thumb_src ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        alt: menu_item.title,
        src: menu_item.img.thumb_src,
        className: "menu_thumb float-right",
        onClick: () => this.setState({
          isOpen: true,
          photoIndex: set_photoIndex
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }) : '', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        className: "menu-item-title",
        dangerouslySetInnerHTML: {
          __html: menu_item.title
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pl-3 pb-0",
        dangerouslySetInnerHTML: {
          __html: menu_item.content
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-right pt-0 prices",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, menu_item.prices ? menu_item.prices.map(price => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-0 w-100",
        key: shortid__WEBPACK_IMPORTED_MODULE_2___default.a.generate(),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, price.price_title ? price.price_title + ': ' : '', " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "price",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }, '$' + price.price_value))) : ''));
    } else {
      //render menu section
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: menu_item.title,
        className: "text-center pt-4 pb-2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        className: "font-weight-bold",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        },
        __self: this
      }, menu_item.title), menu_item.content ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pl-3 pb-3",
        dangerouslySetInnerHTML: {
          __html: menu_item.content
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        },
        __self: this
      }) : '');
    }
  }

  handleSearchChange(event) {
    this.setState({
      search_str: encodeURIComponent(event.target.value)
    });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.props.history.push(_Settings__WEBPACK_IMPORTED_MODULE_6__["default"].BASE_URL + _Settings__WEBPACK_IMPORTED_MODULE_6__["default"].MENU_URL + '/' + this.props.match.params.menu_slug + '/?search=' + this.state.search_str);
  }

  render() {
    const _this$state = this.state,
          photoIndex = _this$state.photoIndex,
          isOpen = _this$state.isOpen;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row text-center justify-content-center",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 168
      },
      __self: this
    }, this._isDataReceived ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 171
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 search-div text-center justify-content-center pt-2 pb-3",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 172
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.handleSearchSubmit,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 173
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "search-form input-group",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 174
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      className: "form-control py-2 border-right-0 border search-form-input ",
      value: decodeURIComponent(this.state.search_str),
      onChange: this.handleSearchChange,
      placeholder: 'Search in ' + this.state.chosen_menu.title,
      "aria-label": "Search",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 175
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "input-group-append",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 182
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "Submit",
      defaultValue: "Submit",
      className: "search-btn btn btn-outline-secondary border-left-0 border",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 183
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-search",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 184
      },
      __self: this
    }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "text-center small pl-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 189
      },
      __self: this
    }, "Search examples:\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "search_example",
      onClick: () => this.setState({
        search_str: 'gluten free'
      }),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191
      },
      __self: this
    }, "gluten free"), " or ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "search_example",
      onClick: () => this.setState({
        search_str: 'beef'
      }),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191
      },
      __self: this
    }, "beef"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 menu-items text-left",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 194
      },
      __self: this
    }, //if search string defined then display link to full menu
    this.state._isSearchResults ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "p-3 text-center font-weight-bold",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 198
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      to: _Settings__WEBPACK_IMPORTED_MODULE_6__["default"].BASE_URL + _Settings__WEBPACK_IMPORTED_MODULE_6__["default"].MENU_URL + '/' + this.props.match.params.menu_slug + '/',
      __source: {
        fileName: _jsxFileName,
        lineNumber: 199
      },
      __self: this
    }, "Back to \"", this.state.chosen_menu.title, "\" menu")) : '', // display message
    this.msg ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "p-3 text-center font-weight-bold",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 210
      },
      __self: this
    }, this.msg) : '', // display header content
    this.state.chosen_menu.header_content ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "p-3 text-center font-weight-bold",
      dangerouslySetInnerHTML: {
        __html: this.state.chosen_menu.header_content
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 217
      },
      __self: this
    }) : '', //render menu items using function
    this.state.chosen_menu.menu_items.map(menu_item => this.renderMenuItem(menu_item)), //display footer content
    this.state.chosen_menu.footer_content ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "p-3 text-center font-weight-bold",
      dangerouslySetInnerHTML: {
        __html: this.state.chosen_menu.footer_content
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 231
      },
      __self: this
    }) : '')) : //display loader or 'no menu' message
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 237
      },
      __self: this
    }, this.state._isErrorLoading ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 240
      },
      __self: this
    }, "Sorry, there is no such menu. Please choose from the list above.") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 menu-items text-center justify-content-center pt-5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 242
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "loader",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 242
      },
      __self: this
    }))), isOpen && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_image_lightbox__WEBPACK_IMPORTED_MODULE_4__["default"], {
      mainSrc: this.images[photoIndex],
      nextSrc: this.images[(photoIndex + 1) % this.images.length],
      prevSrc: this.images[(photoIndex + this.images.length - 1) % this.images.length],
      onCloseRequest: () => this.setState({
        isOpen: false
      }),
      onMovePrevRequest: () => this.setState({
        photoIndex: (photoIndex + this.images.length - 1) % this.images.length
      }),
      onMoveNextRequest: () => this.setState({
        photoIndex: (photoIndex + 1) % this.images.length
      }),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 249
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(ShowMenu));

/***/ }),

/***/ "./src/Components/ToggleButton.js":
/*!****************************************!*\
  !*** ./src/Components/ToggleButton.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Settings */ "./src/Settings.js");
var _jsxFileName = "D:\\wamp\\www\\ambr2\\wp-content\\themes\\ambrosia-react\\react-src\\src\\Components\\ToggleButton.js";




class ToggleButton extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    let search_str = this.props.search_str ? '?search=' + this.props.search_str : '';
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-leaf menu_leaf",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: _Settings__WEBPACK_IMPORTED_MODULE_2__["default"].BASE_URL + _Settings__WEBPACK_IMPORTED_MODULE_2__["default"].MENU_URL + '/' + this.props.checked_menu_url + '/' + search_str,
      onClick: () => this.props.open_div('-open'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, "Menu")));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ToggleButton);

/***/ }),

/***/ "./src/Settings.js":
/*!*************************!*\
  !*** ./src/Settings.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Constants = {
  BASE_URL: "/ambr2",
  BASE_FULL: "http://localhost/ambr2",
  API_URL: '/wp-json/v2/rest-menu/menus',
  MENU_URL: '/menu'
};
/* harmony default export */ __webpack_exports__["default"] = (Constants);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_app_polyfill_ie11__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-app-polyfill/ie11 */ "./node_modules/react-app-polyfill/ie11.js");
/* harmony import */ var react_app_polyfill_ie11__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_app_polyfill_ie11__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App */ "./src/App.js");
var _jsxFileName = "D:\\wamp\\www\\ambr2\\wp-content\\themes\\ambrosia-react\\react-src\\src\\index.js";





Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["BrowserRouter"], {
  basename: '/',
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_4__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 11
  },
  __self: undefined
})), document.querySelector('#root'));

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\wamp\www\ambr2\wp-content\themes\ambrosia-react\react-src\src\index.js */"./src/index.js");


/***/ })

},[[0,"runtime~main",0]]]);
//# sourceMappingURL=main.097e9dfe.chunk.js.map