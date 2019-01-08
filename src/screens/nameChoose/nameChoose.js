import $ from 'jquery';
import './nameChoose.css';
import template from './nameChoose.html';
import 'babel-polyfill';

class NameChooser {
  static render() {
    $('#main').html(template);
  }

  static async setName() {
    NameChooser.render();
    return new Promise((resolve) => {
      $('.js-name-form').submit((e) => {
        e.preventDefault();
        if ($('.js-name').val() !== '') {
          resolve($('.js-name').val());
        } else {
          resolve('Anonymos');
        }
      });
    });
  }
}

export default NameChooser;
