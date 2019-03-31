<template>
  <div class="doc-item">
    <nuxt-link :to="{ name: 'docs-slug', params: { slug: doc.fields.slug } }">
      <h1>{{ doc.fields.title }}</h1>
      <p>{{ doc.fields.content | truncate(300) }}</p>
    </nuxt-link>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'

export default {
  props: ['doc'],
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus" scoped>
.doc-item
  padding 10px 20px
  border-bottom 1px solid #eee
  transition .2s
  h1
    font-size 1.2rem
  p
    font-size .9rem
    border 1px solid #eee
    border-radius 5px
    padding 10px
.doc-item:hover
  background #eee
</style>

