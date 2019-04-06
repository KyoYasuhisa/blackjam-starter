<template>
  <div class="line-item">  
    <div class="img">
      <img :src="post.fields.image.fields.file.url" alt="thumbnail">
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
          <p class="category">
            {{ post.fields.category.fields.name }}
          </p>
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
export default {
  props: ['post']
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
  .img 
    overflow hidden
    width 50px
    height 50px
    border-radius 50%
    max-width 50px
    max-height 50px
    min-width 50px
    min-height 50px
    border 1px solid #eee
    img 
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
    .category
      display inline-block
      background #555
      color white
      font-size .8rem
      padding 3px 5px
      border-radius 5px  
    .tag 
      display inline-block
      margin 1px
      padding 3px 5px
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
    border-bottom 1px solid #eee
    padding 18px 5px 10px
    margin 0
  .line-item:hover 
    border none
    border-bottom 1px solid #eee
</style>


