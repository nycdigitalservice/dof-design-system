import Accordion from './accordion';

class NYCAccordion extends HTMLElement {
  connectedCallback() {
    if (!this.firstChild) return;
    this.accordion = new Accordion(this);
  }
}

customElements.define('nyc-accordion', NYCAccordion);
