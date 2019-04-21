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
        <SwiperItem v-for="post in orderBy(posts, swiperPostsOrder, swiperPostsOrderDirection)"
                    :key="post.sys.id"
                    :post="post"/>    
      </div>    
      <div v-if="posts.length > 1"
           class="btns">
        <li class="btn"
            v-for="i in posts.length" 
            :key="i"
            @click="jumpSlide(i)">
        </li>
      </div>
      <div v-if="posts.length > 1">
        <div class="slide-btn left-btn"
             @click="swipeRight">
          <img src="/left-arrow.svg" alt="left-arrow">
        </div>
        <div class="slide-btn right-btn"
             @click="swipeLeft">
          <img src="/right-arrow.svg" alt="left-arrow">
        </div>    
      </div>
    </div>
  </section>
</template>

<script>
import Vue2TouchEvents from 'vue2-touch-events'
import SwiperItem from '~/components/SwiperItem.vue'
import Vue2Filters from 'vue2-filters'
import siteConfig from '~/siteConfig.json'

export default {
  props: ['posts','type'],
  data () {
    return {
      currentSlide: 1,
      swiperPostsOrder: siteConfig.listOption.swiperPostsOrder,
      swiperPostsOrderDirection: siteConfig.listOption.swiperPostsOrderDirection
    }
  },
  mixins: [Vue2Filters.mixin],
  components: {
    SwiperItem
  },
  methods: {
    swipeLeft () {
      const inner = document.getElementById('swiper-inner')
      const slideLength = document.getElementsByClassName('swiper-item').length
      const btns = document.getElementsByClassName('btn')
      if ( this.currentSlide == slideLength ) {
        this.currentSlide = 1
      } else {
        this.currentSlide ++
      }
      inner.style.marginLeft = (this.currentSlide-1)*(-100)+'%'
      const btn = document.getElementsByClassName('btn')[this.currentSlide-1]
      for (var i = 0; i < btns.length; i++) {
        btns[i].style.background = '#555'
      }
      btn.style.background = 'transparent'
    },
    swipeRight () {
      const inner = document.getElementById('swiper-inner')
      const slideLength = document.getElementsByClassName('swiper-item').length
      const btns = document.getElementsByClassName('btn')
      if ( this.currentSlide == 1 ) {
        this.currentSlide = slideLength
      } else {
        this.currentSlide --
      }
      inner.style.marginLeft = (this.currentSlide-1)*(-100)+'%'
      const btn = document.getElementsByClassName('btn')[this.currentSlide-1]
      for (var i = 0; i < btns.length; i++) {
        btns[i].style.background = '#555'
      }
      btn.style.background = 'transparente'
    },
    jumpSlide (i) {
      const inner = document.getElementById('swiper-inner')
      const btn = document.getElementsByClassName('btn')[i-1]
      const btns = document.getElementsByClassName('btn')
      inner.style.marginLeft = (i-1)*(-100)+'%'
      for (var i = 0; i < btns.length; i++) {
        btns[i].style.background = '#555'
      }
      btn.style.background = 'transparent'
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper
  .swiper-wrapper
    width 100%
    margin 0 auto
    overflow hidden
    position relative
    box-shadow 0 0 10px #eee
    border-radius 5px
    .swiper-inner
      width 100%
      display flex
      flex-wrap nowrap
      justify-content flex-start
      transition .2s
      transition-timing-function ease-out
    .btns
      width 90%
      display flex
      flex-wrap nowrap
      justify-content center
      position absolute
      bottom 20px
      left 50%
      margin-left -45%
      .btn
        display block
        list-style none
        width 10px
        height 10px
        border-radius 50%  
        margin 0 10px
        background #555
        border 3px solid #555
        transition .2s
      .btn:first-child
        background transparent
    .slide-btn
      position absolute
      top 45%
      width 40px
      cursor pointer
    .left-btn
      left 10px
    .right-btn
      right 10px   
  @media (max-width: 768px)
    .swiper-wrapper
      width 95%
      .slide-btn
        width 20px
</style>


