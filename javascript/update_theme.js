const actualizarTema = () => {
    const parametrosId = new URLSearchParams(window.location.search)
    const id = parametrosId.get('id')


    const nombreTema = document.getElementById('materia').value;
    const backendUrl = 'http://localhost:8080/api/v1/topics';

    const data = {
        id: id,
        name: nombreTema
    }

    fetch(backendUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response => {
        if(response.ok) {
            return response.ok;
        }

        throw new Error("network del backend")
    })
    .then(() => {
        window.location.href = 'topics_cards.html'
    })
    .catch(error => {
        console.log("hubo problema con el fetch", error)
    })
}

const botonActualizar = document.getElementById('boton');
botonActualizar.addEventListener('click', actualizarTema);