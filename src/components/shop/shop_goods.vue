<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li @click="goIndex(index,$event)" v-for="(item,index) in sourceData.goods" class="goodsItem border-1px"
            :class="{heightActive:heightIndex===index}">
          <span class="goodsName">
            <span v-if="item.type>0" :class="supportMap[item.type]" class="icon"></span>
            {{item.name}}
          </span>

        </li>
      </ul>
      <!--{{sourceData.seller}}-->
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in sourceData.goods" class="food-list food-list-hook">
          <h2 class="title">
            {{item.name}}
          </h2>
          <ul>
            <li class="food-item border-1px" @click="selectedFood(food,$event)" v-for="food in item.foods">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">
                  {{food.name}}
                </h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">${{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <!--父子组件之间的数据共享-->
                  <cartControl :food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCar v-if="sourceData.seller" :selectFoods="selectFoods" :deliveryPrice="sourceData.seller.deliveryPrice"
             :minPrice="sourceData.seller.minPrice"></shopCar>
    <food :food="selectFood" ref="food"></food>
  </div>

</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import shopCar from '@/components/common/shopCar/shopCar'
  import cartControl from '@/components/common/cartControl/cartControl'
  import food from '@/components/shop/shop_detail'
  import Bscroll from 'better-scroll'

  export default {
    props: {
      sourceData: {}
    },
    data () {
      return {
        heightList: [],
        heightIndex: 0,
        selectFood: {}
      }
    },
    created () {
      this.supportMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    mounted () {
      this.$nextTick(function () {
          this.scrollInit()
          var foodListHook = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
          this.heightList = []
          var height = 0
          this.heightList.push(height)
          for (let i = 0; i < foodListHook.length; i++) {
            height += foodListHook[i].clientHeight
            this.heightList.push(height)
          }
          console.log(this.heightList)
      })
//    this.scrollInit()
//    setTimeout(() => {
//      var foodListHook = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
//      this.heightList = []
//      var height = 0
//      this.heightList.push(height)
//      for (let i = 0; i < foodListHook.length; i++) {
//        height += foodListHook[i].clientHeight
//        this.heightList.push(height)
//      }
//      this.menuWrapper.refresh()
//      this.goodsWrapper.refresh()
//    }, 50)
    },
    methods: {
      selectedFood (food, $event) {
        if (!$event._constructed) {
          return
        }
        this.selectFood = food
//        console.log(this.$refs.food.$el.innerText)
//        this.$nextTick(() => {
//          console.log(this.$refs.food.$el.innerText)
//        })
        this.$refs.food.show()
      },
      scrollInit () {
        this.menuWrapper = new Bscroll(this.$refs.menuWrapper, {
          click: true
        })
        this.goodsWrapper = new Bscroll(this.$refs.goodsWrapper, {
          click: true,
          probeType: 3
        })
        this.goodsWrapper.on('scroll', (pos) => {
        	console.log(-pos.y,this.heightList)
          for (let i = 0; i < this.heightList.length; i++) {
            if (Math.ceil(-pos.y) >= this.heightList[i] && Math.ceil(-pos.y) < this.heightList[i + 1]) {
              this.heightIndex = i
              return false
            }
          }
        })
      },
      goIndex (index, $event) {
        if (!$event._constructed) {
          return
        }
        var foodListHook = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
        this.goodsWrapper.scrollToElement(foodListHook[index], 800)
      }
    },
    computed: {
      selectFoods () {
        let foods = []
        this.sourceData.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    components: {
      shopCar,
      cartControl,
      food
    }
  }
</script>

<style lang="scss" rel="">
  @import "~@/common/scss/mixin";

  .heightActive {
    background: #fff;
    @include border-none;
    color: red;
  }

  .goods {
    position: absolute;
    top: 1.77rem;
    bottom: 0.46rem;
    width: 100%;
    display: flex;
    overflow: hidden;
    z-index: 10;
    .menu-wrapper {
      background: #f3f5f7;
      flex: 0 1 0.8rem;
      width: 0.8rem;
      .goodsItem {
        display: table;
        height: 0.54rem;
        width: 0.56rem;
        margin: 0 auto;
        padding: 0 0.12rem;
        line-height: 0.14rem;
        font-size: 0.12rem;
        @include border-1px(rgba(7, 17, 27, .1));
        .goodsName {
          display: table-cell;
          vertical-align: middle;
          .icon {
            vertical-align: top;
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
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
    .goods-wrapper {
      flex: 1;
      .title {
        padding-left: 0.14rem;
        line-height: 0.26rem;
        border-left: 0.02rem solid #d9dde1;
        font-size: 0.12rem;
        color: rgb(147, 153, 159);
        background-color: #f2f5f7;
      }
      .food-item {
        display: flex;
        margin: 0.18rem;
        padding-bottom: 0.18rem;
        @include border-1px(rgba(7, 17, 27, .1));
        &:last-child {
          @include border-none;
          margin-bottom: 0;
        }
        .icon img {
          width: 0.57rem;
          flex: 0 0 0.57rem;
          margin-right: 0.1rem;
          vertical-align: bottom;
        }
        .content {
          flex: 1;
          .name {
            margin: 0.02rem 0 0.08rem 0;
            line-height: 0.14rem;
            font-size: 0.14rem;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            margin-bottom: 0.08rem;
            line-height: 0.1rem;
            font-size: 0.1rem;
            color: rgb(147, 153, 159);
          }
          .price {
            font-weight: 700;
            line-height: 0.24rem;
            .now {
              color: rgb(240, 20, 20);
              margin-right: 0.08rem;
              font-size: 0.14rem;
            }
            .old {
              font-size: 0.1rem;
              text-decoration: line-through;
            }
          }
          .cartControl-wrapper {
            position: absolute;
            right: 0;
            bottom: 0.12rem;
          }
        }
      }
    }
  }
</style>
