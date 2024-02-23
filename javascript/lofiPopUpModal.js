const openModalBoton = document.getElementById("open-modal")
const modalWindowOverlay = document.getElementById("modal-overlay")
const botonCerrarModal = document.getElementById("boton-cerrar")

const showModalWindow = () => {
    modalWindowOverlay.style.display = 'flex'
}

const hideModalWindow = () => {
    modalWindowOverlay.style.display = 'none'
}

openModalBoton.addEventListener("click", showModalWindow)
botonCerrarModal.addEventListener("click", hideModalWindow)

const hideModalWindowOnBlur = (evento) => {
   if(evento.target == evento.currentTarget) {
       hideModalWindow()
   }
}

modalWindowOverlay.addEventListener("click", hideModalWindowOnBlur)