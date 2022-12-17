import tipCalculator from './modules/tipCalculator.js';
import totalFinal from './modules/totalFinal.js';
import updateTip from './modules/updateTip.js';
import updateTotal from './modules/updateTotal.js';

// Connstantes de los elementos de HTML
const main = document.getElementById('main');
const form = document.getElementById('main-form');

const tipResult = document.getElementById('result-tip');
const totalResult = document.getElementById('result-total');

// Custom box
const customTip = document.getElementById('custom-tip');

// Guardar valores en variables
const subtotal = document.getElementById('total-bill');
const porcenDiv = document.getElementById('form-btns');
const personas = document.getElementById('total-people');

// Metodo para seleccionar todos los botones
const btns = document.querySelectorAll('.form__box__container__btn');
const resetBtn = document.getElementById('reset-btn');


// Variable para almacenar el valor porcentual seleccionado
let porcenTip;
let custom;

// Evento para escuchar a que boton le estamos dando click
porcenDiv.addEventListener('click', (e) => {
  for(let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }

  porcenTip = e.target;
  porcenTip.classList.add('active');


  // Condicion para escuchar al custom
  if (e.target === customTip) {
    custom = e.target;

    custom.classList.remove('active');
  }
});

// Crear un evento de submit para la forma
form.addEventListener('submit', (e) => {
  // Evitar la action por defecto
  e.preventDefault();

  // crear objecto constante con los valores de la forma
  const formulario = {
    subTotalF: subtotal.value,
    porcenTipF: porcenTip.value,
    personasF: personas.value,
  }

  const { subTotalF, porcenTipF, personasF } = formulario;

  const tipFinal = tipCalculator(subTotalF, porcenTipF, personasF);

  const totalF = totalFinal(subTotalF, personasF, tipFinal);

  // Llamar a las funciones que actualizan el DOM
  updateTip(tipFinal.toFixed(2), tipResult);
  updateTotal(totalF.toFixed(2), totalResult);
});

// Boton para reiniciar la tip calculator
resetBtn.addEventListener('click', (e) => {
  subtotal.value = '';
  customTip.value = '';
  personas.value = '';

  for(let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }

  tipResult.innerText = '$0.00';
  totalResult.innerText = '$0.00';
});