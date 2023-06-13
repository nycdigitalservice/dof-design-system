import 'uno.css';
import './main.css';
import exemptionsListMarkup from './js/exemptions';
import suggestedContentListMarkup from './js/suggested-content.js';
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

    const exemptionControl = document.querySelector('[aria-controls=exemptions]');

    exemptionControl.addEventListener('change', (evt) =>{
        const { value } = evt.target;
        Array.from(exemptionsContainer.children).map(child => {
            const { tag } = child.dataset;
            if (value.length > 0 && tag != value) {
                child.style.display = 'none';
                return
            }
            child.style.display = 'flex';
        })
    })

    const suggestedContentContainer = document.getElementById('suggested-content');
    if (suggestedContentContainer) {
        suggestedContentContainer.innerHTML = suggestedContentListMarkup;
    }
} catch (e) {
    console.log('exemptions not here')
}
