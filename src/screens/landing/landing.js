import $ from 'jquery';
import './landing.css';
import template from './landing.html';
import screenshoot from '../../images/screenshoot.png';

class Landing {
  static render() {
    $('#main').html(template);
    $('.screenshoot')[0].src = screenshoot;
    return $('.js-start')[0];
  }
}

export default Landing;
