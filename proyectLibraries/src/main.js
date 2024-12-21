import "../styles/styles.css";
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

  // ADD EVENT LISTENER PARA ABRIR EL MODAL
  const btnOpenModal = document.querySelector("#containerBtnFilter button");
  btnOpenModal.addEventListener("click", () => {
    const containerModal = document.querySelector("#containerModal");
    containerModal.classList.add("containerModal-active");
  });
};

// Llamar a la función para agregar el botón
btnFilter();

const modal = () => {
  const main = document.querySelector("main");
  const containerModal = document.createElement("div");
  containerModal.classList.add("containerModal");
  containerModal.id = "containerModal";
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal");
  modalContent.id = "modal";

  containerModal.appendChild(modalContent);
  main.appendChild(containerModal);
};
modal();

const contentModal = () => {
  const modalContent = document.querySelector("#modal");
  modalContent.innerHTML += `
    <button id="closeBtn" class="closeBtn"><i class="bi bi-x"></i></button>
    <div class="containerFilterBeers">
      <h2 class="containerFilterBeers__title">Filtros</h2>
      <form class="containerFilterBeers__form">
        <div class="containerFilterBeers__form-label">
          <label for="goldenBeer" value="rubia">Rubia</label>
          <input type="checkbox" id="goldenBeer"/>
        </div>
        <div class="containerFilterBeers__form-label">
          <label for="brunetteBeer" value="rubia">Morena</label>
          <input type="checkbox" id="brunetteBeer"/>
        </div>
        <div class="containerFilterBeers__form-label">
          <label for="redBeer" value="rubia">Roja</label>
          <input type="checkbox" id="redBeer"/>
        </div>
        <div class="containerFilterBeers__modalBtn">
          <button class="btnModalReset" type="reset" aria-label="Limpiar todos los filtros" disabled>Limpiar</button>
          <button class="btnModalSubmit" type="submit" aria-label="Aplicar filtros">Filtrar<span><img class="containerBtnFilter__btn-img" src="./icons/filters.svg" alt="img filter"/></span><span id="containerQuantityofBeers"></span></button>
        </div>
      </form>
    </div>
  `;

  const closeModal = document.querySelector("#closeBtn");
  closeModal.addEventListener("click", () => {
    const containerModal = document.querySelector("#containerModal");
    containerModal.classList.remove("containerModal-active");
  });

  const filterBtnFunctions = () => {
    const inputs = document.querySelectorAll(
      ".containerFilterBeers__form input"
    );
    const checkedInputs = Array.from(inputs).some((input) => input.checked);
    const btnClear = document.querySelector(".btnModalReset");

    btnClear.disabled = !checkedInputs; // Deshabilitar si ninguno está marcado
  };

  const inputs = document.querySelectorAll(".containerFilterBeers__form input");
  inputs.forEach((input) => {
    input.addEventListener("change", filterBtnFunctions);
  });
  filterBtnFunctions(); // Llamada inicial

  const disableBtnClear = () => {
    const cleanerBtn = document.querySelector(".btnModalReset");
    cleanerBtn.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      filterBtnFunctions(); // Actualizar el estado del botón Limpiar
    });
  };

  disableBtnClear();
};

contentModal();
