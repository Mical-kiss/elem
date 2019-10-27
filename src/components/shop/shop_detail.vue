<template>
  <transition name="fade">
    <div class="food-wrapper" v-if="showFlag" ref="foodWrapper">
      <div class="food">
        <div class="image-header">
          <img :src="food.image" alt="">
          <i class="iconfont icon-gaiicon-1" @click="hide"></i>
        </div>
        <div class="content">
          <h2 class="title">
            {{food.name}}
          </h2>
          <div class="detail">
          <span class="sell-count">
            月售{{food.sellCount}}
          </span>
            <span class="rating">
            好评率{{food.rating}}
          </span>
          </div>
        </div>
        <div class="ratingTab-wrapper">
          <ratingTab @to-parent="getChild"></ratingTab>
        </div>
        <div class="rating-wrapper">
          <ul>
            <li v-for="item in ratings">
              {{item.rateType}}
            </li>
          </ul>
        </div>
      </div>
    </div>

  </transition>


</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll'
  import ratingTab from '@/components/common/ratingTab/ratingTab.vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        ratings: []
      }
    },
    mounted () {
      this.ratings = this.food.ratings
    },
    methods: {
      getChild (data) {
        if (data === 2) {
          this.ratings = this.food.ratings
          return
        }
        this.ratings = this.food.ratings.filter((value) => {
          return value.rateType === data
        })
      },
      show () {
        this.showFlag = true
        this.$nextTick(() => {
//          重新给数据，使得数据更新
          this.ratings = this.food.ratings
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      }
    },
    components: {
      ratingTab
    }
  }
</script>

<style lang="scss" rel="" scoped="">
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0)

  }

  .food-wrapper {
    position: fixed;
    left: 0px;
    top: 0px;
    overflow: hidden;
    bottom: 0.48rem;
    right: 0;
    z-index: 10;
    background-color: #fff;
    .food {
      min-height: 100%;
      .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        i {
          position: absolute;
          top: 0.1rem;
          left: 0.1rem;
          padding: 0.1rem;
          color: #cccccc;
        }
      }
      .content {
        padding: 0.18rem;
        .title {
          line-height: 0.14rem;
          margin-bottom: 0.08rem;
          font-size: 0.14rem;
          font-weight: 700;
        }
        .detail {
          margin-bottom: 0.18rem;
          line-height: 0.1rem;
        }
      }
    }

  }
</style>
