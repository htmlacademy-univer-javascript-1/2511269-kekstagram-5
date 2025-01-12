const EffectsFilters = {
  NONE: 'none',
  GRAYSCALE: 'chrome',
  SEPIA: 'sepia',
  INVERT: 'marvin',
  BLUR: 'phobos',
  BRIGHTNESS: 'heat',
};

const EFFECTS_CONFIG = {
  [EffectsFilters.GRAYSCALE]: { style: 'grayscale', unit: '' },
  [EffectsFilters.SEPIA]: { style: 'sepia', unit: '' },
  [EffectsFilters.INVERT]: { style: 'invert', unit: '%' },
  [EffectsFilters.BLUR]: { style: 'blur', unit: 'px' },
  [EffectsFilters.BRIGHTNESS]: { style: 'brightness', unit: '' },
};

const SLIDER_CONFIG = {
  [EffectsFilters.NONE]: { min: 0, max: 100, step: 1 },
  [EffectsFilters.GRAYSCALE]: { min: 0, max: 1, step: 0.1 },
  [EffectsFilters.SEPIA]: { min: 0, max: 1, step: 0.1 },
  [EffectsFilters.INVERT]: { min: 0, max: 100, step: 1 },
  [EffectsFilters.BLUR]: { min: 0, max: 3, step: 0.1 },
  [EffectsFilters.BRIGHTNESS]: { min: 1, max: 3, step: 0.1 },
};

const uploadModal = document.querySelector('.img-upload');
const previewImage = uploadModal.querySelector('.img-upload__preview img');
const effectsContainer = uploadModal.querySelector('.img-upload__effects');
const sliderWrapper = uploadModal.querySelector('.img-upload__effect-level');
const slider = sliderWrapper.querySelector('.effect-level__slider');
const effectValue = sliderWrapper.querySelector('.effect-level__value');

let currentEffect = EffectsFilters.NONE;

const applyImageStyle = () => {
  if (currentEffect === EffectsFilters.NONE) {
    previewImage.style.filter = null;
    return;
  }

  const { value } = effectValue;
  const { style, unit } = EFFECTS_CONFIG[currentEffect];
  previewImage.style.filter = `${style}(${value}${unit})`;
};

const updateSlider = () => {
  if (slider.noUiSlider) {
    const { min, max, step } = SLIDER_CONFIG[currentEffect];
    slider.noUiSlider.updateOptions({
      range: { min, max },
      step,
      start: max,
    });
  }
};

const onSliderUpdate = () => {
  effectValue.value = slider.noUiSlider.get();
  applyImageStyle();
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

  if (currentEffect !== EffectsFilters.NONE) {
    if (!slider.noUiSlider) {
      createSlider(SLIDER_CONFIG[currentEffect]);
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
  changeEffect(EffectsFilters.NONE);
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
