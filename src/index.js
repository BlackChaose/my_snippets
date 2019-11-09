// import 'jquery'; //eslint-disable-line
// import 'bootstrap';//eslint-disable-line
// import 'popper.js';//eslint-disable-line//todo add mimify preset in babel for minify files!
import { showSnippets } from './app.js';// eslint-disable-line

const a = showSnippets;
a(() => {
  const list = document.querySelectorAll('.collapse');
  Object.keys(list).forEach((index) => {
    list[index].parentElement.addEventListener('click', () => {
      if (list[index].style.display === 'block') {
        list[index].style.display = 'none';
      } else if (list[index].style.display === '' || list[index].style.display === 'none') {
        list[index].style.display = 'block';
      }
      return 0;
    });
  });
});
