import $ from 'jquery';
import './battle.css';
import template from './battle.html';

class Battle {
  static render(player, monster = { name: 'nito' }) {
    $('#main').html(template);
    $('.js-player-name').text(player.name);
    $('.js-monster-name').text(monster.name);
    $('.js-monster .progress-bar').width('100%');
    $('.js-player .progress-bar').width('100%');
    return [
      $('.js-player .progress-bar'),
      $('.js-monster .progress-bar'),
    ];
  }
}

export default Battle;
