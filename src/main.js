import '@ungap/custom-elements';
import 'uno.css';
import './main.css';
import exemptionsListMarkup from './js/exemptions';
import suggestedContentListMarkup from './js/suggested-content.js';
import './js/toggle-button';
import '../packages/components/accordion/src/nyc-accordion.js';
// import '../packages/composition/composition.md';
// import variableDoc from '../packages/variables/README.md?url';

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
                const controlsParent = document.getElementById(target.getAttribute('aria-controls'));
                Array.from(controlsParent.children).map(child => {
                    child.style.display = target.value.length > 0 && child.dataset.tag != target.value ? 'none' : 'flex';
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
