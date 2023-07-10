import {toggle} from '../../packages/core/js';

customElements.define(
  'toggle-button',
  class ToggleButton extends HTMLButtonElement {
    connectedCallback() {
      this.addEventListener('click', this);
      // console.log(this);
    }
    handleEvent(e) { this['on' + e.type](e); }
    onclick(e) {
      // console.log(e)
      toggle(this);
    }
  },
  { extends: 'button' }
)
