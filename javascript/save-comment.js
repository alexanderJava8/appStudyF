const parametros = new URLSearchParams(window.location.search)
const id = parametros.get('id')
const nameTopic = parametros.get('name')

const topic = {
    id: id,
    name: nameTopic
}

const saveComment = () => {
    const backendUrl = 'http://localhost:8080/api/v1/comments'
    const text = document.getElementById('miTextArea').value

    const comment = {
        comment: text,
        topic: topic
    }
    
    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        throw new Error("newtqork del backend")
    })
.then(data => {
    console.log("respuesta backend:", data)
    window.location.href = 'notes.html?name='+ encodeURIComponent(nameTopic) + '&id=' + encodeURIComponent(id)
})
.catch(error => {
    console.error("hubo problema con el fetch", error)
})
}

const boton = document.getElementById('boton')
boton.addEventListener('click', saveComment)