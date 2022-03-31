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
      const Game = new game('playground', 100, 1000);
      Game.init();
    });
    return {

    }
  }
}
</script>

<style lang="scss">
  .content {
    height: 500px;
    width: 500px;
    display: flex;
    flex-wrap: wrap;
    .cell {
      height: 48px;
      width: 48px;
      border: 1px black solid;
    }
  }
</style>
