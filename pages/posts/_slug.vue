<template>
  <section class="single">
    <div class="head">
      <img :src="post.fields.image.fields.file.url" alt="thumbnail"
           :style="'width:'+thumbnailSize+';'"
           class="img"> 
      <div class="text-box">
        <nuxt-link :to="{ name: 'posts-getby-query', 
                          params: { 
                            getby: 'category',
                            query: post.fields.category.fields.slug } }">
          <p class="category">
            {{ post.fields.category.fields.name }}
          </p>
        </nuxt-link>
        <h1>{{ post.fields.title }}</h1>
        <div class="tags">
          <p v-for="tag in post.fields.tags"
              :key="tag.sys.id"
              @click="$router.push({ name: 'posts-getby-query', 
                                     params: { 
                                       getby: 'tag',
                                       query: tag.sys.id } })">
            # {{ tag.fields.name }}
          </p>
        </div>
      </div>
    </div>
    <SideBtns :post="post"
              :author="author" />        
    <div class="body" 
         :style="'font-size:'+fontSize+'; line-height:'+lineHeight+';'"
         v-html="$md.render(post.fields.content)">
    </div>     
    <Swiper v-if="filterBy(postsRec, post.fields.tags[0].fields.name, 'fields.content').length > 0"
              :posts="filterBy(postsRec, post.fields.tags[0].fields.name, 'fields.content')"
              type="rec" />
    <Swiper v-else
              :posts="postsFeatured"
              type="rec" />
    <Footer :posts="posts"
            :tags="tags"
            :author="author" />     
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import siteConfig from '~/siteConfig.json'
import List from '~/components/List.vue'
import Swiper from '~/components/Swiper.vue'
import Footer from '~/components/Footer.vue'
import SideBtns from '~/components/SideBtns.vue'
import Vue2Filters from 'vue2-filters'

const client = createClient()

export default {
  head () {
    return {
      title: `${this.post.fields.title} | ${siteConfig.title} - ${siteConfig.subtitle}`,
      meta: [{
        hid: `description`,
        name: 'description',
        content: `${this.post.fields.title} | ${siteConfig.title} - ${siteConfig.subtitle}`,
      }],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-dark.min.css' },
      ] 
    }
  },
  asyncData ({env,params}) {
    return Promise.all([
      client.getEntries({
        'sys.id': env.CTF_AUTHOR_ID
      }),
      client.getEntries({
        'content_type': 'post',
        'fields.slug': params.slug
      }),
      client.getEntries({
        'content_type': 'post',
        order: '-sys.createdAt'
      }),
      client.getEntries({
        'content_type': 'post',
        'fields.slug[nin]': params.slug,
        order: '-sys.createdAt'
      }),
      client.getEntries({
        'content_type': 'post',
        'fields.slug[nin]': params.slug,
        'fields.featured': true,
        order: '-sys.createdAt'
      }),
      client.getEntries({
        'content_type': 'tag',
        order: '-sys.createdAt'
      })
    ]).then(([authors, post, posts, postsRec, postsFeatured, tags]) => {
      return {
        author: authors.items[0],
        post: post.items[0],
        posts: posts.items,
        postsRec: postsRec.items,
        postsFeatured: postsFeatured.items,
        tags: tags.items
      }
    }).catch(console.error)
  },
  data () {
    return {
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      fontSize: siteConfig.postOption.fontSize,
      lineHeight: siteConfig.postOption.lineHeight,
      thumbnailSize: siteConfig.postOption.thumbnailSize
    }
  },
  components: {
    List,
    Swiper,
    Footer,
    SideBtns
  },
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus">
.single 
  .head 
    width 100%
    height calc(30vw + 100px)
    max-height 400px
    margin 0 0 30px 0
    overflow hidden
    position relative
    text-align center
    img
      opacity .1
    .text-box 
      position absolute
      top 100px
      width 90%
      left 50%
      margin-left -45%
      text-align center
      color #555
    .category 
      font-size 1rem
      background #555
      color white
      display inline-block
      padding 5px 10px
      border-radius 5px
      cursor pointer
    h1 
      width 600px
      font-size 2rem
      margin 5px auto
      cursor pointer
    .date 
      font-size 1rem
    .tags p
      border 1px solid #555
      padding 5px 10px
      border-radius 5px
      display inline-block
      font-size .8rem
      margin 0 2px
      cursor pointer
  .body 
    width 600px
    margin 10px auto 100px
    .table-of-contents
      position fixed
      width 180px
      top 35vh
      right 5px
      border-radius 5px
      padding 0 12px
      z-index 10
      ul 
        margin 0
        padding 0
        li 
          list-style none
          font-size .8rem
          line-height 1.2rem
          margin 15px 0
          padding-bottom 2px
    :link,:visited
      border-bottom 2px solid #eee
      transition .2s
    :link:hover,:visited:hover
        border-bottom 2px solid #555
    p 
      margin 30px 0

    h1 
      margin 50px 0 30px
      padding 50px 0 10px
      font-size 1.8rem
      text-align center
    h2 
      font-size 1rem
      margin 30px 0 0
      padding-left 10px
      border-left 5px solid #555
    code
      margin 3px
      padding 3px
      border-radius 2px
      font-weight bold
      font-family 'Courier New', Courier, monospace
      background #eee 
    .hljs 
      background rgba(0,0,0,.9)
      padding 10px 20px
      font-size .9rem
    .result
      border 1px solid #eee
      padding 10px 20px
      margin -15px 3px 0   
      h1
        margin 0
        padding 10px 0 0
    blockquote
      background #eee
      padding 10px 15px
      margin 10px
      p
        margin 0
  .body:after
    content: ''
    display block
    margin 50px auto 0
    width 50%
    height 5px
    background #555
    border-radius 5px
@media (max-width: 1000px)
  .single
    .head
      h1
        width auto
        font-size 1.5rem
    .body
      width 80%
      margin 50px auto
      .table-of-contents
        position relative
        width auto
        top auto
        right auto
        border 1px solid #eee
        border-radius 5px
        width 60%
        margin 20px auto    
@media (max-width: 768px) 
  .single 
    .head 
      width 100%
      margin 10px 0 30px 0
      border-radius 0
      .text-box 
        top 3vw
    h1 
      font-size 1.2rem
    .body 
      width 95%
      padding 5px
      margin 0 auto
      text-align justify
      .table-of-contents
        width 90%
      h1
        margin 50px -2.5% 10px
        padding-top 20px
        text-align center
        font-size 1.4rem
      h2
        margin 0 -2.5%
        border-radius 0  
        font-size 1rem
      .hljs 
        background rgba(0,0,0,.9)
        border-radius 0
        padding 10px
        margin 0 -2.5%
</style>

