<template>
  <section class="swiper-view post-list">
    <div v-if="type == 'rec'" 
         class="section-title">
      <h1>あなたへのお薦め記事</h1>
      <p>recommended</p>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" 
              v-for="post in posts"
                      :key="post.sys.id">
          <nuxt-link :to="{ name: 'posts-getby-query', 
                            params: { 
                              getby: 'category',
                              query: post.fields.category.fields.slug } }">
            <p class="category">
              {{ post.fields.category.fields.name }}
            </p>
          </nuxt-link>  
          <div class="img">
            <img :src="post.fields.image.fields.file.url" alt="thumbnail">
          </div>
          <div class="text-box">
            <nuxt-link :to="{ name: 'posts-slug', 
                              params: { slug: post.fields.slug } }">
              <h1>
                {{ post.fields.title }}
              </h1>
            </nuxt-link>
            <p class="date">{{ (new Date(post.fields.date)).toLocaleDateString() }}</p>
            <div class="tags">
              <p v-for="tag in post.fields.tags"
                  :key="tag.sys.id"
                  @click="$router.push({ name: 'posts-getby-query', 
                                        params: { 
                                          getby: 'tag',
                                          query: tag.sys.id } })">
                # {{ tag.fields.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </div>
    </div>
  </section>
</template>

<script>
import siteConfig from '~/siteConfig.json'
import Vue2Filters from 'vue2-filters'

export default {
  data() {
    return {
      swiperOption: siteConfig.swiperOption
    }
  },
  props: ['posts','type']
}
</script>

<style lang="stylus" scoped>
.swiper-view
  width 100%
  .section-title
    h1
      margin-bottom 0
    p
      margin-top 0
  .swiper-button-prev,
  .swiper-button-next
    top 50%
  .swiper-button-prev
    background-image url('/left-arrow.svg')
  .swiper-button-next
    background-image url('/right-arrow.svg')   
  .swiper-slide
    width 90%
    position relative
    border-bottom 1px solid #eee
    padding 30px 0
    .img
      width 100px
      height 100px
      border-radius 50%
      margin 20px auto
      overflow hidden
      border 1px solid #eee
      img 
        width 100%
    .category 
      background #555
      border-radius 20px
      padding 10px 0
      color white
      font-size 1rem
      margin 0 auto
      width 100px
      text-align center
      cursor pointer
    .text-box 
      text-align center
      h1
        font-size 1.5rem
        margin 0
        padding 5px
        cursor pointer
      .date 
        font-size .8rem
        margin 0 0 20px
        text-align center
      .tags p
        padding 0 10px
        height 25px
        line-height 25px
        border 1px solid #eee
        border-radius 5px
        display inline-block
        font-size .8rem
        margin 2px
        cursor pointer
@media (max-width: 768px)
  .swiper-view
    .swiper-item
      padding 10px 0
      .text-box
        h1
          font-size 1.2rem   
</style>
