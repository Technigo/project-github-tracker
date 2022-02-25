import { createElement } from "../utility/createElem";

export default function LoadingStatusComp() {
  const spinnerContainer = createElement("div", "spinner-container");
  const spinner = createElement("div", "spinner");
  spinnerContainer.appendChild(spinner);
  return spinnerContainer;
}
