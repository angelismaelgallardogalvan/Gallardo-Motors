console.log("Gallardo Motors & Co iniciado correctamente");

//const sirve para declarar variables cuyo valor es CONSTante
const nombre = document.getElementById("nombre"); // Busca en HTML el elemento cuyo id sea nombre y guárdalo en la variable nombre.
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const descripcion = document.getElementById("descripcion");

const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");

const modelosPorMarca = {
    "Toyota": [
        "Corolla",
        "Hilux"
    ],

    "Mercedes - Benz": [
        "Clase C",
        "Clase E"
    ],

    "BMW": [
        "Serie 3",
        "X5"
    ],

    "Volkswagen": [
        "Golf",
        "Jetta"
    ], 

    "Porsche": [
        "911",
        "Cayenne"
    ], 

    "Tesla": [
        "Model 3", 
        "Model Y"
    ], 

    "Honda": [
        "Civic", 
        "CR - V"
    ], 

    "Ford": [
        "Mustang", 
        "F - 150"
    ], 

    "Audi": [
        "A4", 
        "Q5"
    ], 

    "BYD": [
        "Dolphin", 
        "Seal"
    ], 

    "Ferrari": [
        "488 GTB", 
        "SF90 Stradale" 
    ], 

    "Chevrolet": [
        "Silverado",
        "Aveo"
    ], 

    "Volvo": [
        "XC60", 
        "XC90"
    ], 

    "Kia": [
        "Sportage", 
        "K3 Forte"
    ], 

    "Lexus": [
        "RX", 
        "ES"
    ], 

    "Nissan": [
        "Versa", 
        "Sentra"
    ], 

    "Renault": [
        "Clio", 
        "Duster"
    ], 

    "Jeep": [
        "Wrangler",
        "Grand Cherokee"
    ], 

    "Subaru": [
        "Impreza", 
        "Forester"
    ], 

    "Suzuki": [
        "Swift", 
        "Jimmy"
    ]
}

const año = document.getElementById("año");
const color = document.getElementById("color");
const numeroSerie = document.getElementById("numeroSerie");

const btnRegistrar = document.getElementById("btnRegistrar");
const btnVerRegistros = document.getElementById("btnVerRegistros");
const btnVolverRegistro = document.getElementById("btnVolverRegistro");

const seccionRegistro = document.getElementById("seccionRegistro");
const seccionRegistros = document.getElementById("seccionRegistros");
const listaRegistros = document.getElementById("listaRegistros");
const buscadorRegistros = document.getElementById("buscadorRegistros");

const tituloFormulario = document.getElementById("tituloFormulario");

let modoEdicion = false; 
let indiceEdicion = null; // No tiene ningún registro seleccionado para editar, pero puede cambiar mas adelante

console.log("Modo edición:", modoEdicion);
console.log("Índice de edición:", indiceEdicion);

marca.addEventListener("change", function () {
    modelo.innerHTML = "";

    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.textContent = "Selecciona un modelo";

    modelo.appendChild(opcionInicial); // appendChild = agrega un nuevo elemento hijo al final de un elemento padre dentro del HTML

    const modelos = modelosPorMarca[marca.value];

    if (modelos) {
        modelos.forEach(function(nombreModelo) {
            const opcion = document.createElement("option");
            opcion.value = nombreModelo;
            opcion.textContent = nombreModelo;
            modelo.appendChild(opcion);
        });
    }
});

// Se obtiene el valor de tal campo en el momento de dar click

