<template>
  <div class="seller">
    <div class="header">
      <h2>商家名称</h2>
      <div class="desc">
        <star class="star" :score="sourceData.seller.score" :size="36"></star>
        <span class="text">({{sourceData.seller.ratingCount}})</span>
        <span class="text">({{sourceData.seller.sellCount}})</span>
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{sourceData.seller.minPrice}}</span>
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="stress">{{sourceData.seller.deliveryTime}}</span>
          </div>
        </li>
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{sourceData.seller.deliveryPrice}}</span>
          </div>
        </li>
      </ul>
    </div>
    <button @click="inc">加一</button>
    <div>{{mNum}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import star from '@/components/common/star/star'

  export default {
    data () {
      return {
        mNum: 0
      }
    },
    props: {
      sourceData: {}
    },
    components: {
      star
    },
    created () {
      this.mNum = 1
    },
    methods: {
      inc () {
        this.mNum++
      }
    }
  }
</script>

<style lang="scss" rel="" scoped="">
  .seller {
    position: absolute;
    top: 1.77rem;
    bottom: 0.46rem;
    width: 100%;
    overflow: hidden;
    z-index: 10;
    .header {
      /*width: 100%;*/
      padding: 0.18rem;
      h2 {
        margin-bottom: 0.08rem;
        line-height: 0.14rem;
        color: rgb(7, 17, 27);
        font-size: 0.14rem;
      }
      .desc {
        font-size: 0;
        line-height: 0.18rem;
        .star {
          display: inline-block;
          margin-right: 0.08rem;
          vertical-align: top;
        }
        .text {
          margin-right: 0.12rem;
          display: inline-block;
          vertical-align: top;
          line-height: 0.18rem;
          font-size: 0.1rem;
          line-height: 0.18rem;
          color: rgb(7, 17, 27);
        }
      }
      .remark {
        display: flex;
        padding-top: 0.18rem;
        width: 100%;
        .block {
          flex: 1;
          text-align: center;
          border-right: 0.01rem solid rgb(7, 17, 27);
          &:last-child {
            border: 0;
          }
        }
      }
    }

  }
</style>
