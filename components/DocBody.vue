<template>
  <section class="doc-body">
    <div class="head">
      <p class="group-name">{{ groupName }}</p>
      <h1>{{ doc.fields.title }}</h1>
    </div>
    <div class="body" v-html="$md.render(doc.fields.content)"></div>
    <nuxt-link :to="{ name: 'docs-slug',
                        params: { slug: doc.fields.nextDoc.fields.slug } }">
      <div v-if="doc.fields.nextDoc"
           class="next-box">
        <h2>Next: </h2>
        <p>{{ doc.fields.nextDoc.fields.title }}</p>
      </div>
    </nuxt-link>  
  </section>
</template>

<script>
export default {
  props: ['groupName','doc']
}
</script>

<style lang="stylus">
.doc-body
  .head
    height auto
    padding 30px 0
    text-align center
    .group-name
      font-size .8rem
      margin-bottom 0
    h1
      font-size 1.5rem
      margin-top 0
  .body
    margin 50px 2%
    font-size 1rem
    line-height 2rem
    text-align justify
    .table-of-contents
      border-radius 5px
      margin 10px 0
      padding 5px 20px
      background #eee
      ul 
        margin 0
        padding 0
        li 
          list-style none
          font-size .8rem
          line-height 1.2rem
          margin 15px 0
          padding-bottom 2px
    h2
      font-size 1.2rem
      padding-top 75px
    h3
      background #eee
      padding 5px 10px
      font-size 1rem
      border-radius 5px
    code
      margin 3px
      padding 3px
      border-radius 2px
      font-weight bold
      font-family 'Courier New', Courier, monospace
      background #eee
    .hljs 
      background rgba(0,0,0,.9)
      border-radius 8px
      padding 10px 20px
      margin 30px 0
  .next-box
    border 1px solid #eee
    padding 0 20px
    margin 0 2%
    border-radius 5px
@media (max-width: 768px)
  .doc-body
    .body
      h2
        padding-top 40px
      .hljs 
        border-radius 0
        padding 10px 20px
        margin 30px -5%
</style>


