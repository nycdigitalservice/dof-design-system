import {chunkArray,chunkr,isAlternating} from '@dofds/utilities';

export default class Accordion {
  constructor(element) {
    this.headingTagName = null;
    this.element = element;
    this.init();
  }

  init() {
    if (!this.element.firstChild) return;
    this.groups = this.element.querySelectorAll(':scope > .accordion__group');
    // If we have groups, format them
    if (this.groups.length > 0) {
      this.groups.forEach(this.formatGroup.bind(this));      
    } else {
      /* We don't have groups, remove empty nodes and check if first node
       * is a heading. If it is, create groups from chunking siblings by this
       * heading tag.
       */
      const nodes = this.removeEmptyTextNodes(this.element.childNodes);
      if (this.isHeading(nodes[0])) {
        //console.log('have initial heading', nodes[0])

        this.headingTagName = nodes[0].nodeName;

        const groupsArr = chunkr(nodes, (n) => n.nodeName === this.headingTagName)

        const groups = groupsArr.map(group => {
          const frag = new DocumentFragment();
          group.forEach(el => frag.appendChild(el))

          const groupEl = this.createGroup(frag);
          return groupEl;
        })
        //console.log(groups)
        groups.forEach(this.formatGroup.bind(this));
        this.element.append(...groups);
      } else if (isAlternating(nodes)) {
        /* We don't have an initial heading, so test if we have a series of
         * alternating nodes, which we can then turn into headings and panels.
         */
        const groups = chunkArray(nodes, 2);
        const frags = groups.map(group => {
          const frag = new DocumentFragment();
          group.forEach(el => frag.appendChild(el))

          const groupEl = this.createGroup(frag);
          return groupEl;
        })

        frags.forEach(this.formatGroup.bind(this));
        this.element.append(...frags);
      } else {
        /* We don't have an alternating set either, so create a group
         * with the nodes we have. The first node will be made the heading.
         */
        const group = this.createGroup(this.element);
        this.element.appendChild(group);
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
    const hasHeading = this.isHeading(firstChild);
    // Need a better way to detect panel
    const hasPanel = siblings[0].hasAttribute('hidden') ||
          siblings[0].classList.contains('accordion__body');
    group.setAttribute('data-panel-id', `panel-${this.generateId()}`);

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

    if(closestHeading) {
      const headingLevel = parseInt(closestHeading.tagName.split('H')[1]);
      this.headingTagName = `h${headingLevel + 1}`;
    } else {
      this.headingTagName = 'h4';
    }

    const headingEl = document.createElement(this.headingTagName);
    headingEl.appendChild(child);
    return headingEl;
  }

  formatHeading(heading) {
    const firstChild = this.removeEmptyTextNodes(heading.childNodes)[0];

    let headingLabel;
    if (firstChild.nodeName !== 'BUTTON') {
      const button = this.createButton(
        firstChild,
        heading.parentNode.dataset.panelId
      );
      headingLabel =
        firstChild.nodeName !== '#text' ?
        firstChild.innerText : firstChild.data;
      heading.appendChild(button);
    } else {
      headingLabel = firstChild.innerText;
    }
    //console.log(headingLabel, firstChild, firstChild.innerText);
    let headingId =
        `${headingLabel.trim()
         .replace(/[^\w\s]/gi, '')
         .replace(/\s+/g, '-').toLowerCase()}-heading`;
    if (document.getElementById(headingId)) {
      headingId = `${headingId}-${this.generateId()}`;
    }
    heading.setAttribute('id', headingId);
  }

  createPanel(children) {
    const panel = document.createElement('div')
    panel.append(...children);
    return panel;
  }

  formatPanel(panel) {
    //if (!panel.hasAttribute('id')) {
    panel.setAttribute('id', panel.parentNode.dataset.panelId);
    //}
    panel.setAttribute('aria-labelledby', panel.parentNode.children[0].id);
    panel.classList.add('flow');
    panel.setAttribute('hidden', '');
  }

  createButton(label, panelId) {
    const labelEl = document.createElement('span');
    labelEl.append(label);
    const button = document.createElement('button', { is: 'toggle-button' });
    button.setAttribute('aria-controls', panelId);
    button.setAttribute('aria-expanded', false);
    button.innerHTML = "<i class='i-ri:arrow-down-s-line' aria-hidden='true'></i>";
    button.prepend(labelEl);
    return button;
  }

  removeEmptyTextNodes(nodelist) {
    return Array.from(nodelist).filter(node =>
      (node.nodeName !== '#text' || node.data.trim().length > 0 || false ))
  }

  generateId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
  }

  isHeading(element) {
    return element.tagName && element.tagName.match(/^H\d$/i)
  }

  findClosestHeading(element) {
    if (!element.parentElement) {
      return false;
    }

    // Check if the element is already a heading tag
    if (this.isHeading(element)) {
      return element;
    }

    // Traverse the ancestor chain and search for heading tags among their children
    let ancestor = element.parentElement;
    // debugger
    while (ancestor !== null) {
      const siblings = Array.from(ancestor.children);
      const headingTags = siblings.filter(sibling =>
        this.isHeading(sibling)
      );

      if (headingTags.length > 0) {
        //console.log(headingTags);
        // Find the closest sibling heading
        const index = siblings.indexOf(element);
        if (index !== -1) {
          const closestHeading = headingTags.reduce((closest, heading) => {
            const headingIndex = siblings.indexOf(heading);
            const distance = Math.abs(headingIndex - index);
            if (closest === null || distance < closest.distance) {
              return { heading: heading, distance: distance };
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

    // No heading tag found among ancestors' children
    return null;
  }
}
