import 'bootstrap';
import $ from 'jquery';
import 'babel-polyfill';
import Landing from './screens/landing/landing';
import NameChooser from './screens/nameChoose/nameChoose';
import Player from './characters/player/player';
import Battle from './screens/battle/battle';
import Modal from './components/modal-dialog/modal';
import tasks from './components/tasks/tasks';
import Spells from './components/spells/spells';
import Leaderboard from './screens/leaderboard/leaderboard';
import Monster from './characters/monster/monster';
import Popup from './components/popup/popup';
import './index.css';
import mainThemeSound from './audio/main.wav';
import {
  attack,
  die,
  getPunch,
  heal,
} from './characters/chracter';

const newAction = async (player, monster) => new Promise(async (resolve) => {
  const spell = await Modal.chooseSpell();
  const [trying, isHeal] = await Spells[spell](tasks[spell]());
  if (trying) {
    if (isHeal) {
      // eslint-disable-next-line no-param-reassign
      player.hp = 20;
      await heal(player.engine);
      Popup.render(player.hpBar, 20);
    } else if (Math.random() * 100 <= player.crit) {
      attack(player.engine);
      await getPunch(monster.engine);
      // eslint-disable-next-line no-param-reassign
      monster.hp = -30 * 2;
      Popup.render(monster.hpBar, -30 * 2);
    } else {
      attack(player.engine);
      await getPunch(monster.engine);
      // eslint-disable-next-line no-param-reassign
      monster.hp = -30;
      Popup.render(monster.hpBar, -30);
    }
  }
  if (monster.hp > 0) {
    if (Math.random() * 100 <= monster.chance) {
      attack(monster.engine);
      await getPunch(player.engine);
      if (Math.random() * 100 >= monster.crit) {
        // eslint-disable-next-line no-param-reassign
        player.hp = -30 * monster.coeff;
        Popup.render(player.hpBar, -30 * monster.coeff);
      } else {
        // eslint-disable-next-line no-param-reassign
        player.hp = -30 * monster.coeff * 2;
        Popup.render(player.hpBar, -30 * monster.coeff * 2);
      }
    }
  } else {
    await die(monster.engine);
  }
  resolve();
});
const newBattle = async (player, lvl) => {
  const bonfire = $('.bonfire'); // delete this!
  const monster = new Monster(lvl);
  // eslint-disable-next-line no-param-reassign
  [player.hpBar, monster.hpBar] = Battle.render(player, monster);
  player.engine.render();
  heal(player.engine);
  monster.engine.render();
  monster.engine.stand();
  $(window).resize(() => {
    player.engine.render();
    monster.engine.render();
  });
  $(bonfire).click((e) => {
    if (e.ctrlKey) {
      // eslint-disable-next-line no-param-reassign
      player.hp = -100;
      Popup.render(player.hpBar, -100);
    } else {
      // eslint-disable-next-line no-param-reassign
      monster.hp = -100;
      Popup.render(monster.hpBar, -100);
    }
  });
  // eslint-disable-next-line no-await-in-loop
  while (monster.hp > 0 && player.hp > 0) {
    // eslint-disable-next-line no-await-in-loop
    await newAction(player, monster);
    // eslint-disable-next-line no-await-in-loop
  }
  bonfire.off();
  return monster;
};

const startGame = async () => {
  $('.bonfire').off();
  const mainTheme = new Audio(mainThemeSound);
  mainTheme.volume = 0.2;
  mainTheme.load();
  mainTheme.play();
  mainTheme.loop = true;
  window.onblur = () => {
    mainTheme.pause();
  };
  window.onfocus = () => {
    mainTheme.play();
  };
  const startButton = Landing.render();
  const player = new Player();
  let level = 1;
  $(startButton).click(async () => {
    player.name = await NameChooser.setName();
    $('body').append('<div class="level"></div>');
    while (player.hp > 0) {
      $('.level').text(level);
      player.hp = 100;
      // eslint-disable-next-line no-await-in-loop
      await newBattle(player, level);
      // eslint-disable-next-line no-await-in-loop
      level += 1;
    }
    await die(player.engine);
    Leaderboard.render(player.name, level - 1);
    $('.bonfire').click(startGame); // delete this!
  });
};

startGame();