import $ from 'jquery';
import spellSound from '../audio/spell.wav';
import healSound from '../audio/heal.wav';

/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */


const loadImg = async img => new Promise((resolve) => {
  img.onload = () => {
    img.loaded = true;
    resolve(true);
  };
});
const randomPart = (isPlayer) => {
  let max = 10;
  if (isPlayer === 'player') {
    max = 2;
  }
  return Math.floor(1 + Math.random() * max);
};
class Body {
  constructor(character) {
    this.dom = document.createElement('img');
    this.dom.src = require(`../images/${character}/body/${character}_body_${randomPart(character)}.png`);
    this.dom.onload = () => {
      this.dom.loaded = true;
    };
  }

  async render(element) {
    this.parent = element;
    this.canvas = element.querySelector('.body');
    this.ctx = this.canvas.getContext('2d');
    const elementWidth = this.parent.offsetWidth;
    const elementHeight = this.parent.offsetHeight;
    this.canvas.width = elementWidth * 0.8;
    this.canvas.height = elementHeight * 0.8;
    this.canvas.style.top = `${(elementWidth / 2) - (this.canvas.width / 2)}px`;
    this.canvas.style.left = `${(elementWidth / 2) - (this.canvas.width / 2)}px`;
    this.width = elementHeight * 0.5;
    this.height = elementWidth * 0.5;
    this.top = (this.canvas.height / 2) - (this.width / 2);
    this.left = (this.canvas.width / 2) - (this.height / 2);
    if (!this.dom.loaded) {
      await loadImg(this.dom);
    }
    this.ctx.drawImage(this.dom, this.left, this.top, this.width, this.height);
  }
}
class Head {
  constructor(character) {
    this.dom = document.createElement('img');
    this.dom.src = require(`../images/${character}/head/${character}_head_${randomPart(character)}.png`);
    this.dom.onload = () => {
      this.dom.loaded = true;
    };
  }

  async render(element) {
    this.parent = element;
    this.canvas = element.querySelector('.head');
    this.ctx = this.canvas.getContext('2d');
    const elementWidth = this.parent.offsetWidth;
    const elementHeight = this.parent.offsetHeight;
    this.canvas.width = elementWidth * 0.7;
    this.canvas.height = elementHeight * 0.7;
    this.canvas.style.top = `${(elementWidth / 2) - (this.canvas.width)}px`;
    this.canvas.style.left = `${(elementWidth / 2) - (this.canvas.width / 2)}px`;
    this.width = elementHeight * 0.45;
    this.height = elementWidth * 0.45;
    this.top = (this.canvas.height / 2) - (this.width / 2);
    this.left = (this.canvas.width / 2) - (this.height / 2);
    this.ctx.scale(1, 1);
    if (!this.dom.loaded) {
      await loadImg(this.dom);
    }
    this.ctx.drawImage(this.dom, this.left, this.top, this.width, this.height);
  }
}
class LeftArm {
  constructor(character) {
    this.dom = document.createElement('img');
    this.dom.src = require(`../images/${character}/arm left/${character}_left_arm_${randomPart(character)}.png`);
    this.dom.onload = () => {
      this.dom.loaded = true;
    };
  }

  async render(element) {
    this.parent = element;
    this.canvas = element.querySelector('.left-arm');
    this.ctx = this.canvas.getContext('2d');
    const elementWidth = this.parent.offsetWidth;
    const elementHeight = this.parent.offsetHeight;
    this.canvas.width = elementWidth;
    this.canvas.height = elementHeight;
    this.canvas.style.top = `${(elementWidth / 2) - (this.canvas.width / 1.5)}px`;
    this.canvas.style.left = `${(elementWidth / 2) - (this.canvas.width / 3.3)}px`;
    this.width = elementHeight * 0.2;
    this.height = elementWidth * 0.3;
    this.top = (this.canvas.height / 2);
    this.left = (this.canvas.width / 2) - (this.width / 2);
    if (!this.dom.loaded) {
      await loadImg(this.dom);
    }
    this.ctx.drawImage(this.dom, this.left, this.top, this.width, this.height);
  }
}
class RightArm {
  constructor(character) {
    this.dom = document.createElement('img');
    this.weaponDom = document.createElement('img');
    this.dom.src = require(`../images/${character}/arm right/${character}_right_arm_${randomPart(character)}.png`);
    this.weaponDom.src = require(`../images/${character}/weapon/${character}_weapon_${randomPart(character)}.png`);
    this.dom.onload = () => {
      this.dom.loaded = true;
    };
    this.weaponDom.onload = () => {
      this.weaponDom.loaded = true;
    };
  }

