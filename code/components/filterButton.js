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
  filterBtn.setAttribute("type", "button");

  filterBtn.id = "languageBtn";
  filterBtn.innerHTML = `
      <span> ${buttonName} </span>
      <img
        src=${arrowButton}
        alt="checked icon"
        class="arrow-icon"
      />`;

  const filterBtnPositioner = createElement("div", "filter-btn-positioner");
  const filterSelectorLists = createElement("ul", filterTypeClassname);
  filterSelectorLists.id = filterId;

  const filterTitleContainer = createElement("li", listItemClassname);
  filterTitleContainer.classList.add("filter-title");

  const filterTitle = createElement("span", "span-title");
  filterTitle.innerText = "Select type";

  const closeBtn = createElement("button", "close-btn");
  closeBtn.setAttribute("type", "button");
  closeBtn.innerHTML = "&times;";

  filterTitleContainer.appendChild(filterTitle);
  filterTitleContainer.appendChild(closeBtn);
  filterSelectorLists.appendChild(filterTitleContainer);

  const listAttributes = filterLists;
  listAttributes.forEach((item) => {
    const li = createList(listItemClassname, item);
    filterSelectorLists.appendChild(li);
  });
  filterBtnPositioner.appendChild(filterSelectorLists);

  filterBtnContainer.appendChild(filterBtn);
  filterBtnContainer.appendChild(filterBtnPositioner);

  // addEventlisteners
  filterSelectorLists.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON" && e.target.nodeName !== "LI") {
      return;
    }
    if (e.target.id !== "") {
      console.log("filter by", e.target.id);
    }
    filterSelectorLists.classList.remove("active");
  });

  filterBtn.onclick = function displaySelection() {
    const sortBtn = document.querySelector("#sortSelector");
    const languageBtn = document.querySelector("#languageSelector");
    if (
      sortBtn.className.includes("active") ||
      languageBtn.className.includes("active")
    ) {
      sortBtn.classList.remove("active");
      languageBtn.classList.remove("active");
    } else {
      filterSelectorLists.classList.add("active");
    }
  };
  return filterBtnContainer;
}

function createList(classname, text) {
  const listItem = createElement("li", classname);
  listItem.id = text.replace(/\s/g, "");
  listItem.innerHTML = `
    <img class="filter-check-icon" src=${checkedIcon} alt="checked icon" />
    ${capitalizeFirstLetter(text)}
    `;
  return listItem;
}
