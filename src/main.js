import 'uno.css';
import './main.css';
import '@dofds/core';
import exemptionsListMarkup from './js/exemptions';
import suggestedContentListMarkup from './js/suggested-content.js';
import contactTopicsMarkup from './js/contact-topics.js';
import contactFiltersMarkup from './js/contact-filters.js';
//import contactLinks from './js/contact-links.js';

const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
  import("https://cdn.skypack.dev/container-query-polyfill");
}

try {
  const exemptionsContainer = document.getElementById('exemptions');
  if (exemptionsContainer) {
    exemptionsContainer.innerHTML = exemptionsListMarkup;
  }
  const contactTopicsContainer = document.getElementById('contact-topics');
  if (contactTopicsContainer){
    contactTopicsContainer.innerHTML = contactTopicsMarkup;
  }

  // const filterChildren = (children, value) => {
  //   children.forEach(child => {
  //     const tags = child.dataset.tag.split(',');
  //     tags.includes(value) || value === 'other' || value === '' ? child.removeAttribute('hidden') : child.setAttribute('hidden', '');
  //   })
  // }
  // const contactFiltersContainer = document.getElementById('contact-filters');
  // if(contactFiltersContainer) {
  // contactFiltersContainer.innerHTML = contactFiltersMarkup;
  // const filterInputs = contactFiltersContainer.querySelectorAll('input[type=radio][name=contact-filter]')
  // contactFiltersContainer.addEventListener('change', evt => {
  //   if (evt.target.matches('input[type=radio][name=contact-filter]')){
  //     const input = evt.target;
  //     const {value} = input;
  //     filterInputs.forEach(i => i.removeAttribute('checked'));
  //     input.setAttribute('checked', 'checked');
  //     filterChildren(Array.from(contactTopicsContainer.querySelectorAll('[data-tag]')), value)        
  //   }
  // })
  
  // filterInputs.forEach(input => input.addEventListener('change', evt => {
  //   const {value} = input;
  //   filterInputs.forEach(i => i.removeAttribute('checked'));
  //   input.setAttribute('checked', 'checked');
  //   filterChildren(Array.from(contactTopicsContainer.querySelectorAll('[data-tag]')), value)
  // }))
  // const filterBtns = contactFiltersContainer.querySelectorAll('.button[data-value]');
  // filterBtns.forEach(btn => btn.addEventListener('click', evt => {
  //   const { value } = btn.dataset;
  //   Array.from(contactTopicsContainer.querySelectorAll('[data-tag]')).forEach(child => {
  //     const tags = child.dataset.tag.split(',');
  //     child.style.display = tags.includes(value) || value === 'other' || value === '' ? 'block' : 'none';
  //   })
  // }))
  // }

  // const filterControls = document.querySelectorAll('[aria-controls][data-action=filter]');

  // if (filterControls.length > 0) {
  //   filterControls.forEach(controller => {
  //     controller.addEventListener('change', ({target}) => {
  //       const { value } = target;
  //       const controlsParent = document.getElementById(target.getAttribute('aria-controls'));
  //       filterChildren(Array.from(controlsParent.querySelectorAll('[data-tag]')), value)
  //     })
  //   })
  // }

  const suggestedContentContainer = document.getElementById('suggested-content');
  if (suggestedContentContainer) {
    suggestedContentContainer.innerHTML = suggestedContentListMarkup;
  }
} catch (e) {
  console.error(e)
}

