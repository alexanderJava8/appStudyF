const obtenerVideos = () => {
    const urlBackend = "http://localhost:8080/api/v1/videos"

    fetch(urlBackend, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.ok) {
            return response.json();
        }

        throw new Error("Network response was not ok")
    }).then(data => {
        mostrarDatos(data)
    }).catch(error => {
        console.log("HUbo un error")
    })
}

const mostrarDatos = (data) => {
    const contenedor = document.getElementById("container")
    let contenido = ``

    data.map(obj => {
        contenido += `
        <div class="item" id="item">
            <iframe src="${obj.url}" frameborder="0"></iframe>
            <div class="contenedorBotones">
                <button class="botones" id="btn-editar">editar</button>
                <button class="botones botonEliminar" id="btn-eliminar">eliminar</button>
            </div>
        </div>
        `    
    })
    contenedor.innerHTML = contenido
}

obtenerVideos()