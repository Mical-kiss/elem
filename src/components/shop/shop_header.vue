<template>
  <div v-if="seller.description" class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" style="width:.64rem;height:.64rem" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support">
          <span class="icon" :class="supportMap[this.seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" @click="toggleCover">
        <span class="count">{{seller.supports.length}}个
          <i class="iconfont icon-gaiicon-1"></i>
        </span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="toggleCover">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-gaiicon-1"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div class="cover" v-show="coverShow">
        <div class="cover-wrapper clearfix">
          <div class="cover-main">
            <div class="name">
              <h2>{{seller.name}}</h2>
              <v-star :size="48" :score="seller.score"></v-star>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="support">
                <li class="support-item" v-for="item in seller.supports">
                  <span class="icon" :class="supportMap[item.type]"></span>
                  <span>{{item.description}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="cover-close">
          <i class="iconfont icon-gaiicon-1" @click="toggleCover"></i>
        </div>
      </div>
    </transition>

  </div>

</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import star from '@/components/common/star/star.vue'

  export default {
    name: 'Header',
    data () {
      return {
        coverShow: false
      }
    },
    props: {
      seller: {}
    },
    created () {
      this.supportMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    methods: {
      toggleCover () {
        this.coverShow = !this.coverShow
      }
    },
    computed: {
      imgName () {
        switch (this.seller.supports[0].type) {
          case (0):
            return 'decrease'
          case (1):
            return 'decrease'
          case (2):
            return 'decrease'
          case (3):
            return 'decrease'
          case (4):
            return 'special'
        }
      }
    },
    components: {
      'v-star': star
    }
  }
</script>

<style lang="scss" rel="" scoped="">
  @import "~@/common/scss/mixin";
  /*@import '~@/common/scss/index.scss';*/
  /*@import '../../common/scss/index.scss';*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .header {
    color: #fff;
    background: rgba(7, 17, 27, .5);
    position: relative;
    overflow: hidden;
    .content-wrapper {
      padding: 0.24rem 0.12rem 0.18rem 0.24rem;
      font-size: 0;
      position: relative;
      .avatar {
        display: inline-block;
        vertical-align: top;
        img {
          border-radius: 0.02rem;
        }
      }
      .content {
        display: inline-block;
        font-size: 0.14rem;
        margin-left: 0.16rem;
        .title {
          margin: 0.02rem 0 0.08rem 0;
          .brand {
            display: inline-block;
            width: 0.3rem;
            height: 0.18rem;
            @include bg-img(img/brand);
            background-size: 0.3rem 0.18rem;
            vertical-align: bottom;
          }
          .name {
            margin-left: 0.06rem;
            font-size: 0.16rem;
            line-height: 0.18rem;
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 0.1rem;
          line-height: 0.12rem;
          font-size: 0.12rem;
        }
        .support {
          .icon {
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
            margin-right: 0.04rem;
            vertical-align: bottom;
            background-size: 0.12rem 0.12rem;
            &.decrease {
              @include bg-img(img/decrease_1);
            }
            &.discount {
              @include bg-img(img/discount_1);
            }
            &.guarantee {
              @include bg-img(img/guarantee_1);
            }
            &.invoice {
              @include bg-img(img/invoice_1);
            }
            &.special {
              @include bg-img(img/special_1);
            }
          }
          .text {
            font-size: 0.1rem;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 0.12rem;
        bottom: 0.18rem;
        padding: 0 0.08rem;
        border-radius: 0.14rem;
        background: rgba(0, 0, 0, .2);
        text-align: center;
        .count {
          font-size: 0.1rem;
          line-height: 0.24rem;
          i {
            font-size: 0.1rem;
            margin-left: 0.02rem;
          }
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 0.28rem;
      padding: 0 0.22rem 0 0.12rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7, 17, 27, .2);
      .bulletin-title {
        vertical-align: middle;
        display: inline-block;
        width: 0.22rem;
        height: 0.12rem;
        @include bg-img(img/bulletin);
        background-size: 0.22rem 0.12rem;
      }
      .bulletin-text {
        line-height: 0.28rem;
        vertical-align: middle;
        font-size: 0.1rem;
        margin: 0 0.04rem;
      }
      i {
        position: absolute;
        display: inline-block;
        font-size: 0.1rem;
        right: 0.12rem;
        top: 0.08rem;
      }
    }
    .background {
      position: absolute;
      top: -0.8rem;
      left: 0;
      z-index: -1;
      filter: blur(.04rem);
      width: 100%;
      img {
        width: 100%;
      }
    }
    .cover {
      -webkit-backdrop-filter: blur(0.08rem);
      position: fixed;
      background: rgba(7, 17, 27, .8);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      overflow: auto;
      .cover-wrapper {
        min-height: 100%;
        overflow: hidden;
        .cover-main {
          padding-top: 0.64rem;
          margin-top: 0.64rem;
          padding-bottom: 0.64rem;
          .name {
            h2{
              text-align: center;
              font-size: 0.16rem;
              font-weight: bold;
              line-height: 0.16rem;
            }
            .star {
              text-align: center;
              line-height: 0.24rem;
              margin-top: 0.18rem;
              padding: 0.02rem 0;
            }
            .title {
              display: flex;
              width: 80%;
              margin: 0.28rem auto 0.24rem auto;
              .line {
                flex: 1;
                position: relative;
                top: -0.08rem;
                border-bottom: 1px solid rgba(255, 255, 255, .2);
              }
              .text {
                padding: 0 0.12rem;
                font-size: 0.14rem;
                font-weight: bold;
              }
            }
            .support {
              width: 80%;
              margin: 0 auto;
              text-align: left;
              .icon {
                display: inline-block;
                width: 0.12rem;
                height: 0.12rem;
                margin-right: 0.04rem;
                vertical-align: bottom;
                background-size: 0.12rem 0.12rem;
                &.decrease {
                  @include bg-img(img/decrease_1);
                }
                &.discount {
                  @include bg-img(img/discount_1);
                }
                &.guarantee {
                  @include bg-img(img/guarantee_1);
                }
                &.invoice {
                  @include bg-img(img/invoice_1);
                }
                &.special {
                  @include bg-img(img/special_1);
                }
              }
            }

          }
        }
      }
      .cover-close {
        position: relative;
        /*width:0.32rem;*/
        /*height:0.32rem;*/
        margin: -0.64rem auto 0 auto;
        clear: both;
        font-size: .32rem;
        text-align: center;
        line-height: 1;
      }
    }
  }
</style>
