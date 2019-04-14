<template>
  <div class="swiper-item"> 
    <div v-if="post.fields.image == undefined"
         class="img"
         :style="'background-image: url('+ defaultImg +');'
                +'background-repeat:' + repeat +';'
                +'background-size:' + size + ';'
                +'background-position:' + position + ';'
                +'background-attachment:' + attachment + ';'
                +'filter:' + filter + ';'">
    </div>    
    <div v-else
         class="img"
         :style="'background-image: url(' + post.fields.image.fields.file.url +');'
                +'background-repeat:' + repeat +';'
                +'background-size:' + size + ';'
                +'background-position:' + position + ';'
                +'background-attachment:' + attachment + ';'
                +'filter:' + filter + ';'">
    </div>      
    <div class="text-box">
      <nuxt-link :to="{ name: 'posts-getby-query', 
                        params: { 
                          getby: 'category',
                          query: post.fields.category.fields.slug } }"> 
        <p class="category">{{ post.fields.category.fields.name }}</p>
      </nuxt-link>  
      <nuxt-link :to="{ name: 'posts-slug', 
                        params: { slug: post.fields.slug } }">
        <h1>{{ post.fields.title }}</h1>    
        <p class="date">{{ (new Date(post.fields.date)).toLocaleDateString() }}</p>
      </nuxt-link> 
      <div class="tags">
        <p v-for="tag in post.fields.tags"
          :key="tag.sys.id"
          @click="$router.push({ name: 'posts-getby-query', 
                                  params: { 
                                    getby: 'tag',
                                    query: tag.sys.id } })">
          {{ tag.fields.name }}
        </p>
      </div>
      <div v-if="post.fields.intro != undefined" 
           class="intro" 
           v-html="$md.render(post.fields.intro)">
      </div> 
    </div>
  </div>
</template>

<script>
import siteConfig from '~/siteConfig.json'
import Vue2Filters from 'vue2-filters'

export default {
  props: ['post','intro'],
  data () {
    return {
      repeat: siteConfig.backgroundImageOption.repeat,
      size: siteConfig.backgroundImageOption.size,
      position: siteConfig.backgroundImageOption.position,
      attachment: siteConfig.backgroundImageOption.attachment,
      filter: siteConfig.backgroundImageOption.filter,
      defaultImg: siteConfig.postOption.defaultImg
    }
  },
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus" scoped>
.swiper-item
  position relative
  margin 0 auto
  min-width 100%
  padding 50px 0 30px
  text-align center
  overflow hidden
  .img
    position absolute
    top 0
    bottom 0
    width 100%
    z-index -1
  .text-box
    width 60%
    margin 0 auto
    .category 
      display inline-block
      height 35px
      margin 0 auto
      padding 0 20px
      line-height 35px
      border-bottom 3px solid #555
    h1
      font-size 2rem
    .intro
      margin 20px auto  
      text-align left
      max-height 150px
      overflow-y scroll
    ::-webkit-scrollbar 
      width 0
    .tags
      display flex
      flex-wrap nowrap
      justify-content center
      p
        margin 2px
        border 1px solid #eee
        height 25px
        line-height 25px
        font-size .8rem
        padding 0 5px
        border-radius 5px
        cursor pointer
@media (max-width: 768px) 
  .swiper-item
    padding 20px 0
    text-align left
    .text-box
      width 85%
      .category
        padding 0
      h1
        font-size 1.2rem
      .date
        font-size .8rem
      .tags
        justify-content flex-start  
      .intro
        font-size .8rem
</style>


