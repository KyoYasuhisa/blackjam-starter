<template>
  <div class="line-item">  
    <div class="img-box">
      <div v-if="post.fields.image == undefined"
           class="img"
           :style="'background-image: url(' + defaultImg +');'">
      </div>
      <div v-else 
           class="img"
           :style="'background-image: url(' + post.fields.image.fields.file.url +');'">
      </div>
      <p class="category">{{ post.fields.category.fields.name }}</p>
    </div>
    <div class="text-box">
      <nuxt-link :to="{ name: 'posts-slug', 
                        params: { slug: post.fields.slug } }">
        <h2>
          {{ post.fields.title }}
        </h2>
      </nuxt-link>
      <p class="date">{{ (new Date(post.fields.date)).toLocaleDateString() }}</p>
      <div>
        <nuxt-link :to="{ name: 'posts-getby-query', 
                      params: { 
                        getby: 'category',
                        query: post.fields.category.fields.slug } }">
        </nuxt-link> 
        <p class="tag"
            v-for="tag in post.fields.tags"
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
</template>

<script>
import siteConfig from '~/siteConfig.json'

export default {
  props: ['post'],
  data () {
    return {
      defaultImg: siteConfig.postOption.defaultImg
    }
  }
}
</script>

<style lang="stylus" scoped>
.line-item 
  position relative
  width 98%
  display flex
  flex-wrap nowrap
  justify-content flex-start
  text-align left
  border 1px solid #eee
  padding 25px 1% 15px
  margin 10px auto
  border-radius 5px
  overflow hidden
  transition .2s
  .img-box
    .img 
      overflow hidden
      width 60px
      height 60px
      border-radius 50%
      max-width 60px
      max-height 60px
      min-width 60px
      min-height 60px
      border 1px solid #eee
      background-repeat no-repeat
      background-size cover
    .category
      margin 0
      font-size .8rem
      text-align center
      width 100%
  .text-box
    margin-left 15px
    h2 
      font-size 1rem
      margin 0
      width 100%
      cursor pointer
    .date 
      margin 5px 0
      font-size .8rem
    .tag 
      display inline-block
      margin 1px
      padding 0 10px
      height 25px
      line-height 25px
      border-radius 5px
      border 1px solid #eee
      font-size .8rem
      cursor pointer
      background white
      color #555
.line-item:hover 
  border 1px solid #555
@media (max-width: 768px) 
  .line-item 
    border-radius 0
    border none
    padding 18px 5px 10px
  .line-item:hover 
    border none
</style>


