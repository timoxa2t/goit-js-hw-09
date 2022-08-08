
const startBtn = document.querySelector("button[data-start]")
const stopBtn = document.querySelector("button[data-stop]")
const body = document.querySelector("body")
stopBtn.toggleAttribute("disabled")

let timerId

function switchDisabledButtons(){
    startBtn.toggleAttribute("disabled")
    stopBtn.toggleAttribute("disabled")
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBackground(){
    body.style.background = getRandomHexColor()
}

startBtn.addEventListener("click", (event) => {
    setBackground()
    timerId = setInterval(setBackground, 1000)
    switchDisabledButtons()
})

stopBtn.addEventListener("click", (event) => {
    clearInterval(timerId)
    timerId = null
    switchDisabledButtons()
})


