import './tab-group';

const wrapElement = (el, newTag) => {
  const parent = el.parentNode;
  const elIndex = [...parent.children].indexOf(el);
  const ce = document.createElement(newTag);
  ce.appendChild(el);
  parent.insertBefore(ce, parent.childNodes[elIndex]);
}

try {
  Array.from(
    document.querySelectorAll('[data-is=nyc-tab-group]')
  ).map(el => wrapElement(el, 'nyc-tab-group'));
} catch (e) {
  console.error(`Could not initialize TabGroup: ${e}`)
}
