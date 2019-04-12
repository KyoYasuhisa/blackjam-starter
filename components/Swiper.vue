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
        <div v-for="post in posts"
             :key="post.sys.id"
             :post="post"
             class="swiper-item">
          <img :src="post.fields.image.fields.file.url" alt="thumbnail">   
          <p class="category">{{ post.fields.category.fields.name }}</p>
          <h1>{{ post.fields.title }}</h1>    
          <div class="tags">
            <p v-for="tag in post.fields.tags"
              :key="tag.sys.id">
              {{ tag.fields.name }}
            </p>
          </div>
        </div>    
      </div>         
    </div>
  </section>
</template>

<script>
import Vue2TouchEvents from 'vue2-touch-events'

export default {
  props: ['posts','type'],
  data () {
    return {
      currentSlide: 1
    }
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
    margin 0 auto
    height 350px
    background rgba(0,0,0,.08)
    .swiper-inner
      width 100%
      display flex
      flex-wrap nowrap
      justify-content flex-start
      transition .4s
      transition-timing-function ease-out
      .swiper-item
        position relative
        width 100%
        min-width 100%
        height 300px
        padding-top 50px
        text-align center
        overflow hidden
        img
          position absolute
          width 300px
          top 0
          left 50%
          margin-left -150px
          opacity .3
          z-index -1
        .category 
          display inline-block
          height 35px
          margin 0 auto
          padding 0 20px
          line-height 35px
          background #555
          color white
          border-radius 20px
        h1
          font-size 1.5rem
        .tags
          display flex
          flex-wrap nowrap
          justify-content center
          p
            margin 5px
            border 1px solid #555
            height 25px
            line-height 25px
            font-size .8rem
            padding 0 5px
            border-radius 5px
</style>


