export default class NYCTabGroup extends HTMLElement {
  connectedCallback() {
    try {
      this.tablist = this.querySelector('[data-tab-list]');
      this.tabs = this.tablist.querySelectorAll('a');
      this.panels = this.querySelectorAll('[data-tab-panels] > *');
    } catch (err) {
      console.error(`NYCTabGroup: ${err}`);
      return;
    }

    // Add the tablist role to the first <ul> in the .tabbed container
    this.tablist.setAttribute('role', 'tablist');

    this.setupTabs();
    this.setupPanels();

    // Initially activate the first tab and reveal the first tab panel
    this.tabs[0].removeAttribute('tabindex');
    this.tabs[0].setAttribute('aria-selected', 'true');
    this.panels[0].hidden = false;
  }

  // The tab switching function
  switchTab(oldTab, newTab) {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = Array.prototype.indexOf.call(this.tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(this.tabs, oldTab);
    this.panels[oldIndex].hidden = true;
    this.panels[index].hidden = false;
  }


  setupTabs() {  // Add semantics are remove user focusability for each tab
    Array.prototype.forEach.call(this.tabs, (tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('id', 'tab' + (i + 1));
      tab.setAttribute('tabindex', '-1');
      tab.parentNode.setAttribute('role', 'presentation');

      // Handle clicking of tabs for mouse users
      tab.addEventListener('click', e => {
        e.preventDefault();
        let currentTab = this.tablist.querySelector('[aria-selected]');
        if (e.currentTarget !== currentTab) {
          this.switchTab(currentTab, e.currentTarget);
        }
      });

      // Handle keydown events for keyboard users
      tab.addEventListener('keydown', e => {
        // Get the index of the current tab in the tabs node list
        let index = Array.prototype.indexOf.call(this.tabs, e.currentTarget);
        // Work out which key the user is pressing and
        // Calculate the new tab's index where appropriate
        let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
        if (dir !== null) {
          e.preventDefault();
          // If the down key is pressed, move focus to the open panel,
          // otherwise switch to the adjacent tab
          dir === 'down' ? this.panels[i].focus() : this.tabs[dir] ? this.switchTab(e.currentTarget, this.tabs[dir]) : void 0;
        }
      });
    });
  }

  setupPanels() {  // Add tab panel semantics and hide them all
    Array.prototype.forEach.call(this.panels, (panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      let id = panel.getAttribute('id');
      panel.setAttribute('aria-labelledby', this.tabs[i].id);
      panel.hidden = true; 
    });
  }
}

customElements.define('nyc-tab-group', NYCTabGroup);
