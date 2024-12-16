import "./styles.css";
import data from "../data/data.json";
import productTemplate from "/template/productTemplate.hbs?raw";
import { btn } from "../components/Button/Button";

// Renderizar productos en el contenedor
const template = Handlebars.compile(productTemplate);
const contentBeer = document.querySelector("#content_Beers");
const productsHTML = data.products.map((product) => template(product)).join("");
contentBeer.innerHTML = productsHTML;

// Función que pinta el botón para filtrar cervezas
const btnFilter = () => {
  const main = document.querySelector("main");

  // Evitar duplicados del botón en caso de múltiples invocaciones
  if (!document.querySelector("#containerBtnFilter")) {
    const btnFilterContainer = document.createElement("div");
    btnFilterContainer.classList.add("containerBtnFilter");
    btnFilterContainer.id = "containerBtnFilter";

    btnFilterContainer.innerHTML = btn();
    main.appendChild(btnFilterContainer);
  }
};

// Llamar a la función para agregar el botón
btnFilter();

const modal = () => {
  const main = document.querySelector("main");
  const containerModal = document.createElement("div");
  containerModal.classList.add("containerModal");
  containerModal.id = "containerModal";
  main.appendChild(containerModal);
};
modal();
