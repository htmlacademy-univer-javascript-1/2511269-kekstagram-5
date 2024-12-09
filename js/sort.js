const PICTURES_COUNT = 10;
const filter = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = filter.default;
let pictures = [];

const sortByComments = (firstPic, secondPic) => secondPic.comments.length - firstPic.comments.length;

const sortByRandom = () => Math.random() - 0.5;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case filter.random:
      return [...pictures].sort(sortByRandom).slice(0, PICTURES_COUNT);
    case filter.discussed:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const initFilter = (loadPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadPictures];
  filterElement.addEventListener('click', (e) => {
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
  });
};

export { initFilter, getFilteredPictures };
