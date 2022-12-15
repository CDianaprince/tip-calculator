import suma from './modules/tipCalculator.js';
// Constante de lps elementos de HTML
const main = document.getElementById('main');
const form = document.getElementById('main-form')

//Crear un evento de submit para la forma
form.addEventListener('submit', (e) => {
//Evitar la action por defecto
e.preventDefault();
});