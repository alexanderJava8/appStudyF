const obtenerIdComment = () => {
    const url = window.location.href
    const urlObj = new URL(url)
    const parametrosURL = urlObj.searchParams;
    return parametrosURL.get("id")
}

const insertCommentInTextArea = (data) => {
    const textarea = document.getElementById("miTextArea");
    textarea.innerText = data.comment
}

const saveNewComment = () => {
    const boton = document.getElementById("boton");
    boton.addEventListener("click", () => save());
}

/**este es la funcion que guarda el nuevo comentario */
const save = () => {
    const urlBackend = 'http://localhost:8080/api/v1/comments'
    const text = document.getElementById("miTextArea").value
    const idComment = obtenerIdComment();

    const comment = {
        id: idComment,
        newComment: text
    }

    fetch(urlBackend, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(response => {
        if(response.ok) {
            return response.ok
        }

        throw new Error("newtwork del backend")
    })
    .then(data => {
        console.log("respuesta", data)
    })
    .catch(error => {
        console.error("hubo un  problema con el fetch", error)
    })
}

saveNewComment()

const updateComment = () => {
    const idComment = obtenerIdComment()
    const urlBackend = `http://localhost:8080/api/v1/comments/${idComment}`

    fetch(urlBackend, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        throw new Error("Network response was not ok")
    })
    .then(data => {
        insertCommentInTextArea(data)
    })
    .catch(error => {
        console.error("hubo un problema con la solucion", error)
    })
}

updateComment()