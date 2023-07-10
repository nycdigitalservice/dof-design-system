import {toggle,chunkArray} from '../../../core/js';

const isAlternating = n => n.every((el, i) => {
  return n[i&1].nodeName == el.nodeName;
})

const chunki = (arr, cond) => {
  const res = [];
  let chunk = [];

  // Iterative
  for (const i of arr) {
    if (cond(arr[i]) && chunk.length > 0) {
      res.push(chunk);
      chunk = []
    }
    chunk.push(arr[i])      
  }

  if (chunk.length > 0) {
    res.push(chunk);
  }

  return res;
}

const chunkr = (arr, cond) => {
  const res = [];
  let chunk = [];

  // Recursive
  (function chunky(ns){
    if (Array.isArray(ns) && !ns.length) {
      res.push(chunk);
      return;
    }
    if (cond(ns[0]) && chunk.length > 0) {
      res.push(chunk);
      chunk = []
    }
    chunk.push(ns.shift())
    return chunky(ns);
  })(arr)

  return res;
}

class NYCAccordion extends HTMLElement {
  constructor() {
    super();
    this.headings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
    this.panels = ['DIV','SECTION'];
  }
  connectedCallback() {
    if (!this.firstChild) return;
    this.groups = this.querySelectorAll(':scope > .accordion__group');
    // If we have groups, format them
    if (this.groups.length > 0) {
      this.groups.forEach(this.formatGroup.bind(this));      
    } else {
      // We don't have groups, remove empty nodes and 
      const nodes = this.removeEmptyTextNodes(this.childNodes);
      // console.log(nodes);
      // console.log(isAlternating(nodes))
      if (this.headings.includes(nodes[0].nodeName)) {

        const headingNodeName = nodes[0].nodeName;
        // console.log(headingNodeName, nodes);
        // const start = performance.now();
        // const idxs = nodes.map((el, i) => {
        // // console.log(el.nodeName, headingNodeName, i)
        //   return el.nodeName === headingNodeName ? i : false
        // }).filter(n => n || n === 0);
        // // console.log(idxs)
        // for (let i = 0; i < idxs.length; i++) {
        //   groups.push(nodes.slice(idxs[i], idxs[i + 1]))
        // }
        // const end = performance.now()
        // console.log(`Execution time: ${end - start} ms`);

        const groupsArr = chunkr(nodes, (n) => n.nodeName === headingNodeName)

        const groups = groupsArr.map(group => {
          const frag = new DocumentFragment();
          group.forEach(el => frag.appendChild(el))

          const groupEl = this.createGroup(frag);
          return groupEl;
        })

        groups.forEach(this.formatGroup.bind(this));
        this.append(...groups);
        // return;
      } else if (isAlternating(nodes)) {
        const groups = chunkArray(nodes, 2);
        // console.log(groups);
        const frags = groups.map(group => {
          const frag = new DocumentFragment();
          group.forEach(el => frag.appendChild(el))

          const groupEl = this.createGroup(frag);
          return groupEl;
        })

        frags.forEach(this.formatGroup.bind(this));
        this.append(...frags);
      } else {
        const group = this.createGroup(this);
        this.appendChild(group);
        this.formatGroup(group);
      }
    }
  }
  createGroup(parent) {
    const groupEl = document.createElement('article');
    groupEl.classList.add('accordion__group');
    const fragment = new DocumentFragment();
    while(parent.hasChildNodes()){
      fragment.appendChild(parent.firstChild)
    }
    groupEl.appendChild(fragment);
    return groupEl;
  }
  formatGroup(group) {
    const nodes = this.removeEmptyTextNodes(group.childNodes);
    const firstChild = nodes[0];
    const siblings = nodes.slice(1);
    const hasHeading = this.headings.includes(firstChild.nodeName);
    // Need a better way to detect panel
    const hasPanel = siblings[0].hasAttribute('hidden') || this.panels.includes(siblings[0].nodeName);
    group.setAttribute('data-panel-id', `panel-${this.generateId()}`);
    // console.log(firstChild, hasHeading, hasPanel);
    if (hasHeading) {
      this.formatHeading(firstChild);
    } else {
      const heading = this.createHeading(group);
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
  removeEmptyTextNodes(nodelist) {
    const arr = Array.from(nodelist);
    const nonEmpty = arr.filter(node => {
      if (node.nodeName !== '#text') {
        return true;
      } else if (node.data.trim().length > 0){
        return true
      }
    })
    return nonEmpty;
  }
  createHeading(group) {
    const headingEl = document.createElement('h4');
    headingEl.appendChild(group.firstChild);

    return headingEl;
  }
  formatHeading(heading) {
    const firstChild = this.removeEmptyTextNodes(heading.childNodes)[0];

    let headingLabel;
    if (firstChild.nodeName !== 'BUTTON') {
      const button = this.createButton(firstChild, heading.parentNode.dataset.panelId);
      headingLabel = firstChild.data;
      heading.appendChild(button);
    } else {
      headingLabel = firstChild.innerText;
    }
    let headingId = `${headingLabel.trim().replace(/\s+/g, '-').toLowerCase()}-heading`;
    if (document.getElementById(headingId)) {
      headingId = `${headingId}-1`;
    }
    heading.setAttribute('id', headingId);
  }
  createPanel(children) {
    const panel = document.createElement('div')
    panel.append(...children);
    return panel;
  }
  formatPanel(panel) {
    if (!panel.hasAttribute('id')) {
      panel.setAttribute('id', panel.parentNode.dataset.panelId);
    }
    panel.setAttribute('aria-labelledby', panel.parentNode.children[0].id);
    panel.classList.add('flow');
    panel.setAttribute('hidden', '');
  }
  createButton(label, panelId) {
    const button = document.createElement('button', { is: 'toggle-button' });
    button.setAttribute('aria-controls', panelId);
    button.innerHTML = "<i class='i-ri:arrow-down-s-line'></i>";
    button.prepend(label);
    return button;
  }
  generateId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
  }
}

customElements.define('nyc-accordion', NYCAccordion);
