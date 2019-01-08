import $ from 'jquery';
import './keyinfo.css';

const keys = {
  SPACE: 32,
  ENTER: 13,
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  FIVE: 53,
  SIX: 54,
  SEVEN: 55,
};
const keysLib = {};

const unbind = (isResize) => {
  if (!isResize) {
    Object.keys(keysLib).forEach((property) => {
      delete keysLib[property];
    });
  }
  $('.key-info').remove();
  $(window).unbind('resize', 'keypress');
};

const bindToKey = (element, key) => {
  keysLib[key] = element;
  const width = $(element).outerWidth();
  const height = $(element).outerHeight();
  const { left, top } = $(element).offset();
  $('body').append(`<div class="key-info">#${key}</div>`);
  $('.key-info').last().css('left', `${left + width}px`);
  $('.key-info').last().css('top', `${top + height / 2 - ($('.key-info').outerHeight() / 2)}px`);
  $(window).resize(() => {
    unbind(true);
    Object.keys(keysLib).forEach((keyLib) => {
      bindToKey(keysLib[keyLib], keyLib);
    });
  });
  $('body').keypress((e) => {
    if (e.keyCode === keys[key.toUpperCase()]) {
      $(element).focus();
      $(element).click();
    }
  });
};

export { bindToKey, unbind };
