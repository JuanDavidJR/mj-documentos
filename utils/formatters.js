// utils/formatters.js

function formatearNumero(numero) {
  return new Intl.NumberFormat('es-CO').format(numero);
}

function numeroEnPalabras(numero) {
  const unidades = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
  const decenas = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
  const centenas = ['', 'CIEN', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
  
  if (numero === 0) return 'CERO PESOS';
  
  let resultado = '';
  
  // Millones
  if (numero >= 1000000) {
    const millones = Math.floor(numero / 1000000);
    if (millones === 1) {
      resultado += 'UN MILLON ';
    } else {
      resultado += `${convertirCentenas(millones)} MILLONES `;
    }
    numero = numero % 1000000;
  }
  
  // Miles
  if (numero >= 1000) {
    const miles = Math.floor(numero / 1000);
    if (miles === 1) {
      resultado += 'MIL ';
    } else {
      resultado += `${convertirCentenas(miles)} MIL `;
    }
    numero = numero % 1000;
  }
  
  // Centenas, decenas y unidades
  if (numero > 0) {
    resultado += convertirCentenas(numero);
  }
  
  return resultado.trim() + ' PESOS';
  
  function convertirCentenas(num) {
    let res = '';
    
    if (num >= 100) {
      const cent = Math.floor(num / 100);
      if (num === 100) {
        res += 'CIEN ';
      } else if (cent === 1) {
        res += 'CIENTO ';
      } else {
        res += centenas[cent] + ' ';
      }
      num = num % 100;
    }
    
    if (num >= 20) {
      const dec = Math.floor(num / 10);
      res += decenas[dec];
      num = num % 10;
      if (num > 0) {
        res += ' Y ' + unidades[num];
      }
    } else if (num >= 10) {
      const especiales = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
      res += especiales[num - 10];
    } else if (num > 0) {
      res += unidades[num];
    }
    
    return res.trim();
  }
}

module.exports = {
  formatearNumero,
  numeroEnPalabras
};