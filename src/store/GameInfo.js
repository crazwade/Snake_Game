import { defineStore } from 'pinia';

export const useStore = defineStore('Store', {
  state: () => ({ 
    playerGround: 'playground' ,
    cell: 144,
    speed: 500,
    head: 'orange',
    body: 'red',

  }),
  actions: {
    init(x) {
      this.playerGround = x.playerGround;
      this.cell = x.cell;
      this.speed = x.speed;
      this.head = x.head;
      this.body = x.body;
    }
  }
})