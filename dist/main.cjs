"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const __uno = "";
const main = "";
const exemptions = [
  {
    title: "Cooperative and Condominium Abatement",
    description: "For managing agents or boards representing condo or co-op unit owners",
    url: "./coop-abatement.html",
    tag: "homeowner"
  },
  {
    title: "Senior Citizen Homeowner's Exemption (SCHE)",
    description: "For homeowners 65 and older with combined annual income of $58,399 or less",
    tag: "homeowner"
  },
  {
    title: "Senior Citizen Rent Increase Exemption (SCRIE)",
    description: "For landlords with tenants 65 and older that qualify for rent freezes",
    tag: "landlord"
  },
  {
    title: "School Tax Relief Exemption (STAR)",
    description: "For homeowners currently enrolled in Basic STAR and Enhanced STAR Only available for renewals ",
    tag: "homeowner"
  },
  {
    title: "Non-profit exemptions",
    description: "For properties owned by non-profit organizations",
    tag: "non-profit-property-owner"
  },
  {
    title: "Industrial and Commercial Abatement Program (ICAP)",
    description: "For commercial and industrial properties in specific abatement zones undergoing significant construction",
    tag: "commercial-tenant"
  },
  {
    title: "Veteran exemptions",
    description: "For veterans, spouses of veterans, and Gold Star parents"
  },
  {
    title: "Disability Rent Increase Exemption (DRIE)",
    description: "For landlords with disabled tenants that qualify for rent freezes"
  },
  {
    title: "Disabled Homeowners Exemption (DHE)",
    description: "For disabled homeowners with combined annual income of $58,399 or less"
  },
  {
    title: "Payment in Lieu of Taxes Agreements (PILOT)",
    description: "For manufacturing, industrial, and not-for-profit business properties"
  },
  {
    title: "Industrial and Commercial Incentive Program (ICIP) ",
    description: "For current ICIP benefit recipients Only available for renewals "
  },
  {
    title: "Solar Electric Generating System Abatement (SEGS)",
    description: "For owners of properties that generate electricity using solar power"
  },
  {
    title: "Clergy exemption",
    description: "For active and retired clergy members and spouses of deceased clergy members"
  },
  {
    title: "Major Capital Improvement Abatement (MCI)",
    description: "For owners of rent-regulated properties planning major repairs or other improvement projects"
  },
  {
    title: "Green Roof Abatement",
    description: "For owners of buildings with vegetation-covered roofs"
  },
  {
    title: "Commercial Revitalization Program (CRP)",
    description: "For commercial buildings in a specific abatement zone built before 1975"
  },
  {
    title: "Childcare Center Abatement",
    description: "For property owners who have created or expanded a childcare center in their building"
  },
  {
    title: "Commercial Expansion Program (CEP)",
    description: "For commercial offices and industrial properties in a specific abatement zone built before 1999"
  },
  {
    title: "Clean Energy Systems Exemption",
    description: "For property owners who have renewable energy technology including solar, wind, and battery systems"
  },
  {
    title: "Domestic and foreign government exemptions",
    description: "For federal, state, local, and foreign government entities"
  },
  {
    title: "Disabled Crime Victim/Good Samaritan Exemption",
    description: "For people with disabilities resulting from a crime"
  }
];
const buildCardMarkup = ({ title, description, url = "http://google.com", tag = "homeowner" }) => `
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
const buildCardsMarkup = (data) => data.map(buildCardMarkup).join("");
const exemptionsListMarkup = buildCardsMarkup(exemptions);
const suggestedContent = [
  {
    title: "Assessment information",
    url: "https://www.nyc.gov/site/finance/taxes/property-assessments.page",
    tags: ["property-tax"]
  },
  {
    title: "Property tax rebates",
    url: "https://www.nyc.gov/site/finance/taxes/property-tax-rebate.page",
    tags: ["property-tax"]
  },
  {
    title: "Property tax rates",
    url: "https://www.nyc.gov/site/finance/taxes/property-tax-rates.page",
    tags: ["property-tax"]
  },
  {
    title: "Calculate property taxes",
    url: "https://www.nyc.gov/site/finance/taxes/calculating-your-property-taxes.page",
    tags: ["property-tax"]
  },
  {
    title: "Property tax forms",
    url: "https://www.nyc.gov/site/finance/taxes/property-forms/property-forms.page",
    tags: ["property-tax"]
  },
  {
    title: "Update property and billing information",
    url: "https://www.nyc.gov/site/finance/taxes/property-update-property-and-billing-information.page",
    tags: ["property-tax"]
  },
  {
    title: "Payment plan information",
    url: "https://www.nyc.gov/site/finance/taxes/property-payment-plans.page",
    tags: ["property-tax"]
  },
  {
    title: "How to divide and merge lots",
    url: "https://www.nyc.gov/site/finance/taxes/property-dividing-and-merging-lots.page",
    tags: ["property-tax"]
  },
  {
    title: "Real Property Transfer Tax information",
    url: "https://www.nyc.gov/site/finance/taxes/property-real-property-transfer-tax-rptt.page",
    tags: ["property-tax"]
  },
  {
    title: "Digital tax maps",
    url: "https://www.nyc.gov/site/finance/taxes/property-digital-tax-map.page",
    tags: ["data"]
  },
  {
    title: "Record property-related documents",
    url: "https://www.nyc.gov/site/finance/taxes/property-recording-property-related-documents.page",
    tags: ["data"]
  },
  {
    title: "Rolling sales data",
    url: "https://www.nyc.gov/site/finance/taxes/property-rolling-sales-data.page",
    tags: ["data"]
  },
  {
    title: "Lien sales",
    url: "https://www.nyc.gov/site/finance/taxes/property-lien-sales.page",
    tags: ["sales-and-auctions"]
  },
  {
    title: "Private asset auctions",
    url: "https://www.nyc.gov/site/finance/taxes/property-private-asset-auctions.page",
    tags: ["sales-and-auctions"]
  }
];
const sections = {
  "Property Tax": suggestedContent.filter((i) => i.tags.includes("property-tax")),
  "Data": suggestedContent.filter((i) => i.tags.includes("data")),
  "Sales and auctions": suggestedContent.filter((i) => i.tags.includes("sales-and-auctions"))
};
const sectionEls = (sectionsRef) => Object.keys(sectionsRef).map((section) => `
<div class="flow" data-flow-space="m">
  <h3 class="text-base">${section}</h3>
