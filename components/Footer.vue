<template>
  <footer>
    <Latest :posts="posts" />
    <Tags :tags="tags"/>
    <Author :author="author"/>
    <p class="copyright">Copyright 2019. {{ author.fields.name }}. All Rights Reserved. The logo was created by cato Barend van Scalkwyk from Noun Project.</p>
  </footer>
</template>

<script>
import Latest from '~/components/Latest.vue'
import Tags from '~/components/Tags.vue'
import Author from '~/components/Author.vue'

export default {
  props: ['posts','tags','author'],
  components: {
    Latest,
    Tags,
    Author
  }
}
</script>


<style lang="stylus" scoped>
footer
  width 60%
  margin 0 auto
  padding 5px 0
  text-align center
  .copyright
    font-size .8rem
@media (max-width: 768px) 
  footer 
    width 95%
  .latest .item 
    width auto
</style>

