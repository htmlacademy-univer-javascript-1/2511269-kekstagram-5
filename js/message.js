const documentBody = document.querySelector('body');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const onBodyClick = (e) => {
  if (
    e.target.closest('.success__inner') ||
    e.target.closest('.error__inner')
  ) {
    return;
  }

  onMessageHide();
};

const onDocumentKeydown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    onMessageHide();
  }
};

function onMessageHide() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  documentBody.removeEventListener('click', onBodyClick);
}

const showMessage = (nearestBtnClass, messageElement) => {
  document.addEventListener('keydown', onDocumentKeydown);
  documentBody.append(messageElement);
  documentBody.addEventListener('click', onBodyClick);
  messageElement.querySelector(nearestBtnClass).addEventListener('click', onMessageHide);
};

const showSuccessMessage = () => {
  showMessage('.success__button', successMessage);
};

const showErrorMessage = () => {
  showMessage('.error__button', errorMessage);
};

export { showSuccessMessage, showErrorMessage };
