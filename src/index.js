import samplesHTML from './templates/gallery-items.hbs';
import menu from './menu.json';

const menuEl = document.querySelector('.js-menu');

menuEl.insertAdjacentHTML('beforeend', createMenu(menu));

function createMenu(menu) {
  return samplesHTML({menu})
}
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const checkboxEl = document.querySelector('#theme-switch-toggle');

checkboxEl.addEventListener('change', getThemeToBody)
function getThemeToBody() {
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    localStorage.setItem('currentTheme', Theme.LIGHT)
  }
  else if (document.body.classList.contains('light-theme')) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('currentTheme', Theme.DARK)
  }
  else {
    document.body.classList.add('dark-theme');
    localStorage.setItem('currentTheme', Theme.DARK);
  }
}

if (localStorage.getItem('currentTheme') === 'light-theme') {
  document.body.classList.remove('dark-theme');
  document.body.classList.add('light-theme');
  localStorage.setItem('currentTheme', Theme.LIGHT);
} else if (localStorage.getItem('currentTheme') === 'dark-theme') {
  document.body.classList.remove('light-theme');
  document.body.classList.add('dark-theme');
  localStorage.setItem('currentTheme', Theme.DARK);
  checkboxEl.checked = 'true';
} else if (localStorage.getItem('currentTheme') === null) {
  document.body.classList.add('light-theme');
  localStorage.setItem('currentTheme', Theme.LIGHT);
}
