/**
	EJERCICIO 6: ACTION BAR
	
	El alumno deberá configurar una barra de acciones con los siguientes requisitos:
	
	El ejercicio deberá cumplir los siguientes requisitos:
	
	- Utilizará IDs y clases guardándolo todo en el estilo asociado al controlador ejercicio 6:
	
	styles/tema1/ejercicio6.tss
	
	- El Action Bar tendra varios botones de acción:
	
	Refrescar: Debe verse siempre
	Ajustes: Debe verse si cabe en pantalla
	Buscar como ActionView: Acción oculta pero expandible
	Una acción oculta llamada: Más opciones
	
	Ayuda:
	http://docs.appcelerator.com/platform/latest/#!/guide/Android_Action_Bar
	http://docs.appcelerator.com/platform/latest/#!/api/Titanium.Android.ActionBar
	http://docs.appcelerator.com/platform/latest/#!/api/Titanium.Android.Menu
	http://docs.appcelerator.com/platform/latest/#!/api/Titanium.Android.MenuItem
	http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.Android.SearchView
*/

/**
 * close
 * @description Método asociado a ActionBar, 
 * cuando se pulsa sobre la flecha < la ventana se cierra
 * @param {Object} e
 */
function close(e){
	$.win.close();
}