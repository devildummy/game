import $ from 'jquery';
import './popup.css';

export default class Popup {
  static async render(hpBar, damage = 0) {
    $(hpBar).parent().parent().append(`
    <div class="popup">
      ${damage}
    </div>
    `);
    if (damage < -30) {
      $('.popup').addClass('text-danger');
      $('.popup').append(' Критический урон!');
      $('.popup').css('font-size', '5rem');
    } else if (damage > 0) {
      $('.popup').addClass('text-success');
    } else {
      $('.popup').addClass('text-danger');
    }
    $('.popup').animate({
      bottom: '20rem',
      opacity: 0,
    }, {
      duration: 999,
      complete: () => {
        $('.popup').remove();
      },
    });
  }
}
