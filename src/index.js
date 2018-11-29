import _ from 'lodash';

import unicorn from './images/unicorn.jpg';

import './scss/main.scss';
import './css/main.css';

function component() {
  const element = document.createElement('span');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  const image = new Image();
  image.src = unicorn;

  element.appendChild(image);


  return element;
}


document.body.appendChild(component());
