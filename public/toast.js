const toast = document.querySelector('.toast');

if (toast) {
  toast.classList.remove('hide');
  const showDuration = 3000;
  setTimeout(() => {
    toast.remove();
  }, showDuration);
}