  async render(element) {
    this.parent = element;
    this.canvas = element.querySelector('.right-arm');
    this.ctx = this.canvas.getContext('2d');
    const elementWidth = this.parent.offsetWidth;
    const elementHeight = this.parent.offsetHeight;
    this.canvas.width = elementWidth;
    this.canvas.height = elementHeight;
    this.canvas.style.top = `${(elementWidth / 2) - (this.canvas.width / 1.5)}px`;
    this.canvas.style.left = `${(elementWidth / 2) - (this.canvas.width / 1.4)}px`;
    this.width = elementHeight * 0.2;
    this.height = elementWidth * 0.3;
    this.top = (this.canvas.height / 2);
    this.left = (this.canvas.width / 2) - (this.width / 2);
    this.weaponWidth = elementHeight * 0.5;
    this.weaponHeight = elementHeight * 0.2;
    if (!this.weaponDom.loaded) {
      await loadImg(this.weaponDom);
    }
    if (!this.dom.loaded) {
      await loadImg(this.dom);
    }
    if (this.parent.classList.contains('player')) {
      this.weaponLeft = this.left + (this.weaponWidth * 0.1);
      this.weaponTop = this.top + (this.height * 0.5);
      this.ctx.drawImage(this.weaponDom, this.weaponLeft, this.weaponTop, this.weaponWidth, this.weaponHeight);
      this.ctx.drawImage(this.dom, this.left, this.top, this.width, this.height);
    } else {
      this.weaponLeft = this.left - (this.weaponWidth * 0.6);
      this.weaponTop = this.top + (this.height * 0.3);
      this.ctx.drawImage(this.dom, this.left, this.top, this.width, this.height);
      this.ctx.drawImage(this.weaponDom, this.weaponLeft, this.weaponTop, this.weaponWidth, this.weaponHeight);
    }
  }
}
class RightLeg {
  constructor(character) {
    this.dom = document.createElement('img');
    this.dom.src = require(`../images/${character}/leg right/${character}_right_leg_${randomPart(character)}.png`);
    this.dom.onload = () => {
      this.dom.loaded = true;
    };
  }

  async render(element) {
    this.parent = element;
    this.canvas = element.querySelector('.right-leg');
    this.ctx = this.canvas.getContext('2d');
    const elementWidth = this.parent.offsetWidth;
    const elementHeight = this.parent.offsetHeight;
    this.canvas.width = elementWidth * 0.7;
    this.canvas.height = elementHeight * 0.7;
    this.canvas.style.top = `${(elementWidth / 2) - (this.canvas.width / 3.5)}px`;
    this.canvas.style.left = `${(elementWidth / 2) - (this.canvas.width / 3)}px`;
    this.width = elementHeight * 0.2;
    this.height = elementWidth * 0.3;
    this.top = (this.canvas.height / 2);
    this.left = (this.canvas.width / 2) - (this.width / 2);
    if (!this.dom.loaded) {
      await loadImg(this.dom);
    }
    this.ctx.drawImage(this.dom, this.left, this.top, this.width, this.height);
  }
}
class LeftLeg {
  constructor(character) {
    this.dom = document.createElement('img');
    this.dom.src = require(`../images/${character}/leg left/${character}_left_leg_${randomPart(character)}.png`);
    this.dom.onload = () => {
      this.dom.loaded = true;
    };
  }

  async render(element) {
    this.parent = element;
    this.canvas = element.querySelector('.left-leg');
    this.ctx = this.canvas.getContext('2d');
    const elementWidth = this.parent.offsetWidth;
    const elementHeight = this.parent.offsetHeight;
    this.canvas.width = elementWidth * 0.7;
    this.canvas.height = elementHeight * 0.7;
    this.canvas.style.top = `${(elementWidth / 2) - (this.canvas.width / 3.5)}px`;
    this.canvas.style.left = `${(elementWidth / 2) - (this.canvas.width / 1.5)}px`;
    this.width = elementHeight * 0.2;
    this.height = elementWidth * 0.3;
    this.top = (this.canvas.height / 2);
    this.left = (this.canvas.width / 2) - (this.width / 5);
    if (!this.dom.loaded) {
      await loadImg(this.dom);
    }
    this.ctx.drawImage(this.dom, this.left, this.top, this.width, this.height);
  }
}


