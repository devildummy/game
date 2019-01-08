import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/sortable.css';
import './spells.css';
import './balloon/balloon.css';
import Checker from '../checker/checker';
import template from './spells.html';
import mathTemplate from './math/math.html';
import translateTemplate from './translate/translate.html';
import dragNdropTemplate from './dragNdrop/dragNdrop.html';
import audTemplate from './aud/aud.html';
import speechTemplate from './speech/speech.html';
import Balloons from './balloon/balloon';
import balloonsTemplate from './balloon/balloon.html';
import createMatches from './matches/matches';
import matchesTemplate from './matches/matches.html';
import { bindToKey, unbind } from '../keyInfo/keyinfo';

const answerSpell = async (options) => {
  $('.modal-body').append(options.template);
  $('.question').append(options.question);
  if (options.additional) {
    for (let i = 0; i < options.additional.length; i += 1) {
      $('.js-answer').append(`<div class="letter ml-2">${options.additional[i]}</div>`);
    }
    $('.js-answer').sortable({
      axis: 'x',
      appendTo: $('.js-example'),
    });
    $('.js-example').submit((e) => {
      e.preventDefault();
      $('body').off('click');
      $('.js-answer').val(
        Array.from($('.letter')).reduce((accumulator, item) => accumulator + $(item).text(), ''),
      );
    });
  }
  return new Promise((resolve) => {
    $(options.modal).modal({
      backdrop: false,
      keyboard: false,
    });
    if (!options.additional) {
      let fixModal = 0;
      $(options.modal).on('transitionend', () => {
        fixModal += 1;
        if (fixModal === 3) {
          if ($('.js-answer').length && !$('.js-answer').hasClass('d-none')) {
            bindToKey($('.js-answer'), 'space');
          }
          if ($('.btn-primary').length) {
            bindToKey($('.btn-primary'), 'enter');
          }
          if ($('.second-btn').length) {
            bindToKey($('.second-btn'), 'one');
          }
        }
      });
    }

    $('.js-example').submit(async (e) => {
      e.preventDefault();
      $(options.modal).modal('toggle');
      $(options.modal).on('hidden.bs.modal', () => {
        $(options.modal).remove();
      });
      let isCorrect = false;
      options.answer.forEach((item) => {
        if ($('.js-answer').val().toLowerCase().replace(/\s/g, '') === item.toString(10).toLowerCase()) {
          isCorrect = true;
        }
      });
      unbind();
      $('body').unbind('click');
      await Checker.render(isCorrect, options.answer);
      resolve([
        isCorrect,
        options.heal,
      ]);
    });
  });
};
const randomArrayFromString = (string) => {
  const defaultArray = string.split('');
  const randomArray = [];
  while (defaultArray.length) {
    const pos = Math.floor(Math.random() * (defaultArray.length - 1));
    randomArray.push(defaultArray.splice(pos, 1));
  }
  return randomArray;
};
const balloonCatcher = (e, balloons) => {
  const mouseX = e.pageX - $(e.target).offset().left;
  const mouseY = e.pageY - $(e.target).offset().top;
  const deleteIndex = [];
  balloons.balloonList.forEach((balloon, index) => {
    // eslint-disable-next-line max-len
    if (mouseX >= balloon.left && mouseX <= balloon.left + balloons.width && mouseY >= balloon.top && mouseY <= balloon.top + balloons.height) {
      if (balloon.type === 'balloon') {
        deleteIndex.push(index);
      } else {
        balloons.stop = true;
        return false;
      }
    }
  });
  deleteIndex.forEach((index) => {
    balloons.balloonList.splice(index, 1);
  });
};
const matchCatcher = (e, temp, resolve) => {
  if ($(e.target).hasClass('curtain')) {
    $(e.target).animate({ left: '-110%' }, 500).delay(500);
    if (temp.opened) {
      if ($(temp.opened).find('i').attr('class') === $(e.target).parent().find('i').attr('class')) {
        $(temp.opened).css('background', 'rgb(0, 255, 0)');
        $(e.target).parent().css('background', 'rgb(0, 255, 0)');
        temp.resolveCount += 1;
        if (temp.resolveCount === 6) {
          resolve(true);
        }
      } else {
        $(e.target).animate({ left: '0' }, 500);
        $(temp.opened).find('.curtain').animate({ left: '0' }, 500);
        $('.count').text($('.count').text() - 1);
        if ($('.count').text() === '0') {
          resolve(false);
        }
      }
      temp.opened = null;
    } else {
      temp.opened = e.target.parentNode;
    }
  }
};
class Spells {
  static render() {
    $('#main').append(template);
    return $('.task');
  }

