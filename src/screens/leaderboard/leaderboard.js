import $ from 'jquery';
import './leaderboard.css';
import template from './leaderboard.html';

class leaderboard {
  static render(name, lvl) {
    $('#main').html(template);
    const champions = [];
    if (window.localStorage.getItem('leaderboard')) {
      JSON.parse(window.localStorage.getItem('leaderboard')).forEach((item) => {
        champions.push(item);
      });
    }
    if (champions.length < 10) {
      do {
        champions.push(['-', 0]);
      } while (champions.length !== 10);
    }
    champions.push([name, lvl]);
    champions.sort((a, b) => -(a[1] - b[1]));
    champions.pop();
    for (let i = 0; i < 10; i += 1) {
      $('.js-ledaerboard-body').append(`
      <tr class="champion">
      <th scope="row">${i + 1}</th>
      <td class="champion-name">${champions[i][0]}</td>
      <td class="champion-lvl">${champions[i][1]}</td>
      <td>~ ${Math.floor(333 / (150 / champions[i][1]))}%</td>
    </tr>
    `);
    }
    $($('.champion').has(`.champion-name:contains(${name})`).has(`.champion-lvl:contains(${lvl})`)[0]).addClass('bg-danger');
    window.localStorage.setItem('leaderboard', JSON.stringify(champions));
  }
}

export default leaderboard;
