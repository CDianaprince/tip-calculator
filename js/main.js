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

//Elememto para almacenar texto del invalid
const invalid1 = document.getElementById('not-valid1');
const invalid2 = document.getElementById('not-valid2');


// Variable para almacenar el valor porcentual seleccionado
let porcenTip;
let custom;
let check;

// Evento para escuchar a que boton le estamos dando click
porcenDiv.addEventListener('click', (e) => {
  for(let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }

  porcenTip = e.target;
  porcenTip.classList.add('active');


  // Condicion para escuchar al custom
  if (e.target === customTip) {
    porcenTip = e.target;

    check = true;

    porcenTip.classList.remove('active');
  }
});

// Crear un evento de submit para la forma
form.addEventListener('submit', (e) => {
  // Evitar la action por defecto
  e.preventDefault();

  //si le dieron click a custom, entonces dividamos su valor entre 10
  if(check) {
    porcenTip.value = porcenTip.value/100;
  }

  // crear objecto constante con los valores de la forma
  const formulario = {
    subTotalF: subtotal.value,
    porcenTipF: porcenTip.value,
    personasF: personas.value,
  }

  const { subTotalF, porcenTipF, personasF } = formulario;

  if(validateAll(subTotalF,personasF)) {
    updateDom(subTotalF, porcenTipF, personasF);
    subtotal.parentElement.classList.add('valid');
    personas.parentElement.classList.add('valid');
    
    removeBorder(subtotal, 'valid');
    removeBorder(personas, 'valid');
  }
   

});

// funcion para actualizar el DOM
function updateDom(subTotalF, porcenTipF, personasF) {
  const tipFinal = tipCalculator(subTotalF, porcenTipF, personasF);

  const totalF = totalFinal(subTotalF, personasF, tipFinal);

  // Llamar a las funciones que actualizan el DOM
  updateTip(tipFinal.toFixed(2), tipResult);
  updateTotal(totalF.toFixed(2), totalResult);
  
}

//funcion para quitar los mensajes en un periodo de tiempo
function removeText(element) {
  setTimeout(() => {
    element.innerText = '';
  
  },4000);
}

function removeBorder(element,classOfElement) {
  setTimeout(() => {
    element.parentElement.classList.remove(classOfElement);
  
  },3000);
}

// Boton para reiniciar la tip calculator
resetBtn.addEventListener('click', (e) => {
  subtotal.value = '';
  customTip.value = '';
  personas.value = '';
 
  //quitar validos
  subtotal.parentElement.classList.remove('valid');
  personas.parentElement.classList.remove('valid');

  //quitar invalidos
  subtotal.parentElement.classList.remove('invalid');
  personas.parentElement.classList.remove('invalid');

  for(let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }

  tipResult.innerText = '$0.00';
  totalResult.innerText = '$0.00';
});

/* 
Validacion de Forma
*/

function notZero(input) {
  let check = true;

  if(input <= 0) {
    console.log("Esto no es valido");
    check = false;
  }
  return check;

}

function validateAll(subTotalF,personasF) {
  let check = true;

  //Validdar que no sean ceros
  if(!notZero(parseFloat(subTotalF))){
    check = false;

    subtotal.parentElement.classList.add('invalid');
    invalid1.innerText = "No puede ser cero o menor que cero";

    removeText(invalid1);
    removeBorder(subtotal, 'invalid');
   } 

   if(!notZero(parseFloat(personasF))){
    check = false;

    personas.parentElement.classList.add('invalid');
    invalid2.innerText = "No puede ser cero o menor que cero";

    removeText(invalid2);
    removeBorder(personas, 'invalid');
   }

   return check;
}