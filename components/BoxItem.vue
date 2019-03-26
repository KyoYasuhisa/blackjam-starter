<template>
  <div class="box-item">
    <div class="img">
      <img :src="post.fields.image.fields.file.url" alt="thumbnail">
    </div>
    <nuxt-link :to="{ name: 'getby-query', 
                      params: { 
                        getby: 'category',
                        query: post.fields.category.fields.slug } }">
      <p class="category">
        {{ post.fields.category.fields.name }}
      </p>
    </nuxt-link>
    <div class="text-box">
      <nuxt-link :to="{ name: 'post-slug', 
                        params: { slug: post.fields.slug } }">
        <h2>
          {{ post.fields.title }}
        </h2>
      </nuxt-link>
      <p class="date">{{ (new Date(post.fields.date)).toLocaleDateString() }}</p>
      <div class="tags">
        <li v-for="tag in post.fields.tags"
            :key="tag.sys.id"
            @click="$router.push({ name: 'getby-query', 
                                   params: { 
                                     getby: 'tag',
                                     query: tag.sys.id } })">
          # {{ tag.fields.name }}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="stylus" scoped>
.box-item
  width 315px
  height 200px
  margin 5px
  border-radius 5px
  position relative
  border 1px solid #eee
  transition .2s
  .img
    width 50px
    height 50px
    border-radius 50%
    position absolute
    top 10px
    right 10px
    overflow hidden
    border 1px solid #eee
    img 
      width 150%
  .category 
    background #555
    border-radius 5px
    padding 5px 15px
    color white
    display inline-block
    font-size .8rem
    margin 0
    position absolute
    top 10px
    left 10px
    cursor pointer
  .text-box 
    margin 65px 10px 5px 10px
    h2 
      font-size 1.2rem
      margin 0
      padding 5px
      cursor pointer
    .date 
      font-size .8rem
      margin 0 10px 0 0
      text-align right
    .tags li 
      list-style none
      padding 5px 10px
      border 1px solid #eee
      border-radius 5px
      display inline-block
      font-size .8rem
      margin 0 2px
      cursor pointer
.box-item:hover
  border 1px solid #555
@media (max-width: 1000px) 
  .box-item 
    width 45%
@media (max-width: 600px) 
  .box-item 
    width 95%
</style>

