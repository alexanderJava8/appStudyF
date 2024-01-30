//empezar cronometro
let interval
let tiempoDetenido = 0;
let tiempoInicio
let tiempoTranscurrido

const iniciarCronometro = () => {
     tiempoInicio = new Date().getTime()
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000)
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
//hasta aqui el codigo para empezar el cronometro

//codigo detener el cronometro al presionar el boton detener
const detenerCronometro = () => {
    clearInterval(interval)
    tiempoDetenido = tiempoTranscurrido;
}

const botondetenerCronometro = document.getElementById("detener")
botondetenerCronometro.addEventListener("click", detenerCronometro)
//finaliza codigo detener cronometro

//codigo reiniciar cronometro
const reiniciarCronometro = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime() - tiempoDetenido;
    interval = setInterval(() => actualizarCronometro(tiempoInicio), 1000);
}

const botonReiniciar = document.getElementById("reiniciar");
botonReiniciar.addEventListener("click", reiniciarCronometro);
//finaliza codigo reiniciar
const reiniciaCero = () => {
    clearInterval(interval)
    tiempoInicio = new Date().getTime()
    iniciarCronometro()
}

const botonCeroNuevamente = document.getElementById("volver-a-empezar")
botonCeroNuevamente.addEventListener("click", reiniciaCero)

