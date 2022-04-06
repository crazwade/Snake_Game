<template>
  <div class="gameControl" id="gameControl">
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
        <option value="300">簡單</option>
        <option value="200">中等</option>
        <option value="100">困難</option>
      </select>
    </div>
    <div class="selectArea">
      <label >請選擇頭的顏色</label>
      <select name="head" id="head" @change="SelectColor('head')" style="background-color: red;">
        <option value="red" style="background-color: red;"></option>
        <option value="#AE57A4" style="background-color: #AE57A4;"></option>
        <option value="pink" style="background-color: pink;"></option>
      </select>
    </div>
    <div class="selectArea">
      <label >請選擇身體的顏色</label>
      <select name="body" id="body" @change="SelectColor('body')" style="background-color:#66B3FF;">
        <option value="#66B3FF" style="background-color: 	#66B3FF;"></option>
        <option value="#02F78E" style="background-color: #02F78E;"></option>
        <option value="#FFD306" style="background-color: #FFD306;"></option>
      </select>
    </div>
    <div @click="GameStart()" class="gameStart" />
  </div>
  <div class="content" id="playground">
    <div class="gameover" id="gameover_body" />
    <div class="gameover" id="gameover_border" />
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
    }
    return {
      SelectColor,
      GameStart,
    }
  },
}
</script>

<style lang="scss">
  .gameControl {
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
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .cell {
      height: 48px;
      width: 48px;
      border: 1px black solid;
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