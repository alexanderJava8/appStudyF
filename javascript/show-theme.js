const showParametros = new URLSearchParams(window.location.search)
const showNameTopic = showParametros.get('name')
const showID = showParametros.get('id')

const title = document.querySelector('.title')
title.textContent = showNameTopic

const showTopics = () => {
const urlBackend = `http://localhost:8080//api/v1/comments/topicID/${showID}`

    fetch(urlBackend, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) {
            return response.ok
        }
        throw new Error("Network response was not ok")
    })
    .then(data => {
        mostrarDatos(data)
        console.log(data)
    })
    .catch(error => {
        console.error("hubo un problema con la sol")
    })

}