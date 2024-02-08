//empezar cronometro
let interval
let tiempoDetenido = 0
let tiempoInicio
let tiempoTranscurrido = 0

const cronometroIniciar = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime()
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000)
    document.getElementById("iniciar").textContent = "Pausar"
}

const detenerCronometro = () => {
    clearInterval(interval)
    document.getElementById("iniciar").textContent = "Iniciar"
    tiempoDetenido = tiempoTranscurrido
    console.log("tiempo detenido:", tiempoDetenido)
    localStorage.setItem("tiempoDetenido", tiempoDetenido)
}

const reiniciarCronometro = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime() - tiempoDetenido;
    localStorage.setItem("tiempoInicio", tiempoInicio)
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000);
    document.getElementById("iniciar").textContent = "Pausar"
}

const reiniciaCero = () => {
    clearInterval(interval)
    document.getElementById("tiempo-cronometro").innerText = "00:00:00"
    localStorage.removeItem("tiempoDetenido")
    localStorage.removeItem("tiempoInicio")
    localStorage.removeItem("tiempoTranscurrido")
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
        reiniciarCronometro()
    }
}

const actualizarCronometro = (tiempoInicio) => {
    const tiempoActual = new Date().getTime()
    tiempoTranscurrido = tiempoActual- tiempoInicio
    localStorage.setItem("tiempoTranscurrido", tiempoTranscurrido)

    const segundos = Math.floor(tiempoTranscurrido / 1000)
    const minutos = Math.floor(segundos / 60)
    const horas = Math.floor(minutos / 24)

    const segundosMostrar = segundos % 60;
    const minutosMostrar = minutos % 60;
    const horasMostrar = horas % 24;

    console.log("segundos", segundosMostrar)
    console.log("minutos", minutosMostrar)
    console.log("horas", horasMostrar)
    
    const colocarCeroIzquierda = (number) => {
        return number < 10 ? '0' + number : number;
    }

    const tiempoFormateado = colocarCeroIzquierda(horasMostrar) + ':' 
        + colocarCeroIzquierda(minutosMostrar) + ':' 
        + colocarCeroIzquierda(segundosMostrar);

     document.getElementById("tiempo-cronometro").innerText = tiempoFormateado
     document.querySelector("title").innerText = `${tiempoFormateado} - cronómetro online`
}

const botonIniciar = document.getElementById("iniciar")
botonIniciar.addEventListener("click", iniciarCronometro)

window.addEventListener("load", () => {
    tiempoDetenido = localStorage.getItem("tiempoTranscurrido") // vuelve con este valor de aqui

    clearInterval(interval)
    tiempoInicio = new Date().getTime() - tiempoDetenido
    localStorage.setItem("tiempoInicio", tiempoInicio)
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000)
    document.getElementById("iniciar").textContent = "Pausar"
})




