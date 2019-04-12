<template>
  <div class="swiper-item">
    <img :src="post.fields.image.fields.file.url" alt="thumbnail">  
    <nuxt-link :to="{ name: 'posts-getby-query', 
                      params: { 
                        getby: 'category',
                        query: post.fields.category.fields.slug } }"> 
      <p class="category">{{ post.fields.category.fields.name }}</p>
    </nuxt-link>  
    <nuxt-link :to="{ name: 'posts-slug', 
                      params: { slug: post.fields.slug } }">
      <h1>{{ post.fields.title }}</h1>    
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
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="stylus" scoped>
.swiper-item
  position relative
  margin 0 auto
  min-width 100%
  height 350px
  padding-top 50px
  text-align center
  overflow hidden
  img
    position absolute
    width 300px
    top 30px
    left 50%
    margin-left -150px
    opacity .1
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
    font-size 2rem
    line-height 4rem
  .tags
    display flex
    flex-wrap nowrap
    justify-content center
    p
      margin 2px
      border 1px solid #555
      height 25px
      line-height 25px
      font-size .8rem
      padding 0 5px
      border-radius 5px
      cursor pointer
@media (max-width: 768px) 
  .swiper-item
    height 200px
    padding-top 20px
    img
      width 30%
      margin-left -15%
    h1
      font-size 1.2rem
      width 80%
      margin 10px auto
</style>