class Animation {
  async step() {
    this.done = this._engine();
    if (this.done) {
      if (!this.wannaStop) {
        this.loop();
      } else {
        this.stop();
        this.stopPromise = null;
      }
    } else {
      requestAnimationFrame(this.step.bind(this));
    }
  }

  async loop() {
    if (!this.stopPromise) {
      this.stopPromise = new Promise((resolve) => {
        this.stop = resolve;
      });
    }
    this.step();

    return this.stopPromise;
  }

  set engine(fn) {
    this._engine = fn;
  }

  get engine() {
    return this._engine;
  }

  get wannaStop() {
    return this._wannaStop;
  }

  set wannaStop(boolean) {
    this._wannaStop = boolean;
  }
}
class AnimationLibrary {
  stand() {
    let position = 0;
    let headPosition = 0;
    const up = () => {
      this.body.ctx.clearRect(0, 0, this.body.canvas.width, this.body.canvas.height);
      this.body.ctx.drawImage(
        this.body.dom,
        this.body.left,
        this.body.top + position,
        this.body.width,
        this.body.height,
      );

      this.head.ctx.clearRect(0, 0, this.head.canvas.width, this.head.canvas.height);
      this.head.ctx.drawImage(
        this.head.dom,
        this.head.left,
        this.head.top + headPosition,
        this.head.width,
        this.head.height,
      );

      this.leftArm.ctx.clearRect(0, 0, this.leftArm.canvas.width, this.leftArm.canvas.height);
      this.leftArm.ctx.drawImage(
        this.leftArm.dom,
        this.leftArm.left,
        this.leftArm.top + position,
        this.leftArm.width,
        this.leftArm.height,
      );
      if (this.type === 'monster') {
        this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
        this.rightArm.ctx.drawImage(
          this.rightArm.dom,
          this.rightArm.left,
          this.rightArm.top + position,
          this.rightArm.width,
          this.rightArm.height,
        );
        this.rightArm.ctx.drawImage(
          this.rightArm.weaponDom,
          this.rightArm.weaponLeft,
          this.rightArm.weaponTop + position,
          this.rightArm.weaponWidth,
          this.rightArm.weaponHeight,
        );
      } else {
        this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
        this.rightArm.ctx.drawImage(
          this.rightArm.weaponDom,
          this.rightArm.weaponLeft,
          this.rightArm.weaponTop + position,
          this.rightArm.weaponWidth,
          this.rightArm.weaponHeight,
        );
        this.rightArm.ctx.drawImage(
          this.rightArm.dom,
          this.rightArm.left,
          this.rightArm.top + position,
          this.rightArm.width,
          this.rightArm.height,
        );
      }
      position += 0.4;
      headPosition += 0.2;
      if (position > 10) {
        this.animation.engine = down;
      }
      return false;
    };
    const down = () => {
      this.body.ctx.clearRect(0, 0, this.body.canvas.width, this.body.canvas.height);
      this.body.ctx.drawImage(
        this.body.dom,
        this.body.left,
        this.body.top + position,
        this.body.width,
        this.body.height,
      );

      this.head.ctx.clearRect(0, 0, this.head.canvas.width, this.head.canvas.height);
      this.head.ctx.drawImage(
        this.head.dom,
        this.head.left,
        this.head.top + headPosition,
        this.head.width,
        this.head.height,
      );

      this.leftArm.ctx.clearRect(0, 0, this.leftArm.canvas.width, this.leftArm.canvas.height);
      this.leftArm.ctx.drawImage(
        this.leftArm.dom,
        this.leftArm.left,
        this.leftArm.top + position,
        this.leftArm.width,
        this.leftArm.height,
      );

      if (this.type === 'monster') {
        this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
        this.rightArm.ctx.drawImage(
          this.rightArm.dom,
          this.rightArm.left,
          this.rightArm.top + position,
          this.rightArm.width,
          this.rightArm.height,
        );
        this.rightArm.ctx.drawImage(
          this.rightArm.weaponDom,
          this.rightArm.weaponLeft,
          this.rightArm.weaponTop + position,
          this.rightArm.weaponWidth,
          this.rightArm.weaponHeight,
        );
      } else {
        this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
        this.rightArm.ctx.drawImage(
          this.rightArm.weaponDom,
          this.rightArm.weaponLeft,
          this.rightArm.weaponTop + position,
          this.rightArm.weaponWidth,
          this.rightArm.weaponHeight,
        );
        this.rightArm.ctx.drawImage(
          this.rightArm.dom,
          this.rightArm.left,
          this.rightArm.top + position,
          this.rightArm.width,
          this.rightArm.height,
        );
      }
      position -= 0.4;
      headPosition -= 0.2;
      if (position < 0) {
        this.animation.engine = up;
        return true;
      }
      return false;
    };
    this.animation.engine = up;
    this.animation.loop();
  }