btnRegistrar.addEventListener("click", function () {
    console.log("Registro iniciado");

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;

    if (!soloLetras.test(nombre.value.trim())) { // .test = metodo que devuelve true si la cadena cumple con el formato o false si no
        alert("El nombre solo debe contener letras.");
        nombre.focus();
        return;
    }

    if (!soloNumeros.test(telefono.value.trim())) {
        alert("El teléfono solo debe contener números.");
        telefono.focus();
        return;
    }

    if (!soloLetras.test(color.value.trim())) {
        alert("El color solo debe contener letras.");
        color.focus();
        return;
    }
    
    if (!soloNumeros.test(año.value.trim())) {
        alert("El año solo debe contener números.");
        año.focus();
        return;
    }
    
    const tipoVehiculo = document.querySelector('input[name="tipo"]:checked'); // querySelector, busca y obtiene el primer elemento marcado o seleccionado en ese momento
    const serviciosSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked'); //querySelectorAll, busca y obtiene una lista de todos los elementos seleccionados de tipo casilla
    
    const servicios = []; // Crea un arreglo, vacio, llamado servicios

    serviciosSeleccionados.forEach(function(servicio) { // Por cada servicio que encontraste, ejecuta este código
        servicios.push(servicio.value); // push(), agrega un elemento al final de un arreglo; encuentra un servicio y lo guarda en el arreglo.
    });

    // Quiero crear un objeto llamada registro que contenga estos datos
    const registro = { 
        cliente: { // Propiedad "cliente"
            nombre: nombre.value,
            telefono: telefono.value,
            correo: correo.value
        },

        vehiculo: {
            marca: marca.value,
            modelo: modelo.value,
            año: año.value,
            color: color.value,
            numeroSerie: numeroSerie.value,
            tipo: tipoVehiculo ? tipoVehiculo.value : null // Operacion ternaria que responde a: "¿Existe un tipo de vehículo seleccionado?" Si sí, guarda su value; si no, guarda null 
        },

        servicios, // Al tener el arreglo vacio y llenarlo con "push", se puede agregar a este objeto
            
        // A la izquierda puede estar el nombre de la propiedad del objeto y a la derecha la variable que contiene el arreglo
        // Pero como en este caso, se puede usar servicios: servicio, solo se usa de forma abreviada usando "servicios"
        
        descripcion: descripcion.value
    };

    console.log(registro);

    const registroJSON = JSON.stringify(registro); // Toma el objeto JavaScript y convierte "registro" en una cadena de texto con formato JSON.
    console.log(registroJSON); 

    console.log(typeof registro); // Que tipo de dato es registro? Objeto (object)
    console.log(typeof registroJSON); // Cual es su resultado? Cadena de texto (string)

    let registros = JSON.parse(localStorage.getItem("registros")) || []; // Obtén los registros guardados y, si no hay ninguno, empieza con un arreglo vacío
        // localStorage.getItem("registros") = Busca en localStorage algo llamado registros
        // "JSON.parse(...)" hace lo contrario que "JSON.stringify(registro)"
        // "|| []" = Si todavía no existe ningún registro, utiliza un arreglo vacío

    if (modoEdicion === false) { // El triple "=" compara, de forma estricta, el valor y el tipo de dato
        console.log("Modo CREAR");
        registros.push(registro); // "registro" es el objeto ya construido para meterlo dentro del arreglo
    } else {
        console.log("Modo EDITAR");
        console.log("Voy a modificar el registro:", indiceEdicion);

        registros.splice(indiceEdicion, 1, registro); // Ve a la posición "indiceEdicion", elimina 1 elemento y coloca el "registro" en su lugar
    }

    localStorage.setItem("registros", JSON.stringify(registros)); // Convierte el arreglo llamado registros en un texto con formato JSON y lo almacena en el almacenamiento local bajo la clave "registros"

    mostrarRegistros();

    // Despues de terminar la operacion, el programa estara preparado para el siguiente registro
    modoEdicion = false;
    indiceEdicion = null;

    tituloFormulario.textContent = "Nuevo Registro";
    limpiarFormulario();
    btnRegistrar.textContent = "Registrar";

    if (tipoVehiculo) {
        console.log("Tipo de vehículo:", tipoVehiculo.value); // Si hay un tipo de vehículo seleccionado, haz esto.
    } else {
        console.log("No se seleccionó un tipo de vehículo"); // De lo contrario, haz esto
    }
});

function mostrarRegistros(registrosPersonalizados = null) { // Funcion que lee los registros guardados y los muestra en la página
    const registrosGuardados = JSON.parse(localStorage.getItem("registros")) || []; // // Obtén los registros guardados y, si no hay ninguno, empieza con un arreglo vacío
    const registrosMostrar = registrosPersonalizados || registrosGuardados; // Funciona con el foreach de abajo

    let registrosFiltrados = registrosMostrar; // Copia "filtrada" de los registros para que la tarjeta genere solo los resultados encontrados con "registrosFiltrados.forEach(function(registro, indice)" 

    console.log(registrosGuardados);
    console.log("Cantidad de registros:", registrosGuardados.length); // Cuántos registros hay dentro del arreglo?

    listaRegistros.innerHTML = ""; // Limpia lo que está actualmente en la pantalla

    if (registrosFiltrados.length === 0) {
        listaRegistros.innerHTML = "<p>No se encontraron registros.</p>";
        return;
    }

    registrosFiltrados.forEach(function(registro, indice) { // Cambio del HTML desde JavaScript
        // ↓ Propiedad que sirve para leer o cambiar el código HTML dentro de un elemento
        listaRegistros.innerHTML += `  
            <div class="registro">
                <h3>Registro #${indice + 1}</h3>

                <div class="informacionPrincipal">
                    <div class="bloqueRegistro">
                        <h4>👤 Cliente: ${registro.cliente.nombre}</h4>
                        <p>Teléfono: ${registro.cliente.telefono}</p>
                        <p>Correo: ${registro.cliente.correo}</p>
                    </div>

                    <div class="bloqueRegistro">
                        <h4>🚘 Vehículo: ${registro.vehiculo.marca} ${registro.vehiculo.modelo}</h4>
                        <p>Año: ${registro.vehiculo.año}</p>
                        <p>Color: ${registro.vehiculo.color}</p>
                        <p>Tipo: ${registro.vehiculo.tipo}</p>
                        <p>Número de serie: ${registro.vehiculo.numeroSerie}</p>
                    </div>
                </div>

                <div class="bloqueRegistro">
                    <h4>🔧 Servicio</h4>
                    <p>${registro.servicios.join(", ")}</p>
                </div>

                <div class="bloqueRegistro">
                    <h4>📝 Descripción</h4>

                    <p>${registro.descripcion || "Sin descripción"}</p> 
                </div>

                <div class="acciones">
                    <button onclick="editarRegistro(${indice})">Editar</button>
                    <button class="btnEliminar" onclick="eliminarRegistro(${indice})">Eliminar</button>
                </div>
            </div>
        `;
                // ↑ Con ${indice}, cada boton queda asociado a su registro
            // "<p>${registro.descripcion || "Sin descripción"}</p>" = Si existe una descripción, muéstrala; si está vacía, muestra "Sin descripción".
    });

    // ${registro.cliente.nombre} = Coloca aquí el valor de registro.cliente.nombre
    // registro.servicios.join(", ") = Conversion del arreglo de servicios en una lista
    // Al usar class = "registro", le estoy dando una clase CSS
}

