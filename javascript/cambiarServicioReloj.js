const contenedorCronometro = document.getElementById("cronometro")
contenedorCronometro.addEventListener("click", (evento) => {
    console.log(evento.target.parentNode)

})

const contenedorPomodoro = document.getElementById("pomodoro")
contenedorPomodoro.addEventListener("click", (evento) => {
    console.log(evento.target.parentNode)
    
})

const contenedorAlarma = document.getElementById("alarma")
contenedorAlarma.addEventListener("click", (evento) => {
    console.log(evento.target.parentNode)
})

