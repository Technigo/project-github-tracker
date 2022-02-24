import arrowButton from "../assets/icons/arrow-down.svg";
import checkedIcon from "../assets/icons/checked.svg";
import { createElement } from "../utility/createElem";
import { capitalizeFirstLetter } from "../utility/capitalizeFirst";

export default function FilterButtonComp(
  buttonName,
  filterId,
  filterTypeClassname,
  listItemClassname,
  filterLists
) {
  const filterBtnContainer = createElement("div", "filter-btn-container");
  const filterBtn = createElement("button", "filter-btn");
  filterBtn.id = "languageBtn";
  filterBtn.innerHTML = `
      <span> ${buttonName} </span>
      <img
        src=${arrowButton}
        alt="checked icon"
        class="arrow-icon"
      />
      `;

  const filterBtnPositioner = createElement("div", "filter-btn-positioner");
  const filterSelectorLists = createElement("ul", filterTypeClassname);
  filterSelectorLists.id = filterId;
  filterSelectorLists.innerHTML = `
      <li class="${listItemClassname} filter-title">
          <span>Select type</span>
          <button class="close-btn">&times;</button>
      </li>
      `;
  const listAttributes = filterLists;
  listAttributes.forEach((item) => {
    const li = createList(listItemClassname, item);
    filterSelectorLists.appendChild(li);
  });
  filterBtnPositioner.appendChild(filterSelectorLists);

  filterSelectorLists.addEventListener("click", (e) => {
    console.log("selector clicked!");
  });

  filterBtnContainer.appendChild(filterBtn);
  filterBtnContainer.appendChild(filterBtnPositioner);

  return filterBtnContainer;
}

function createList(classname, text) {
  const listItem = createElement("li", classname);
  listItem.id = text.replace(/\s/g, "");
  const img = createElement("img", "checked-icon");
  img.src = checkedIcon;

  listItem.appendChild(img);
  listItem.innerText = capitalizeFirstLetter(text);
  return listItem;
}
