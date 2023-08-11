import Accordion from './accordion';
import './nyc-accordion';

try {
  Array.from(
    document.querySelectorAll('[data-is=nyc-accordion]')
  ).map(el => new Accordion(el));
} catch (e) {
  console.error(`Could not initialize Accordions: ${e}`)
}

export { Accordion };
