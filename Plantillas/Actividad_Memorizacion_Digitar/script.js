// Definición de variables globales
// En puntaje va el valor del puntaje de la actividad
var puntaje = null;

// Acá va la respuesta correcta en minúsculas
var respuestaCorrectaDelInput = "camello";

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

// Acá se definen las acciones del botón continuar
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

// Función para procesar el puntaje de la actividad
function procesarPuntaje() {
	console.log("Puntaje de la actividad: ", puntaje);
	if (puntaje == null || isNaN(puntaje)) {
		var texto = 'Por favor completa la actividad';
		if (typeof parent.mostrarAlerta === "function") {
			parent.mostrarAlerta(texto);
		} else {
			alert(texto);
		}
		ocultarContinuar();
	} else {
		//Aquí se envía el puntaje para que se procese de forma global
	}
}

// Función que coloca el puntaje en 0 cuando la actividad es incorrecta
function Error() {
	puntaje = 0;
	mostrarContinuar();
}

// Función que coloca el puntaje en 1 cuando la actividad es correcta
function Correcto() {
	puntaje = 1;
	mostrarContinuar();
}

// Función para que se reproduzcan los audios
function sonido(id) {
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

// NO MOVER
var input = document.getElementById('respuesta');
input.addEventListener('input', function (e) {
	calificar(this.value);
});

// Función de calificación
function calificar(valor) {
	if(valor.length == 0) {
		ocultarContinuar();
		return false;
	}

	if (valor.toLowerCase() == respuestaCorrectaDelInput) {
		Correcto();
		console.log('puntaje = 1')
	} else {
		Error();
		console.log('puntaje = 0')
	}
}