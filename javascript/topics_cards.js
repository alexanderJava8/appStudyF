const mathLinkText = document.querySelector('#math-card a').innerText;

const backendUrl = 'http://localhost:8080/api/v1/topics';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiIiwiaWF0IjoxNzAzMjA5Nzk1LCJleHAiOjE3MDMyMTEyMzV9.fV2qQs7Ec3pn_rmo1VywjxnUZl3dGkpt20n_lvMgzSI'

const dataToSend = {
    name: mathLinkText
}

fetch(backendUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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