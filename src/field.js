'use strict'; 
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
})

export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick)
    } 

    init() {
        this.field.innerHTML = '';
        this._createItem('carrot', this.carrotCount, 'img/carrot.png');
        this._createItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _createItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - (CARROT_SIZE * 2 + 10);
      
        for (let i = 0; i < count; i++) {
          const item = document.createElement('IMG');
          item.setAttribute('src', imgPath);
          item.setAttribute('class', className);
          item.style.position = 'absolute';
          const x = RandomNumber(x1, x2);
          const y = RandomNumber(y1, y2);
          item.style.left = `${x}px`;
          item.style.top = `${y}px`;
          this.field.appendChild(item);
        }
      }

    //for binding
    onClick = (event) => {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
            this.onClick
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
            
        }
}

function RandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  