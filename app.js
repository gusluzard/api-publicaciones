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

        listaPublicaciones.textContent = "";

        const seleccion = publicaciones.slice(0,5);

        const tarjetas = seleccion.map(publicacion => document.createElement("article"));

        const titulos = seleccion.map(titulo => {
            document.createElement("h2")
            titulo.textContent = seleccion.title
        });

        const contenido = seleccion.map(contenido => {
            document.createElement("p")
            contenido.textContent = seleccion.body
        });

        tarjetas.appendChild(titulos);
        tarjetas.appendChild(contenido);
        listaPublicaciones.appendChild(tarjetas);

        mensaje.textContent = "";

    } catch (error) {
        return "Error: " + error.message;
    }
}

boton.addEventListener("click", cargarPublicaciones);


