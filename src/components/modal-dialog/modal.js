import $ from 'jquery';
import './modal.css';
import template from './modal.html';
import { bindToKey, unbind } from '../keyInfo/keyinfo';

class Modal {
  static render() {
    $('#main').append(template);
    $('.spell').mouseover((e) => {
      if (e.target.classList.contains('spell')) {
        $(e.target).removeClass('bg-dark');
        if (e.target.classList.contains('attack')) {
          $(e.target).addClass('bg-danger');
        } else {
          $(e.target).addClass('bg-success');
        }
      }
    });
    $('.spell').mouseout((e) => {
      if (e.target.classList.contains('spell')) {
        $(e.target).addClass('bg-dark');
        if (e.target.classList.contains('attack')) {
          $(e.target).removeClass('bg-danger');
        } else {
          $(e.target).removeClass('bg-success');
        }
      }
    });
    return $('.spells');
  }

  static async chooseSpell() {
    const modal = Modal.render();
    return new Promise((resolve) => {
      let fixModal = 0;
      $(modal).on('transitionend', () => {
        fixModal += 1;
        if (fixModal === 3) {
          Array.from($('.spell')).forEach((element) => {
            if ($(element).data('key') !== undefined) {
              bindToKey(element, $(element).data('key'));
            }
          });
        }
      });
      $(modal).modal({
        backdrop: false,
        keyboard: false,
      });
      $(modal).click((e) => {
        if (e.target.classList.contains('spell')) {
          $(modal).modal('toggle');
          $(modal).on('hidden.bs.modal', () => {
            let spell = $(e.target).data('spell');
            if (spell === 'random') {
              spell = $($('.spell')[Math.floor(Math.random() * 7)]).data('spell');
            }
            $(modal).remove();
            unbind();
            resolve(spell);
          });
        }
      });
    });
  }
}

export { Modal as default };
