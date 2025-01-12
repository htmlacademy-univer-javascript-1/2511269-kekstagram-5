const COMMENTS_BATCH_SIZE = 5;
const pageBody = document.querySelector('body');
const pictureModal = pageBody.querySelector('.big-picture');
const loadMoreCommentsButton = pictureModal.querySelector('.comments-loader');
const closeButton = pictureModal.querySelector('.big-picture__cancel');
const totalCommentCount = pictureModal.querySelector('.comments-count');
const displayedCommentCount = pictureModal.querySelector('.comments-shown-count');
const commentContainer = pictureModal.querySelector('.social__comments');
const commentTemplate = commentContainer.querySelector('.social__comment');

let visibleComments = 0;
let allComments = [];

const generateCommentElement = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const onCommentsDisplay = () => {
  visibleComments += COMMENTS_BATCH_SIZE;

  if (visibleComments >= allComments.length) {
    loadMoreCommentsButton.classList.add('hidden');
    visibleComments = allComments.length;
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  allComments.slice(0, visibleComments).forEach((commentData) => {
    const comment = generateCommentElement(commentData);
    fragment.append(comment);
  });

  commentContainer.innerHTML = '';
  commentContainer.append(fragment);
  totalCommentCount.textContent = allComments.length;
  displayedCommentCount.textContent = visibleComments;
};

loadMoreCommentsButton.addEventListener('click', onCommentsDisplay);

const renderPictureInfo = ({ url, likes, description }) => {
  pictureModal.querySelector('.likes-count').textContent = likes;
  pictureModal.querySelector('.social__caption').textContent = description;
  const img = pictureModal.querySelector('.big-picture__img img');
  img.src = url;
  img.alt = description;
};

const onDocumentKeydown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    onPictureModalClose();
  }
};

function onPictureModalClose() {
  visibleComments = 0;
  pictureModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openPictureModal = (data) => {
  allComments = data.comments;
  document.addEventListener('keydown', onDocumentKeydown);
  pageBody.classList.add('modal-open');
  loadMoreCommentsButton.classList.add('hidden');
  pictureModal.classList.remove('hidden');
  renderPictureInfo(data);

  if (allComments.length > 0) {
    onCommentsDisplay();
  }
};

closeButton.addEventListener('click', onPictureModalClose);

export { openPictureModal };
