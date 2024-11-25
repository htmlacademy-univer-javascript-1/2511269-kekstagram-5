import { renderPictures } from './picture.js';
import { openPictureModal } from './pictureModal.js';

const container = document.querySelector('.pictures');

const handlePictureClick = (e, pictures) => {
  const picture = e.target.closest('[data-picture-id]');

  if (!picture) {
    return;
  }

  e.preventDefault();
  const photo = pictures.find((item) => item.id === parseInt(picture.dataset.pictureId));

  if (photo) {
    openPictureModal(photo);
  }
};

const renderGallery = (pictures) => {
  renderPictures(pictures, container);
  container.addEventListener('click', (e) => handlePictureClick(e, pictures));
};

export { renderGallery };