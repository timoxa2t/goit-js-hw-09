import Notiflix from 'notiflix';


const delayEl = document.querySelector(`input[name="delay"]`)
const stepEl = document.querySelector(`input[name="step"]`)
const amountEl = document.querySelector(`input[name="amount"]`)
const submitBtn = document.querySelector(`button[type="submit"]`)

submitBtn.addEventListener("click", (event) => {
  event.preventDefault()
    const amount = parseInt(amountEl.value)
    const step = parseInt(stepEl.value)
    const basicDelay = parseInt(delayEl.value)

    for(let pos = 1; pos <= amount; pos++){
     
      createPromise(pos, basicDelay + step * (pos - 1))
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => resolve({position, delay}), delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject({position, delay}), delay);
    });
  }
}
