let interval
let tiempoDetenido = 0
let tiempoInicio
let tiempoTranscurrido = 0
let segundosTotales

const pomodoroIniciar = () => {
    clearInterval(interval)
    const tiempoPomodoro = document.getElementById("tiempo-cronometro")
    const tiempoTexto = tiempoPomodoro.textContent
    const partesTiempo = tiempoTexto.split(":")

    const horas = parseInt(partesTiempo[0]);
    const minutos = parseInt(partesTiempo[1]);
    const segundos = parseInt(partesTiempo[2]);

    segundosTotales = (horas * 3600) + (minutos * 60) + segundos

    interval = setInterval(() => actualizarPomodoro(segundosTotales), 1000)
    localStorage.setItem("estadoBotonPomodoro", "Pausar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBotonPomodoro")
}

const detenerPomodoro = () => {
    clearInterval(interval)
    console.log("estoy en metodo detener pomodoro con un segundos:", segundosTotales)
    localStorage.setItem("estadoBotonPomodoro", "Iniciar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBotonPomodoro")
    tiempoDetenido = tiempoTranscurrido
    localStorage.setItem("tiempoDetenidoPomodoro", tiempoDetenido)
}

const reiniciarPomodoro = () => {
    clearInterval(interval)
    console.log("estoy en metodo reiniciarpomodoro")
    console.log("segundos totales",segundosTotales)
    localStorage.setItem("tiempoInicioPomodoro", tiempoInicio)
    interval = setInterval(() => actualizarPomodoro(segundosTotales), 1000)
    console.log("segundots totales", segundosTotales)
    localStorage.setItem("estadoBotonPomodoro", "Pausar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBotonPomodoro")
}   

const formatearFecha = (tiempoTranscurridoEnSegundos) => {
    const segundos = Math.floor(tiempoTranscurridoEnSegundos)
    const minutos = Math.floor(segundos / 60)
    const horas = Math.floor(minutos / 60)

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

const actualizarPomodoro = (tiempoInicio) => { 
    segundosTotales--

    if(segundosTotales <= 0) {
        clearInterval(interval)
    }

    console.log("estoy en metodo actualizarpomodor", tiempoInicio)
    tiempoInicio = tiempoInicio - 1
    tiempoTranscurrido = tiempoInicio 
    localStorage.setItem("tiempoTranscurridoPomodoro", tiempoTranscurrido)
    const tiempoFormateado = formatearFecha(tiempoTranscurrido)

    document.getElementById("tiempo-cronometro").innerText = tiempoFormateado
    document.querySelector("title").innerText = `${tiempoFormateado} - pomodoro online`
}

const iniciarPomodoro = () => {
    const botonIniciar = document.getElementById("iniciar")
    const tiempoCronometro = document.getElementById("tiempo-cronometro")

    const inicioPomodoro = botonIniciar.textContent == "Iniciar" && tiempoCronometro.textContent == "00:00:10"
    const descansoPomodoro = botonIniciar.textContent == "Iniciar" && tiempoCronometro.textContent == "00:00:05"

    if(inicioPomodoro || descansoPomodoro) {
        pomodoroIniciar()
    } else if (tiempoCronometro.textContent != "00:00:00" && botonIniciar.textContent == "Pausar") {
        detenerPomodoro()
    } else {
        reiniciarPomodoro()
    }
}

window.addEventListener("load", () => {
    localStorage.removeItem("tiempoDetenidoPomodoro")
    localStorage.removeItem("tiempoInicioPomodoro")
    localStorage.removeItem("tiempoTranscurridoPomodoro")
})

//logica pomodoro
const contenedorBotonesPomodoro = document.getElementById("botones-pomodoro")
const contenedor = document.getElementById("contenedor")

contenedorBotonesPomodoro.addEventListener("click", (evento) => {
    const elemento = evento.target;
    elemento.id === "boton-pomodoro" ? mostrarPomodor() : mostrarDescanso()
})

const mostrarPomodor = () => {
    contenedor.innerHTML = `
    <p id="tiempo-cronometro">00:00:10</p>
    <div class="botons-container">
        <button class="start-btn btn" id="iniciar">Iniciar</button>
    </div>`
    botonesParaIniciar()
}

const mostrarDescanso = () => {
    contenedor.innerHTML = `
    <p id="tiempo-cronometro">00:00:05</p>
    <div class="botons-container">
        <button class="start-btn btn" id="iniciar">Iniciar</button>
    </div>`
    botonesParaIniciar()
}

const botonesParaIniciar = () => {
    const botonIniciar = document.getElementById("iniciar")
    botonIniciar.addEventListener("click", iniciarPomodoro)
    console.log(botonIniciar)
}
