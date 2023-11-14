(() => {
  // ../../utilities/src/js/toggle.js
  var toggle_default = (controller) => {
    const controls = document.getElementById(controller.getAttribute("aria-controls"));
    const isExpanded = controller.getAttribute("aria-expanded").toLowerCase() === "true";
    controller.setAttribute("aria-expanded", !isExpanded);
    isExpanded ? controls.setAttribute("hidden", "") : controls.removeAttribute("hidden");
    return controller;
  };

  // src/js/toggle-button.js
  customElements.define(
    "toggle-button",
    class ToggleButton extends HTMLButtonElement {
      connectedCallback() {
        if (!this.hasAttribute("aria-controls")) {
          console.error(
            `ToggleButton: "aria-controls" must be set to the
                      ID of the element you are toggling`
          );
          return;
        }
        if (!this.hasAttribute("aria-expanded")) {
          console.error(
            `ToggleButton: "aria-expanded" must be set to the
           toggled elements initial visibility, either
           "true" or "false"`
          );
          return;
        }
        this.addEventListener("click", this);
      }
      handleEvent(e) {
        this["on" + e.type](e);
      }
      onclick(e) {
        toggle_default(this);
      }
    },
    { extends: "button" }
  );
})();
