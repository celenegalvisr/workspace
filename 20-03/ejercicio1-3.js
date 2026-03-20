let puntaje = 10;
puntaje = 20;
puntaje = 30; 
console.log("Valor final con let:", puntaje);
const gravedad = 9.81;
gravedad = 10 
console.log ("gravedad:",gravedad);

Con 'let' el programa fluye sin problemas al cambiar los valores. 
Con 'const', al intentar la primera reasignación, JavaScript lanza un 
error de tipo (TypeError) y detiene la ejecución del código, porque 
una constante está diseñada para permanecer fija. 