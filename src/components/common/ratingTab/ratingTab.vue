<template>
  <div class="ratingTab">
    <span class="tabList1" @click="tabChange(2)" :class="{active:tabSellect===2}">{{sourceData.tabList1}}</span>
    <span class="tabList1" @click="tabChange(0)" :class="{active:tabSellect===0}">{{sourceData.tabList2}}</span>
    <span class="tabList3" @click="tabChange(1)" :class="{active:tabSellect===1}">{{sourceData.tabList3}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2
  //  const PS = 0
  //  const NG = 1
  export default {
    props: {
      sourceData: {
        type: Object,
        default () {
          return {
            tabList1: '全部',
            tabList2: '推荐',
            tabList3: '吐槽'
          }
        }
      }
    },
    data () {
      return {
        tabSellect: ALL
      }
    },
    methods: {
      tabChange (el) {
        this.tabSellect = el
//        子组件通知父组件
        this.$emit('to-parent', el)
      }
    }
  }
</script>

<style lang="scss" rel="">
  .ratingTab {
    font-size: 0;
    line-height: 1;
    span {
      display: inline-block;
      padding: 0.08rem 0.12rem;
      font-size: 0.12rem;
      margin-right: 00.4rem;
      border-radius: 0.02rem;
      color: #666;
      &.tabList1 {
        background: rgba(0, 160, 220, .2);
        &.active {
          background: rgba(0, 160, 220, 1);
          color: #fff;
        }
      }
      &.tabList3 {
        background: rgba(75, 85, 93, .2);
        &.active {
          background: rgba(75, 85, 93, 1);
          color: #fff;
        }
      }
    }
  }
</style>
