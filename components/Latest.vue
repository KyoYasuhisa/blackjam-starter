<template>
  <section class="latest">
    <div class="section-title">
      <h2>最新の記事</h2>
      <p class="subtitle">latest</p>
    </div>
    <LineItem v-for="post in limitBy(posts, shownumLatest)"
              :key="post.sys.id"
              :post="post" />      
  </section>
</template>

<script>
import LineItem from '~/components/LineItem.vue'
import Vue2Filters from 'vue2-filters'
import siteConfig from '~/siteConfig.json'

export default {
  data () {
    return {
      shownumLatest: siteConfig.listOption.shownumLatest
    }
  },
  props: ['posts'],
  components: {
    LineItem
  },
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus" scoped>
</style>


