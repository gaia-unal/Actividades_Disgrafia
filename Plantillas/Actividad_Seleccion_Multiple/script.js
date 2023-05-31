// Definición de variables globales
var puntaje = 0.01;

// Agregar los id de los div de las opciones correctas en forma de arreglo
var opcionesCorrectas = ["opcion1", "opcion4"];

// Variables para guardar el valor de las opciones correctas e incorrectas
var valorBueno = 1/opcionesCorrectas.length;
var valorMalo = valorBueno/2;

// Arreglo para guardar las opciones seleccionadas
var seleccionadas = Array();

// Variable para guardar el id de la opción que se acaba de seleccionar
var idSeleccion = null;

// Marco para establecer límites en la actividad
document.getElementsByClassName("contenedor")[0].style.border="solid black";

// Botón para continuar
var boton = document.getElementById('btn-continuar');
boton.addEventListener('click', procesarPuntaje, false);

// Función para mostrar el botón de continuar
function mostrarContinuar() {
	document.getElementById('continuar').style.display = "block";
}

// Función para ocultar el botón de continuar
function ocultarContinuar() {
	document.getElementById('continuar').style.display = "none";
}

// Función para procesar el puntaje
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
		// Aquí se envía el puntaje para que se procese de forma global
		// parent.enviarPuntaje(puntaje);
	}
}

// Función para reproducir el audio
function sonido(id) {
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

// Función para seleccionar las opciones
function seleccionar(id){
	id = "opcion"+id;
	// console.log("El id del seleccionado es:", id);

	// Si ya está seleccionada y la acaban de volver a pulsar, voy a quitar su selección
	if(seleccionadas.includes(id)){
		document.getElementById(id).style.border = "none";
		let indice = seleccionadas.indexOf(id);
		seleccionadas.splice(indice, 1);
	}else{ // Si no está seleccionada, le pongo el borde y la guardo en el arreglo
		document.getElementById(id).style.border = "solid lightgreen";
		seleccionadas.push(id);
	}
	
	// console.log("Las opciones seleccionadas hasta el momento son", seleccionadas);
	if(seleccionadas.length > 0){
		mostrarContinuar();
		calificar();
	}else{
		ocultarContinuar();
	}
	
}

// Función para calificar
function calificar(){
	puntaje = 0.0;
	let correctas = 0;
	for(let i = 0; i < opcionesCorrectas.length; i++){
		if(seleccionadas.includes(opcionesCorrectas[i])){
			puntaje += valorBueno;
			correctas += 1;
		}
	}
	puntaje = puntaje - ((valorMalo) * (seleccionadas.length - correctas));
	if(puntaje < 0){
		puntaje = 0;
	}
	console.log("El puntaje es: ", puntaje);
}