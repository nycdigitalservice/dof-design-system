// @unocss-include
import links from './constants/contact-links';

const sections = [
  ['property-related-inquiries', 'Property-related inquiries'],
  ['business-taxes', 'Business taxes'],
  ['parking-and-vehicles', 'Parking & vehicles'],
  ['property-benefits', 'Property benefits']
];

const sectionEls = (sectionsRef) => {
  
  const markup = sectionsRef.map((section, i) =>
    `
<div data-tag="${section[0]}" ${i !== 0 ? 'hidden' : ''}>
<div class="flow w-full">
  <h3>${section[1]}</h3>
<ul role="list" class="grid" data-flow-space="s">
${listItemEls(links.filter(i => i.tags.includes(section[0])))}
</ul>
</div>
  </div>
`).join('')
  return markup;
};

const listItemEls = (items) => items.map((item) => `<li>${linkEl(item)}</li>`).join('');

const linkEl = ({ url, title }) => `
  <a href="${url}" class="button">
  <span class="title">
${title}
  </span>
  <i class="i-ri:arrow-right-line"></i>
  </a>
`;

export default sectionEls(sections);
