import $ from 'jquery';
import './matches.css';
import 'font-awesome/css/font-awesome.css';

const newRandomIcon = () => {
  const library = [
    'bath',
    'eercast',
    'grav',
    'microchip',
    'snowflake-o',
    'superpowers',
    'wpexplorer',
    'anchor',
    'archive',
    'automobile',
    'battery',
    'bell',
    'bed',
    'bicycle',
    'beer',
    'binoculars',
    'birthday-cake',
    'bolt',
    'bomb',
    'bug',
    'bullseye',
    'camera-retro',
    'child',
    'clock-o',
    'cloud',
    'cogs',
    'cube',
    'diamond',
    'eye',
    'fire',
    'flask',
    'gamepad',
    'gavel',
    'globe',
    'gift',
    'heart',
    'key',
    'lock',
    'magic',
    'magnet',
    'money',
    'moon-o',
    'paw',
    'plane',
    'send',
    'shield',
    'space-shuttle',
    'star',
    'sun-o',
    'thumbs-o-up',
    'umbrella',
    'wrench',
  ];
  const six = [];
  for (let i = 0; i < 6; i += 1) {
    const random = Math.floor(Math.random() * library.length);
    if (six.indexOf(library[random]) === -1) {
      six.push(library[random]);
      six.push(library[random]);
    } else {
      i -= 1;
    }
  }
  const randomIcon = () => {
    const rand = Math.floor(Math.random() * six.length);
    return six.splice(rand, 1);
  };
  return randomIcon;
};
const randomIcon = newRandomIcon();


const createMatches = (modal) => {
  for (let i = 0; i < 12; i += 1) {
    $(modal).append(` 
        <div class="card-icon"> 
            <div>
            <i class="fa fa-${randomIcon()}"></i>
            </div> 
            <div class="curtain"> 
            </div> 
        </div> 
    `);
  }
};

export { createMatches as default };
