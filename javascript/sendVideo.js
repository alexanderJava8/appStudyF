const saveVideo = () => {
    const backendUrl = 'http://localhost:8080/api/v1/video'
    const urlVideo = document.getElementById("link-video").value

    const video = {
        url: urlVideo,
    }
    
    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(video)
    }).then(response => {
        if(response.ok) {
            console.log(response)
            return response.json()
        }
        throw new Error("Network del backend")
    }).then(data => {
        console.log(data)
        cerrarModal()
        location.reload()
    }).catch(error => {
        console.error("hubo problema con el fetch", error)
    })
}

const cerrarModal = () => {
    const contenedor = document.getElementById("modal-overlay")
    contenedor.style.display = "none"
}

const botonGuardar = document.getElementById("btn-guardar")
botonGuardar.addEventListener("click", saveVideo)