  attack() {
    let rotate = 0;
    const weaponUp = () => {
      this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
      this.rightArm.ctx.translate(this.rightArm.canvas.width / 2, this.rightArm.canvas.height / 2);
      if (this.type === 'monster') {
        this.rightArm.ctx.rotate(Math.PI / 50);
      } else {
        this.rightArm.ctx.rotate(-Math.PI / 50);
      }
      this.rightArm.ctx.translate(-this.rightArm.canvas.width / 2, -this.rightArm.canvas.height / 2);
      this.rightArm.ctx.drawImage(
        this.rightArm.dom,
        this.rightArm.left,
        this.rightArm.top -= 0.2,
        this.rightArm.width,
        this.rightArm.height,
      );
      this.rightArm.ctx.drawImage(
        this.rightArm.weaponDom,
        this.rightArm.weaponLeft,
        this.rightArm.weaponTop -= 0.2,
        this.rightArm.weaponWidth,
        this.rightArm.weaponHeight,
      );
      rotate += 1;
      if (rotate >= 28) {
        this.animation.engine = weaponDown;
      }
    };
    const weaponDown = () => {
      this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
      this.rightArm.ctx.translate(this.rightArm.canvas.width / 2, this.rightArm.canvas.height / 2);
      if (this.type === 'monster') {
        this.rightArm.ctx.rotate(-Math.PI / 25);
      } else {
        this.rightArm.ctx.rotate(Math.PI / 25);
      }
      this.rightArm.ctx.translate(-this.rightArm.canvas.width / 2, -this.rightArm.canvas.height / 2);
      this.rightArm.ctx.drawImage(
        this.rightArm.dom,
        this.rightArm.left,
        this.rightArm.top += 0.4,
        this.rightArm.width,
        this.rightArm.height,
      );
      this.rightArm.ctx.drawImage(
        this.rightArm.weaponDom,
        this.rightArm.weaponLeft,
        this.rightArm.weaponTop += 0.4,
        this.rightArm.weaponWidth,
        this.rightArm.weaponHeight,
      );
      rotate -= 2;
      if (rotate === 0) {
        return true;
      }
    };
    this.animation.engine = weaponUp;
    this.animation.loop();
  }

  die() {
    let counter = 0;
    const headSide = () => {
      this.head.ctx.clearRect(0, 0, this.head.canvas.width, this.head.canvas.height);
      this.head.ctx.translate(this.head.canvas.width / 2, this.head.canvas.height / 2);
      this.head.ctx.rotate(Math.PI / 45);
      this.head.ctx.translate(-this.head.canvas.width / 2, -this.head.canvas.height / 2);
      this.head.ctx.drawImage(
        this.head.dom,
        this.head.left,
        this.head.top,
        this.head.width,
        this.head.height,
      );
      counter += 1;
      if (counter > 22) {
        this.animation.engine = armDown;
        counter = 0;
      }
    };
    const armDown = () => {
      this.leftArm.ctx.clearRect(0, 0, this.leftArm.canvas.width, this.leftArm.canvas.height);
      this.leftArm.ctx.drawImage(
        this.leftArm.dom,
        this.leftArm.left,
        this.leftArm.top + counter,
        this.leftArm.width,
        this.leftArm.height,
      );
      this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
      this.rightArm.ctx.drawImage(
        this.rightArm.dom,
        this.rightArm.left,
        this.rightArm.top + counter,
        this.rightArm.width,
        this.rightArm.height,
      );
      this.rightArm.ctx.drawImage(
        this.rightArm.weaponDom,
        this.rightArm.weaponLeft,
        this.rightArm.weaponTop + counter,
        this.rightArm.weaponWidth,
        this.rightArm.weaponHeight,
      );
      counter += 2;
      if (counter > this.leftArm.canvas.height - (this.leftArm.height + this.rightArm.top)) {
        counter = 0;
        this.animation.engine = headDown;
      }
    };
    const headDown = () => {
      this.head.ctx.clearRect(0, 0, this.head.canvas.width, this.head.canvas.height);
      this.head.ctx.drawImage(
        this.head.dom,
        this.head.left + counter,
        this.head.top,
        this.head.width,
        this.head.height,
      );
      counter += 2;
      if (this.head.canvas.width < (this.head.width + this.head.left + counter)) {
        counter = 0;
        this.animation.engine = bodyDown;
      }
    };
    const bodyDown = () => {
      this.body.ctx.clearRect(0, 0, this.body.canvas.width, this.body.canvas.height);
      this.body.ctx.drawImage(
        this.body.dom,
        this.body.left,
        this.body.top + counter,
        this.body.width,
        this.body.height,
      );
      counter += 2;
      if (counter > this.body.canvas.height - (this.body.height + this.body.top)) {
        this.animation.wannaStop = true;
        return true;
      }
    };
    this.animation.engine = headSide;
    this.animation.loop();
  }

