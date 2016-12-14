(function constructor(args) {
	"use strict";

	//Debemos establecer los valores almacenados en properties en las vistas correspondientes
	//#username
	//#password
	//#notifications
	prepararAjustes();

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecemos listeners a las filas
		$.addListener($.usernameRow, "click", onClickUsernameRow);
		$.addListener($.passwordRow, "click", onClickPasswordRow);
		//$.addListener($.usernameRow, "change", onClickUsernameRow);

		//Establecemos listeners a los AlertDialogs
		
		$.addListener($.editUsername, "click", onEditUsername);
		$.addListener($.editPassword, "click", onEditPassword);

		//Establecemos listener al elemento Switch
		$.addListener($.notifications, "change", onChangeNotifications);

	})();

	function prepararAjustes() {
		//Obtenemos la contraseña de Properties y si no está el valor por defecto es Introducir contraseña
		var password = Ti.App.Properties.getString('password', 'Introducir contraseña');

		//Si el contenido es el valor por defecto
		//En otro caso reemplazamos el password por asteriscos : replace(/./g, "*")
		if (password !="Escribir contraseña"){
			$.password.setText(password.replace(/./g, "*"));
		}

		//Establecemos el nombre de usuario y el estado de las notificaciones
		var name = Ti.App.Properties.getString('name', 'Introducir usuario');
		$.username.setText(name);
		
		var notif_value = Ti.App.Properties.getString('notificaciones', 'False');
		$.notifications.setValue(notif_value);
	}

	/**
	 * onClickUsernameRow
	 * @description Callback al hacer click sobre la fila de usuario
	 * @param {Object} e
	 */
	function onClickUsernameRow(e) {
		//Abrimos diálogo de cambio de usuario

		$.editUsername.show();
	}

	/**
	 * onClickPasswordRow
	 * @description Callback al hacer click sobre la fila de password
	 * @param {Object} e
	 */
	function onClickPasswordRow(e) {
		//Abrimos diálogo de cambio de password

		$.editPassword.show();
	}

	/**
	 * onEditUsername
	 * @description Callback al terminar el dialogo de usuario
	 * @param {Object} e
	 */
	function onEditUsername(e) {
		//Si pulsamos en Aceptar
		//Recogemos el valor del TextField con ID usernameField
		//Lo almacemamos en properties
		//Actualizamos la etiqueta de la fila Usuario
		//Establecemos el valor del TextField a cadena vacía
		if(e.index == 0) {
			var name = $.usernameField.getValue();
			Ti.App.Properties.setString("name", name);
			$.username.setText(name);
			$.usernameField.setValue("");
		}
	}

	/**
	 * onEditPassword
	 * @description Callback al terminar el dialogo de password
	 * @param {Object} e
	 */
	function onEditPassword(e) {
		//Si pulsamos en Aceptar
		//Recogemos el valor del TextField con ID passwordField
		//Lo almacemamos en properties
		//Actualizamos la etiqueta de la fila password transformándola en asteriscos
		//Establecemos el valor del TextField a cadena vacía
		if(e.index == 0) {
			var password = $.passwordField.getValue();			
			var passStars=password.replace(/./g, "*");
			
			/*for (var i=0;i<password.length; i++ ){
				passStars +="*";
			};*/
			$.password.setText(passStars);
			Ti.App.Properties.setString("password", password);
			
			$.passwordField.setValue("");
		}
	}

	/**
	 * onChangeNotifications
	 * @description Callback cuando cambia de valor el componente switch
	 * @param {Object} e
	 */
	function onChangeNotifications(e) {
		//Recogemos el valor del Switch con ID notifications
		//Lo almacenamos en properties
		var valor = e.value;
		
		Ti.App.Properties.setString("notificaciones", valor);
		//alert(valor);
		
	}

})($.args || {}); 