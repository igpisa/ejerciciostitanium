(function constructor(args) {
	"use strict";

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecemos eventos sobre los botones
		$.addListener($.readFile,"click",leerFichero);
		$.addListener($.writeFile, "click", escribirFichero);
	})();

	/**
	 * leerFichero
	 * @description Callback boton leer fichero, leemos fichero de texto
	 * @param {Object} e
	 */
	function leerFichero(e) {
		//Obtenemos manejador de fichero
		//Utilizamos directorio privado de aplicación
		//Nombre de fichero: miFichero.txt
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'miFichero.txt');
		
		if (f.exists()===false){
			alert("El fichero no existe");
		};
		
		var content = f.read();
		
		$.fileContent.setText(content.text);

		//Si no existe mostramos un mensaje indicando que no existe el fichero

		//Si fichero existe lo leemos y volcamos contenido sobre etiqueta #fileContent

		//Establecemos con tenido de fichero en Label
	}

	/**
	 * escribirFichero
	 * @description Callback boton escribir fichero, escribimos en fichero de texto
	 * contenido de textfield
	 * @param {Object} e
	 */
	function escribirFichero(e) {
		//Solo escribimos si hay contenido en el área de texto #textArea
		var text = $.textArea.getValue();
		//Obtenemos manejador de fichero
		//Utilizamos directorio privado de aplicación
		//Nombre de fichero: miFichero.txt
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'miFichero.txt');

		//Si escritura exitosa mostramos mensaje de alerta indicando el éxito
		if (text.length != 0){
			f.write(text);
			alert("Proceso de escritura finalizada");
			
		}
		else alert("No puedo escribir si no escribes");
		
	}

})($.args || {}); 