export default (controller) => {
  const controls = document.getElementById(controller.getAttribute('aria-controls'));
  const isExpanded = controller.getAttribute('aria-expanded') === "true";
  controller.setAttribute('aria-expanded', !isExpanded);
  isExpanded ? controls.setAttribute('hidden', '') : controls.removeAttribute('hidden');
  return controller;
}
