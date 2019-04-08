function doGet() {
}
function fetchPrice() {
}!function(e, a) {
    for (var i in a) e[i] = a[i];
}(this, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 1);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return doGet;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return fetchPrice;
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }();
    var doGet = function(e) {
        var query = void 0 !== e.parameter.q ? e.parameter.q : "", html = HtmlService.createTemplateFromFile("index");
        return html.query = query, html.evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1");
    }, fetchPrice = function(service, query) {
        return services[service].startFetch(query);
    }, Service = function() {
        function Service(name, urlFunc, charset, regexp, returnFunc) {
            !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Service), this.name = name, this.urlFunc = urlFunc, this.charset = charset, 
            this.regexp = regexp, this.returnFunc = returnFunc;
        }
        return _createClass(Service, [ {
            key: "startFetch",
            value: function(query) {
                for (var html = UrlFetchApp.fetch(this.urlFunc(query)).getContentText(this.charset), items = [], matches = void 0; null !== (matches = this.regexp.exec(html)); ) items.push(this.returnFunc(matches));
                return {
                    service: this.name,
                    query: query,
                    items: items
                };
            }
        } ]), Service;
    }(), services = {
        BookOffOnline: new Service("BookOffOnline", function(q) {
            return "https://www.bookoffonline.co.jp/boleccontent/bolbuysearch/buysearch/search?bg=&q=" + EscapeSJIS(q);
        }, "ms932", new RegExp(/class="sell-item-title-maintitle">(.+?)<\/span>[\s\S]+?class="sell-item-price.+?>([-\d]+)円/g), function(m) {
            return {
                price: m[2],
                title: m[1]
            };
        }),
        NetOff: new Service("NetOff", function(q) {
            return "https://www.netoff.co.jp/sellcont/nid/PurchaseList/cid/?P2=&P9=4&P10=2&actionNameTxt=&cboCtgry=&cboLRack=&SearchKeyWord1=" + q + "&hdnSearchKeyWord1=" + q + "&hdnSearchKeyWord2=";
        }, "utf-8", new RegExp(/border="">(.+?)<\/span><\/A>	<!-- タイトル -->[\s\S]+?texttype01" style="text-align:center;">([\d,]+)円<\/td>				<!-- 買取価格 -->/g), function(m) {
            return {
                price: m[2],
                title: m[1]
            };
        })
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _server_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        global.doGet = _server_utilities_js__WEBPACK_IMPORTED_MODULE_0__["a"], global.fetchPrice = _server_utilities_js__WEBPACK_IMPORTED_MODULE_0__["b"];
    }.call(this, __webpack_require__(2));
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
} ]));