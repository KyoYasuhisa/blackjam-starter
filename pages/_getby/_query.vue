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
      <div v-if="posts.length > 0"
           class="posts">
        <BoxItem v-for="post in limitBy(posts, shownum)"
              :key="post.sys.id"
              :post="post" />
        <p v-if="shownum < posts.length"
           class="more-btn" 
           @click="shownum = shownum + loadnum">
          もっとみる
        </p>     
      </div>
      <div v-else
           class="not-found">
        <p>記事が見つかりませんでした...</p>
      </div>
    </section>
  </section>
</template>

<script>
import BoxItem from '~/components/BoxItem.vue'
import Vue2Filters from 'vue2-filters'
import siteConfig from '~/siteConfig.json'
import { createClient } from '~/plugins/contentful.js'

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
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          order: '-sys.createdAt'
        }),
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          query: params.query,
          order: '-sys.createdAt',
          limit: 1
        }),
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          'fields.slug[nin]': params.query
        }),
        client.getEntries({
          'content_type': 'tag',
          order: '-sys.createdAt'
        })
      ]).then(([entries, postsAll, posts, postsLatest, tags]) => {
        return {
          author: entries.items[0],
          postsAll: postsAll.items,
          posts: posts.items,
          postsLatest: postsLatest.items,
          tags: tags.items
        }
      }).catch(console.error)
    } else if (params.getby == 'category') {
      return Promise.all([
        client.getEntries({
          'sys.id': env.CTF_AUTHOR_ID
        }),
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          order: '-sys.createdAt'
        }),
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          'fields.category.sys.contentType.sys.id': 'category',
          'fields.category.fields.slug[match]': params.query
        }),
        client.getEntries({
          'content_type': 'category',
          'fields.slug': params.query,
        }),
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          'fields.slug[nin]': params.query
        }),
        client.getEntries({
          'content_type': 'tag',
          order: '-sys.createdAt'
        })
      ]).then(([entries, postsAll, posts, category, postsLatest, tags]) => {
        return {
          author: entries.items[0],
          postsAll: postsAll.items,
          posts: posts.items,
          thisQuery: category.items[0],
          postsLatest: postsLatest.items,
          tags: tags.items
        }
      }).catch(console.error)
    } else if (params.getby == 'tag') {
      return Promise.all([
        client.getEntries({
          'sys.id': env.CTF_AUTHOR_ID
        }),
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          order: '-sys.createdAt'
        }),
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          'fields.tags.sys.id': params.query,
          order: '-sys.createdAt'
        }),
        client.getEntries({
          'content_type': 'tag',
          'sys.id': params.query,
        }),
        client.getEntries({
          'content_type': env.CTF_BLOG_POST_TYPE_ID,
          'fields.slug[nin]': params.query
        }),
        client.getEntries({
          'content_type': 'tag',
          order: '-sys.createdAt'
        })
      ]).then(([entries, postsAll, posts, tag, postsLatest, tags]) => {
        return {
          author: entries.items[0],
          postsAll: postsAll.items,
          posts: posts.items,
          thisQuery: tag.items[0],
          postsLatest: postsLatest.items,
          tags: tags.items
        }
      }).catch(console.error)
    }
  },
  data () {
    return {
      swiperOption: siteConfig.swiperOption,
      shownum: siteConfig.listOption.shownum,
      loadnum: siteConfig.listOption.loadnum
    }
  },
  components: {
    BoxItem
  },
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus" scoped>
.not-found 
  text-align center
</style>

