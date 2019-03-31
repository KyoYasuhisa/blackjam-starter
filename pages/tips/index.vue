<template>
  <section class="tips">
    <List v-for="category in categoriesFeatured" 
          :key="category.slug"
          :posts="posts"
          :category="category" />
    <Footer :posts="posts"
            :tags="tags"
            :author="author" />      
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import siteConfig from '~/siteConfig.json'
import List from '~/components/List.vue'
import Footer from '~/components/Footer.vue'

const client = createClient()

export default { 
  head () {
    return {
      title: `Tips - ${siteConfig.title} | ${siteConfig.subtitle}`,
      meta: [{
        hid: `description`,
        name: 'description',
        content: `${siteConfig.title} | ${siteConfig.subtitle}`,
      }]
    }
  },
  asyncData ({env}) {
    return Promise.all([
      client.getEntries({
        'sys.id': env.CTF_AUTHOR_ID
      }),
      client.getEntries({
        'content_type': 'post',
        order: '-sys.createdAt'
      }),
      client.getEntries({
        'content_type': 'tag',
        order: '-sys.createdAt'
      })
    ]).then(([authors, posts, tags]) => {
      return {
        author: authors.items[0],
        posts: posts.items,
        tags: tags.items
      }
    }).catch(console.error)
  },
  data () {
    return {
      swiperOption: siteConfig.swiperOption,
      categoriesFeatured: siteConfig.categoriesFeatured
    }
  },
  components: {
    List,
    Footer
  }
}
</script>

<style lang="stylus">
.post-list
  margin 50px 0
  .posts 
    display flex
    flex-wrap wrap
    justify-content center
.post-list:after
  content ''
  display block
  height 5px
  width 100px
  background #eee
  margin 50px auto
  border-radius 10px
.section-title 
  text-align center
  padding 10px 0
  border-radius 5px
  margin-bottom 10px
  h1, h2 
    margin 0
    font-size 1.5rem
  .subtitle
    margin 0
    font-size .9rem
.more-btn 
  display block
  width 150px
  margin 10px auto
  text-align center
  padding 10px 0
  border 1px solid #eee
  border-radius 20px
  font-weight bold
  cursor pointer
  transition .2s
.more-btn:hover 
  border 1px solid #555
.swiper-pagination-bullet 
  background white
</style>

