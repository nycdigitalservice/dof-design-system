import { wrapElement } from '@dofds/utilities';
import './tab-group';

try {
  Array.from(
    document.querySelectorAll('[data-is=nyc-tab-group]')
  ).map(el => wrapElement(el, 'nyc-tab-group'));
} catch (e) {
  console.error(`Could not initialize TabGroup: ${e}`)
}
