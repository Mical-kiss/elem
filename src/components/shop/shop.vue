<template>
  <div class="shop">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <span><router-link to="goods">商品</router-link></span>
      <span><router-link to="ratings">评价</router-link></span>
      <span><router-link to="seller">商家</router-link></span>
    </div>
    <div>
      <router-view :sourceData="sourceData"></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import header from '@/components/shop/shop_header'

  import axios from 'axios'
  console.log(1)
  export default {
    name: 'Shop',
    data () {
      return {
        seller: {},
        sourceData: {}
      }
    },
    components: {
      'v-header': header
    },
    mounted () {
      axios({
        url: 'data.json'
      }).then((data) => {
        this.seller = data.data.seller
        this.sourceData = data.data
        this.$router.push('/goods')
        setTimeout(() => {
          
        }, 1000)
      })
    }
  }
</script>

<style lang="scss" rel="">
  /*@import '~@/common/scss/index.scss';*/
  @import '../../common/scss/index.scss';

  .tab {
    display: flex;
    @include border-1px(rgba(7, 17, 27, 0.1));
    span {
      flex: 1;
      text-align: center;
      line-height: .44rem;
      a {
        display: block;
        font-size: 0.14rem;
        color: rgb(77, 85, 93);
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }


</style>
