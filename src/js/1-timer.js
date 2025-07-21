
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
    if (value < 10) {
        return String(value).padStart(2, "0");
    } else {
        return value;
    }
}

const buttonEl = document.querySelector("button");
buttonEl.disabled = true; 
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (Date.now() >= selectedDates[0]) {
            iziToast.error({
             title: 'Error',
                message: 'Please choose a date in the future',
            position:"topRight"});
            buttonEl.disabled = true;
        } else {
            userSelectedDate = selectedDates[0];
            buttonEl.disabled = false;
        }

  },
};


const calendarEl = flatpickr("#datetime-picker", options)


const onClick = e => {
    buttonEl.disabled = true;
    const intervalId = setInterval(() => {
    let timeRemaining = userSelectedDate.getTime() - Date.now();
    let { days, hours, minutes, seconds } = convertMs(timeRemaining);
    if (timeRemaining <= 0) {
        clearInterval(intervalId);
    } else {
      daysEl.innerText = addLeadingZero(days);
      hoursEl.innerText = addLeadingZero(hours);
      minutesEl.innerText = addLeadingZero(minutes);
      secondsEl.innerText = addLeadingZero(seconds);
    }
    }, 1000);

}
buttonEl.addEventListener('click', onClick);