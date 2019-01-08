import $ from 'jquery';
import './checker.css';
import template from './checker.html';
import { bindToKey, unbind } from '../keyInfo/keyinfo';

class Checker {
  static async render(isCorrect, answer) {
    $('#main').append(template);
    if (isCorrect) {
      $('.checker .modal-content').addClass('border border-success');
      $('.checker .modal-header').addClass('border-bottom border-success');
      $('.correct').text('Верно!');
      $('.btn').addClass('btn-success').html('c:');
    } else {
      $('.checker .modal-content').addClass('border border-danger');
      $('.checker .modal-header').addClass('border-bottom border-danger');
      $('.correct').text('Неверно');
      $('.btn').addClass('btn-danger').html(':c');
    }
    $('.modal-body').text(`Ответ - ${answer}`);
    $('.checker').modal({
      backdrop: false,
      keyboard: false,
    });
    let fixModal = 0;
    $('.checker').on('transitionend', () => {
      fixModal += 1;
      if (fixModal === 3) {
        bindToKey($('.btn'), 'enter');
      }
    });
    return new Promise((resolve) => {
      $('.checker').on('hidden.bs.modal', () => {
        $('.checker').remove();
        unbind();
        resolve();
      });
    });
  }
}

export { Checker as default };
