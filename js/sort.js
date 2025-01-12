const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortByComments = (firstPic, secondPic) => secondPic.comments.length - firstPic.comments.length;

const sortByRandom = () => Math.random() - 0.5;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortByRandom).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const onFilterClick = (e, callback) => {
  if (!e.target.classList.contains('img-filters__button')) {
    return;
  }

  const clickedButton = e.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  currentFilter = clickedButton.id;
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  callback(getFilteredPictures());
};

const initFilter = (loadPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadPictures];
  filterElement.addEventListener('click', (e) => onFilterClick(e, callback));
};

export { initFilter, getFilteredPictures };
