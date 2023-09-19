import { wrapElement } from '@dofds/utilities';
import './tag-filter';

try {
  Array.from(
    document.querySelectorAll('[data-is=nyc-tag-filter]')
  ).map(el => wrapElement(el, 'nyc-tag-filter'));
} catch (e) {
  console.error(`NYCTagFilter: ${e}`)
}
