
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
const formData = {};

// Записуємо збережені дані у поля, якщо вони такі дані є
populateForm();

function populateForm() {
    // Обов'язкова перевірка на наявність збереженого тексту (якщо його не має, то const savedMessage поверне null- цього потрібно уникнути)
    const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsedData) {
        try {
            // Записується збережена інформація зі сховища і відразу її зберігаємо у formData. Без збереження у formData - в поле, де не відбувається івент приходить underfined
            Ref.textarea.value = parsedData.message;
            formData.message = parsedData.message;

            Ref.inputEmail.value = parsedData.email;
            formData.email = parsedData.message;
            // console.log(parsedData.message);
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
    // console.log("formData", formData);
}

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    console.log("formData", formData);
    // Видаляємо дані зі сховища при сабміті, інакше після сабміту збережений текст знову завантажиться у поле
    localStorage.removeItem(STORAGE_KEY);
};

// dsfgdr@fgrf.com

