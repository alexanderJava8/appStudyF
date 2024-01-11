const parametross = new URLSearchParams(window.location.search)
const ids = parametross.get('id')
const nameTopics = parametross.get('name')


const boton = document.getElementById('new-note')
boton.addEventListener('click', () => {
   const newUrl = "note.html?id="+ encodeURIComponent(ids) + "&name=" + encodeURIComponent(nameTopics)
    window.location.href = newUrl
})

