const botonEliminar = document.getElementById("btn-eliminar")
const pantallaEliminar = document.getElementById("modal-overlay-deleted")

botonEliminar.addEventListener("click", () => {
    pantallaEliminar.style.display = "flex"
})