<template>
  <div class="content">
    <div class="snake_img" />
    <div @click="start()" class="play_btn" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Index',
  setup () {
    const router = useRouter();
    const start = () => {
      router.push({path: '/Snake'});
    }
    return {
      start,
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    .snake_img {
      width: 600px;
      height: 500px;
      background: url('../assets/snake.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      margin-bottom: 50px;
    }
    .play_btn {
      animation: crescendo 1.5s alternate infinite ease-in;
      width: 300px;
      height: 200px;
      background: url('../assets/play.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .play_btn:hover {
      background: url('../assets/play_hover.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @keyframes crescendo {
    0%   {transform: scale(1);}
    100% {transform: scale(1.2);}
  }
</style>
