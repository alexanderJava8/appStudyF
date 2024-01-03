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

        const boton = document.createElement('a')
        boton.classList.add('editar')

        anchor.appendChild(span)
        cardTitle.appendChild(anchor)
        card.appendChild(cardTitle)
        section.appendChild(card)

    })
}

obtenerDatosBackend()