  static async math(example) {
    const options = {
      modal: Spells.render(),
      template: mathTemplate,
      question: `Сколько будет ${example.left} ${example.operator} ${example.right} ?`,
      answer: [example.answer],
      heal: false,
    };
    const isTrue = await answerSpell(options);
    return isTrue;
  }

  static async translate(words) {
    const options = {
      modal: Spells.render(),
      template: translateTemplate,
      question: `Как переводится ${words.eng}?`,
      answer: words.ru.split(' '),
      heal: true,
    };
    const isTrue = await answerSpell(options);
    return isTrue;
  }

  static async dragNdrop(words) {
    const minimizedWord = words.eng.split(' ').splice(0, 1).join('');
    const options = {
      modal: Spells.render(),
      template: dragNdropTemplate,
      question: 'Расставь в нужном порядке буквы, что бы получилось слово',
      additional: randomArrayFromString(minimizedWord).join(''),
      answer: [minimizedWord],
      heal: true,
    };
    const isTrue = await answerSpell(options);
    return isTrue;
  }

  static async aud(words) {
    const minimizedWord = words.eng.split(' ').splice(0, 1).join('');
    const options = {
      modal: Spells.render(),
      template: audTemplate,
      question: 'Напиши произнесенное слово',
      answer: [minimizedWord],
      heal: false,
    };

    $('body').click((e) => {
      if ($(e.target).hasClass('js-speak')) {
        const speech = new SpeechSynthesisUtterance(minimizedWord);
        speech.lang = 'en-US';
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
      }
    });
    const isTrue = await answerSpell(options);
    return isTrue;
  }

  static async speech(words) {
    const minimizedWord = words.eng.split(' ').splice(0, 1).join('');
    const options = {
      modal: Spells.render(),
      template: speechTemplate,
      question: `Произнеси слово ${minimizedWord}`,
      answer: [minimizedWord],
      heal: true,
    };
    $('body').click((e) => {
      if ($(e.target).hasClass('js-speech') || $(e.target).hasClass('fa')) {
        // eslint-disable-next-line no-undef
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        $('.js-speech').removeClass('btn-light');
        $('.js-speech').addClass('btn-danger');

        recognition.onresult = (event) => {
          $('.js-speech').removeClass('btn-danger');
          $('.js-speech').addClass('btn-light');
          const result = event.results[event.resultIndex];
          $('.js-answer').val(result[0].transcript).submit();
        };
        recognition.start();
      }
    });
    const isTrue = await answerSpell(options);
    return isTrue;
  }

  static async balloons(description) {
    const modal = Spells.render();
    $('.modal-body').append(balloonsTemplate);
    $('.question').append(description);
    const balloonElement = $('.balloons')[0];
    $(modal).modal({
      backdrop: false,
      keyboard: false,
    });
    const balloons = new Balloons(balloonElement, $(modal).find('.modal-dialog'));
    balloons.step();
    $(balloonElement).click((event) => {
      balloonCatcher(event, balloons, $(modal).find('.modal-dialog'));
    });
    return new Promise(async (resolve) => {
      const isTrue = await balloons.tryWin;
      $(balloonElement).unbind('click');
      $(modal).modal('toggle');
      $(modal).on('hidden.bs.modal', () => {
        $(modal).remove();
      });
      resolve([isTrue, false]);
    });
  }

  static async matches(description) {
    const modal = Spells.render();
    $('.modal-body').append(matchesTemplate);
    $('.question').append(description);
    $(modal).modal({
      backdrop: false,
      keyboard: false,
    });
    createMatches(modal.find('.matches'));
    return new Promise(async (resolve) => {
      const promise = new Promise((secondResolve) => {
        const temp = {
          opened: null,
          resolveCount: 0,
        };
        $(modal).find('.matches').click((event) => {
          matchCatcher(event, temp, secondResolve);
        });
      });
      const isTrue = await promise;
      $(modal).find('.matches').unbind('click');
      $(modal).modal('toggle');
      $(modal).on('hidden.bs.modal', () => {
        $(modal).remove();
      });

      resolve([isTrue, false]);
    });
  }
}


export { Spells as default };
