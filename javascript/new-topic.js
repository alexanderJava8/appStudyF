const enviarTema = () => {

    const materia = document.getElementById("materia").value;
    const backendUrl = 'http://localhost:8080/api/v1/topics';

    const dataSend = {
        name: materia
    }

    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSend)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("network del backend")
        })
        .then(data => {
            console.log("respuesta backend", data)
        })
        .catch(error => {
            console.error("hubo problema con el fetch", error)
        })
}

const bot = document.getElementById("boton")

bot.addEventListener('click', enviarTema)