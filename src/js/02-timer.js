import flatpickr from "flatpickr";
import Notiflix from 'notiflix';


const startBtn = document.querySelector("button[data-start]")
const dateEl = document.querySelector("#datetime-picker")
const daysEl = document.querySelector("[data-days]")
const hoursEl = document.querySelector("[data-hours]")
const minutesEl = document.querySelector("[data-minutes]")
const secondsEl = document.querySelector("[data-seconds]")
startBtn.setAttribute("disabled", true)
let chosenDate
let intervalId

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const currentTime = new Date()
      chosenDate = selectedDates[0];
      if(currentTime >= chosenDate){
        startBtn.setAttribute("disabled", true)
        Notiflix.Notify.failure("Please choose a date in the future");
      }
      else{
        startBtn.removeAttribute("disabled")
      }
    },
  };

flatpickr(dateEl, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day) % 100;
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value){
    return ("" + value).padStart(2, "0")
}

function updateTimer(){
    const dateDif = chosenDate - new Date()
    if(dateDif < 1000){
        clearInterval(intervalId)
        Notiflix.Notify.success('Час вийшов');
        startBtn.toggleAttribute("disabled")
    }
    const { days, hours, minutes, seconds } = convertMs(dateDif)
    daysEl.textContent = addLeadingZero(days)
    hoursEl.textContent =  addLeadingZero(hours)
    minutesEl.textContent =  addLeadingZero(minutes)
    secondsEl.textContent =  addLeadingZero(seconds)
}

startBtn.addEventListener("click", () => {
    startBtn.toggleAttribute("disabled")
    intervalId = setInterval(updateTimer, 1000)
})