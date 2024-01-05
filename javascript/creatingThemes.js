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

        const anchor = document.createElement('a')
        anchor.classList.add('theme-link')
        anchor.href = 'notes.html'

        const span = document.createElement('span')
        span.classList.add('theme-text')
        span.textContent = item.name

        const contenedorBotones = document.createElement('div')
        contenedorBotones.classList.add('contenedorBotones');

        const boton = document.createElement('a')
        boton.classList.add('botones')
        boton.textContent = 'editar'
        boton.addEventListener('click', actualizar = (e) => {
            const id = contenedor.getAttribute('numeroElemento')
            console.log(`aqui toy en: ${id}`)
            window.location.href = `update-topic.html?id=${id}`
        });

        const botonEliminar = document.createElement('a')
        botonEliminar.classList.add('botones', 'botonEliminar')
        botonEliminar.textContent = 'eliminar'

        section.appendChild(contenedor)
        contenedor.appendChild(card)
        contenedor.appendChild(contenedorBotones)
        contenedorBotones.appendChild(boton)
        contenedorBotones.appendChild(botonEliminar)
        anchor.appendChild(span)
        cardTitle.appendChild(anchor)
        card.appendChild(cardTitle)
    })
}

obtenerDatosBackend()

