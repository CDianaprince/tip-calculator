function tipCalculator(subtotal, porcenTip, personas) {
let propina;

propina = (subtotal * porcenTip) / personas;

//redondea a cifras decimales
propina = propina;

  return propina;

}

export default tipCalculator;