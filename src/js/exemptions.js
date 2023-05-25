// @unocss-include
import exemptions from './constants/exemptions-abatements';

// interface ExemptionPage {
//     title: string;
//     description: string;
//     url?: string;
// }

const buildCardMarkup = ({ title, description, url = 'http://google.com' }) => `
  <article class="c-card">
  <header class="c-card__header">
  <h2>${title}</h2>
  </header>
  <div class="c-card__body">
  <div class="c-card__summary">${description}</div>
  <a href="${url}" class="c-card__cta">
  <span>Learn More</span>
  <i class="i-ri:arrow-right-line" aria-hidden="true"></i>
  </a>
  </div>
  </article>
`;

const buildCardsMarkup = (data) => data.map(buildCardMarkup).join('');

const exemptionsListMarkup = buildCardsMarkup(exemptions);

export default exemptionsListMarkup;
