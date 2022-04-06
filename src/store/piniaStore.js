import { defineStore } from 'pinia';

const storeUse = defineStore('main', {
  state: () => ({
    initPlayGround: 'Jacky',
    initGameSize: 19,
    initGameSpeed: 100,
    headColor: 'orange',
    bodyColor: 'pink',
  }),
  getters: {
    hello() {
      console.log('444555');
    }
  },
  action: {
    newGame(target, size, speed, head, body) {
      this.initPlayGround = target;
      this.initGameSize = size;
      this.initGameSpeed = speed;
      this.headColor = head;
      this.bodyColor = body;
    },
    showup() {
      console.log('88989889');
    }
  }
})

export default storeUse;