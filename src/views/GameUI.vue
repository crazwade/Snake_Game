<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import Pinia from '../store/GameInfo';

export default {
  name: 'GameUI',
  setup() {
    Pinia.init({
      playerGround: 'playground',
      cell: 144,
      speed: 500,
      head: 'orange',
      body: 'red',
    });
  },
}
</script>