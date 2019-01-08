import $ from 'jquery';
import './checker.css';
import template from './checker.html';

class Checker {
  static async render(isCorrect, answer) {
    $('#main').append(template);
    if (isCorrect) {
      $('.checker .modal-content').addClass('border border-success');
      $('.checker .modal-header').addClass('border-bottom border-success');
      $('.correct').text('Верно!');
      $('.btn').addClass('btn-success').text('c:');
    } else {
      $('.checker .modal-content').addClass('border border-danger');
      $('.checker .modal-header').addClass('border-bottom border-danger');
      $('.correct').text('Неверно');
      $('.btn').addClass('btn-danger').text(':c');
    }
    $('.modal-body').text(`Ответ - ${answer}`);
    $('.checker').modal({
      backdrop: false,
      keyboard: false,
    });
    return new Promise((resolve) => {
      $('.checker').on('hidden.bs.modal', () => {
        $('.checker').remove();
        resolve();
      });
    });
  }
}

export { Checker as default };
