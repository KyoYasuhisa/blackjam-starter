<template>
  <section class="top">
    <div v-for="category in categoriesFeatured" :key="category.slug">
      <List :posts="posts"
            :category="category" />
    </div>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import siteConfig from '~/siteConfig.json'
import List from '~/components/List.vue'

const client = createClient()

export default { 
  asyncData ({env}) {
    return Promise.all([
      client.getEntries({
        'sys.id': env.CTF_AUTHOR_ID
      }),
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
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
    List
  }
}
</script>

<style lang="stylus">
.swiper-pagination-bullet 
  background white
</style>

