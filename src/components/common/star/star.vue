<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
//  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < 5) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="scss" rel="">
  @import "~@/common/scss/mixin.scss";

  .star {
    .star-item {
      display: inline-block;
    }
    &.star-48 {
      .star-item {
        width: 0.2rem;
        height: 0.2rem;
        background-size:0.2rem 0.2rem;
        margin-right: 0.22rem;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img(img/star48_on);
        }
        &.half {
          @include bg-img(img/star48_half);
        }
        &.off {
          @include bg-img(img/star48_off);
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 0.15rem;
        height: 0.15rem;
        background-size:0.15rem 0.15rem;
        margin-right: 0.06rem;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img(img/star36_on);
        }
        &.half {
          @include bg-img(img/star36_half);
        }
        &.off {
          @include bg-img(img/star36_off);
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 0.1rem;
        height: 0.1rem;
        background-size:0.1rem 0.1rem;
        margin-right: 0.03rem;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img(img/star24_on);
        }
        &.half {
          @include bg-img(img/star24_half);
        }
        &.off {
          @include bg-img(img/star24_off);
        }
      }
    }
  }
</style>
