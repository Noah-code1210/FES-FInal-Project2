function showLoader() {
    document.getElementById("loader").style.display = "block"
}
function hideLoader() {
    document.getElementById("loader").style.display = "none"
}

function hideCard() {
    document.getElementById("pokemon").style.display = "none"
}

function showCard() {
    document.getElementById("pokemon").style.display = "block"
}

showLoader() 
setTimeout(hideLoader, 6700)

hideCard()
setTimeout(showCard, 6700)
