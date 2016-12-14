(function constructor(args) {
	"use strict";

	//Lista de usuarios disponible en Alloy.Globals.userList;
	setEventos;

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	function setEventos() {
		//Añadimos evento al botón generar y asignamos callback
		$.addListener($.generar, "click", generarPerfil);
	}

	/**
	 * generarPerfil
	 * @description Elige un perfil al azar y lo muestra en pantalla
	 */
	function generarPerfil(){
		//Implementar función que escoja un usuario al azar
		//Y que muestre en pantalla su imagen de perfil
		//y su nombre
	}

})($.args || {});
