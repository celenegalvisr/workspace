// Función suma
function sumar(a, b) {
    const suma = a + b;
    return suma;
}

// Función resta
function restar(a, b) {
    const resta = a - b;
    return resta;
}

// Función multiplicación
function multiplicar(a, b) {
    const multiplicacion = a * b;
    return multiplicacion;
}

// Función división
function dividir(a, b) {
    if (b === 0) {
        return 'No se puede dividir entre cero';
    }
    const division = a / b;
    return division;
}

// =====================================
// LLAMADO DE FUNCIONES
// =====================================

console.log("Resultado suma:");
console.log(sumar(10, 5));

console.log("----------------");

console.log("Resultado resta:");
console.log(restar(10, 5));

console.log("----------------");

console.log("Resultado multiplicación:");
console.log(multiplicar(10, 5));

console.log("----------------");

console.log("Resultado división:");
console.log(dividir(10, 5));
