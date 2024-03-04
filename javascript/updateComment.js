const obtenerId = () => {
    const idArticle = document.getElementById('container');
    idArticle.addEventListener('click', event => {
        const element = event.target.closest("ARTICLE");
        const parentNodeId = element.parentNode.id

        if(element) {
            const encodedId = encodeURIComponent(parentNodeId)
            const newPage = `noteu.html?id=${encodedId}`
            window.location.href= newPage
        }
    })
}

obtenerId()