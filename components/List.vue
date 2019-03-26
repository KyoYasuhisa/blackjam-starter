<template>
  <section class="post-list">
    <div class="section-title">
      <h1>{{ category.name }}</h1>
      <p class="subtitle">{{ category.slug }}</p>
    </div>
    <div class="posts">
      <BoxItem v-for="post in limitBy(filterBy(posts, category.slug, 'fields.category.fields.slug'), shownumTop)"
            :key="post.sys.id"
            :post="post" />
    </div>
    <nuxt-link :to="{ name: 'getby-query', 
                      params: { 
                        getby: 'category', 
                        query: category.slug } }">
      <p class="more-btn">もっとみる</p>
    </nuxt-link>
  </section>
</template>

<script>
import Vue2Filters from 'vue2-filters'
import BoxItem from '~/components/BoxItem.vue'
import siteConfig from '~/siteConfig.json'

export default {
  props: ['posts','category'],
  mixins: [Vue2Filters.mixin],
  data () {
    return {
      shownumTop: siteConfig.listOption.shownumTop
    }
  },
  components: {
    BoxItem
  }
}
</script>

<style lang="stylus" scoped>
.post-list
  margin 50px 0
  .posts 
    display flex
    flex-wrap wrap
    justify-content center
.post-list:after
  content ''
  display block
  height 5px
  width 100px
  background #eee
  margin 50px auto
  border-radius 10px
.section-title 
  text-align center
  padding 10px 0
  border-radius 5px
  margin-bottom 10px
  h1, h2 
    margin 0
    font-size 1.5rem
  .subtitle
    margin 0
    font-size .9rem
.more-btn 
  display block
  width 150px
  margin 10px auto
  text-align center
  padding 10px 0
  border 1px solid #eee
  border-radius 20px
  font-weight bold
  cursor pointer
  transition .2s
.more-btn:hover {
  border 1px solid #555
}
</style>


