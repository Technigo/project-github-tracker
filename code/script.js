import "./style.css";
import userProfileImage from "./assets/dummy.png";
import MainComp from "./components/main";
import HeaderComp from "./components/header";

const root = document.getElementById("root");
const header = HeaderComp(userProfileImage);
const main = MainComp(userProfileImage);
root.appendChild(header);
root.appendChild(main);
