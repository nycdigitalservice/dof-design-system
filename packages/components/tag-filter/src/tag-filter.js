class NYCTagFilter extends HTMLElement {
  connectedCallback() {
    if (this.isConnected) {
      this.controllers = this.querySelectorAll('[aria-controls]');
      if (this.controllers.length > 0) {
        this.controllers.forEach(controller => {
          controller.addEventListener('change', ({target}) => {
            const { value } = target;
            const controlsParent = document.getElementById(target.getAttribute('aria-controls'));
            this.filterChildren(Array.from(controlsParent.querySelectorAll('[data-tag]')), value)
          })
        })
      }
    } 
  }

  filterChildren(children, value) {
    children.forEach(child => {
      const tags = child.dataset.tag.split(',');
      tags.includes(value) || value === 'other' || value === '' ? child.removeAttribute('hidden') : child.setAttribute('hidden', '');
    })
  }
}

customElements.define('nyc-tag-filter', NYCTagFilter);
