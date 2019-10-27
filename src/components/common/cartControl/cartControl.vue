<template>
  <div class="cartControl">
    <transition name="bounce">
      <span v-show="food.count>0" style="display: inline-block;">
        <div class="cart-decrease iconfont icon-gaiicon-1" @click.stop="decreaseCart">
        </div>
        <div class="cart-count">{{food.count}}</div>
      </span>
    </transition>
    <div class="cart-add iconfont icon-gaiicon-2" @click.stop="addCart"></div>
    <ul class="circle">
      <li v-show=""></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object,
        default () {
        }
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {

        } else {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="scss" rel="" scoped="">
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .cartControl {
    font-size: 0;
    .cart-decrease, .cart-add {
      display: inline-block;
      padding: 6px;
      font-size: 0.24rem;
      line-height: 0.24rem;
      color: rgb(0, 160, 220);
    }
    .cart-count {
      display: inline-block;
      width: 0.12rem;
      padding-top: 0.06rem;
      line-height: 0.24rem;
      font-size: 0.12rem;
      color: #666;
      vertical-align: top;
      text-align: center;
    }
    .circle li {
      position: absolute;
      background: #000;
      width: 0.1rem;
      height: 0.1rem;
      top: 50%;
      left: 0;
      border-radius: 50%;
    }
  }
</style>
