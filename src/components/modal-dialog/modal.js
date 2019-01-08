import $ from 'jquery';
import './modal.css';
import template from './modal.html';

class Modal {
  static render() {
    $('#main').append(template);
    $('.spell').hover((e) => {
      if (e.target.classList.contains('spell')) {
        $(e.target).toggleClass('bg-dark');
        if (e.target.classList.contains('attack')) {
          $(e.target).toggleClass('bg-danger');
        } else {
          $(e.target).toggleClass('bg-success');
        }
      }
    });
    return $('.spells');
  }

  static async chooseSpell() {
    const modal = Modal.render();
    return new Promise((resolve) => {
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
            resolve(spell);
          });
        }
      });
    });
  }
}

export { Modal as default };
