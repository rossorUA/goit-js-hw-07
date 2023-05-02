import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>`
  )
  .join(' ');

gallery.insertAdjacentHTML('beforeend', markup);

gallery.addEventListener('click', selectImg);

function selectImg(event) {
  event.preventDefault();
  const bigImg = event.target.dataset.source;

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`<img src=${bigImg}>`, {
    onShow: instance => {
      window.addEventListener('keydown', instanceCloseByEscape);
      function instanceCloseByEscape(evt) {
        if (evt.code === 'Escape') {
          instance.close(() => window.removeEventListener('keydown', instanceCloseByEscape));
        }
      }
    },
  });
  instance.show();
}
