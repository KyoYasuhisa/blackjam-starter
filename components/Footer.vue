<template>
  <footer>
    <Latest :posts="posts" />
    <Tags :tags="tags"/>
    <div v-if="showAuthor">
      <Author :author="author"/>
    </div>
    <p class="copyright">Copyright 2019. {{ author.fields.name }}. All Rights Reserved.</p>
  </footer>
</template>

<script>
import Latest from '~/components/Latest.vue'
import Tags from '~/components/Tags.vue'
import Author from '~/components/Author.vue'
import siteConfig from '~/siteConfig.json'

export default {
  props: ['posts','tags','author'],
  data () {
    return {
      showAuthor: siteConfig.showAuthor
    }
  },
  components: {
    Latest,
    Tags,
    Author
  }
}
</script>


<style lang="stylus" scoped>
footer
  width 600px
  margin 0 auto
  padding 5px 0
  text-align center
  .copyright
    font-size .8rem
@media (max-width: 1000px) 
  footer 
    width 80%
  .latest .item 
    width auto    
@media (max-width: 768px) 
  footer 
    width 95%
  .latest .item 
    width auto
</style>

