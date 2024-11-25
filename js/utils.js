const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.textContent = message;
  document.body.append(alert);
  alert.classList.add('alert')
  setTimeout(() => {
    alert.remove();
  }, 5000);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(tmeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {debounce, showAlert};