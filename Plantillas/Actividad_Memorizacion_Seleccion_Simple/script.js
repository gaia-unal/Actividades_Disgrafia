// Definición de variables globales

// Aquí queda el puntaje de esta actividad, 1 o 0
var puntaje = null;

var idSeleccion = null;

// Poner en la segunda cadena (que está vacía) el número de la opción correcta
// Aquí va la opción que es correcta para ser calificada
var idOpcionCorrecta = "opcion" + "1";

//NO MOVER
window.addEventListener('load', function(){
    cronometro();
});

//variables de tiempo
var tiempoCuenta = 15;
var futuro1 = (Math.floor(new Date()/1000)) + tiempoCuenta;

//funcion que controla el tiempo y cambia las imagenes para que se digite la respuesta
function cronometro(){
    var actual=Math.floor(new Date()/1000); 
    futuro=futuro1-actual;
    if (futuro>0) { 
        horas_dec=((futuro/60)/60);
        horas=Math.floor(horas_dec);
        minutos=horas_dec-horas;
        minutos_dec=minutos*60;
        minutos=Math.floor(minutos_dec);
        segundos=minutos_dec-minutos;
        segundos=Math.floor(segundos*60);
        document.getElementById("tiempo").value=segundos;
    }
    else{ 
        // Eliminar cronometro
        document.getElementById("inicial").style.display="none";

        // Mostrar contenido de la actividad
        document.getElementById("contenido").style.display = "inline";
    } 
    setTimeout("cronometro()",1); 
}

//CUANDO TERMINEN DE HACER LA ACTIVIDAD, COMENTAR LA SIGUIENTE LÍNEA PARA QUITAR EL BORDE DEL CONTENEDOR
document.getElementsByClassName("contenedor")[0].style.border="solid black";

// NO MOVER
var boton = document.getElementById('btn-continuar');
boton.addEventListener('click', procesarPuntaje, false);

// NO MOVER
function mostrarContinuar() {
    document.getElementById('continuar').style.display = "block";
}

// NO MOVER
function ocultarContinuar() {
    document.getElementById('continuar').style.display = "none";
}

// NO MOVER
function procesarPuntaje() {
	if (puntaje == null || isNaN(puntaje)) {
		var texto = 'Por favor completa la actividad';
		if (typeof parent.mostrarAlerta === "function") {
			parent.mostrarAlerta(texto);
		} else {
			alert(texto);
		}
		ocultarContinuar();
	} else {
		console.log("El puntaje es: ", puntaje);
		// Aquí deberia enviarse el puntaje a una función global que procese el puntaje de toda la prueba
	}
}

// NO MOVER
function Error() {
	puntaje = 0;
}

// NO MOVER
function Correcto() {
	puntaje = 1;
}

// Función para que se reproduzcan los audios
function sonido(id) {
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

// Evento cuando se selecciona alguna de las opciones
function seleccionar(id){
	
	id = "opcion"+id;
	console.log("El id del seleccionado es:", id);
	
	let opciones = document.getElementsByClassName("opciones");

	for(let i = 0; i < opciones.length; i++){
		let idOpcionActual = "opcion"+(i+1);
		document.getElementById(idOpcionActual).style.border = "none";
	}

	document.getElementById(id).style.border = "2px solid #28a745";

	idSeleccion = id;
	mostrarContinuar();
	calificar();
}

// NO MOVER
function calificar(){
	if (idSeleccion == idOpcionCorrecta){
		Correcto();
	}else{
		Error();
	}
}