let x = "Estoy fuera";

{
    let y = "Estoy dentro";
    console.log(x); 
}
console.log(x);

console.log(y); 

// EXPLICACIÓN: 
// Al usar 'let', la variable 'y' tiene "block scope" (alcance de bloque). 
// Esto significa que solo existe dentro de las llaves donde fue declarada. 
// Al intentar llamarla desde fuera, JavaScript lanza un "ReferenceError" 
// porque 'y' no está definida en ese entorno.