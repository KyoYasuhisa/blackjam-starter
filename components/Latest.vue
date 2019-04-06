<template>
  <section class="latest">
    <div class="section-title">
      <h2>最新の記事</h2>
      <p class="subtitle">latest</p>
    </div>
    <LineItem v-for="post in limitBy(posts, showNumLatest)"
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
      showNumLatest: siteConfig.listOption.showNumLatest
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


