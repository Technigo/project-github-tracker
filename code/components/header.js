import dummy from "../assets/dummy.png";
import notificationIconSrc from "../assets/icons/bell-regular.svg";
import githugLogoSrc from "../assets/icons/github-brands.svg";

export default function HeaderComp() {
  const header = document.createElement("header");
  header.classList.add("header");

  //[todo] unable to change color in svg when it is in img tag. update it later
  const barIcon = `
    <svg
    class="expandable-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    >
    <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
    <path
      fill="currentColor"
      class="expandable-icon-path"
      d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
    />
     </svg>
    `;

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");

  const githubLogo = document.createElement("img");
  githubLogo.src = githugLogoSrc;
  githubLogo.classList.add("logo");

  const searchForm = document.createElement("form");
  searchForm.classList.add("search-container");
  searchForm.innerHTML = `
    <input
    type="text"
    class="search"
    placeholder="Search or jump into.."
  /><button type="submit" class="search-btn">&#47;</button>
    `;
  searchForm.onsubmit = (e) => {
    e.preventDefault();
    //[todo] update function
    console.log("hello");
  };

  const nav = document.createElement("nav");
  nav.classList.add("nav");
  const ul = document.createElement("ul");
  ul.classList.add("nav-list");
  ul.innerHTML = `
  <li class="nav-item">Pull Requests</li>
  <li class="nav-item">Explore</li>
  `;
  nav.appendChild(ul);

  const githubLogoMobile = document.createElement("img");
  githubLogoMobile.src = githugLogoSrc;
  githubLogoMobile.classList.add("logo-mobile");

  headerContainer.appendChild(githubLogo);
  headerContainer.appendChild(searchForm);
  headerContainer.appendChild(nav);

  const userProfileCorner = document.createElement("img");
  userProfileCorner.src = dummy;
  userProfileCorner.classList.add("profile-thumbnail-corner");

  const notificationIcon = document.createElement("img");
  notificationIcon.src = notificationIconSrc;
  notificationIcon.classList.add("notification");

  //attach by order
  header.innerHTML = barIcon;
  header.appendChild(headerContainer);
  header.appendChild(githubLogoMobile);
  header.appendChild(userProfileCorner);
  header.appendChild(notificationIcon);
  console.log(header);

  return header;
}
