<template>
  <section class="swiper post-list">
    <div v-if="type == 'rec'"
         class="section-title">
      <h1>あなたへのお薦め</h1>
      <p class="subtitle">recommended</p>
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-inner"
           id="swiper-inner"
           v-touch:swipe.left="swipeLeft"
           v-touch:swipe.right="swipeRight">
        <SwiperItem v-for="post in posts"
                    :key="post.sys.id"
                    :post="post"/>    
      </div>    
      <div v-if="posts.length > 1">
        <div class="slide-btn left-btn">
          <img src="/left-arrow.svg" alt="left-arrow">
        </div>
        <div class="slide-btn right-btn">
          <img src="/right-arrow.svg" alt="left-arrow">
        </div>    
      </div>
    </div>
  </section>
</template>

<script>
import Vue2TouchEvents from 'vue2-touch-events'
import SwiperItem from '~/components/SwiperItem.vue'

export default {
  props: ['posts','type'],
  data () {
    return {
      currentSlide: 1,
    }
  },
  components: {
    SwiperItem
  },
  methods: {
    swipeLeft () {
      const inner = document.getElementById('swiper-inner')
      const slideLength = document.getElementsByClassName('swiper-item').length
      if ( this.currentSlide == slideLength ) {
        this.currentSlide = 1
      } else {
        this.currentSlide ++
      }
      inner.style.marginLeft = (this.currentSlide-1)*(-100)+'%'
    },
    swipeRight () {
      const inner = document.getElementById('swiper-inner')
      const slideLength = document.getElementsByClassName('swiper-item').length
      if ( this.currentSlide == 1 ) {
        this.currentSlide = slideLength
      } else {
        this.currentSlide --
      }
      inner.style.marginLeft = (this.currentSlide-1)*(-100)+'%'
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper
  .swiper-wrapper
    width 100%
    position relative
    .swiper-inner
      width 100%
      display flex
      flex-wrap nowrap
      justify-content flex-start
      transition .4s
      transition-timing-function ease-out
    .slide-btn
      position absolute
      top 150px
      width 40px
    .left-btn
      left 10px
    .right-btn
      right 10px
  @media (max-width: 768px)
    .swiper-wrapper
      .swiper-inner
        height 200px
</style>


