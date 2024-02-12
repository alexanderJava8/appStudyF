let interval
let tiempoDetenido = 0
let tiempoInicio
let tiempoTranscurrido = 0

const cronometroIniciar = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime()
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000)
    localStorage.setItem("estadoBoton", "Pausar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBoton")
}

const detenerCronometro = () => {
    clearInterval(interval)
    localStorage.setItem("estadoBoton", "Iniciar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBoton")
    tiempoDetenido = tiempoTranscurrido
    localStorage.setItem("tiempoDetenido", tiempoDetenido)
}

const reiniciarCronometro = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime() - tiempoDetenido;
    localStorage.setItem("tiempoInicio", tiempoInicio)
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000);

    localStorage.setItem("estadoBoton", "Pausar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBoton")
}

const reiniciarAcero = () => {
    clearInterval(interval)
    document.getElementById("tiempo-cronometro").innerText = "00:00:00"
    localStorage.removeItem("tiempoDetenido")
    localStorage.removeItem("tiempoInicio")
    localStorage.removeItem("tiempoTranscurrido")
    document.querySelector("title").innerText = `00:00:00 - cronómetro online`

    localStorage.setItem("estadoBoton", "Iniciar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBoton")
}

const botonCeroNuevamente = document.getElementById("reiniciar")
botonCeroNuevamente.addEventListener("click", () => reiniciarAcero())

const iniciarCronometro = () => {
    const botonIniciar = document.getElementById("iniciar")
    const tiempoCronometro = document.getElementById("tiempo-cronometro")

    if(botonIniciar.textContent == "Iniciar" && tiempoCronometro.textContent == "00:00:00") {
        cronometroIniciar()
    } else if (tiempoCronometro.textContent != "00:00:00" && botonIniciar.textContent == "Pausar") {
        detenerCronometro()
    } else {
        reiniciarCronometro()
    }
}

const formatearFecha = (tiempoTranscurrido) => {
    const segundos = Math.floor(tiempoTranscurrido / 1000)
    const minutos = Math.floor(segundos / 60)
    const horas = Math.floor(minutos / 24)

    const segundosMostrar = segundos % 60;
    const minutosMostrar = minutos % 60;
    const horasMostrar = horas % 24;
    
    const colocarCeroIzquierda = (number) => {
        return number < 10 ? '0' + number : number;
    }

    return colocarCeroIzquierda(horasMostrar) + ':' 
            + colocarCeroIzquierda(minutosMostrar) + ':' 
            + colocarCeroIzquierda(segundosMostrar);
}    

const actualizarCronometro = (tiempoInicio) => {
    const tiempoActual = new Date().getTime()
    tiempoTranscurrido = tiempoActual - tiempoInicio
    localStorage.setItem("tiempoTranscurrido", tiempoTranscurrido)

     const tiempoFormateado = formatearFecha(tiempoTranscurrido)

     document.getElementById("tiempo-cronometro").innerText = tiempoFormateado
     document.querySelector("title").innerText = `${tiempoFormateado} - cronómetro online`
}

const botonIniciar = document.getElementById("iniciar")
botonIniciar.addEventListener("click", iniciarCronometro)

window.addEventListener("load", () => {
    tiempoDetenido = localStorage.getItem("tiempoTranscurrido") // vuelve con este valor de aqui

    tiempoInicio = new Date().getTime() - tiempoDetenido
    localStorage.setItem("tiempoInicio", tiempoInicio)
    
    if(localStorage.getItem("estadoBoton") === "Pausar") {
            clearInterval(interval)
            document.getElementById("iniciar").textContent = "Pausar"
            interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000)
     }

    if(localStorage.getItem("estadoBoton") === "Iniciar") {
        document.getElementById("tiempo-cronometro").innerText = formatearFecha(tiempoDetenido)
        document.querySelector("title").innerText = `${formatearFecha(tiempoDetenido)} - cronómetro online`
    } 
})




