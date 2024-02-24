const contenedorVideos = document.getElementById("container")

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
    }).catch(error => {
        console.error("hubo problema con el fetch", error)
    })
}

const botonGuardar = document.getElementById("btn-guardar")
botonGuardar.addEventListener("click", saveVideo)

