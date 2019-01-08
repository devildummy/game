import $ from 'jquery';
import './landing.css';
import template from './landing.html';

class Landing {
  static render() {
    $('#main').html(template);
    return $('.js-start')[0];
  }
}

export default Landing;
