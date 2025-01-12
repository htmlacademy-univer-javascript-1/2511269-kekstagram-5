const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const modal = document.querySelector('.img-upload');
const image = modal.querySelector('.img-upload__preview img');
const decreaseButton = modal.querySelector('.scale__control--smaller');
const increaseButton = modal.querySelector('.scale__control--bigger');
const scaleInput = modal.querySelector('.scale__control--value');

const scalePicture = (value) => {
  scaleInput.value = `${value}%`;
  image.style.transform = `scale(${value / 100})`;
};

const onDecreaseButtonClick = () => {
  let scale = parseInt(scaleInput.value, 10);
  if (scale - SCALE_STEP < MIN_SCALE) {
    scale = MIN_SCALE;
  } else {
    scale -= SCALE_STEP;
  }
  scalePicture(scale);
};

const onIncreaseButtonClick = () => {
  let scale = parseInt(scaleInput.value, 10);
  if (scale + SCALE_STEP > MAX_SCALE) {
    scale = MAX_SCALE;
  } else {
    scale += SCALE_STEP;
  }
  scalePicture(scale);
};

const resetScale = () => {
  scalePicture(DEFAULT_SCALE);
};

decreaseButton.addEventListener('click', onDecreaseButtonClick);
increaseButton.addEventListener('click', onIncreaseButtonClick);

export {resetScale};
