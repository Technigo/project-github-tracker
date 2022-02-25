import { createElement } from "../utility/createElem";
import FilterButtonComp from "./filterButton";
export default function FilterComp() {
  const filterContainer = createElement("div", "filter-container");
  const filterForm = createElement("form", "filter-form");
  const filterFormInput = createElement("input", "filter-input");
  filterFormInput.setAttribute("type", "text");
  filterFormInput.setAttribute("placeholder", "Find a repository..");
  filterForm.appendChild(filterFormInput);
  // filterForm.innerHTML = `
  //   <input
  //   type="text"
  //   class="filter-input"
  //   placeholder="Find a repository..."
  //   />`;
  const sortByLanguage = ["javascript", "typescript", "html", "css"];
  const sortBy = ["last updated", "name"];

  const filterByLanguage = FilterButtonComp(
    "Language",
    "languageSelector",
    "programing-language",
    "language-item",
    sortByLanguage
  );
  const filterByDate = FilterButtonComp(
    "Sort",
    "sortSelector",
    "sort-by",
    "sort-item",
    sortBy
  );

  filterForm.appendChild(filterByLanguage);
  filterForm.appendChild(filterByDate);

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("filter form submitted");
    filterForm.reset();
  });

  filterContainer.appendChild(filterForm);
  return filterContainer;
}
