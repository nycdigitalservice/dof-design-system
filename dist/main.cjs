"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const __uno = "";
const main = "";
(() => {
  (function() {
    var attributesObserver = function(whenDefined2, MutationObserver2) {
      var attributeChanged = function attributeChanged2(records) {
        for (var i = 0, length = records.length; i < length; i++)
          dispatch(records[i]);
      };
      var dispatch = function dispatch2(_ref2) {
        var target = _ref2.target, attributeName = _ref2.attributeName, oldValue = _ref2.oldValue;
        target.attributeChangedCallback(attributeName, oldValue, target.getAttribute(attributeName));
      };
      return function(target, is2) {
        var attributeFilter = target.constructor.observedAttributes;
        if (attributeFilter) {
          whenDefined2(is2).then(function() {
            new MutationObserver2(attributeChanged).observe(target, {
              attributes: true,
              attributeOldValue: true,
              attributeFilter
            });
            for (var i = 0, length = attributeFilter.length; i < length; i++) {
              if (target.hasAttribute(attributeFilter[i]))
                dispatch({
                  target,
                  attributeName: attributeFilter[i],
                  oldValue: null
                });
            }
          });
        }
        return target;
      };
    };
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function() {
          };
          return {
            s: F,
            n: function() {
              if (i >= o.length)
                return {
                  done: true
                };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function(e) {
              throw e;
            },
            f: F
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return {
        s: function() {
          it = it.call(o);
        },
        n: function() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function(e) {
          didErr = true;
          err = e;
        },
        f: function() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        }
      };
    }
    var TRUE = true, FALSE = false, QSA$1 = "querySelectorAll";
    var notify = function notify2(callback) {
      var root = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
      var MO = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : MutationObserver;
      var query2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ["*"];
      var loop = function loop2(nodes, selectors, added, removed, connected, pass) {
        var _iterator = _createForOfIteratorHelper(nodes), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var node = _step.value;
            if (pass || QSA$1 in node) {
              if (connected) {
                if (!added.has(node)) {
                  added.add(node);
                  removed["delete"](node);
                  callback(node, connected);
                }
              } else if (!removed.has(node)) {
                removed.add(node);
                added["delete"](node);
                callback(node, connected);
              }
              if (!pass)
                loop2(node[QSA$1](selectors), selectors, added, removed, connected, TRUE);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };
      var mo = new MO(function(records) {
        if (query2.length) {
          var selectors = query2.join(",");
          var added = /* @__PURE__ */ new Set(), removed = /* @__PURE__ */ new Set();
          var _iterator2 = _createForOfIteratorHelper(records), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var _step2$value = _step2.value, addedNodes = _step2$value.addedNodes, removedNodes = _step2$value.removedNodes;
              loop(removedNodes, selectors, added, removed, FALSE, FALSE);
              loop(addedNodes, selectors, added, removed, TRUE, FALSE);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      });
      var observe = mo.observe;
      (mo.observe = function(node) {
        return observe.call(mo, node, {
          subtree: TRUE,
          childList: TRUE
        });
      })(root);
      return mo;
    };
    var QSA = "querySelectorAll";
    var _self$1 = self, document$2 = _self$1.document, Element$1 = _self$1.Element, MutationObserver$2 = _self$1.MutationObserver, Set$2 = _self$1.Set, WeakMap$1 = _self$1.WeakMap;
    var elements = function elements2(element) {
      return QSA in element;
    };
    var filter = [].filter;
    var qsaObserver = function(options) {
      var live = new WeakMap$1();
      var drop = function drop2(elements2) {
        for (var i = 0, length = elements2.length; i < length; i++)
          live["delete"](elements2[i]);
      };
      var flush = function flush2() {
        var records = observer.takeRecords();
        for (var i = 0, length = records.length; i < length; i++) {
          parse2(filter.call(records[i].removedNodes, elements), false);
          parse2(filter.call(records[i].addedNodes, elements), true);
        }
      };
      var matches = function matches2(element) {
        return element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
      };
      var notifier = function notifier2(element, connected) {
        var selectors;
        if (connected) {
          for (var q, m = matches(element), i = 0, length = query2.length; i < length; i++) {
            if (m.call(element, q = query2[i])) {
              if (!live.has(element))
                live.set(element, new Set$2());
              selectors = live.get(element);
              if (!selectors.has(q)) {
                selectors.add(q);
                options.handle(element, connected, q);
              }
            }
          }
        } else if (live.has(element)) {
          selectors = live.get(element);
          live["delete"](element);
          selectors.forEach(function(q2) {
            options.handle(element, connected, q2);
          });
        }
      };
      var parse2 = function parse3(elements2) {
        var connected = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        for (var i = 0, length = elements2.length; i < length; i++)
          notifier(elements2[i], connected);
      };
      var query2 = options.query;
      var root = options.root || document$2;
      var observer = notify(notifier, root, MutationObserver$2, query2);
      var attachShadow2 = Element$1.prototype.attachShadow;
      if (attachShadow2)
        Element$1.prototype.attachShadow = function(init) {
          var shadowRoot = attachShadow2.call(this, init);
          observer.observe(shadowRoot);
          return shadowRoot;
        };
      if (query2.length)
        parse2(root[QSA](query2));
      return {
        drop,
        flush,
        observer,
        parse: parse2
      };
    };
    var _self = self, document$1 = _self.document, Map = _self.Map, MutationObserver$1 = _self.MutationObserver, Object$1 = _self.Object, Set$1 = _self.Set, WeakMap = _self.WeakMap, Element = _self.Element, HTMLElement2 = _self.HTMLElement, Node = _self.Node, Error2 = _self.Error, TypeError$1 = _self.TypeError, Reflect2 = _self.Reflect;
    var defineProperty = Object$1.defineProperty, keys = Object$1.keys, getOwnPropertyNames = Object$1.getOwnPropertyNames, setPrototypeOf = Object$1.setPrototypeOf;
    var legacy = !self.customElements;
    var expando = function expando2(element) {
      var key = keys(element);
      var value = [];
      var ignore = new Set$1();
      var length = key.length;
      for (var i = 0; i < length; i++) {
        value[i] = element[key[i]];
        try {
          delete element[key[i]];
        } catch (SafariTP) {
          ignore.add(i);
        }
      }
      return function() {
        for (var _i = 0; _i < length; _i++)
          ignore.has(_i) || (element[key[_i]] = value[_i]);
      };
    };
    if (legacy) {
      var HTMLBuiltIn = function HTMLBuiltIn2() {
        var constructor = this.constructor;
        if (!classes.has(constructor))
          throw new TypeError$1("Illegal constructor");
        var is2 = classes.get(constructor);
        if (override)
          return augment(override, is2);
        var element = createElement.call(document$1, is2);
        return augment(setPrototypeOf(element, constructor.prototype), is2);
      };
      var createElement = document$1.createElement;
      var classes = new Map();
      var defined = new Map();
      var prototypes = new Map();
      var registry = new Map();
      var query = [];
      var handle = function handle2(element, connected, selector) {
        var proto = prototypes.get(selector);
        if (connected && !proto.isPrototypeOf(element)) {
          var redefine = expando(element);
          override = setPrototypeOf(element, proto);
          try {
            new proto.constructor();
          } finally {
            override = null;
            redefine();
          }
        }
        var method = "".concat(connected ? "" : "dis", "connectedCallback");
        if (method in proto)
          element[method]();
      };
      var _qsaObserver = qsaObserver({
        query,
        handle
      }), parse = _qsaObserver.parse;
      var override = null;
      var whenDefined = function whenDefined2(name) {
        if (!defined.has(name)) {
          var _, $ = new Promise(function($2) {
            _ = $2;
          });
          defined.set(name, {
            $,
            _
          });
        }
        return defined.get(name).$;
      };
      var augment = attributesObserver(whenDefined, MutationObserver$1);
      self.customElements = {
        define: function define2(is2, Class) {
          if (registry.has(is2))
            throw new Error2('the name "'.concat(is2, '" has already been used with this registry'));
          classes.set(Class, is2);
          prototypes.set(is2, Class.prototype);
          registry.set(is2, Class);
          query.push(is2);
          whenDefined(is2).then(function() {
            parse(document$1.querySelectorAll(is2));
          });
          defined.get(is2)._(Class);
        },
        get: function get2(is2) {
          return registry.get(is2);
        },
        whenDefined
      };
      defineProperty(HTMLBuiltIn.prototype = HTMLElement2.prototype, "constructor", {
        value: HTMLBuiltIn
      });
      self.HTMLElement = HTMLBuiltIn;
      document$1.createElement = function(name, options) {
        var is2 = options && options.is;
        var Class = is2 ? registry.get(is2) : registry.get(name);
        return Class ? new Class() : createElement.call(document$1, name);
      };
      if (!("isConnected" in Node.prototype))
        defineProperty(Node.prototype, "isConnected", {
          configurable: true,
          get: function get2() {
            return !(this.ownerDocument.compareDocumentPosition(this) & this.DOCUMENT_POSITION_DISCONNECTED);
          }
        });
    } else {
      legacy = !self.customElements.get("extends-br");
      if (legacy) {
        try {
          var BR = function BR2() {
            return self.Reflect.construct(HTMLBRElement, [], BR2);
          };
          BR.prototype = HTMLLIElement.prototype;
          var is = "extends-br";
          self.customElements.define("extends-br", BR, {
            "extends": "br"
          });
          legacy = document$1.createElement("br", {
            is
          }).outerHTML.indexOf(is) < 0;
          var _self$customElements = self.customElements, get = _self$customElements.get, _whenDefined = _self$customElements.whenDefined;
          self.customElements.whenDefined = function(is2) {
            var _this = this;
            return _whenDefined.call(this, is2).then(function(Class) {
              return Class || get.call(_this, is2);
            });
          };
        } catch (o_O) {
        }
      }
    }
    if (legacy) {
      var _parseShadow = function _parseShadow2(element) {
        var root = shadowRoots.get(element);
        _parse(root.querySelectorAll(this), element.isConnected);
      };
      var customElements2 = self.customElements;
      var _createElement = document$1.createElement;
      var define = customElements2.define, _get = customElements2.get, upgrade = customElements2.upgrade;
      var _ref = Reflect2 || {
        construct: function construct2(HTMLElement3) {
          return HTMLElement3.call(this);
        }
      }, construct = _ref.construct;
      var shadowRoots = new WeakMap();
      var shadows = new Set$1();
      var _classes = new Map();
      var _defined = new Map();
      var _prototypes = new Map();
      var _registry = new Map();
      var shadowed = [];
      var _query = [];
      var getCE = function getCE2(is2) {
        return _registry.get(is2) || _get.call(customElements2, is2);
      };
      var _handle = function _handle2(element, connected, selector) {
        var proto = _prototypes.get(selector);
        if (connected && !proto.isPrototypeOf(element)) {
          var redefine = expando(element);
          _override = setPrototypeOf(element, proto);
          try {
            new proto.constructor();
          } finally {
            _override = null;
            redefine();
          }
        }
        var method = "".concat(connected ? "" : "dis", "connectedCallback");
        if (method in proto)
          element[method]();
      };
      var _qsaObserver2 = qsaObserver({
        query: _query,
        handle: _handle
      }), _parse = _qsaObserver2.parse;
      var _qsaObserver3 = qsaObserver({
        query: shadowed,
        handle: function handle2(element, connected) {
          if (shadowRoots.has(element)) {
            if (connected)
              shadows.add(element);
            else
              shadows["delete"](element);
            if (_query.length)
              _parseShadow.call(_query, element);
          }
        }
      }), parseShadowed = _qsaObserver3.parse;
      var attachShadow = Element.prototype.attachShadow;
      if (attachShadow)
        Element.prototype.attachShadow = function(init) {
          var root = attachShadow.call(this, init);
          shadowRoots.set(this, root);
          return root;
        };
      var _whenDefined2 = function _whenDefined22(name) {
        if (!_defined.has(name)) {
          var _, $ = new Promise(function($2) {
            _ = $2;
          });
          _defined.set(name, {
            $,
            _
          });
        }
        return _defined.get(name).$;
      };
      var _augment = attributesObserver(_whenDefined2, MutationObserver$1);
      var _override = null;
      getOwnPropertyNames(self).filter(function(k) {
        return /^HTML.*Element$/.test(k);
      }).forEach(function(k) {
        var HTMLElement3 = self[k];
        function HTMLBuiltIn2() {
          var constructor = this.constructor;
          if (!_classes.has(constructor))
            throw new TypeError$1("Illegal constructor");
          var _classes$get = _classes.get(constructor), is2 = _classes$get.is, tag = _classes$get.tag;
          if (is2) {
            if (_override)
              return _augment(_override, is2);
            var element = _createElement.call(document$1, tag);
            element.setAttribute("is", is2);
            return _augment(setPrototypeOf(element, constructor.prototype), is2);
          } else
            return construct.call(this, HTMLElement3, [], constructor);
        }
        defineProperty(HTMLBuiltIn2.prototype = HTMLElement3.prototype, "constructor", {
          value: HTMLBuiltIn2
        });
        defineProperty(self, k, {
          value: HTMLBuiltIn2
        });
      });
      document$1.createElement = function(name, options) {
        var is2 = options && options.is;
        if (is2) {
          var Class = _registry.get(is2);
          if (Class && _classes.get(Class).tag === name)
            return new Class();
        }
        var element = _createElement.call(document$1, name);
        if (is2)
          element.setAttribute("is", is2);
        return element;
      };
      customElements2.get = getCE;
      customElements2.whenDefined = _whenDefined2;
      customElements2.upgrade = function(element) {
        var is2 = element.getAttribute("is");
        if (is2) {
          var _constructor = _registry.get(is2);
          if (_constructor) {
            _augment(setPrototypeOf(element, _constructor.prototype), is2);
            return;
          }
        }
        upgrade.call(customElements2, element);
      };
      customElements2.define = function(is2, Class, options) {
        if (getCE(is2))
          throw new Error2("'".concat(is2, "' has already been defined as a custom element"));
        var selector;
        var tag = options && options["extends"];
        _classes.set(Class, tag ? {
          is: is2,
          tag
        } : {
          is: "",
          tag: is2
        });
        if (tag) {
          selector = "".concat(tag, '[is="').concat(is2, '"]');
          _prototypes.set(selector, Class.prototype);
          _registry.set(is2, Class);
          _query.push(selector);
        } else {
          define.apply(customElements2, arguments);
          shadowed.push(selector = is2);
        }
        _whenDefined2(is2).then(function() {
          if (tag) {
            _parse(document$1.querySelectorAll(selector));
            shadows.forEach(_parseShadow, [selector]);
          } else
            parseShadowed(document$1.querySelectorAll(selector));
        });
        _defined.get(is2)._(Class);
      };
    }
  })();
  var toggle_default = (controller) => {
    const controls = document.getElementById(controller.getAttribute("aria-controls"));
    const isExpanded = controller.getAttribute("aria-expanded").toLowerCase() === "true";
    controller.setAttribute("aria-expanded", !isExpanded);
    isExpanded ? controls.setAttribute("hidden", "") : controls.removeAttribute("hidden");
    return controller;
  };
  var chunk_array_default = (array, chunkSize) => {
    const arr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      arr.push(chunk);
    }
    return arr;
  };
  var is_alternating_default = (n) => n.every((el, i) => {
    return n[i & 1].nodeName == el.nodeName;
  });
  var wrap_element_default = (el, newTag) => {
    const parent = el.parentNode;
    const elIndex = [...parent.children].indexOf(el);
    const ce = document.createElement(newTag);
    ce.appendChild(el);
    parent.insertBefore(ce, parent.childNodes[elIndex + 1]);
  };
  var chunkr = (arr, cond) => {
    const res = [];
    let chunk = [];
    (function chunky(ns) {
      if (Array.isArray(ns) && !ns.length) {
        res.push(chunk);
        return;
      }
      if (cond(ns[0]) && chunk.length > 0) {
        res.push(chunk);
        chunk = [];
      }
      chunk.push(ns.shift());
      return chunky(ns);
    })(arr);
    return res;
  };
  customElements.define(
    "toggle-button",
    class ToggleButton extends HTMLButtonElement {
      connectedCallback() {
        if (!this.hasAttribute("aria-controls")) {
          console.error(
            `ToggleButton: "aria-controls" must be set to the
                      ID of the element you are toggling`
          );
          return;
        }
        if (!this.hasAttribute("aria-expanded")) {
          console.error(
            `ToggleButton: "aria-expanded" must be set to the
           toggled elements initial visibility, either
           "true" or "false"`
          );
          return;
        }
        this.addEventListener("click", this);
      }
      handleEvent(e) {
        this["on" + e.type](e);
      }
      onclick(e) {
        toggle_default(this);
      }
    },
    { extends: "button" }
  );
  var Accordion = class {
    constructor(element) {
      this.headingTagName = null;
      this.element = element;
      this.init();
    }
    init() {
      if (!this.element.firstChild)
        return;
      this.groups = this.element.querySelectorAll(":scope > .accordion__group");
      if (this.groups.length > 0) {
        this.groups.forEach(this.formatGroup.bind(this));
      } else {
        const nodes = this.removeEmptyTextNodes(this.element.childNodes);
        if (this.isHeading(nodes[0])) {
          this.headingTagName = nodes[0].nodeName;
          const groupsArr = chunkr(nodes, (n) => n.nodeName === this.headingTagName);
          const groups = groupsArr.map((group) => {
            const frag = new DocumentFragment();
            group.forEach((el) => frag.appendChild(el));
            const groupEl = this.createGroup(frag);
            return groupEl;
          });
          groups.forEach(this.formatGroup.bind(this));
          this.element.append(...groups);
        } else if (is_alternating_default(nodes)) {
          const groups = chunk_array_default(nodes, 2);
          const frags = groups.map((group) => {
            const frag = new DocumentFragment();
            group.forEach((el) => frag.appendChild(el));
            const groupEl = this.createGroup(frag);
            return groupEl;
          });
          frags.forEach(this.formatGroup.bind(this));
          this.element.append(...frags);
        } else {
          const group = this.createGroup(this.element);
          this.element.appendChild(group);
          this.formatGroup(group);
        }
      }
    }
    createGroup(parent) {
      const groupEl = document.createElement("article");
      groupEl.classList.add("accordion__group");
      const fragment = new DocumentFragment();
      while (parent.hasChildNodes()) {
        fragment.appendChild(parent.firstChild);
      }
      groupEl.appendChild(fragment);
      return groupEl;
    }
    formatGroup(group) {
      const nodes = this.removeEmptyTextNodes(group.childNodes);
      const firstChild = nodes[0];
      const siblings = nodes.slice(1);
      const hasHeading = this.isHeading(firstChild);
      const hasPanel = siblings[0].hasAttribute("hidden") || siblings[0].classList.contains("accordion__body");
      group.setAttribute("data-panel-id", `panel-${this.generateId()}`);
      if (hasHeading) {
        this.formatHeading(firstChild);
      } else {
        const heading = this.createHeading(firstChild);
        group.prepend(heading);
        this.formatHeading(heading);
      }
      if (hasPanel) {
        this.formatPanel(siblings[0]);
      } else {
        const panel = this.createPanel(siblings);
        group.append(panel);
        this.formatPanel(panel);
      }
    }
    createHeading(child) {
      const closestHeading = this.findClosestHeading(this.element);
      if (closestHeading) {
        const headingLevel = parseInt(closestHeading.tagName.split("H")[1]);
        this.headingTagName = `h${headingLevel + 1}`;
      } else {
        this.headingTagName = "h4";
      }
      const headingEl = document.createElement(this.headingTagName);
      headingEl.appendChild(child);
      return headingEl;
    }
    formatHeading(heading) {
      const firstChild = this.removeEmptyTextNodes(heading.childNodes)[0];
      let headingLabel;
      if (firstChild.nodeName !== "BUTTON") {
        const button = this.createButton(
          firstChild,
          heading.parentNode.dataset.panelId
        );
        headingLabel = firstChild.nodeName !== "#text" ? firstChild.innerText : firstChild.data;
        heading.appendChild(button);
      } else {
        headingLabel = firstChild.innerText;
      }
      let headingId = `${headingLabel.trim().replace(/[^\w\s]/gi, "").replace(/\s+/g, "-").toLowerCase()}-heading`;
      if (document.getElementById(headingId)) {
        headingId = `${headingId}-${this.generateId()}`;
      }
      heading.setAttribute("id", headingId);
    }
    createPanel(children) {
      const panel = document.createElement("div");
      panel.append(...children);
      return panel;
    }
    formatPanel(panel) {
      panel.setAttribute("id", panel.parentNode.dataset.panelId);
      panel.setAttribute("aria-labelledby", panel.parentNode.children[0].id);
      panel.classList.add("flow");
      panel.setAttribute("hidden", "");
    }
    createButton(label, panelId) {
      const labelEl = document.createElement("span");
      labelEl.append(label);
      const button = document.createElement("button", { is: "toggle-button" });
      button.setAttribute("aria-controls", panelId);
      button.setAttribute("aria-expanded", false);
      button.innerHTML = "<i class='i-ri:arrow-down-s-line' aria-hidden='true'></i>";
      button.prepend(labelEl);
      return button;
    }
    removeEmptyTextNodes(nodelist) {
      return Array.from(nodelist).filter((node) => node.nodeName !== "#text" || node.data.trim().length > 0 || false);
    }
    generateId() {
      return Math.floor(Math.random() * Date.now()).toString(16);
    }
    isHeading(element) {
      return element.tagName && element.tagName.match(/^H\d$/i);
    }
    findClosestHeading(element) {
      if (!element.parentElement) {
        return false;
      }
      if (this.isHeading(element)) {
        return element;
      }
      let ancestor = element.parentElement;
      while (ancestor !== null) {
        const siblings = Array.from(ancestor.children);
        const headingTags = siblings.filter(
          (sibling) => this.isHeading(sibling)
        );
        if (headingTags.length > 0) {
          const index = siblings.indexOf(element);
          if (index !== -1) {
            const closestHeading = headingTags.reduce((closest, heading) => {
              const headingIndex = siblings.indexOf(heading);
              const distance = Math.abs(headingIndex - index);
              if (closest === null || distance < closest.distance) {
                return { heading, distance };
              }
              return closest;
            }, null);
            if (closestHeading !== null) {
              return closestHeading.heading;
            }
          }
        }
        ancestor = ancestor.parentElement;
      }
      return null;
    }
  };
  var NYCAccordion = class extends HTMLElement {
    connectedCallback() {
      if (!this.firstChild)
        return;
      this.accordion = new Accordion(this);
    }
  };
  customElements.define("nyc-accordion", NYCAccordion);
  try {
    Array.from(
      document.querySelectorAll("[data-is=nyc-accordion]")
    ).map((el) => new Accordion(el));
  } catch (e) {
    console.error(`Could not initialize Accordions: ${e}`);
  }
  var NYCTabGroup = class extends HTMLElement {
    connectedCallback() {
      try {
        this.tablist = this.querySelector("[data-tab-list]");
        this.tabs = this.tablist.querySelectorAll("a");
        this.panels = this.querySelectorAll("[data-tab-panels] > *");
      } catch (err) {
        console.error(`NYCTabGroup: ${err}`);
        return;
      }
      this.tablist.setAttribute("role", "tablist");
      this.setupTabs();
      this.setupPanels();
      this.tabs[0].removeAttribute("tabindex");
      this.tabs[0].setAttribute("aria-selected", "true");
      this.panels[0].hidden = false;
    }
    // The tab switching function
    switchTab(oldTab, newTab) {
      newTab.focus();
      newTab.removeAttribute("tabindex");
      newTab.setAttribute("aria-selected", "true");
      oldTab.removeAttribute("aria-selected");
      oldTab.setAttribute("tabindex", "-1");
      let index = Array.prototype.indexOf.call(this.tabs, newTab);
      let oldIndex = Array.prototype.indexOf.call(this.tabs, oldTab);
      this.panels[oldIndex].hidden = true;
      this.panels[index].hidden = false;
    }
    setupTabs() {
      Array.prototype.forEach.call(this.tabs, (tab, i) => {
        tab.setAttribute("role", "tab");
        tab.setAttribute("id", "tab" + (i + 1));
        tab.setAttribute("tabindex", "-1");
        tab.parentNode.setAttribute("role", "presentation");
        tab.addEventListener("click", (e) => {
          e.preventDefault();
          let currentTab = this.tablist.querySelector("[aria-selected]");
          if (e.currentTarget !== currentTab) {
            this.switchTab(currentTab, e.currentTarget);
          }
        });
        tab.addEventListener("keydown", (e) => {
          let index = Array.prototype.indexOf.call(this.tabs, e.currentTarget);
          let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? "down" : null;
          if (dir !== null) {
            e.preventDefault();
            dir === "down" ? this.panels[i].focus() : this.tabs[dir] ? this.switchTab(e.currentTarget, this.tabs[dir]) : void 0;
          }
        });
      });
    }
    setupPanels() {
      Array.prototype.forEach.call(this.panels, (panel, i) => {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("tabindex", "-1");
        panel.getAttribute("id");
        panel.setAttribute("aria-labelledby", this.tabs[i].id);
        panel.hidden = true;
      });
    }
  };
  customElements.define("nyc-tab-group", NYCTabGroup);
  try {
    Array.from(
      document.querySelectorAll("[data-is=nyc-tab-group]")
    ).map((el) => wrap_element_default(el, "nyc-tab-group"));
  } catch (e) {
    console.error(`Could not initialize TabGroup: ${e}`);
  }
  var NYCTagFilter = class extends HTMLElement {
    connectedCallback() {
      if (this.isConnected) {
        this.controllers = this.querySelectorAll("[aria-controls]");
        if (this.controllers.length > 0) {
          this.controllers.forEach((controller) => {
            controller.addEventListener("change", ({ target }) => {
              const { value } = target;
              const controlsParent = document.getElementById(target.getAttribute("aria-controls"));
              this.filterChildren(Array.from(controlsParent.querySelectorAll("[data-tag]")), value);
            });
          });
        }
      }
    }
    filterChildren(children, value) {
      children.forEach((child) => {
        const tags = child.dataset.tag.split(",");
        tags.includes(value) || value === "other" || value === "" ? child.removeAttribute("hidden") : child.setAttribute("hidden", "");
      });
    }
  };
  customElements.define("nyc-tag-filter", NYCTagFilter);
  try {
    Array.from(
      document.querySelectorAll("[data-is=nyc-tag-filter]")
    ).map((el) => wrap_element_default(el, "nyc-tag-filter"));
  } catch (e) {
    console.error(`NYCTagFilter: ${e}`);
  }
})();
/*! Bundled license information:

@ungap/custom-elements/index.js:
  (*! (c) Andrea Giammarchi @webreflection ISC *)
  (*! (c) Andrea Giammarchi - ISC *)
*/
const exemptions = [
  {
    title: "Cooperative and Condominium Abatement",
    description: "For managing agents or boards representing condo or co-op unit owners",
    url: "./coop-abatement.html",
    tag: "homeowner"
  },
  {
    title: "Senior Citizen Homeowner's Exemption (SCHE)",
    description: "For homeowners 65 and older with combined annual income of $58,399 or less",
    tag: "homeowner"
  },
  {
    title: "Senior Citizen Rent Increase Exemption (SCRIE)",
    description: "For landlords with tenants 65 and older that qualify for rent freezes",
    tag: "landlord"
  },
  {
    title: "School Tax Relief Exemption (STAR)",
    description: "For homeowners currently enrolled in Basic STAR and Enhanced STAR Only available for renewals ",
    tag: "homeowner"
  },
  {
    title: "Non-profit exemptions",
    description: "For properties owned by non-profit organizations",
    tag: "non-profit-property-owner"
  },
  {
    title: "Industrial and Commercial Abatement Program (ICAP)",
    description: "For commercial and industrial properties in specific abatement zones undergoing significant construction",
    tag: "commercial-property-owner,builder-developer"
  },
  {
    title: "Veteran exemptions",
    description: "For veterans, spouses of veterans, and Gold Star parents",
    tag: "homeowner"
  },
  {
    title: "Disability Rent Increase Exemption (DRIE)",
    description: "For landlords with disabled tenants that qualify for rent freezes",
    tag: "landlord"
  },
  {
    title: "Disabled Homeowners Exemption (DHE)",
    description: "For disabled homeowners with combined annual income of $58,399 or less",
    tag: "homeowner"
  },
  {
    title: "Payment in Lieu of Taxes Agreements (PILOT)",
    description: "For manufacturing, industrial, and not-for-profit business properties",
    tag: "commercial-property-owner,non-profit-property-owner"
  },
  {
    title: "Industrial and Commercial Incentive Program (ICIP) ",
    description: "For current ICIP benefit recipients Only available for renewals ",
    tag: "commercial-property-owner,non-profit-property-owner"
  },
  {
    title: "Solar Electric Generating System Abatement (SEGS)",
    description: "For owners of properties that generate electricity using solar power",
    tag: "homeowner,landlord,commercial-property-owner,government-property-owner,non-profit-property-owner,builder-developer"
  },
  {
    title: "Clergy exemption",
    description: "For active and retired clergy members and spouses of deceased clergy members",
    tag: "homeowner"
  },
  {
    title: "Major Capital Improvement Abatement (MCI)",
    description: "For owners of rent-regulated properties planning major repairs or other improvement projects",
    tag: "landlord,builder-developer"
  },
  {
    title: "Green Roof Abatement",
    description: "For owners of buildings with vegetation-covered roofs",
    tag: "homeowner,landlord,commercial-property-owner,government-property-owner,non-profit-property-owner,builder-developer"
  },
  {
    title: "Commercial Revitalization Program (CRP)",
    description: "For commercial buildings in a specific abatement zone built before 1975",
    tag: "commercial-property-owner,commercial-tenant,builder-developer"
  },
  {
    title: "Childcare Center Abatement",
    description: "For property owners who have created or expanded a childcare center in their building"
  },
  {
    title: "Commercial Expansion Program (CEP)",
    description: "For commercial offices and industrial properties in a specific abatement zone built before 1999",
    tag: "commercial-property-owner,commercial-tenant,builder-developer"
  },
  {
    title: "Clean Energy Systems Exemption",
    description: "For property owners who have renewable energy technology including solar, wind, and battery systems",
    tag: "homeowner,landlord,commercial-property-owner,government-property-owner,non-profit-property-owner,builder-developer"
  },
  {
    title: "Domestic and foreign government exemptions",
    description: "For federal, state, local, and foreign government entities",
    tag: "government-property-owner"
  },
  {
    title: "Disabled Crime Victim/Good Samaritan Exemption",
    description: "For people with disabilities resulting from a crime",
    tag: "homeowner"
  }
];
const buildCardMarkup = ({ title, description, url = "http://google.com", tag = "homeowner" }) => `
  <article class="card" data-tag="${tag}">
  <header class="card__header">

  <h2>
  <a href="${url}" class="card__primary-action">
<span>${title}</span>
<span>  <i class="i-ri:arrow-right-line" aria-hidden="true"></i></span>
</a>
</h2>

  </header>
  <div class="card__body">
${description}
  </div>
  </article>
`;
const buildCardsMarkup = (data) => data.map(buildCardMarkup).join("");
const exemptionsListMarkup = buildCardsMarkup(exemptions);
const suggestedContent = [
  {
    title: "Assessment information",
    url: "https://www.nyc.gov/site/finance/taxes/property-assessments.page",
    tags: ["property-tax"]
  },
  {
    title: "Property tax rebates",
    url: "https://www.nyc.gov/site/finance/taxes/property-tax-rebate.page",
    tags: ["property-tax"]
  },
  {
    title: "Property tax rates",
    url: "https://www.nyc.gov/site/finance/taxes/property-tax-rates.page",
    tags: ["property-tax"]
  },
  {
    title: "Calculate property taxes",
    url: "https://www.nyc.gov/site/finance/taxes/calculating-your-property-taxes.page",
    tags: ["property-tax"]
  },
  {
    title: "Property tax forms",
    url: "https://www.nyc.gov/site/finance/taxes/property-forms/property-forms.page",
    tags: ["property-tax"]
  },
  {
    title: "Update property and billing information",
    url: "https://www.nyc.gov/site/finance/taxes/property-update-property-and-billing-information.page",
    tags: ["property-tax"]
  },
  {
    title: "Payment plan information",
    url: "https://www.nyc.gov/site/finance/taxes/property-payment-plans.page",
    tags: ["property-tax"]
  },
  {
    title: "How to divide and merge lots",
    url: "https://www.nyc.gov/site/finance/taxes/property-dividing-and-merging-lots.page",
    tags: ["property-tax"]
  },
  {
    title: "Real Property Transfer Tax information",
    url: "https://www.nyc.gov/site/finance/taxes/property-real-property-transfer-tax-rptt.page",
    tags: ["property-tax"]
  },
  {
    title: "Digital tax maps",
    url: "https://www.nyc.gov/site/finance/taxes/property-digital-tax-map.page",
    tags: ["data"]
  },
  {
    title: "Record property-related documents",
    url: "https://www.nyc.gov/site/finance/taxes/property-recording-property-related-documents.page",
    tags: ["data"]
  },
  {
    title: "Rolling sales data",
    url: "https://www.nyc.gov/site/finance/taxes/property-rolling-sales-data.page",
    tags: ["data"]
  },
  {
    title: "Lien sales",
    url: "https://www.nyc.gov/site/finance/taxes/property-lien-sales.page",
    tags: ["sales-and-auctions"]
  },
  {
    title: "Private asset auctions",
    url: "https://www.nyc.gov/site/finance/taxes/property-private-asset-auctions.page",
    tags: ["sales-and-auctions"]
  }
];
const sections$2 = {
  "Property Tax": suggestedContent.filter((i) => i.tags.includes("property-tax")),
  "Data": suggestedContent.filter((i) => i.tags.includes("data")),
  "Sales and auctions": suggestedContent.filter((i) => i.tags.includes("sales-and-auctions"))
};
const sectionEls$1 = (sectionsRef) => Object.keys(sectionsRef).map((section) => `
<div class="flow" data-flow-space="m">
  <h3 class="text-base">${section}</h3>
<ul role="list" class="grid" data-flow-space="s">
${listItemEls$1(sectionsRef[section])}
</ul>
  </div>
`).join("");
const listItemEls$1 = (items) => items.map((item) => `<li>${linkEl$1(item)}</li>`).join("");
const linkEl$1 = ({ url, title }) => `
  <a href="${url}" class="button" data-outline>
  <span class="title">
${title}
  </span>
  <i class="i-ri:arrow-right-line"></i>
  </a>
`;
const suggestedContentListMarkup = sectionEls$1(sections$2);
const links = [
  {
    title: "Assessment/Valuation",
    url: "https://www.nyc.gov/site/finance/about/contact-by-email/assessment-and-valuation.page",
    tags: ["property-related-inquiries"]
  },
  {
    title: "Collection Agency Complaints",
    url: "https://www.nyc.gov/site/finance/about/contact-by-email/contact-collection-agency-complaints.page",
    tags: ["property-related-inquiries"]
  },
  {
    title: "Condominium Online Apportionment Application Password Reset",
    url: "https://www.nyc.gov/site/finance/about/contact-by-email/contact-us-online-condo-apportionment-application-password-reset.page",
    tags: ["property-related-inquiries"]
  },
  {
    title: "EFT Payments",
    url: "https://www.nyc.gov/site/finance/about/contact-by-email/contact-electronic-tax-filing-and-payments.page",
    tags: ["property-related-inquiries"]
  },
  {
    title: "Audits & Appeals",
    url: "https://www.nyc.gov/site/finance/about/contact-by-email/contact-audit-and-appeals.page",
    tags: ["business-taxes"]
  },
  {
    title: "Business Tax Modernized e-File Program Inquiries",
    url: "https://www.nyc.gov/assets/finance/jump/contact-bts.html",
    tags: ["business-taxes"]
  },
  {
    title: "Collections, Notices, Judgments, and Warrants",
    url: "https://www.nyc.gov/site/finance/about/contact-by-email/contact-collections-notices-judgments-warrants.page",
    tags: ["business-taxes"]
  },
  {
    title: "e-Services (Filing, Payment and Extension Inquiries)",
    url: "https://www.nyc.gov/assets/finance/jump/contact-bts.html",
    tags: ["business-taxes"]
  },
  {
    title: "Parking Ticket Payment Plans – Lost Plan ID",
    url: "https://www.nyc.gov/assets/finance/jump/crm/contact-parking-payment-plan-forgot-id.html",
    tags: ["parking-and-vehicles"]
  },
  {
    title: "Collections",
    url: "https://www.nyc.gov/assets/finance/jump/crm/contact-parking-collections.html",
    tags: ["parking-and-vehicles"]
  },
  {
    title: "Commercial Motor Vehicle Tax (CMVT)",
    url: "https://www.nyc.gov/assets/finance/jump/crm/contact-parking-cmvt.html",
    tags: ["parking-and-vehicles"]
  },
  {
    title: "Diplomat/Consular Illegal Parking Report",
    url: "https://www.nyc.gov/assets/finance/jump/crm/contact-parking-diplomat-consular.html",
    tags: ["parking-and-vehicles"]
  },
  {
    title: "Childcare Center Abatement",
    url: "https://www.nyc.gov/assets/finance/jump/crm/contact-childcare-center.html",
    tags: ["property-benefits"]
  },
  {
    title: "Clean Energy Systems Abatement",
    url: "https://www.nyc.gov/assets/finance/jump/crm/contact-clean-energy.html",
    tags: ["property-benefits"]
  },
  {
    title: "Clergy",
    url: "https://www.nyc.gov/assets/finance/jump/crm/contact-clergy-benefit.html",
    tags: ["property-benefits"]
  },
  {
    title: "Cooperative and Condominium Tax Abatement Program",
    url: "https://www.nyc.gov/assets/finance/jump/crm/contact-ccop-condo-benefit.html",
    tags: ["property-benefits"]
  }
];
const sections$1 = [
  ["property-related-inquiries", "Property-related inquiries"],
  ["business-taxes", "Business taxes"],
  ["parking-and-vehicles", "Parking & vehicles"],
  ["property-benefits", "Property benefits"]
];
const sectionEls = (sectionsRef) => {
  const markup = sectionsRef.map((section, i) => `
<div data-tag="${section[0]}" ${i !== 0 ? "hidden" : ""}>
<div class="flow w-full">
  <h3>${section[1]}</h3>
<ul role="list" class="grid" data-flow-space="s">
${listItemEls(links.filter((i2) => i2.tags.includes(section[0])))}
</ul>
</div>
  </div>
`).join("");
  return markup;
};
const listItemEls = (items) => items.map((item) => `<li>${linkEl(item)}</li>`).join("");
const linkEl = ({ url, title }) => `
  <a href="${url}" class="button">
  <span class="title">
${title}
  </span>
  <i class="i-ri:arrow-right-line"></i>
  </a>
`;
const contactTopicsMarkup = sectionEls(sections$1);
const sections = [
  ["property-related-inquiries", "Property-related inquiries"],
  ["business-taxes", "Business taxes"],
  ["parking-and-vehicles", "Parking & vehicles"],
  ["property-benefits", "Property benefits"]
];
sections.map(
  (s, i) => `
<div>
<input type="radio" name="contact-filter" id="${s[0]}-input" value="${s[0]}" ${i === 0 ? "checked" : ""} data-action="filter" aria-controls="contact-topics">
<label class="button" for="${s[0]}-input" data-variant="pill">${s[1]}</label>
</div>
`
).join("");
sections.map(
  (s, i) => `
<option ${i === 0 ? "selected" : ""} value="${s[0]}">${s[1]}</option>
`
).join("");
const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
  import("https://cdn.skypack.dev/container-query-polyfill");
}
try {
  const exemptionsContainer = document.getElementById("exemptions");
  if (exemptionsContainer) {
    exemptionsContainer.innerHTML = exemptionsListMarkup;
  }
  const contactTopicsContainer = document.getElementById("contact-topics");
  if (contactTopicsContainer) {
    contactTopicsContainer.innerHTML = contactTopicsMarkup;
  }
  const suggestedContentContainer = document.getElementById("suggested-content");
  if (suggestedContentContainer) {
    suggestedContentContainer.innerHTML = suggestedContentListMarkup;
  }
} catch (e) {
  console.error(e);
}
