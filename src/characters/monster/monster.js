import $ from 'jquery';
import './monster.css';
import Character from '../chracter';

const nameVariants = new Map([
  ['adjective', ['Прямой', 'Большой', 'Занудный', 'Скучный', 'Абсолютный',
    'Безграничный', 'Безумный', 'Весомый', ' Местами Невидимый', 'Чистокровный', 'Крутой',
    'Лютый', 'Максимальный', 'Мощный', 'Очень Странный', 'Недооцененный', 'Обильный',
    'Патологический', 'Предельный', 'Потрясающий', 'Стопроцентный', 'Трескучий',
    'Ужасный', 'Уважаемый', 'Фантастический', 'Фундаментальный', 'Щемящий',
    'Штормовой', 'Яростный', 'Темный']],
  ['type', ['Маг', 'Череп', 'Полуорк', 'Нефимист', 'Аку-Аку', 'Б-г', 'Парниша',
    'Даэдра', 'Вампир', 'Ликан', 'Орк-дреней', 'Гоблин', 'Тролль',
    'Бес', 'Мужчина', 'Сатир', 'Фавн', 'Тиранид', 'Получеловек', 'Эльдар', 'Братишка']],
  ['name', ['Костя', 'Жуль', 'Степа', 'Федор', 'Жарь-лук', 'Спиро', 'Фхтанг', 'Гус',
    'Уразум', 'Феопент', 'Соляр', 'Авдей', 'Альберт', 'Геннадий', 'Добрыня', 'Емельян',
    'Федот', 'Николай', 'Нидворай', 'Прохор', 'Феликс', 'Якун', 'Форест', 'Нео',
    'Хан', 'Тайлер', 'Марио', 'Линк', 'Солид', 'Кратос', 'Дрейк', 'Данте', 'Рю']],
]);
const randomVariant = array => array[Math.floor(Math.random() * array.length)];
const randomName = () => {
  let name = '';
  Array.from(nameVariants.values()).forEach((array) => {
    name += ` ${randomVariant(array)}`;
  });
  return name;
};
export default class Monster {
  constructor(lvl) {
    this._name = randomName();
    this._hp = 100;
    if (lvl > 30) {
      this._chance = 100;
      this._coefficient = 1;
      this._critChance = 12;
    } else if (lvl > 20) {
      this._chance = 80;
      this._coefficient = 0.9;
      this._critChance = 9;
    } else if (lvl > 10) {
      this._chance = 70;
      this._coefficient = 0.75;
      this._critChance = 7;
    } else {
      this._chance = 60;
      this._coefficient = 0.6;
      this._critChance = 5;
    }
    this.engine = new Character('monster');
  }

  get name() {
    return this._name;
  }

  set hp(value) {
    this._hp += value;
    $(this.hpBar).width(`${this._hp}%`);
  }

  get hp() {
    return this._hp;
  }

  get chance() {
    return this._chance;
  }

  get coeff() {
    return this._coefficient;
  }

  get crit() {
    return this._critChance;
  }
}
