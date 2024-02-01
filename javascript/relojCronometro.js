//empezar cronometro
let interval
let tiempoDetenido = 0;
let tiempoInicio
let tiempoTranscurrido

const cronometroIniciar = () => {
    tiempoInicio = new Date().getTime()
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000)
    document.getElementById("iniciar").textContent = "Pausar"
}

const detenerCronometro = () => {
    document.getElementById("iniciar").textContent = "Iniciar"
    clearInterval(interval)
    tiempoDetenido = tiempoTranscurrido;
}

const VolverCronometroCero = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime() - tiempoDetenido;
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000);
    document.getElementById("iniciar").textContent = "Pausar"
}

const reiniciaCero = () => {
    clearInterval(interval)
    document.getElementById("tiempo-cronometro").innerText = "00:00:00"
}

const botonCeroNuevamente = document.getElementById("reiniciar")
botonCeroNuevamente.addEventListener("click", () => reiniciaCero())

const iniciarCronometro = () => {
    const botonIniciar = document.getElementById("iniciar")
    const tiempoCronometro = document.getElementById("tiempo-cronometro")

    if(botonIniciar.textContent == "Iniciar" && tiempoCronometro.textContent == "00:00:00") {
        cronometroIniciar()
    } else if (tiempoCronometro.textContent != "00:00:00" && botonIniciar.textContent == "Pausar") {
        detenerCronometro()
    } else {
        VolverCronometroCero()
    }
}

const actualizarCronometro = (tiempoInicio) => {
    const tiempoActual = new Date().getTime()
    tiempoTranscurrido = tiempoActual- tiempoInicio

    const segundos = Math.floor(tiempoTranscurrido / 1000)
    const minutos = Math.floor(segundos / 60)
    const horas = Math.floor(minutos / 24)

    const segundosMostrar = segundos % 60;
    const minutosMostrar = minutos % 60;
    const horasMostrar = horas % 24;

    const colocarCeroIzquierda = (number) => {
        return number < 10 ? '0' + number : number;
    }

    const tiempoFormateado = colocarCeroIzquierda(horasMostrar) + ':' 
        + colocarCeroIzquierda(minutosMostrar) + ':' 
        + colocarCeroIzquierda(segundosMostrar);

        document.getElementById("tiempo-cronometro").innerText = tiempoFormateado
}

const botonIniciar = document.getElementById("iniciar")
botonIniciar.addEventListener("click", iniciarCronometro)





