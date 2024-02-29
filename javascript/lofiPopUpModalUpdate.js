const container_modal = document.getElementById("container")
const modalUpdate = document.getElementById("modal-overlay-update")
let idElementToUpdate = ""

container_modal.addEventListener("click", (e) => {
    idElementToUpdate = e.target.id
    console.log(e.target)
    console.log(e.target.innerText)
    console.log(e.target.id)
    if(e.target.classList.contains("botones") && e.target.innerText == "editar") {
        modalUpdate.style.display = `flex`
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
        id:idElementToUpdate,
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
console.log(botonUpdate)
botonUpdate.addEventListener("click", updateVideo)