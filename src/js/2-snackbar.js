import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { Result } from "postcss";

const formEl = document.querySelector(".form");

const onSubmit = (e) => {
    e.preventDefault();
    let msInputValue = Number(formEl.elements["delay"].value);
    console.log(msInputValue);
    let stateValue = formEl.elements["state"].value;
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
    if (stateValue === "fulfilled") {
                resolve(msInputValue)
            } else {
                reject(msInputValue)
            }
  }, msInputValue);
    });
    console.log(promise);
    promise
        .then((value) => {console.log(
                iziToast.success({
                    title: '✅',
                    message: `Fulfilled promise in ${value}ms`,
                position:"topRight"}))
        })
        .catch((error) => {console.log(
                iziToast.error({
                    title: '❌',
                    message: `Rejected promise in ${error}ms`,
                position:"topRight"}))
        })
   
}
formEl.addEventListener('submit',onSubmit)