
import throttle from "lodash.throttle";

const Ref = {
    form: document.querySelector(".feedback-form"),
    textarea: document.querySelector(".feedback-form textarea"),
    inputEmail: document.querySelector(".feedback-form input")
}

Ref.form.addEventListener("submit", onFormSubmit);
Ref.form.addEventListener('input', throttle(onFeedbackFormInput, 500));

// Ключ для сховища (константне значення між різними запусками скрипту, між різними функціями)
const STORAGE_KEY = "feedback-form-state";
// console.log("STORAGE_KEY", STORAGE_KEY);

// для збереження введенних у форму даних
let formData = {};
// console.log("formData1", formData);

// Записуємо збережені дані у поля, якщо вони такі дані є
populateForm();


function populateForm() {
    // Обов'язкова перевірка на наявність збереженого тексту (якщо його не має, то const savedMessage поверне null- цього потрібно уникнути)
    const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsedData) {
        try {
            // Якщо буде лише одне поле відредаговане, після перезагрузки буде undefined в другому (так як для другого воно нічого не знаходить), тому окремо перевіряємо кожне поле і робимо його апдейт.
            parsedData.email ? Ref.inputEmail.value = parsedData.email : "";
            parsedData.message ? Ref.textarea.value = parsedData.message : "";
            // відразу записуємо взяті зі сховища значення в formData
            formData.email = Ref.inputEmail.value;
            formData.message = Ref.textarea.value;

            // console.log("parsedData-email", parsedData.email);
            // console.log("parsedData.message", parsedData.message);
            // console.log("parsedData", parsedData);
            // console.log("formData2", formData);   
        }
        catch (error) {
            console.log(error.name); // "SyntaxError"
            console.log(error.message); // Unexpected token W in JSON at position 0
        }
    }    
}

function onFeedbackFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log("formData", formData);
}

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    // Видаляємо дані зі сховища при сабміті, інакше після сабміту збережений текст знову завантажиться у поле і чистимо formData
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
    // console.log("formData sub", formData);
};

// dsfgdr@fgrf.com

