import tipCalculator from './modules/tipCalculator.js';

import totaFinal from './modules/TotalFinal.js';

// Constante de lps elementos de HTML
const main = document.getElementById('main');
const form = document.getElementById('main-form');

//Guardar valores en variable
const subtotal = document.getElementById('total-bill');
const porcenDiv = document.getElementById('form-btns');
const personas = document.getElementById('total-people');

//Variable para a;;macenar el valor porcentual seleccionado
let porcenTip;

//evento para escuchar que boton estamos dando click
porcenDiv.addEventListener('click', (e) => {
  porcenTip = e.target;
  console.log(porcenTip);


  // condicion para escuchar al custom
  if(e.target.id === 'custom-tip') {
    console.log('si soy custom');
  }
});

//Crear un evento de submit para la forma
form.addEventListener('submit', (e) => {
  //Evitar la action por defecto
  e.preventDefault();

  //crear objeto constante con valores de la forma
  const formulario = {
    subTotalF: subtotal.value,
    porcenTipF: porcenTip.value,
    personasF: personas.value,
  }
  console.log(formulario);

  const { subtotalF, porcenTipF, personasF } = formulario;

  const tipFinal = tipCalculator(subtotalF, porcenTip, personasF);

  console.log(tipFinal);

  const totalF = totalFinal(subTotalF, tipFinal, personasF);

  console.log(totalF);

});