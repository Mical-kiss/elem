<template>
  <div class="shopCar">
    <div class="content">
      <div @click="toggleList" class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highLight:totalCount}">
            <i :class="{highLight:totalCount}" class="iconfont icon-gaiicon-1"></i>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highLight:totalCount}">
          {{totalPrice}}元
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name="my">
      <div class="shopCarList" v-show="listShow">
        <div class="listHeader">
          <h2 class="title">
            购物车
          </h2>
          <span class="empty" @click="empty">
          清空
        </span>
        </div>
        <div class="listContent" ref="listContent">
          <ul style="padding-bottom: 0.18rem;">
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartControl-wrapper">
                <cartControl :food="food"></cartControl>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="listShow">
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import cartControl from '@/components/common/cartControl/cartControl'
  import BScroll from 'better-scroll'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            /*  {
                price: 12,
                count: 2
              } */
          ]
        }
      },
      deliveryPrice: {},
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        listShow: false
      }
    },
    methods: {
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      toggleList () {
        if (this.totalCount) {
          this.listShow = !this.listShow
          console.log(this.$refs.listContent)
//          setTimeout(() => {
//
//          },50)
          this.$nextTick(() => {
            if (!this.listContent) {
              this.listContent = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.listContent.refresh()
            }
          })
        }
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.count
        })
        if (!total) {
          this.listShow = false
        }
        return total
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          var diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '结算'
        }
      },
      payClass () {
        if (this.totalPrice >= this.minPrice) {
          return 'enough'
        } else {
          return 'not-enough'
        }
      }
    },
    components: {
      cartControl
    }
  }
</script>

<style lang="scss" rel="" scoped="">
  @import "~@/common/scss/mixin";

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to
  {
    opacity: 0;
  }
  .my-enter-active {
    animation: bounce-in .5s;
  }
  .my-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  .shopCar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 0.48rem;
    .content {
      background-color: #141d27;
      display: flex;
      .content-left {
        flex: 1;
        font-size: 0;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -0.1rem;
          margin: 0 0.12rem;
          padding: 0.06rem;
          width: 0.56rem;
          height: 0.56rem;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            &.highLight {
              background: rgb(0, 160, 220)
            }
            i {
              font-size: 0.24rem;
              line-height: 0.44rem;
              color: #ccc;
              &.highLight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 0.24rem;
            height: 0.16rem;
            line-height: 0.16rem;
            border-radius: 0.16rem;
            font-weight: 700;
            color: #fff;
            background-color: red;
            font-size: 0.1rem;
            text-align: center;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .5);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          line-height: 0.24rem;
          margin-top: 0.12rem;
          padding-right: 0.12rem;
          border-right: 1px solid rgba(255, 255, 255, .1);
          font-size: 0.14rem;
          color: #ccc;
          font-weight: 700;
          &.highLight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          font-size: 0.14rem;
          vertical-align: top;
          margin: 0.12rem 0 0 0.12rem;
          line-height: 0.24rem;
          color: #ccc;
        }
      }
      .content-right {
        flex: 0 0 1.05rem;
        width: 1.05rem;
        .pay {
          line-height: 0.48rem;
          text-align: center;
          font-size: 0.12rem;
          color: #ccc;
          font-weight: 700;
          background: #2b333b;
          &.not-enough {
            background-color: #2b323b;
          }
          &.enough {
            background-color: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .shopCarList {
      position: absolute;
      left: 0;
      top: 0px;
      background-color: #fff;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      .listHeader {
        line-height: 0.4rem;
        height: 0.4rem;
        font-size: 0.14rem;
        padding: 0 0.18rem;
        background-color: #f4f3f7;
        border-bottom: 0.01rem solid rgba(7, 17, 27, .1);
        font-weight: 200;
        color: rgb(7, 17, 27);
        .title {
          float: left;
          font-size: 0.14rem;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 0.12rem;
          color: rgb(0, 160, 220);
        }
      }
      .listContent {
        max-height: 1.5rem;
        padding: 0 0.18rem;
        overflow: hidden;
        .food {
          position: relative;
          padding: 0.12rem 0;
          box-sizing: border-box;
          @include border-1px(rgba(7, 17, 27, .1));
          .name {
            line-height: 0.24rem;
            font-size: 0.14rem;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 0.12rem;
            line-height: 0.24rem;
            font-size: 0.14rem;
            font-weight: 900;
            color: red;
          }
          .cartControl-wrapper {
            position: absolute;
            right: 0;
            bottom: 0.06rem;
          }
        }
      }
    }
    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, .6);
      -webkit-backdrop-filter: blur(0.4rem);
      top: 0;
      left: 0;
      z-index: -2;
    }
  }
</style>
