const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({comments, description, likes, url, id}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.dataset.pictureId = id;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  return picture;
};

const renderPictures = (pictures, container) => {
  for (const element of container.querySelectorAll('.picture')) {
    element.remove()
  }

  const fragment = document.createDocumentFragment();
  
  for (const picture of pictures) {
    const newPicture = createPicture(picture);
    fragment.append(newPicture);
  }
  container.append(fragment);
};

export {renderPictures};