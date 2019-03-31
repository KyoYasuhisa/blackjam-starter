<template>
  <div class="doc-group">
    <h1 class="title">{{ docGroup.fields.name }}</h1>
    <h2 v-for="doc in orderBy(filterBy(docs, docGroup.fields.slug, 'fields.docGroup'), 'fields.number')" 
        :key="doc.sys.id">
      <nuxt-link :to="{ name: 'docs-slug', 
                        params: { slug: doc.fields.slug } }">  
        {{ doc.fields.title }}
      </nuxt-link>  
    </h2>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'

export default {
  props: ['docGroup','docs'],
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus" scoped>
.doc-group
  margin-bottom 30px
  h1
    margin-bottom 0
    border-bottom 1px solid #eee
    padding 15px
    font-size 1.2rem
  h2
    border-bottom 1px solid #eee
    margin 0
    padding 8px 15px
    font-size .9rem
    transition .2s
  h2:hover
    background #eee
</style>

