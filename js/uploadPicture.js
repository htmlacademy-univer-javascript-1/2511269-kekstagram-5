import {resetScale} from './scale.js';
import {initializeEffects, resetEffects} from './effects.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {submitData} from './api.js';

const documentBody = document.querySelector('body');
const uploadForm = documentBody.querySelector('.img-upload__form');
const modalOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = modalOverlay.querySelector('.img-upload__cancel');
const fileInput = uploadForm.querySelector('.img-upload__input');
const descriptionField = modalOverlay.querySelector('.text__description');
const submitBtn = modalOverlay.querySelector('.img-upload__submit');
const tagsField = modalOverlay.querySelector('.text__hashtags');
const imagePreview = modalOverlay.querySelector('.img-upload__preview img');
const effectPreviews = modalOverlay.querySelectorAll('.effects__preview');
const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_TAGS = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openModal = () => {
  documentBody.classList.add('modal-open');
  modalOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onModalClose = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  modalOverlay.classList.add('hidden');
  documentBody.classList.remove('modal-open');
};

const toggleButtonState = (isDisabled) => {
  submitBtn.disabled = isDisabled;
  submitBtn.textContent = isDisabled ? 'Отправка' : 'Отправить';
};

const isFileTypeValid = (file) => {
  const fileName = file.name.toLowerCase();
  return ALLOWED_FILE_TYPES.some((type) => fileName.endsWith(type));
};

function onDocumentKeydown(e) {
  const isFieldFocused = document.activeElement === tagsField || document.activeElement === descriptionField;
  if (e.key === 'Escape' && !isFieldFocused) {
    e.preventDefault();
    onModalClose();
  }
}

const onFileChange = () => {
  const file = fileInput.files[0];

  if (file && isFileTypeValid(file)) {
    resetEffects();
    imagePreview.src = URL.createObjectURL(file);
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreview.src}')`;
    });
  }
  openModal();
};

const formValidateHandler = async (e) => {
  e.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    toggleButtonState(true);
    try {
      await submitData(new FormData(uploadForm));
      onModalClose();
      showSuccessMessage();
    } catch {
      showErrorMessage();
    }
    toggleButtonState(false);
  }
};

const setupFormSubmit = () => {
  uploadForm.addEventListener('submit', formValidateHandler);
};

const onFormSubmit = (e) => {
  e.preventDefault();
  pristine.validate();
};

fileInput.addEventListener('change', onFileChange);
closeButton.addEventListener('click', onModalClose);
uploadForm.addEventListener('submit', onFormSubmit);
initializeEffects();

const splitTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const areTagsValid = (value) => splitTags(value).every((tag) => TAG_PATTERN.test(tag));

const isTagCountValid = (value) => splitTags(value).length <= MAX_TAGS;

const areTagsUnique = (value) => {
  const lowerCaseTags = splitTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(tagsField, areTagsUnique, 'Хештеги должны быть уникальными', 1, true);
pristine.addValidator(tagsField, areTagsValid, 'Некорректный хештег', 2, true);
pristine.addValidator(tagsField, isTagCountValid, `Лимит ${MAX_TAGS} хештегов превышен`, 3, true);

setupFormSubmit();