function editarRegistro(indice) {
    modoEdicion = true; // A partir de ahora estoy editando
    indiceEdicion = indice; // Guarda la posicion del indice para que "sobreviva" y pueda ser usado en otro lugar
    
    btnRegistrar.textContent = "Guardar cambios";
    tituloFormulario.textContent = `Editando Registro #${indice + 1}`; // "Sumale" 1 a la posicion del indice para "ubicar" al usuario

    console.log("Modo edición:", modoEdicion);
    console.log("Índice guardado:", indiceEdicion);

    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    const registro = registros[indice];

    console.log("Registro seleccionado:", registro);

    // El camino de regreso para mostrar los datos en el formulario
    nombre.value = registro.cliente.nombre;
    telefono.value = registro.cliente.telefono;
    correo.value = registro.cliente.correo;

    marca.value = registro.vehiculo.marca;
    modelo.value = registro.vehiculo.modelo;
    año.value = registro.vehiculo.año;
    color.value = registro.vehiculo.color;
    numeroSerie.value = registro.vehiculo.numeroSerie;

    const tipoVehiculo = document.querySelector(
        `input[name="tipo"][value="${registro.vehiculo.tipo}"]`
    );

    if (tipoVehiculo) {
        tipoVehiculo.checked = true; // Selecciona el radio button "seleccionado" anteriormente
    }

    const checkboxes = document.querySelectorAll(
        '#seccionRegistro input[type="checkbox"]'
    );

    checkboxes.forEach(function(checkbox) { // Este checkbox está entre los servicios que tenía guardados el registro?
        checkbox.checked = registro.servicios.includes(checkbox.value);
    });

    descripcion.value = registro.descripcion;
}

function limpiarFormulario() {
    nombre.value = "";
    telefono.value = "";
    correo.value = "";

    marca.value = "";
    modelo.value = "";
    año.value = "";
    color.value = "";
    numeroSerie.value = "";

    descripcion.value = "";

    const tipoVehiculos = document.querySelectorAll(
        '#seccionRegistro input[name="tipo"]'
    );

    tipoVehiculos.forEach(function(tipo) {
        tipo.checked = false;
    });

    const checkboxes = document.querySelectorAll(
        '#seccionRegistro input[type="checkbox"]'
    );

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

function eliminarRegistro(indice) {
    const confirmar = confirm("¿Seguro que desea eliminar este registro?"); // Muestra una ventana con 2 opciones: Aceptar o Cancelar; confirm devuelve un true o false

    if (!confirmar) { // Si NO confirmó, sal de la función
        return;
    }
    
    let registros = JSON.parse(localStorage.getItem("registros")) || []; // Dame el arreglo de registros que está guardado en localStorage
    registros.splice(indice, 1); // Desde la posición numero "indice", elimina 1 elemento

    localStorage.setItem("registros", JSON.stringify(registros)); // Vuelve a convertir el arreglo a JSON para guardarlo

    mostrarRegistros();
}

btnVerRegistros.addEventListener("click", function() {
    seccionRegistros.style.display = "block"; // Muestra lo que oculto en CSS
    seccionRegistro.style.display = "none";
    
    mostrarRegistros();
});

btnVolverRegistro.addEventListener("click", function() {
    seccionRegistros.style.display = "none";
    seccionRegistro.style.display = "block";
});

buscadorRegistros.addEventListener("input", function(){
    const textoBusqueda = buscadorRegistros.value.toLowerCase().trim(); // trim = eliminar espacios en blanco al inicio o al final de la palabra
    console.log("Buscando:", textoBusqueda);

    const registros = JSON.parse(localStorage.getItem("registros")) || [];

    const resultados = registros.filter(function(registro){ // filter = de todos mis registros, dame los que cumplen esta condición
        return (
            registro.cliente.nombre.toLowerCase().includes(textoBusqueda) || // "||" Es el operador OR
            registro.vehiculo.marca.toLowerCase().includes(textoBusqueda) ||
            registro.vehiculo.modelo.toLowerCase().includes(textoBusqueda)
        );
    });

    console.log("Resultados encontrados:", resultados);

    mostrarRegistros(resultados);
});