  getPunch() {
    let counter = 0;
    const awaitingWave = () => {
      counter += 1;
      if (counter > 30) {
        counter = 0;
        this.animation.engine = punch;
      }
    };
    const punch = () => {
      let direction = Math.PI / 60;
      if (this.type === 'player') {
        direction = -Math.PI / 60;
      }
      this.head.ctx.clearRect(0, 0, this.head.canvas.width, this.head.canvas.height);
      this.head.ctx.translate(this.head.canvas.width / 2, this.head.canvas.height / 2);
      this.head.ctx.rotate(direction);
      this.head.ctx.translate(-this.head.canvas.width / 2, -this.head.canvas.height / 2);
      this.head.ctx.drawImage(
        this.head.dom,
        this.head.left,
        this.head.top,
        this.head.width,
        this.head.height,
      );
      this.leftArm.ctx.clearRect(0, 0, this.leftArm.canvas.width, this.leftArm.canvas.height);
      this.leftArm.ctx.translate(this.leftArm.canvas.width / 2, this.leftArm.canvas.height / 2);
      this.leftArm.ctx.rotate(direction);
      this.leftArm.ctx.translate(-this.leftArm.canvas.width / 2, -this.leftArm.canvas.height / 2);
      this.leftArm.ctx.drawImage(
        this.leftArm.dom,
        this.leftArm.left,
        this.leftArm.top,
        this.leftArm.width,
        this.leftArm.height,
      );
      this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
      this.rightArm.ctx.translate(this.rightArm.canvas.width / 2, this.rightArm.canvas.height / 2);
      this.rightArm.ctx.rotate(direction);
      this.rightArm.ctx.translate(-this.rightArm.canvas.width / 2, -this.rightArm.canvas.height / 2);
      if (this.type === 'monster') {
        this.rightArm.ctx.drawImage(
          this.rightArm.dom,
          this.rightArm.left,
          this.rightArm.top,
          this.rightArm.width,
          this.rightArm.height,
        );
        this.rightArm.ctx.drawImage(
          this.rightArm.weaponDom,
          this.rightArm.weaponLeft,
          this.rightArm.weaponTop,
          this.rightArm.weaponWidth,
          this.rightArm.weaponHeight,
        );
      } else {
        this.rightArm.ctx.drawImage(
          this.rightArm.weaponDom,
          this.rightArm.weaponLeft,
          this.rightArm.weaponTop,
          this.rightArm.weaponWidth,
          this.rightArm.weaponHeight,
        );
        this.rightArm.ctx.drawImage(
          this.rightArm.dom,
          this.rightArm.left,
          this.rightArm.top,
          this.rightArm.width,
          this.rightArm.height,
        );
      }

      counter += 1;
      if (counter > 10) {
        counter = 0;
        this.animation.engine = stay;
      }
    };
    const stay = () => {
      let direction = -Math.PI / 120;
      if (this.type === 'player') {
        direction = Math.PI / 120;
      }
      this.head.ctx.clearRect(0, 0, this.head.canvas.width, this.head.canvas.height);
      this.head.ctx.translate(this.head.canvas.width / 2, this.head.canvas.height / 2);
      this.head.ctx.rotate(direction);
      this.head.ctx.translate(-this.head.canvas.width / 2, -this.head.canvas.height / 2);
      this.head.ctx.drawImage(
        this.head.dom,
        this.head.left,
        this.head.top,
        this.head.width,
        this.head.height,
      );
      this.leftArm.ctx.clearRect(0, 0, this.leftArm.canvas.width, this.leftArm.canvas.height);
      this.leftArm.ctx.translate(this.leftArm.canvas.width / 2, this.leftArm.canvas.height / 2);
      this.leftArm.ctx.rotate(direction);
      this.leftArm.ctx.translate(-this.leftArm.canvas.width / 2, -this.leftArm.canvas.height / 2);
      this.leftArm.ctx.drawImage(
        this.leftArm.dom,
        this.leftArm.left,
        this.leftArm.top,
        this.leftArm.width,
        this.leftArm.height,
      );
      this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
      this.rightArm.ctx.translate(this.rightArm.canvas.width / 2, this.rightArm.canvas.height / 2);
      this.rightArm.ctx.rotate(direction);
      this.rightArm.ctx.translate(-this.rightArm.canvas.width / 2, -this.rightArm.canvas.height / 2);
      if (this.type === 'monster') {
        this.rightArm.ctx.drawImage(
          this.rightArm.dom,
          this.rightArm.left,
          this.rightArm.top,
          this.rightArm.width,
          this.rightArm.height,
        );
        this.rightArm.ctx.drawImage(
          this.rightArm.weaponDom,
          this.rightArm.weaponLeft,
          this.rightArm.weaponTop,
          this.rightArm.weaponWidth,
          this.rightArm.weaponHeight,
        );
      } else {
        this.rightArm.ctx.drawImage(
          this.rightArm.weaponDom,
          this.rightArm.weaponLeft,
          this.rightArm.weaponTop,
          this.rightArm.weaponWidth,
          this.rightArm.weaponHeight,
        );
        this.rightArm.ctx.drawImage(
          this.rightArm.dom,
          this.rightArm.left,
          this.rightArm.top,
          this.rightArm.width,
          this.rightArm.height,
        );
      }

      counter += 1;
      if (counter > 20) {
        counter = 0;
        return true;
      }
    };
    this.animation.engine = awaitingWave;
    this.animation.loop();
  }

