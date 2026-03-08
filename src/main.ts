import { become, wherve } from "./dom/world";
import "./style.css";

window.onload = () => {
  const worldDiv = become();
  document.body.prepend(worldDiv.element);
  wherve(worldDiv);
};
