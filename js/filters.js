import { renderThumbnails } from './thumbnail.js';
import { debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
const filterButtons = document.querySelectorAll('.img-filters__button');

const RANDOM_PICTURES_COUNT = 10;
const TIMEOUT = 500;
/*
//sortButtins.style.opacity = 1;
const showFilter = async () => {
  await getData;
  sortButtins.style.opacity = 1;
};

showFilter();
*/

const filterPictures = (pictures, sortButton) => {

  if (sortButton === defaultFilter) {
    return pictures;
  }

  if (sortButton === randomFilter) {
    return pictures.toSorted(() => Math.random() - 0.5).slice(0, RANDOM_PICTURES_COUNT);
  }

  if (sortButton === discussedFilter) {
    return pictures.toSorted((a, b) => b.comments.length - a.comments.length);
  }
};

const removePictures = () =>
  document.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());

const setOnFilterClick = (evt, pictures) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

  const filterButton = evt.target;
  filterButton.classList.add('img-filters__button--active');

  removePictures();
  renderThumbnails(filterPictures(pictures, filterButton));
};

const setDebouncedFilter = (pictures) => {
  filterForm.addEventListener('click', debounce((evt) => {
    setOnFilterClick(evt, pictures);
  }, TIMEOUT));
};

const showFilters = () => imgFilters.classList.remove('img-filters--inactive');

export { setDebouncedFilter, showFilters };