  heal() {
    let counter = 0;
    const handsUp = () => {
      this.leftArm.ctx.clearRect(0, 0, this.leftArm.canvas.width, this.leftArm.canvas.height);
      this.leftArm.ctx.translate(this.leftArm.canvas.width / 2, this.leftArm.canvas.height / 2);
      this.leftArm.ctx.rotate(-Math.PI / 100);
      this.leftArm.ctx.translate(-this.leftArm.canvas.width / 2, -this.leftArm.canvas.height / 2);
      this.leftArm.ctx.drawImage(
        this.leftArm.dom,
        this.leftArm.left,
        this.leftArm.top -= 0.5,
        this.leftArm.width,
        this.leftArm.height,
      );
      this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
      this.rightArm.ctx.translate(this.rightArm.canvas.width / 2, this.rightArm.canvas.height / 2);
      this.rightArm.ctx.rotate(-Math.PI / 100);
      this.rightArm.ctx.translate(-this.rightArm.canvas.width / 2, -this.rightArm.canvas.height / 2);
      this.rightArm.ctx.drawImage(
        this.rightArm.weaponDom,
        this.rightArm.weaponLeft,
        this.rightArm.weaponTop -= 0.5,
        this.rightArm.weaponWidth,
        this.rightArm.weaponHeight,
      );
      this.rightArm.ctx.drawImage(
        this.rightArm.dom,
        this.rightArm.left,
        this.rightArm.top,
        this.rightArm.width,
        this.rightArm.height,
      );

      counter += 1;
      if (counter > 50) {
        counter = 0;
        this.animation.engine = handsDown;
      }
    };
    const handsDown = () => {
      this.leftArm.ctx.clearRect(0, 0, this.leftArm.canvas.width, this.leftArm.canvas.height);
      this.leftArm.ctx.translate(this.leftArm.canvas.width / 2, this.leftArm.canvas.height / 2);
      this.leftArm.ctx.rotate(Math.PI / 100);
      this.leftArm.ctx.translate(-this.leftArm.canvas.width / 2, -this.leftArm.canvas.height / 2);
      this.leftArm.ctx.drawImage(
        this.leftArm.dom,
        this.leftArm.left,
        this.leftArm.top += 0.5,
        this.leftArm.width,
        this.leftArm.height,
      );
      this.rightArm.ctx.clearRect(0, 0, this.rightArm.canvas.width, this.rightArm.canvas.height);
      this.rightArm.ctx.translate(this.rightArm.canvas.width / 2, this.rightArm.canvas.height / 2);
      this.rightArm.ctx.rotate(Math.PI / 100);
      this.rightArm.ctx.translate(-this.rightArm.canvas.width / 2, -this.rightArm.canvas.height / 2);
      this.rightArm.ctx.drawImage(
        this.rightArm.weaponDom,
        this.rightArm.weaponLeft,
        this.rightArm.weaponTop += 0.5,
        this.rightArm.weaponWidth,
        this.rightArm.weaponHeight,
      );
      this.rightArm.ctx.drawImage(
        this.rightArm.dom,
        this.rightArm.left,
        this.rightArm.top,
        this.rightArm.width,
        this.rightArm.height,
      );

      counter += 1;
      if (counter > 50) {
        counter = 0;
        return true;
      }
    };
    this.animation.engine = handsUp;
    this.animation.loop();
  }
}
const animationLibrary = new AnimationLibrary();

