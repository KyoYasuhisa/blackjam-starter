<template>
  <section class="posts">
    <Swiper :posts="postsFeatured" /> 
    <List v-for="category in categoriesFeatured" 
          :key="category.slug"
          :posts="posts"
          :category="category" />
    <Footer :posts="postsLatest"
            :tags="tags"
            :author="author" />      
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import siteConfig from '~/siteConfig.json'
import Swiper from '~/components/Swiper.vue'
import List from '~/components/List.vue'
import Footer from '~/components/Footer.vue'

const client = createClient()

export default { 
  head () {
    return {
      title: `${siteConfig.title} | ${siteConfig.subtitle}`,
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
        'content_type': 'post'
      }),
      client.getEntries({
        'content_type': 'post',
        'fields.featured': true
      }),
      client.getEntries({
        'content_type': 'post',
        order: '-fields.date'
      }),
      client.getEntries({
        'content_type': 'tag',
        order: '-sys.createdAt'
      })
    ]).then(([authors, posts, postsFeatured, postsLatest, tags]) => {
      return {
        author: authors.items[0],
        posts: posts.items,
        postsFeatured: postsFeatured.items,
        postsLatest: postsLatest.items,
        tags: tags.items
      }
    }).catch(console.error)
  },
  data () {
    return {
      categoriesFeatured: siteConfig.categoriesFeatured
    }
  },
  components: {
    Swiper,
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
    font-size 1.4rem
  .subtitle
    margin 0
    font-size .9rem
</style>