<ul role="list" class="grid" data-flow-space="s">
${listItemEls(sectionsRef[section])}
</ul>
  </div>
`).join("");
const listItemEls = (items) => items.map((item) => `<li>${linkEl(item)}</li>`).join("");
const linkEl = ({ url, title }) => `
  <a href="${url}" class="button" data-variant="outline">
  <span class="title">
${title}
  </span>
  <i class="i-ri:arrow-right-line"></i>
  </a>
`;
const suggestedContentListMarkup = sectionEls(sections);
const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
  import("https://cdn.skypack.dev/container-query-polyfill");
}
try {
  const exemptionsContainer = document.getElementById("exemptions");
  if (exemptionsContainer) {
    exemptionsContainer.innerHTML = exemptionsListMarkup;
  }
  const filterControls = document.querySelectorAll("[aria-controls][data-action=filter]");
  if (filterControls.length > 0) {
    filterControls.forEach((controller) => {
      controller.addEventListener("change", ({ target }) => {
        const controlsParent = document.getElementById(target.getAttribute("aria-controls"));
        Array.from(controlsParent.children).map((child) => {
          child.style.display = target.value.length > 0 && child.dataset.tag != target.value ? "none" : "flex";
        });
      });
    });
  }
  const suggestedContentContainer = document.getElementById("suggested-content");
  if (suggestedContentContainer) {
    suggestedContentContainer.innerHTML = suggestedContentListMarkup;
  }
} catch (e) {
  console.error(e);
}
