let Direction;
let GameStartable;
export class game {
  constructor(initPlayGround = target, initGameSize = size, initGameSpeed = speed, headColor, bodyColor) {
    this.Size = initGameSize;
    this.Speed = initGameSpeed;
    this.Target = initPlayGround;
    this.Snake = [];
    this.moveCell = Math.floor(Math.sqrt(initGameSize));
    this.headColor = headColor;
    this.bodyColor = bodyColor;
  }
  init() {
    console.log('-- Game Init --');
    const { Size, Target, Snake, moveCell, headColor, bodyColor } = this;
    const playground = document.getElementById(Target);
    playground.style = `height:${moveCell*50}px;width:${moveCell*50}px;`;
    for(let i = 1; i< Size+1; i++) {
      const div = document.createElement('div');
      div.id = i;
      div.className = 'cell';
      playground.appendChild(div);
    };
    Snake.push(128);
    this.fillColor(128, headColor);
    Snake.push(129);
    this.fillColor(129, bodyColor);
    Snake.push(130);
    this.fillColor(130, bodyColor);
    Snake.push(131);
    this.fillColor(131, bodyColor);
    this.moveListener();
    GameStartable = false;
  }

  fillColor(id, color) {
    document.getElementById(id).style.backgroundColor = color;
  }

  removeColor(id) {
    document.getElementById(id).style = '';
  }

  async move(dir) {
    const { moveCell, Snake, headColor, bodyColor } = this;
    console.log(`--方向改變-- 方向:${dir}`);
    let move;
    if (dir === 'up') {
      move = -moveCell;
    } else if (dir === 'down') {
      move = +moveCell;
    } else if (dir === 'left') {
      move = -1;
    } else if (dir === 'right') {
      move = +1;
    }
    const isCollision = await this.collision(move,Snake);
    if(isCollision) {
      console.log('game over');
      GameStartable = false;
    } else {
      let tmp;
      Snake.forEach((item, index) => {
        if (index === 0) {
          this.fillColor(item + move, headColor);
          this.removeColor(item);
          Snake[index] = item + move;
          tmp = item;
        } else {
          let switchTmp = Snake[index];
          Snake[index] = tmp;
          this.fillColor(tmp, bodyColor);
          this.removeColor(switchTmp);
          tmp = switchTmp;
        }
      });
    }
  }

  moveListener() {
    window.addEventListener('keydown',((e) => {
      if(e.code === 'ArrowUp') {
        if(Direction !== 'down') Direction = 'up';
        if(!GameStartable) this.gameStart();
      } else if (e.code === 'ArrowDown') {
        if(Direction !== 'up') Direction = 'down';
        if(!GameStartable) this.gameStart();
      } else if (e.code === 'ArrowLeft') {
        if(Direction !== 'right') Direction = 'left';
        if(!GameStartable) this.gameStart();
      } else if (e.code === 'ArrowRight') {
        if(Direction !== 'left') Direction = 'right';
        if(!GameStartable) this.gameStart();
      }
    }), false);
  }

  gameStart() {
    GameStartable = true;
    this.gameActive();
  }

  gameActive() {
    const { Speed } = this;
    if (GameStartable) {
      this.move(Direction);
      setTimeout(() => {
        this.gameActive();
      }, Speed);
    }
  }

  async collision() {
    return false;
  }
}