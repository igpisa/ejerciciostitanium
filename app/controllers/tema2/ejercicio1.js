(function constructor(args) {
	"use strict";
	
	
	setEventos();

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	function setEventos() {
		//Añadimos evento al botón enviar y asignamos callback
		$.addListener($.enviar,'click',validarCamposRequeridos);
		
		//Añadimos evento al botón reset y asignamos callback
		$.addListener($.reset,'click',resetFormulario);
	}

	/**
	 * validarCamposRequeridos
	 * @description Validamos campos requeridos
	 * @param {Object} e
	 */
	function validarCamposRequeridos(e) {
		//Implementar función de validación de campos requeridos
		//Nombre, email y mensaje
		
		//Si validación correcta mensaje de alerta "Mensaje enviado."
		//Si error, marcar campos erróneos
	}

	/**
	 * resetFormulario
	 * @description Vaciamos los campos del formulario
	 * @param {Object} e
	 */
	function resetFormulario(e) {
		//Implementar función de validación de campos requeridos
		//Nombre, email y mensaje
		
		$.nombre.setValue("");
		$.apellidos.setValue("");
		$.email.setValue("");
		$.telefono.setValue("");
		$.mensaje.setValue("");
	}

})($.args || {});