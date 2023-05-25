import 'uno.css';
import './main.css';
import exemptionsListMarkup from './js/exemptions';
import suggestedContentListMarkup from './js/suggested-content.js';

const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
    import("https://cdn.skypack.dev/container-query-polyfill");
}

try {
    const exemptionsContainer = document.getElementById('exemptions');
    if (exemptionsContainer) {
        exemptionsContainer.innerHTML = exemptionsListMarkup;
    }
    const suggestedContentContainer = document.getElementById('suggested-content');
    if (suggestedContentContainer) {
        suggestedContentContainer.innerHTML = suggestedContentListMarkup;
    }
} catch (e) {
    console.log('exemptions not here')
}
