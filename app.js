const boton = document.getElementById("btnCargar");

const listaPublicaciones = document.getElementById("listaPublicaciones");

const mensaje = document.getElementById("mensaje");

async function cargarPublicaciones() {
    try {
        mensaje.textContent = "Cargando publicaciones...";

        const respuesta = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

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
            const titulo = document.createElement("h2");
            const contenido = document.createElement("p");
            titulo.textContent = publicacion.title;
            contenido.textContent = publicacion.body;
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(contenido);
            listaPublicaciones.appendChild(tarjeta);  
        });

        mensaje.textContent = "";

    } catch (error) {
        mensaje.textContent = "Error: " + error.message;
    }
}

boton.addEventListener("click", cargarPublicaciones);


