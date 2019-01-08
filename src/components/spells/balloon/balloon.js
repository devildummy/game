/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import $ from 'jquery';
import balloonImage from '../../../images/balloon.png';
import bombImage from '../../../images/bomb.png';


export default class Balloons {
  constructor(canvas, modal) {
    this.canvas = canvas;
    this.canvas.width = $(modal).width();
    this.canvas.height = this.canvas.width;
    this.ctx = this.canvas.getContext('2d');
    this.width = canvas.width * 0.2;
    this.height = canvas.width * 0.2;
    this.balloonList = [];
    this.frames = 0;
    this.engine = this.up;
    this.balloonImage = new Image();
    this.balloonImage.src = balloonImage;
    this.bombImage = new Image();
    this.bombImage.src = bombImage;
    this.tryWin = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  randomLeft() {
    return Math.floor(Math.random() * (this.canvas.width - this.width));
  }

  step() {
    if (!this.stop) {
      if (this.frames > 60 * 15) {
        this.resolve(true);
        this.stop = true;
      }
      if (this.frames % 30 === 0) {
        this.newBaloon();
      }
      this.engine();
      requestAnimationFrame(this.step.bind(this));
    } else {
      this.resolve(false);
    }
  }

  get engine() {
    return this._engine;
  }

  set engine(fn) {
    this._engine = fn;
  }

  up() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let mustDelete = false;
    this.balloonList.forEach((baloon) => {
      baloon.top -= 5;
      this.ctx.drawImage(this[`${baloon.type}Image`], baloon.left, baloon.top, this.width, this.height);
      if (baloon.top < -this.height) {
        if (baloon.type === 'bomb') {
          mustDelete = true;
        } else {
          this.stop = true;
        }
      }
    });
    if (mustDelete) {
      this.balloonList.shift();
    }
    this.frames += 1;
  }

  newBaloon() {
    const left = this.randomLeft();
    const type = ['balloon', 'bomb'][Math.round(Math.random())];
    this.balloonList.push({
      left,
      top: this.canvas.height,
      type,
    });
  }
}
