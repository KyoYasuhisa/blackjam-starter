<template>
  <section class="post-list">
    <div class="section-title">
      <h1>{{ category.name }}</h1>
      <p v-if="showSlug" class="subtitle">{{ category.slug }}</p>
    </div>
    <div class="posts">
      <BoxItem v-for="post in limitBy(filterBy(posts, category.slug, 'fields.category.fields.slug'), shownumTop)"
               :key="post.sys.id"
               :post="post" />    
    </div>
    <nuxt-link :to="{ name: 'tips-getby-query', 
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
      showSlug: siteConfig.listOption.showSlug,
      shownumTop: siteConfig.listOption.shownumTop
    }
  },
  components: {
    BoxItem
  }
}
</script>

<style lang="stylus" scoped>
</style>


