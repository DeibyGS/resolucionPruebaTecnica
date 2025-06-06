import "../styles/styles.css";
import Beers from "../data/data.json";
import productTemplate from "/template/productTemplate.hbs?raw";
import { btn } from "../components/Button/Button";

// Funcion para Renderizar productos en el contenedor
const renderProducts = (products) => {
  const template = Handlebars.compile(productTemplate);
  const contentBeer = document.querySelector("#content_Beers");

  contentBeer.innerHTML = "";

  // Generar el HTML para los productos filtrados o todos
  const productsHTML = products.map((product) => template(product)).join("");

  // Agregar el HTML al contenedor
  contentBeer.innerHTML = productsHTML;
};

// Renderizar todos los productos inicialmente
renderProducts(Beers.products);

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
          <label for="goldenBeer" >Rubia</label>
          <input type="checkbox" id="goldenBeer" value="rubia"/>
        </div>
        <div class="containerFilterBeers__form-label">
          <label for="brunetteBeer" >Morena</label>
          <input type="checkbox" id="brunetteBeer" value="brunette"/>
        </div>
        <div class="containerFilterBeers__form-label">
          <label for="redBeer" >Roja</label>
          <input type="checkbox" id="redBeer" value="red"/>
        </div>
        <div class="containerFilterBeers__modalBtn">
          <button class="btnModalReset" type="reset" aria-label="Limpiar todos los filtros" disabled>Limpiar</button>
          <button class="btnModalSubmit" type="button" aria-label="Aplicar filtros">Filtrar<span><img class="containerBtnFilter__btn-img" src="./icons/filters.svg" alt="img filter"/></span><span id="containerQuantityofBeers"></span></button>
        </div>
      </form>
    </div>
  `;

  const closeModal = document.querySelector("#closeBtn");
  closeModal.addEventListener("click", () => {
    const containerModal = document.querySelector("#containerModal");
    containerModal.classList.remove("containerModal-active");
  });

  //FUNCION QUE ME PERMITE DESHABILITAR EL BTN LIMPIAR SI SE DETECTA QUE NINGUN CHECKBOK ESTA MARCADO
  const disableBtnFuction = () => {
    const inputs = document.querySelectorAll(
      ".containerFilterBeers__form input"
    );
    const checkedInputs = Array.from(inputs).some((input) => input.checked);

    const btnClear = document.querySelector(".btnModalReset");

    btnClear.disabled = !checkedInputs; // Deshabilitar si ninguno está marcado
  };

  const inputs = document.querySelectorAll(".containerFilterBeers__form input");

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      disableBtnFuction();
      beerFiltered();
    });
  });

  disableBtnFuction();

  //FUNCION QUE DESHABILITA EL BTN LIMPIAR CUANDO SE CLICKEA
  const disableBtnClear = () => {
    const cleanerBtn = document.querySelector(".btnModalReset");
    cleanerBtn.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      disableBtnFuction(); // Actualizar el estado del botón Limpiar
      const containerQuantityofBeers = document.querySelector(
        "#containerQuantityofBeers"
      );
      containerQuantityofBeers.classList.remove("containerQuantityofBeers");

      containerQuantityofBeers.innerHTML = "";
    });
  };

  disableBtnClear();

  //FUNCION QUE DETECTA SI ALGUN CHECKBOK ESTA MARCADO Y FILTRA LAS COINCIDENCIAS DE LA DATA E INSERTA DENTRO DEL BTN FILTRAR LA CANTIDAD DE BEERS COINCIDEN

  const beerFiltered = () => {
    const checkedInputs = Array.from(
      document.querySelectorAll(".containerFilterBeers__form input:checked")
    );
    const valueCheckboxes = checkedInputs.map((input) => input.value);

    //Aca guardo el estado de los filtros en el localStorage
    localStorage.setItem("selectedFilters", JSON.stringify(valueCheckboxes));

    const filterMap = {
      rubia: 1,
      brunette: 2,
      red: 3,
    };

    const filteredBeers = Beers.products.filter((beer) =>
      valueCheckboxes.includes(
        Object.keys(filterMap).find((key) => filterMap[key] === beer.filterId)
      )
    );
    const beersQuantity = filteredBeers.length;

    const containerQuantityofBeers = document.querySelector(
      "#containerQuantityofBeers"
    );

    if (beersQuantity > 0) {
      containerQuantityofBeers.textContent = beersQuantity;
      containerQuantityofBeers.classList.add("containerQuantityofBeers");
    } else {
      containerQuantityofBeers.textContent = "";
      containerQuantityofBeers.classList.remove("containerQuantityofBeers");
    }

    return filteredBeers;
  };

  const printFilterdBeers = () => {
    const btnModalSubmit = document.querySelector(".btnModalSubmit");
    btnModalSubmit.addEventListener("click", () => {
      const loadFiltersFromLocalStorage = () => {
        const selectedFilters = JSON.parse(
          localStorage.getItem("selectedFilters")
        );

        if (selectedFilters && selectedFilters.length > 0) {
          // Reaplicar los filtros seleccionados
          const inputs = document.querySelectorAll(
            ".containerFilterBeers__form input"
          );
          inputs.forEach((input) => {
            if (selectedFilters.includes(input.value)) {
              input.checked = true;
            }
          });

          // Mostrar productos filtrados según el estado almacenado
          const filteredBeers = beerFiltered();

          if (filteredBeers.length === 0) {
            renderProducts(Beers.products);
          } else {
            renderProducts(filteredBeers);
          }
        } else {
          // Si no hay filtros guardados, mostrar todos los productos
          renderProducts(Beers.products);
        }
      };
    });
  };

  printFilterdBeers();
};
contentModal();

document.addEventListener("DOMContentLoaded", loadFiltersFromLocalStorage);
