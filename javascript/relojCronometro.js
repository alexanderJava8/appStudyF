//empezar cronometro
let interval
let tiempoDetenido = 0;
let tiempoInicio
let tiempoTranscurrido

const iniciarCronometro = () => {
    if(document.getElementById("iniciar").textContent == "Iniciar" && document.getElementById("tiempo-cronometro").textContent == "00:00:00") {
        tiempoInicio = new Date().getTime()
        interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000)
        document.getElementById("iniciar").textContent = "Parar"
    } else if (document.getElementById("tiempo-cronometro").textContent != "00:00:00" && document.getElementById("iniciar").textContent == "Parar") {
        document.getElementById("iniciar").textContent = "Iniciar"
         detenerCronometro()
    } else {
        vuelveACronometro()
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

//codigo detener el cronometro al presionar el boton detener
const detenerCronometro = () => {
    clearInterval(interval)
    tiempoDetenido = tiempoTranscurrido;
}

//este es para volver activo nuevamente el cronometro
const vuelveACronometro = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime() - tiempoDetenido;
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000);
    document.getElementById("iniciar").textContent = "Parar"
}

const reiniciaCero = () => {
    clearInterval(interval)
    document.getElementById("tiempo-cronometro").innerText = "00:00:00"
}

const botonCeroNuevamente = document.getElementById("reiniciar")
botonCeroNuevamente.addEventListener("click", () => reiniciaCero())

