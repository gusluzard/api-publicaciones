const boton = document.getElementById("btnCargar");

const botonLimpiar = document.getElementById("btnLimpiar");

const listaPublicaciones = document.getElementById("listaPublicaciones");

const mensaje = document.getElementById("mensaje");

const barraCarga = document.getElementById("barraCarga");

let publicacionesCargadas = false;

async function cargarPublicaciones() {

    if (publicacionesCargadas === true) {
        mensaje.textContent = "Las publicaciones ya están cargadas.";
        return;
    }

    boton.disabled = true;
    boton.textContent = "Cargando...";
    barraCarga.classList.remove("oculto");

    try {
        mensaje.textContent = "Cargando publicaciones...";

        const [respuesta] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts"),
            new Promise(resolve => setTimeout(resolve, 1000))
        ]);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las publicaciones");
        }

        const publicaciones = await respuesta.json();

        if (publicaciones.length === 0) {
            mensaje.textContent = "No hay publicaciones disponibles";
            return;
        }
        
        listaPublicaciones.textContent = "";

        const seleccion = publicaciones.slice(0,5);

        seleccion.forEach((publicacion) => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("publicacion");
            const titulo = document.createElement("h2");
            const contenido = document.createElement("p");
            titulo.textContent = publicacion.title;
            contenido.textContent = publicacion.body;
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(contenido);
            listaPublicaciones.appendChild(tarjeta);  
        });

        mensaje.textContent = "";
        publicacionesCargadas = true;

    } catch (error) {
        mensaje.textContent = "Error: " + error.message;
    } finally {
        boton.disabled = false;
        boton.textContent = "Cargar publicaciones";
        barraCarga.classList.add("oculto");
    }
}

boton.addEventListener("click", cargarPublicaciones);

function limpiarPublicaciones() {
    listaPublicaciones.textContent = "";
    mensaje.textContent = "";
    publicacionesCargadas = false;
}

botonLimpiar.addEventListener("click", limpiarPublicaciones);