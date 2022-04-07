<template>
  <div class="gameControl" id="gameControl">
    <div class="game_title">遊戲設定</div>
    <div class="selectArea">
      <label for="">請選擇地圖大小</label>
      <select name="size" id="size">
        <option value="100">小地圖</option>
        <option value="169">中地圖</option>
        <option value="256">大地圖</option>
      </select>
    </div>
    <div class="selectArea">
      <label for="">請選擇難度</label>
      <select name="speed" id="speed">
        <option value="150">簡單</option>
        <option value="100">中等</option>
        <option value="50">困難</option>
      </select>
    </div>
    <div class="selectArea">
      <label >請選擇頭的顏色</label>
      <select name="head" id="head" @change="SelectColor('head')" style="background-color: red;">
        <option value="red" style="background-color: red;"></option>
        <option value="#AE57A4" style="background-color: #AE57A4;"></option>
        <option value="pink" style="background-color: pink;"></option>
        <option value="#930000" style="background-color: #930000;"></option>
        <option value="	#FF5151" style="background-color: #FF5151;"></option>
      </select>
    </div>
    <div class="selectArea">
      <label >請選擇身體的顏色</label>
      <select name="body" id="body" @change="SelectColor('body')" style="background-color:#66B3FF;">
        <option value="#FF8000" style="background-color: #FF8000;"></option>
        <option value="#66B3FF" style="background-color: #66B3FF;"></option>
        <option value="#02F78E" style="background-color: #02F78E;"></option>
        <option value="#FFD306" style="background-color: #FFD306;"></option>
        <option value="#949449" style="background-color: #949449;"></option>
      </select>
    </div>
    <div @click="GameStart()" class="gameStart" />
  </div>
  <div class="content" id="playground">
    <div class="gameover" id="gameover_body" />
    <div class="gameover" id="gameover_border" />
  </div>
  <div class="gameBoard" id="gameBoard">
    <div class="area">
      <div class="title">得分</div>
      <div id="score">10</div>
      <div class="unit">分</div>
    </div>
    <div class="area">
      <div class="title">遊戲時間  </div>
      <div id="passtime">10</div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { game } from '../store/all';


export default {
  name: 'GameUI',
  setup() {
    const SelectColor = (id) => {
      var e = document.getElementById(id).value;
      document.getElementById(id).style.backgroundColor = e;
    };
    onMounted(() => {
      document.getElementById('playground').style.display = 'none';
      document.getElementById('gameBoard').style.display = 'none';
      document.getElementById('gameControl').style.display = 'block';
    });
    const GameStart = () => {
      const gameSize = document.getElementById('size').value;
      const gameSpeed = document.getElementById('speed').value;
      const gameHead = document.getElementById('head').value;
      const gameBody = document.getElementById('body').value;
      /**
       * 
       * @param {String} = 遊戲場的Element id 
       * @param {Number} - 遊戲面積 (須為有正平方根的數 e.q. 9 16 25 36 ...)
       * @param {Number} - 蛇的移動速度(e.q. 100 200 500 1000 ...)
       * @param {String} - 蛇頭的顏色 (e.q. 'pink' 'black')
       * @param {String} - 蛇身體的顏色 (e.q. 'pink' 'black')
       */
      const Game = new game('playground', parseInt(gameSize), parseInt(gameSpeed), gameHead, gameBody);
      Game.init();
      document.getElementById('playground').style.display = 'flex';
      document.getElementById('gameControl').style.display = 'none';
      document.getElementById('gameBoard').style.display = 'flex';
    }
    return {
      SelectColor,
      GameStart,
    }
  },
}
</script>

<style lang="scss">
  #gameBoard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .area {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 10px 20px;
      font-size: 24px;
      font-weight: 700;
      #score {
        color: red;
      }
      #passtime {
        color: blue;
      }
    }
  }
  .gameControl {
    .game_title {
      font-size: 48px;
      font-weight: 700;
      text-align: center;
      color: brown;
      margin-bottom: 20px;
    }
    .selectArea {
      font-size: 24px;
      font-weight: 700;
      padding: 10px 0px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 300px;
      select {
        font-size: 20px;
        font-weight: 700;
        width: 100px;
        option {
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
    .gameStart {
      animation: crescendo 1.5s alternate infinite ease-in;
      margin-top: 20px;
      width: 315px;
      height: 180px;
      background: url('../assets/ready.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .gameStart:hover {
      background: url('../assets/ready_hover.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  #playground {
    background: url('../assets/grass.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .cell {
      height: 50px;
      width: 50px;
      &.apple {
        background: url('../assets/apple.png');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
    .gameover {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      height: 250px;
    }
    #gameover_body {
      background: url('../assets/gameover_body.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    #gameover_border {
      background: url('../assets/gameover_border.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  @keyframes crescendo {
    0%   {transform: scale(1);}
    100% {transform: scale(1.1);}
  }
</style>