const obtenerDatos = () => {
    const backendUrl = 'http://localhost:8080/api/v1/topics';

    fetch(backendUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error("network response was not ok")
        })
        .then(data => {
            mostrarTemas(data);
        })
        .catch(error => {
            console.error("hubo un problema con la solicitud")
        })
}

const mostrarTemas = (data) => {
    const section = document.createElement("section")

}