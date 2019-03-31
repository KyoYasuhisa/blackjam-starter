<template>
  <section class="tags">
    <div class="section-title">
      <h2>キーワード</h2>
      <p class="subtitle">keywords</p>
    </div>
    <div class="tags">
      <li v-for="tag in tags"
          :key="tag.sys.id"
          @click="$router.push({ name: 'tips-getby-query', 
                                 params: { 
                                   getby: 'tag',
                                   query: tag.sys.id } })">
        {{ tag.fields.name }}
      </li>
    </div>
  </section>
</template>

<script>
export default {
  props: ['tags']
}
</script>


<style lang="stylus" scoped>
.tags
  margin 100px auto 150px
  .tags 
    display flex
    flex-wrap wrap
    justify-content center
    margin 0 auto
    li 
      list-style none
      border 1px solid #eee
      padding 5px 10px
      border-radius 15px
      margin 1px
      cursor pointer
      transition .2s
    li:hover
      border 1px solid #555
</style>

