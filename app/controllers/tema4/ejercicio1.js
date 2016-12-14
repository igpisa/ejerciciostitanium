(function constructor(args) {
	"use strict";

	var modoEditor,
	    idEnEdicion,
	    MODO_NUEVO,
	    MODO_EDICION;

	MODO_NUEVO = 1;
	MODO_EDICION = 2;

	modoEditor = null;
	idEnEdicion = null;

/*
	- Al iniciar el controlador debemos instalar la base de datos
	

	- Cuando la ventana se abra debemos obtener los registros de la DB
	  y mostrarlos las peliculas en la lista

	- Cuando se haga click en un registro llamar a editarItem

	- Entonces se abrirá un diálogo sobre el que tendremos que volcar los
	  datos de la película y podremos operar de la siguiente forma:

			Insertar registro: nuevaPelicula - Insertaremos un nuevo registro en la base de datos
			Editar registro: editarItem - Editaremos un registro existente
			Borrar registro: borrarPelicula -Eliminaremos de la base de datos la película
			Guardar registro: guardarPelicula - Guardaremos los cambios hechos en el registro
*/

	var db = Ti.Database.install('/db/peliculas','peliculas');
	
	

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecer callback para el evento open la ventana $.win
		$.addListener($.win, "open", cargarDatos);
		
		$.addListener($.win, "close", cerrarApp);

		//Establecer callback para el evento itemclick de la lista $.list
		$.addListener($.list, "itemclick", editarItem);

		//Establecer callback para el evento click de la etiqueta $.nuevaPelicula
		$.addListener($.nuevaPelicula, "click", nuevaPelicula);

		//Establecer callbacks botones formulario
		$.addListener($.guardar, "click", guardarPelicula);
		$.addListener($.eliminar, "click", borrarPelicula);
		$.addListener($.cancelar, "click", cerrarEditor);
	})();

	/**
	 * cargarDatos
	 * @description Cargar base de datos
	 * @param {Object} e
	 */
	function cargarDatos(e) {
		var resultSet;
		
		var sql = 'SELECT * FROM PELICULAS';
		
		resultSet = db.execute(sql);
		
		/*while(resultSet.isValidRow()){
			var id = resultSet.fieldByName('id');
			var name = resultSet.fieldByName('name');
			resultSet.next();
		}*/
		
 
		//Obtener todos los datos de la base de datos
		//Preparamos query, ejecutamos y obtenemos un ResultSet

		//Llamar a mostrarDatos pasándole como parámetro un ResultSet
		mostrarDatos(resultSet);
		
		resultSet.close();
	}

	/**
	 * mostrarDatos
	 * @description Muestra los datos de la DB en la lista
	 * @param {Object} resultSet Conjunto de registros
	 */
	function mostrarDatos(resultSet) {
		var items,
		    resultSet;

		items = [];
		//resultSet = null;
		
		while(resultSet.isValidRow()){
			items.push(prepararItem(resultSet));
			resultSet.next();
		}

		//Iterar sobre los registros: while(resultSet.isValidRow())
		//Añadimos cada registro como item: items.push(prepararItem(registro))
		
		//items.push(prepararItem(resultSet));

		//Mostramos elementos en la lista
		$.section.setItems(items);
	}

	/**
	 * prepararItem
	 * @description Prepara el objeto para un ListItem
	 * @param {Object} registro Objeto resultSet
	 */
	function prepararItem(registro) {
		/*var pelicula = {
			titulo : "Titulo",
			genero : "Genero",
			año : "2000",
			sinopsis : "Sinopsis"
		};*/
		
		var pelicula = {
			id : registro.fieldByName("ID"),
			titulo : registro.fieldByName("TITULO"),
			genero : registro.fieldByName("GENERO"),
			año : registro.fieldByName("AÑO"),
			sinopsis : registro.fieldByName("SINOPSIS")
		};
		
		
		

		//Preparar objeto pelicula obteniendo la información
		//para cada item del registro

		return {
			properties : {
				width : Ti.UI.FILL,
				height : 48,
				title : pelicula.titulo,
				color : "black",
				accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
				pelicula : pelicula
			}
		};
	}

	/**
	 * actualizarLista
	 * @description Carga los datos
	 */
	function actualizarLista() {
		cargarDatos();
	}

	/**
	 * nuevaPelicula
	 * @description Abre el editor para añadir una nueva pelicula
	 * @param {Object} e
	 */
	function nuevaPelicula(e) {
		modoEditor = MODO_NUEVO;
		$.editor.show();
	}

	/**
	 * editarItem
	 * @description Callback de click en un item de la lista, llenamos el formulario
	 * @param {Object} e
	 */
	function editarItem(e) {
		//Obtener item de lista
		var item = $.section.getItemAt(e.itemIndex).properties.pelicula;

		//Guardar ID en idEnEdicion
		
		idEnEdicion = item.id;

		//Rellenar el formulario
		
		$.titulo.setValue(item.titulo);
		/*$.titulo.value = item.titulo;
		$.genero.value = item.titulo;
		$.año.value = item.titulo;
		$.sinopsis.value = item.sinopis;*/
		$.genero.setValue(item.genero);
		$.año.setValue(item.año);
		$.sinopsis.setValue(item.sinopsis);
		

		//Establecemos modo de edición y mostramos formulario
		modoEditor = MODO_EDICION;
		$.editor.show();
	}

	/**
	 * guardarPelicula
	 * @description Dependiendo del modo de edicion insertamos o actualizamos
	 * @param {Object} e
	 */
	function guardarPelicula(e) {

		if (modoEditor == MODO_NUEVO) {
			insertarPelicula();
		} else if (modoEditor == MODO_EDICION) {
			actualizarPelicula();
		}

		//Cerramos editor
		cerrarEditor();

		//Refrescamos lista
		actualizarLista();
	}

	/**
	 * insertarPelicula
	 * @description Insertamos registro en DB
	 */
	function insertarPelicula() {

		//Solo insertamos si todos los campos tienen valores
		if (esFormularioValido()) {
			//Obtenemos datos del formulario
			var titulo = $.titulo.value;
			var genero = $.genero.value;
			var año = $.año.value;
			var sinopsis = $.sinopsis.value;
			
			
			//Preparamos query
			var sql = 'INSERT INTO PELICULAS (TITULO, GENERO, AÑO, SINOPSIS) VALUES(?,?,?,?); ';
			
			//Insertamos en la base de datos
			
			db.execute(sql,titulo, genero, año, sinopsis);
		}
	}

	/**
	 * actualizarPelicula
	 * @description Actualizamos registro en DB
	 */
	function actualizarPelicula() {

		//Solo actualizamos si todos los campos tienen valores
		if (esFormularioValido()) {
			//Obtenemos datos del formulario
			//Preparamos query
			//Actualizamos la base de datos
			var titulo = $.titulo.value;
			var genero = $.genero.value;
			var año = $.año.value;
			var sinopsis = $.sinopsis.value;
			
			var sql = 'UPDATE PELICULAS SET TITULO=?, GENERO=?, AÑO=?, SINOPSIS=? WHERE ID=? ';
			
			db.execute(sql,titulo, genero, año, sinopsis, idEnEdicion);
		}
	}

	/**
	 * borrarPelicula
	 * @description Eliminamos registro de DB
	 */
	function borrarPelicula() {
		if (modoEditor == MODO_EDICION) {
			//Preparamos query con idEnEdicion
			//Eliminamos registro
			//Actualizamos la lista
			
			var titulo = $.titulo.value;
			var genero = $.genero.value;
			var año = $.año.value;
			var sinopsis = $.sinopsis.value;
			
			var sql = 'DELETE FROM PELICULAS WHERE ID=?';
			
			db.execute(sql, idEnEdicion);
			actualizarLista();
			cerrarEditor();
			
		}
	}

	/**
	 * cerrarEditor
	 * @description Cierra el editor y resetea valores
	 * @param {Object} e
	 */
	function cerrarEditor(e) {
		//Reset idEnEdicion y editor
		idEnEdicion = null;
		modoEditor = null;

		//Reset formulario
		$.titulo.setValue("");
		$.genero.setValue("");
		$.año.setValue("");
		$.sinopsis.setValue("");

		//Ocultamos editor
		$.editor.hide();
	}
	
	function cerrarApp(e){
		db.close();
	}

	/**
	 * esFormularioValido
	 * @description Comprueba que todos los campos tengan contenido
	 * @return {Boolean}
	 */
	function esFormularioValido() {
		return ["titulo", "genero", "año", "sinopsis"].every(function(campo) {
			return $[campo].hasText();
		});
	}

})($.args || {});
