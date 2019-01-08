import $ from 'jquery';
import './nameChoose.css';
import template from './nameChoose.html';
import 'babel-polyfill';
import { bindToKey, unbind } from '../../components/keyInfo/keyinfo';

class NameChooser {
  static render() {
    $('#main').html(template);
  }

  static async setName() {
    NameChooser.render();
    bindToKey($('.js-name'), 'space');
    bindToKey($('.btn'), 'enter');
    return new Promise((resolve) => {
      $('.js-name-form').submit((e) => {
        e.preventDefault();
        unbind();
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
