let Direction;
let GameStatement;
let isFoodExist= false;
let FoodLocation;
let GameOver = false;
let BorderCollision = null;
let Score = 0;
let GameTime = 0;

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
  // 初始化
  init() {
    this.gameInfo();
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
    Snake.push(3);
    this.fillColor(3, headColor);
    Snake.push(2);
    this.fillColor(2, bodyColor);
    Snake.push(1);
    this.fillColor(1, bodyColor);
    this.moveListener();
    GameStatement = false;
  }
  // 遊戲開始
  gameStart() {
    GameStatement = true;
    this.gameActiveLoop();
    this.goTime();
  }
  // 主控制台
  gameActiveLoop() {
    const { Speed } = this;
    if (GameStatement) {
      setTimeout(() => {
        this.move(Direction);
        this.collision();
        this.produceFood();
        this.gameActiveLoop();
      }, Speed);
    }
  }
  goTime() {
    if (GameStatement) {
      setTimeout(() => {
        GameTime += 1;
        this.gameInfo();
        this.goTime();
      }, 1000);
    }
  }
  // 移動上顏色
  fillColor(id, color) {
    document.getElementById(id).style.backgroundColor = color;
  }
  // 移動去除顏色
  removeColor(id) {
    document.getElementById(id).style = '';
  }
  // 移動
  async move(dir) {
    const { moveCell, Snake, headColor, bodyColor } = this;
    console.log(Snake);
    console.log(`--行動方向-- 方向:${dir}`);
    let move;
    if (dir === 'up') {
      move = -moveCell;
    } else if (dir === 'down') {
      move = moveCell;
    } else if (dir === 'left') {
      move = -1;
    } else if (dir === 'right') {
      move = +1;
    }
    if(!GameStatement) {
      console.log('game over');
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
  // 監聽事件 上下左右
  // 進入遊戲後直到上下左右被點擊後 遊戲開始
  moveListener() {
    window.addEventListener('keydown',((e) => {
      if(!GameOver) {
        if(e.code === 'ArrowUp') {
          if(Direction !== 'down') Direction = 'up';
          if(!GameStatement) this.gameStart();
        } else if (e.code === 'ArrowDown') {
          if(Direction !== 'up') Direction = 'down';
          if(!GameStatement) this.gameStart();
        } else if (e.code === 'ArrowLeft') {
          if(Direction !== 'right') Direction = 'left';
          if(!GameStatement) this.gameStart();
        } else if (e.code === 'ArrowRight') {
          if(Direction !== 'left') Direction = 'right';
          if(!GameStatement) this.gameStart();
        }
      }
    }), false);
  }
  // 食物產生
  produceFood() {
    const { Snake, Speed } = this;
    if(!isFoodExist & Math.floor(Math.random() * 10) < (Speed/100)*2) { 
      const getFoodLocation = Math.floor(Math.random() * 100);
      if(!Snake.includes(getFoodLocation)){
        console.log(getFoodLocation);
        document.getElementById(getFoodLocation).classList.add('apple');
        FoodLocation = getFoodLocation;
        isFoodExist = true;
        console.log('---Food Born---');
      }
    }
  }
  // 碰撞事件(3)
  collision() {
    const { Snake, Speed, moveCell } = this;
    // 檢查吃到食物
    if(isFoodExist) {
      if(Snake[0] === FoodLocation) {
        document.getElementById(FoodLocation).classList.remove('apple');
        Score += 1;
        this.gameInfo();
        setTimeout(() => {
          isFoodExist = false;
          Snake.push(Snake[Snake.length-1]);
        }, Speed)
      }
    }
    // 碰到身體
    const snakeBody = [...Snake];
    snakeBody.shift();
    if(snakeBody.includes(Snake[0])) {
      console.log('撞到身體了');
      GameStatement = false;
      GameOver = true;
      document.getElementById('gameover_body').style.display = 'block';
    }
    // 碰到牆壁
    if(Snake[1]%moveCell === 0 && Snake[0]%moveCell === 1) {
      console.log('撞牆');
      GameStatement = false;
      GameOver = true;
      document.getElementById('gameover_border').style.display = 'block';
    } else if (Snake[0]%moveCell === 0 && Snake[1]%moveCell === 1) {
      console.log('撞牆');
      GameStatement = false;
      GameOver = true;
      document.getElementById('gameover_border').style.display = 'block';
    } else if (Snake[0] <= moveCell) {
      if(BorderCollision === null) {
        BorderCollision = Snake[0];
      }else if(BorderCollision != Snake[0]) {
        BorderCollision = Snake[0];
      }else if(BorderCollision === Snake[0]) {
        console.log('撞牆');
        GameStatement = false;
        GameOver = true;
        document.getElementById('gameover_border').style.display = 'block';
      }
    } else if (Snake[0] > (moveCell * moveCell - moveCell)) {
      if(BorderCollision === null) {
        BorderCollision = Snake[0];
      }else if(BorderCollision != Snake[0]) {
        BorderCollision = Snake[0];
      }else if(BorderCollision === Snake[0]) {
        console.log('撞牆');
        GameStatement = false;
        GameOver = true;
        document.getElementById('gameover_border').style.display = 'block';
      }
    } else {
      BorderCollision = null;
    }
  }
  // 得分&經過時間
  gameInfo() {
    document.getElementById('score').innerHTML = Score;
    if(GameTime< 61){
      document.getElementById('passtime').innerHTML = `${GameTime} 秒`;
    } else {
      const min = Math.floor(GameTime/60);
      const sec = GameTime%60;
      document.getElementById('passtime').innerHTML = `${min} 分 ${sec} 秒`;
    }
  }
}