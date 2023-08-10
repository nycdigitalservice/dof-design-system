import '@ungap/custom-elements';
import 'uno.css';
import './main.css';
import exemptionsListMarkup from './js/exemptions';
import suggestedContentListMarkup from './js/suggested-content.js';
import {Accordion} from '@dofds/core';

const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
  import("https://cdn.skypack.dev/container-query-polyfill");
}

try {
  const exemptionsContainer = document.getElementById('exemptions');
  if (exemptionsContainer) {
    exemptionsContainer.innerHTML = exemptionsListMarkup;
  }

  const filterControls = document.querySelectorAll('[aria-controls][data-action=filter]');

  if (filterControls.length > 0) {
    filterControls.forEach(controller => {
      controller.addEventListener('change', ({target}) => {
        const { value } = target;
        const controlsParent = document.getElementById(target.getAttribute('aria-controls'));
        Array.from(controlsParent.children).map(child => {
          const tags = child.dataset.tag.split(',');
          child.style.display = tags.includes(value) || value === 'other' || value === '' ? 'flex' : 'none';
        })
      })
    })
  }

  const suggestedContentContainer = document.getElementById('suggested-content');
  if (suggestedContentContainer) {
    suggestedContentContainer.innerHTML = suggestedContentListMarkup;
  }
} catch (e) {
  console.error(e)
}

const accordionEls = Array.from(
  document.querySelectorAll('[data-is=nyc-accordion]')
).map(el => new Accordion(el));

//console.log(accordionEls);


