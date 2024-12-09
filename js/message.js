const documentBody = document.querySelector('body');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const handleBodyClick = (e) => {
  if (
    e.target.closest('.success__inner') ||
    e.target.closest('.error__inner')
  ) {
    return;
  }

  hideMessage();
};

const handleDocumentKeydown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    hideMessage();
  }
};

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', handleDocumentKeydown);
  documentBody.removeEventListener('click', handleBodyClick);
}

const showMessage = (nearestBtnClass, messageElement) => {
  document.addEventListener('keydown', handleDocumentKeydown);
  documentBody.append(messageElement);
  documentBody.addEventListener('click', handleBodyClick);
  messageElement.querySelector(nearestBtnClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage('.success__button', successMessage);
};

const showErrorMessage = () => {
  showMessage('.error__button', errorMessage);
};

export { showSuccessMessage, showErrorMessage };
