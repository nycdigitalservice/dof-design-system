// @unocss-include
import suggestedContent from './constants/suggested-content';

// interface Page {
//     title: string;
//     url: string;
//     tags: string[];
// }

// interface Sections {
//     'Property Tax': Page[];
//     'Data': Page[];
//     'Sales and auctions': Page[];
// }

const sections = {
    'Property Tax': suggestedContent.filter(i => i.tags.includes('property-tax')),
    'Data': suggestedContent.filter(i => i.tags.includes('data')),
    'Sales and auctions': suggestedContent.filter(i => i.tags.includes('sales-and-auctions')),
};

const sectionEls = (sectionsRef) => Object.keys(sectionsRef).map((section) =>
    `
<div class="flow" data-flow-space="m">
  <h3 class="text-base">${section}</h3>
<ul role="list" class="grid" data-flow-space="s">
${listItemEls(sectionsRef[section])}
</ul>
  </div>
`).join('');

const listItemEls = (items) => items.map((item) => `<li>${linkEl(item)}</li>`).join('');

const linkEl = ({ url, title }) => `
  <a href="${url}" class="button" data-variant="outline">
  <span class="title">
${title}
  </span>
  <i class="i-ri:arrow-right-line"></i>
  </a>
`;

export default sectionEls(sections);