export default class Character {
  constructor(character) {
    this.type = character;
    this.head = new Head(this.type);
    this.body = new Body(this.type);
    this.leftArm = new LeftArm(this.type);
    this.rightArm = new RightArm(this.type);
    this.rightLeg = new RightLeg(this.type);
    this.leftLeg = new LeftLeg(this.type);
    this.animation = new Animation(this.type);
    this.stand = animationLibrary.stand.bind(this);
    this.die = animationLibrary.die.bind(this);
    this.attack = animationLibrary.attack.bind(this);
    this.getPunch = animationLibrary.getPunch.bind(this);
    this.heal = animationLibrary.heal.bind(this);
  }

  render() {
    this.dom = document.querySelector(`.${this.type}`);
    this.head.render(this.dom);
    this.body.render(this.dom);
    this.leftArm.render(this.dom);
    this.rightArm.render(this.dom);
    this.rightLeg.render(this.dom);
    this.leftLeg.render(this.dom);
  }
}

const spellCast = (character) => {
  const attackImg = require(`../images/${character.type}_attack.png`);
  const img = new Image();
  img.src = attackImg;
  const spell = new Audio(spellSound);
  spell.play();
  const canvas = $('.spell-animation')[0];
  $(canvas).width(`${$(canvas).parent().width() * 2}px`);
  $(canvas).height(`${$(canvas).parent().width()}px`);
  const ctx = canvas.getContext('2d');
  let position;
  if (character.type === 'monster') {
    position = canvas.width;
  } else {
    position = -canvas.width;
  }
  const move = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, position, 0, canvas.width / 4, canvas.height / 2);
    if (character.type === 'monster') {
      position -= 10;
    } else {
      position += 10;
    }
    if (position <= canvas.width && position >= -canvas.width) {
      requestAnimationFrame(move);
    }
  };
  requestAnimationFrame(move);
};

const attack = character => new Promise(async (resolve) => {
  if (!character.animation.wannaStop) {
    character.animation.wannaStop = true;
    await character.animation.stopPromise;
    character.attack();
    spellCast(character);
    await character.animation.stopPromise;
    character.animation.wannaStop = false;
    character.stand();
    resolve();
  }
});

const die = character => new Promise(async (resolve) => {
  if (!character.animation.wannaStop) {
    character.animation.wannaStop = true;
    await character.animation.stopPromise;
    character.die();
    await character.animation.stopPromise;
    resolve();
  }
});

const getPunch = character => new Promise(async (resolve) => {
  if (!character.animation.wannaStop) {
    character.animation.wannaStop = true;
    await character.animation.stopPromise;
    character.getPunch();
    await character.animation.stopPromise;
    character.animation.wannaStop = false;
    character.stand();
    resolve();
  }
});

const heal = character => new Promise(async (resolve) => {
  if (!character.animation.wannaStop) {
    character.animation.wannaStop = true;
    await character.animation.stopPromise;
    character.heal();
    const spell = new Audio(healSound);
    spell.play();
    await character.animation.stopPromise;
    character.animation.wannaStop = false;
    character.stand();
    resolve();
  }
});

export {
  attack,
  die,
  getPunch,
  heal,
};
