(() => {
  // ../../node_modules/.pnpm/@ungap+custom-elements@1.3.0/node_modules/@ungap/custom-elements/index.js
  (function() {
    "use strict";
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
    var _self = self, document$1 = _self.document, Map = _self.Map, MutationObserver$1 = _self.MutationObserver, Object$1 = _self.Object, Set$1 = _self.Set, WeakMap = _self.WeakMap, Element = _self.Element, HTMLElement2 = _self.HTMLElement, Node = _self.Node, Error = _self.Error, TypeError$1 = _self.TypeError, Reflect = _self.Reflect;
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
            throw new Error('the name "'.concat(is2, '" has already been used with this registry'));
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
      var _ref = Reflect || {
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
          throw new Error("'".concat(is2, "' has already been defined as a custom element"));
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

  // ../utilities/src/js/toggle.js
  var toggle_default = (controller) => {
    const controls = document.getElementById(controller.getAttribute("aria-controls"));
    const isExpanded = controller.getAttribute("aria-expanded").toLowerCase() === "true";
    controller.setAttribute("aria-expanded", !isExpanded);
    isExpanded ? controls.setAttribute("hidden", "") : controls.removeAttribute("hidden");
    return controller;
  };

  // ../utilities/src/js/chunk-array.js
  var chunk_array_default = (array, chunkSize) => {
    const arr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      arr.push(chunk);
    }
    return arr;
  };

  // ../utilities/src/js/is-alternating.js
  var is_alternating_default = (n) => n.every((el, i) => {
    return n[i & 1].nodeName == el.nodeName;
  });

  // ../utilities/src/js/chunk.js
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

  // ../components/button/src/js/toggle-button.js
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

  // ../components/accordion/src/accordion.js
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

  // ../components/accordion/src/nyc-accordion.js
  var NYCAccordion = class extends HTMLElement {
    connectedCallback() {
      if (!this.firstChild)
        return;
      this.accordion = new Accordion(this);
    }
  };
  customElements.define("nyc-accordion", NYCAccordion);

  // ../components/accordion/src/index.js
  try {
    Array.from(
      document.querySelectorAll("[data-is=nyc-accordion]")
    ).map((el) => new Accordion(el));
  } catch (e) {
    console.error(`Could not initialize Accordions: ${e}`);
  }

  // ../components/tab-group/src/tab-group.js
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
        let id = panel.getAttribute("id");
        panel.setAttribute("aria-labelledby", this.tabs[i].id);
        panel.hidden = true;
      });
    }
  };
  customElements.define("nyc-tab-group", NYCTabGroup);

  // ../components/tab-group/src/index.js
  var wrapElement = (el, newTag) => {
    const parent = el.parentNode;
    const elIndex = [...parent.children].indexOf(el);
    const ce = document.createElement(newTag);
    ce.appendChild(el);
    parent.insertBefore(ce, parent.childNodes[elIndex]);
  };
  try {
    Array.from(
      document.querySelectorAll("[data-is=nyc-tab-group]")
    ).map((el) => wrapElement(el, "nyc-tab-group"));
  } catch (e) {
    console.error(`Could not initialize TabGroup: ${e}`);
  }
})();
/*! Bundled license information:

@ungap/custom-elements/index.js:
  (*! (c) Andrea Giammarchi @webreflection ISC *)
  (*! (c) Andrea Giammarchi - ISC *)
*/
