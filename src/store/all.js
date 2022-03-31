export class game {
  constructor(initPlayGround = target, initGameSize = size, initGameSpeed = speed) {
    this.Size = initGameSize;
    this.Speed = initGameSpeed;
    this.Target = initPlayGround;
    this.Snake = [];
    this.GameStartable = false;
    this.Direction = '';
  }
  /**
   * 
   * @param {HTMLElement} playground 
   * @param {Number} size 
   */
  init() {
    console.log('-- Game Init --');
    const { Size, Target, Snake } = this;
    const playground = document.getElementById(Target);
    for(let i = 1; i< Size+1; i++) {
      const div = document.createElement('div');
      div.id = i;
      div.className = 'cell';
      playground.appendChild(div);
    };
    Snake.push(45);
    this.fillColor(45, 'pink');
    this.moveListener();
  }

  fillColor(id, color) {
    document.getElementById(id).style.backgroundColor = color;
  }

  async move(dir) {
    let move;
    if (dir === 'up') {
      move = 10;
    } else if (dir === 'down') {
      move = -10;
    } else if (dir === 'left') {
      move = -1;
    } else if (dir === 'right') {
      move = +1;
    }
    const { Snake } = this;
    const isCollision = await this.collision(move,Snake);
    if(isCollision) {
      console.log('game over');
    } else {
      Snake.forEach((item, index) => {
        this.fillColor()
      });
    }
  }

  moveListener() {
    const { Direction } = this;
    window.addEventListener('keydown',((e) => {
      console.log(e);
    }), false);
  }

  gameActive() {
    const { GameStartable, Speed, Direction } = this;
    if (GameStartable) {
      move(Direction);
      setTimeout(() => {
        gameActive();
      }, Speed);
    }
  }

  async collision() {
    return true;
  }
}