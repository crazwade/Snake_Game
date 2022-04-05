<template>
  <div class="content" id="playground">
    
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { game } from '../store/all';

export default {
  name: 'Index',
  setup () {
    onMounted(() => {
      /**
       * 
       * @param {String} = 遊戲場的Element id 
       * @param {Number} - 遊戲面積 (須為有正平方根的數 e.q. 9 16 25 36 ...)
       * @param {Number} - 蛇的移動速度(e.q. 100 200 500 1000 ...)
       * @param {String} - 蛇頭的顏色 (e.q. 'pink' 'black')
       * @param {String} - 蛇身體的顏色 (e.q. 'pink' 'black')
       */
      const Game = new game('playground', 144, 500, 'orange', 'red');
      Game.init();
    });
    return {

    }
  }
}
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-wrap: wrap;
    .cell {
      height: 48px;
      width: 48px;
      border: 1px black solid;
    }
  }
</style>
