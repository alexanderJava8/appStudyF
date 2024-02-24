const mathLinkText = document.querySelector('#math-card a').innerText;

const backendUrl = 'http://localhost:8080/api/v1/topics';

const dataToSend = {
    name: mathLinkText
}

fetch(backendUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataToSend)
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
            console.error("hubo un problema con la peticion fetch", error)
        })