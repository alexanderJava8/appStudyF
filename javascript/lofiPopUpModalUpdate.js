const container_modal = document.getElementById("container")
const modalUpdate = document.getElementById("modal-overlay-update")
let idElement = ""
const modalDelete = document.getElementById("modal-overlay-delete")

container_modal.addEventListener("click", (e) => {
    idElement = e.target.id
    if(e.target.classList.contains("botones") && e.target.innerText == "editar") {
        modalUpdate.style.display = `flex`
    } 

    if(e.target.classList.contains("botones") && e.target.innerText == "eliminar") {
        modalDelete.style.display = "flex"
    }
})

const cerrarModalUpdate = () => {
    modalUpdate.style.display = "none"
}

modalUpdate.addEventListener("click", (event) => {
    if(event.target == event.currentTarget) {
        modalUpdate.style.display = "none"
    }
})

const cerrarX = document.getElementById("botonUpdate-cerrar")
cerrarX.addEventListener("click", cerrarModalUpdate)

const updateVideo = () => {
    const backendUrl = 'http://localhost:8080/api/v1/video'
    const newUrl = document.getElementById("link-new-video").value
    
    const newVideo = {
        id:idElement,
        url:newUrl
    }

    fetch(backendUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVideo)
    }).then(response => {
        if(response.ok) {
           return response.ok;
        }
        throw new Error("error")
    }).then(() => {
        cerrarModalUpdate()
        location.reload()
    }).catch(error => {
        console.log("hubo un problema con el fetch", error)
    })
}

const botonUpdate = document.getElementById("btn-update")
botonUpdate.addEventListener("click", updateVideo)

modalDelete.addEventListener("click", (event) => {
    if(event.target == event.currentTarget) {
        modalDelete.style.display = "none"
    }
})

const cerrarModalDelete = () => {
    modalDelete.style.display= "none"
}

const botonCancelarEliminarVideo = document.getElementById("cancelarEliminarVideo")
botonCancelarEliminarVideo.addEventListener("click", cerrarModalDelete)

const deleteVideo = () => {
    const backendUrl = `http://localhost:8080/api/v1/video/${idElement}`
    fetch(backendUrl, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.ok) {
            cerrarModalDelete()
            location.reload()
            return response.ok
        }

        throw new Error("network was not ok")
        
    }).catch(error => {
        console.log("error:", error)
    })
}

const botonModalEliminar = document.getElementById("botonEliminarVideo")
botonModalEliminar.addEventListener("click", deleteVideo)