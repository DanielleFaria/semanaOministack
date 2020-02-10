module.exports = function parseFunctionAsArray(arrayAsString){
   return arrayAsString.split(',').map(tech => tech.trim());
} 