<template>
  <section class="tags">
    <div class="section-title">
      <h2>{{ labelKeywords }}</h2>
    </div>
    <div class="tags">
      <p v-for="tag in tags"
          :key="tag.sys.id"
          @click="$router.push({ name: 'posts-getby-query', 
                                 params: { 
                                   getby: 'tag',
                                   query: tag.sys.id } })">
        # {{ tag.fields.name }}
      </p>
    </div>
  </section>
</template>

<script>
import siteConfig from '~/siteConfig.json'

export default {
  props: ['tags'],
  data () {
    return {
      labelKeywords: siteConfig.listOption.labelKeywords
    }
  }
}
</script>


<style lang="stylus" scoped>
.tags
  margin 50px auto
  .tags 
    display flex
    flex-wrap wrap
    justify-content center
    margin 0 auto
    p
      border 1px solid #eee
      padding 0 10px
      height 25px
      line-height 25px
      border-radius 15px
      margin 1px
      cursor pointer
      transition .2s
      font-size .8rem
    p:hover
      border 1px solid #555
</style>

