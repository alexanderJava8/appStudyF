let interval
let tiempoDetenido = 0
let tiempoInicio
let tiempoTranscurrido = 0


const pomodoroIniciar = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime()
    interval = setInterval(() => actualizarPomodoro(tiempoInicio), 1000)
    localStorage.setItem("estadoBotonPomodoro", "Pausar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBotonPomodoro")
}

const detenerPomodoro = () => {
    clearInterval(interval)
    localStorage.setItem("estadoBotonPomodoro", "Iniciar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBotonPomodoro")
    tiempoDetenido = tiempoTranscurrido
    localStorage.setItem("tiempoDetenidoPomodoro", tiempoDetenido)
}

const reiniciarPomodoro = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime() -tiempoDetenido
    localStorage.setItem("tiempoInicioPomodoro", tiempoInicio)
    interval = setInterval(() => actualizarPomodoro(tiempoInicio), 1000)

    localStorage.setItem("estadoBotonPomodoro", "Pausar")
    document.getElementById("iniciar").textContent = localStorage.getItem("estadoBotonPomodoro")
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

const actualizarPomodoro = (tiempoInicio) => {
    const tiempoActual = new Date().getTime()
    tiempoTranscurrido = tiempoActual - tiempoInicio
    localStorage.setItem("tiempoTranscurridoPomodoro", tiempoTranscurrido)
    const tiempoFormateado = formatearFecha(tiempoTranscurrido)

     document.getElementById("tiempo-cronometro").innerText = tiempoFormateado
     document.querySelector("title").innerText = `${tiempoFormateado} - cronómetro online`
}

const iniciarPomodoro = () => {
    const botonIniciar = document.getElementById("iniciar")
    const tiempoCronometro = document.getElementById("tiempo-cronometro")

    if(botonIniciar.textContent == "Iniciar" && tiempoCronometro.textContent == "00:25:00") {
        pomodoroIniciar()
    } else if (tiempoCronometro.textContent != "00:00:00" && botonIniciar.textContent == "Pausar") {
        detenerPomodoro()
    } else {
        reiniciarPomodoro()
    }
}

const botonIniciar = document.getElementById("iniciar")
botonIniciar.addEventListener("click", iniciarPomodoro)

