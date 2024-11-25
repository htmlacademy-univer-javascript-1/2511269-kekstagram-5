const effects = {
  NONE: 'none',
  GRAYSCALE: 'chrome',
  SEPIA: 'sepia',
  INVERT: 'marvin',
  BLUR: 'phobos',
  BRIGHTNESS: 'heat',
};

const filterStyles = {
  [effects.GRAYSCALE]: { style: 'grayscale', unit: '' },
  [effects.SEPIA]: { style: 'sepia', unit: '' },
  [effects.INVERT]: { style: 'invert', unit: '%' },
  [effects.BLUR]: { style: 'blur', unit: 'px' },
  [effects.BRIGHTNESS]: { style: 'brightness', unit: '' },
};

const sliderOptions = {
  [effects.NONE]: { min: 0, max: 100, step: 1 },
  [effects.GRAYSCALE]: { min: 0, max: 1, step: 0.1 },
  [effects.SEPIA]: { min: 0, max: 1, step: 0.1 },
  [effects.INVERT]: { min: 0, max: 100, step: 1 },
  [effects.BLUR]: { min: 0, max: 3, step: 0.1 },
  [effects.BRIGHTNESS]: { min: 1, max: 3, step: 0.1 },
};

const uploadModal = document.querySelector('.img-upload');
const previewImage = uploadModal.querySelector('.img-upload__preview img');
const effectsContainer = uploadModal.querySelector('.effects');
const slider = uploadModal.querySelector('.effect-level__slider');
const sliderWrapper = uploadModal.querySelector('.img-upload__effect-level');
const effectValue = uploadModal.querySelector('.effect-level__value');

let currentEffect = effects.NONE;

const applyImageStyle = () => {
  if (currentEffect === effects.NONE) {
    return previewImage.style.filter = null;
  }

  const { value } = effectValue;
  const { style, unit } = filterStyles[currentEffect];
  previewImage.style.filter = `${style}(${value}${unit})`;
};

const updateSlider = () => {
  if (slider.noUiSlider) {
    const { min, max, step } = sliderOptions[currentEffect];
    slider.noUiSlider.updateOptions({
      range: { min, max },
      step,
      start: max,
    });
  }
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
  });
  slider.noUiSlider.on('update', onSliderUpdate);
};

const onSliderUpdate = () => {
  effectValue.value = slider.noUiSlider.get();
  applyImageStyle();
};

const showSlider = () => {
  sliderWrapper.classList.remove('hidden');
};

const hideSlider = () => {
  sliderWrapper.classList.add('hidden');
  if (slider.noUiSlider) {
    slider.noUiSlider.set(0);
  }
};

const configureSlider = () => {
  hideSlider();

  if (currentEffect !== effects.NONE) {
    if (!slider.noUiSlider) {
      createSlider(sliderOptions[currentEffect]);
    } else {
      updateSlider();
    }
    showSlider();
  }
};

const changeEffect = (effect) => {
  currentEffect = effect;
  configureSlider();
  applyImageStyle();
};

const resetEffects = () => {
  changeEffect(effects.NONE);
  applyImageStyle();
  if (slider.noUiSlider) {
    slider.noUiSlider.reset();
  }
};

const onEffectChange = (e) => {
  changeEffect(e.target.value);
};

function initializeEffects() {
  hideSlider();
  configureSlider();
  effectsContainer.addEventListener('change', onEffectChange);
}

export { initializeEffects, resetEffects };