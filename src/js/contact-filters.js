// @unocss-include
const sections = [
  ['property-related-inquiries', 'Property-related inquiries'],
  ['business-taxes', 'Business taxes'],
  ['parking-and-vehicles', 'Parking & vehicles'],
  ['property-benefits', 'Property benefits']
];

// const contactFiltersMarkup = sections.map(s => `<button class="button" data-variant="pill" data-value="${s[0]}">${s[1]}</button>`).join('');

const contactFiltersRadio = sections.map(
  (s,i) => `
<div>
<input type="radio" name="contact-filter" id="${s[0]}-input" value="${s[0]}" ${i === 0 ? 'checked' : ''}>
<label class="button" for="${s[0]}-input" data-variant="pill">${s[1]}</label>
</div>
`).join('');

const contactFiltersOptions = sections.map(
  (s, i) => `
<option ${i === 0 ? 'selected' : ''} value="${s[0]}">${s[1]}</option>
`
).join('');

const contactFiltersMarkup = `
<form>
<div class="select md:hidden">
<select aria-controls="contact-topics" data-action="filter">${contactFiltersOptions}</select>
<i class="i-ri:arrow-down-s-line"></i></div>
<div class="hidden md:flex gap-2" id="contact-filters-radiogroup" role="radiogroup" aria-labelledby="id-topic-select-table" aria-controls="contact-topics">
${contactFiltersRadio}
</div>
</form>`;

export default contactFiltersMarkup;
