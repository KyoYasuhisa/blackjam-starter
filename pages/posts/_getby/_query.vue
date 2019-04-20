<template>
  <section class="query">
    <section class="post-list">
      <div class="section-title">
        <h1>
          <span v-if="$route.params.getby == 'category' || $route.params.getby == 'tag'">
            {{ thisQuery.fields.name }}
          </span>
          <span v-else>
            {{ $route.params.query }}
          </span>
        </h1>  
        <p class="subtitle">
           <span v-if="$route.params.getby == 'category'">
            カテゴリー
          </span>
          <span v-else-if="$route.params.getby == 'tag'">
            タグ
          </span>
          <span v-else-if="$route.params.getby == 'search'">
            検索結果
          </span>
        </p>
      </div>
      <div v-if="postsFiltered.length > 0">
        <div class="posts">
          <BoxItem v-for="post in orderBy(limitBy(postsFiltered, showNum), listPostsOrder, listPostsOrderDirection)"
                   :key="post.sys.id"
                   :post="post" /> 
        </div>
        <p v-if="showNum < postsFiltered.length"
           class="load-btn" 
           @click="showNum = showNum + loadNum">
          もっとみる
        </p>    
      </div>
      <div v-else
           class="not-found">
        <p>{{ notFoundMessage }}</p>
      </div>
    </section>  
    <Footer :posts="postsLatest"
            :tags="tags"
            :author="author" />    
  </section>
</template>

<script>
import BoxItem from '~/components/BoxItem.vue'
import Vue2Filters from 'vue2-filters'
import siteConfig from '~/siteConfig.json'
import { createClient } from '~/plugins/contentful.js'
import Footer from '~/components/Footer.vue'

const client = createClient()

export default {
  head () {
    if ( this.$route.params.getby == 'category' || this.$route.params.getby == 'tag' ) {
      return {
        title: `${this.$route.params.getby}: ${this.thisQuery.fields.name} | ${siteConfig.title} - ${siteConfig.subtitle}`,
        meta: [{
          hid: `description`,
          name: 'description',
          content: `${this.$route.params.getby}: ${this.thisQuery.fields.name} | ${siteConfig.title} - ${siteConfig.subtitle}`,
        }]
      }
    } else {
      return {
        title: `${this.$route.params.getby}: ${this.$route.params.query} | ${siteConfig.title} - ${siteConfig.subtitle}`,
        meta: [{
          hid: `description`,
          name: 'description',
          content: `${this.$route.params.getby}: ${this.$route.params.query} | ${siteConfig.title} - ${siteConfig.subtitle}`,
        }]
      }
    }
  },
  asyncData ({env,params}) {
    if (params.getby == 'search') {
      return Promise.all([
        client.getEntries({
          'sys.id': env.CTF_AUTHOR_ID
        }),
        client.getEntries({
          'content_type': 'post',
          order: '-fields.date'
        }),
        client.getEntries({
          'content_type': 'post',
          query: params.query,
          order: '-fields.date'
        }),
        client.getEntries({
          'content_type': 'tag',
          order: '-sys.createdAt'
        })
      ]).then(([entries, postsLatest, postsFiltered, tags]) => {
        return {
          author: entries.items[0],
          postsLatest: postsLatest.items,
          postsFiltered: postsFiltered.items,
          tags: tags.items
        }
      }).catch(console.error)
    } else if (params.getby == 'category') {
      return Promise.all([
        client.getEntries({
          'sys.id': env.CTF_AUTHOR_ID
        }),
        client.getEntries({
          'content_type': 'post',
          order: '-fields.date'
        }),
        client.getEntries({
          'content_type': 'post',
          'fields.category.sys.contentType.sys.id': 'category',
          'fields.category.fields.slug[match]': params.query,
          order: '-fields.date'
        }),
        client.getEntries({
          'content_type': 'category',
          'fields.slug': params.query,
        }),
        client.getEntries({
          'content_type': 'tag',
          order: '-sys.createdAt'
        })
      ]).then(([entries, postsLatest, postsFiltered, category, tags]) => {
        return {
          author: entries.items[0],
          postsLatest: postsLatest.items,
          postsFiltered: postsFiltered.items,
          thisQuery: category.items[0],
          tags: tags.items
        }
      }).catch(console.error)
    } else if (params.getby == 'tag') {
      return Promise.all([
        client.getEntries({
          'sys.id': env.CTF_AUTHOR_ID
        }),
        client.getEntries({
          'content_type': 'post',
          order: '-fields.date'
        }),
        client.getEntries({
          'content_type': 'post',
          'fields.tags.sys.id': params.query,
          order: '-fields.date'
        }),
        client.getEntries({
          'content_type': 'tag',
          'sys.id': params.query,
        }),
        client.getEntries({
          'content_type': 'tag',
          order: '-sys.createdAt'
        })
      ]).then(([entries, postsLatest, postsFiltered, tag, tags]) => {
        return {
          author: entries.items[0],
          postsLatest: postsLatest.items,
          postsFiltered: postsFiltered.items,
          thisQuery: tag.items[0],
          tags: tags.items
        }
      }).catch(console.error)
    }
  },
  data () {
    return {
      swiperOption: siteConfig.swiperOption,
      showNum: siteConfig.listOption.showNum,
      loadNum: siteConfig.listOption.loadNum,
      notFoundMessage: siteConfig.listOption.notFoundMessage,
      listPostsOrder: siteConfig.listOption.listPostsOrder,
      listPostsOrderDirection: siteConfig.listOption.listPostsOrderDirection
    }
  },
  components: {
    BoxItem,
    Footer
  },
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus">
.load-btn
  margin 10px auto
  width 200px
  text-align center
  padding 10px 0
  border-radius 30px
  border 1px solid #eee
  cursor pointer
.load-btn:hover
  border 1px solid #555
.not-found 
  text-align center
</style>

