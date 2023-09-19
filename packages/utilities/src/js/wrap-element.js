export default (el, newTag) => {
  const parent = el.parentNode;
  const elIndex = [...parent.children].indexOf(el);
  const ce = document.createElement(newTag);
  ce.appendChild(el);
  parent.insertBefore(ce, parent.childNodes[elIndex + 1]);
}
