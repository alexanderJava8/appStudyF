const obtenerDatosBackend = () => {
    const urlBackend = 'http://localhost:8080/api/v1/topics';

    fetch(urlBackend, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error("Network response was not ok.")
        })
        .then(data => {
            mostrarDatosEnFrontend(data)
            console.log(data)
        })
        .catch(error => {
            console.error("hubo un problema con la solicitud fetch:", error);
        });
}

const mostrarDatosEnFrontend = (data) => {
    const section = document.getElementById("section");

    data.forEach(item => {
        const contenedor = document.createElement('div')
        contenedor.classList.add('contenedor')
        contenedor.setAttribute('numeroElemento', item.id)
        
        const card = document.createElement('div')
        card.classList.add('card')

        const cardTitle = document.createElement('div')
        cardTitle.classList.add('card-title')
        cardTitle.innerText = item.name

        cardTitle.addEventListener('click', () => {
            const id = contenedor.getAttribute('numeroElemento')
            const nameTheme = cardTitle.textContent;
            console.log(`aqui es:${id} ${nameTheme}`)

            window.location.href = `notes.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(nameTheme)}`
        });

        const contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('contenedorBotones');

        const boton = document.createElement('a')
        boton.classList.add('botones')
        boton.textContent = 'editar'
        boton.addEventListener('click', actualizar = () => {
            const id = contenedor.getAttribute('numeroElemento')
            console.log(`aqui toy en: ${id}`)
            window.location.href = `update-topic.html?id=${id}`
        });

        const botonEliminar = document.createElement('a')
        botonEliminar.classList.add('botones', 'botonEliminar')
        botonEliminar.textContent = 'eliminar'
        botonEliminar.addEventListener('click', () => {
            const id = contenedor.getAttribute('numeroElemento')
            eliminarTema(id)           
        })
        
        section.appendChild(contenedor)
        contenedor.appendChild(card)
        contenedor.appendChild(contenedorBotones)
        contenedorBotones.appendChild(boton)
        contenedorBotones.appendChild(botonEliminar)
        card.appendChild(cardTitle)
    })
}

obtenerDatosBackend()

const eliminarTema = (id) => {
    const backendURL = `http://localhost:8080/api/v1/topics/${id}`

    fetch(backendURL, {
        method: 'DELETE'
    })
    .then(response => {
        if(response.ok) {
            return response.ok
        }

        throw new Error("network del backend")
    })
    .then(() => { 
        window.location.href = '../html/topics_cards.html'
    })
    .catch(error => {
        console.log("hubo problema con el fetch", error)
    })
}
