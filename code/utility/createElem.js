export function createElement(elementType, className) {
  const elem = document.createElement(elementType);
  elem.classList.add(`${className}`);
  return elem;
}
