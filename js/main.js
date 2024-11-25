import { renderGallery } from './gallery.js';
import { fetchData } from './api.js';
import { showAlert, debounce } from './utils.js';
import { initFilter, getFilteredPictures } from './sort.js';

try {
  const debouncedRenderGallery = debounce(renderGallery);
  initFilter(await fetchData(), debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}