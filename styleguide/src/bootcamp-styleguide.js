import "./global.css?modules=false";

export function getButtonComponent() {
    return import(
      /* webpackChunkName: "films-component" */ "./button.component.js"
    );
  }