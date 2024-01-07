const parametros = new URLSearchParams(window.location.search)
const id = parametros.get('id')
const nameTheme = parametros.get('name')

const title = document.querySelector('.title')
title.textContent = nameTheme