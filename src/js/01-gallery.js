// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';


const galleryEl = document.querySelector(".gallery");
const galleryMarkup = createGallery(galleryItems);
galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);

new SimpleLightbox('.gallery__item', {
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
}); 

function createGallery(galleryArray) {
    return galleryArray.map(({ preview, original, description }) => {
        return `<a class="gallery__item" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" /></a>`
    }).join("");
}
