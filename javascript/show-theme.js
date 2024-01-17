const showParametros = new URLSearchParams(window.location.search)
const showID = showParametros.get('id')
const nameTopic = showParametros.get('name')

const title = document.getElementById('title')
title.textContent = nameTopic

const showTopics = () => {
    const urlBackend = `http://localhost:8080/api/v1/comments/topicID/${showID}`
    
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
        mostrarDatos(data)
        colocarEventoAbotonEliminar()
        console.log("queee", data)
    })
    .catch(error => {
        console.error("hubo un problema con la sol")
    })
}


const mostrarDatos = (data) => {


    const commentsHTML = data.map(item => `
    <div class="contenedor" id="${item.id}">
    <article class="notes">
                <h4 class="notes-intro">${item.comment.trim().substring(0, 10)}</h4>
            </article>
            <div class="contenedor-botones">
            <button class="eliminar botones">eliminar</button>
            </div>
            </div>   
     `)
            
            const container = document.getElementById('container')
            container.innerHTML = commentsHTML.join('')
        }
        
        
        const colocarEventoAbotonEliminar = () => {
            const botones = document.querySelectorAll('.eliminar')

            botones.forEach(boton => {
                boton.addEventListener('click', conseguirId)
            })
        }
        
        const conseguirId = (evento) => {
            const boton = evento.currentTarget;
            const contenedor = boton.closest('.contenedor')
            const cardId = contenedor.getAttribute('id');
            deleted(cardId)
        }

        showTopics()
        
        const deleted = (id) => {
            const url = `http://localhost:8080/api/v1/comments/${id}`
            
            fetch(url, {
                method: 'DELETE'
            })
        .then(response => {
            if(response.ok) {
                return response.ok
            }
            
            throw new Error("networ Backend")
        })
        .then(() => {
            const url = `../html/notes.html?id=${showID}&name=${nameTopic}`;
            
            window.location.href = url
        })
        .catch(error => {
            console.log("hubo problema con el fetch", error)
        })
    }
    
