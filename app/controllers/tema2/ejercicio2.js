(function constructor(args) {
	"use strict";

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	function setEventos() {
		//Añadimos eventos de click a los elementos del menú y su callback
		var botones = ["inicio", "fotos", "mensajes", "perfil"];
		
		botones.forEach(function(elem){
			$.addListener($.elem, "click", clickEnMenu);
		});
	}

	/**
	 * clickEnMenu
	 * @description Callback cuando se pulsa en un item de menu
	 * @param {Object} e
	 */
	function clickEnMenu(e) {
		//Implementar función que asigna una clase activa al menú pulsado
		//Y deja el resto como inactivas
		var resetItems;
		var label;
		

		//Añadir contenido a vista contenedor. Si ya hay una vista en el contenedor
		//debemos eliminarla antes para añadir la nueva
	}

})($.args || {});
