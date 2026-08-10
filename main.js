const dialog = document.querySelector('#project-dialog');
const form = document.querySelector('#project-form');
const success = document.querySelector('.success');
const intro = document.querySelector('.dialog-intro');

document.querySelectorAll('[data-open-form]').forEach((button) => button.addEventListener('click', () => dialog.showModal()));
document.querySelectorAll('.close, .close-success').forEach((button) => button.addEventListener('click', () => { dialog.close(); form.reset(); form.hidden = false; intro.hidden = false; success.hidden = true; }));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
form.addEventListener('submit', (event) => { event.preventDefault(); form.hidden = true; intro.hidden = true; success.hidden = false; });
