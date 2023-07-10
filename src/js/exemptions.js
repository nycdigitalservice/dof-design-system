// @unocss-include
import exemptions from './constants/exemptions-abatements';

// interface ExemptionPage {
//     title: string;
//     description: string;
//     url?: string;
// }

const buildCardMarkup = ({ title, description, url = 'http://google.com', tag = 'homeowner' }) => `
  <article class="card" data-tag="${tag}">
  <header class="card__header">

  <h2>
  <a href="${url}" class="card__primary-action">
<span>${title}</span>
<span>  <i class="i-ri:arrow-right-line" aria-hidden="true"></i></span>
</a>
</h2>

  </header>
  <div class="card__body">
${description}
  </div>
  </article>
`;

const buildCardsMarkup = (data) => data.map(buildCardMarkup).join('');

const exemptionsListMarkup = buildCardsMarkup(exemptions);

export default exemptionsListMarkup;
