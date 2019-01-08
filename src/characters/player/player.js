/* eslint-disable no-underscore-dangle */
import $ from 'jquery';
import './player.css';
import Character from '../chracter';

export default class Player {
  constructor(name) {
    this._name = name || 'Аноним';
    this._hp = 100;
    this._critChance = 10;
    this.engine = new Character('player');
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  set hp(value) {
    this._hp += value;
    if (this._hp > 100) {
      this._hp = 100;
    }
    $(this.hpBar).width(`${this._hp}%`);
  }

  get hp() {
    return this._hp;
  }

  get crit() {
    return this._critChance;
  }
}
