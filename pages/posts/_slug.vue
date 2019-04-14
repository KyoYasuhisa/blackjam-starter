<template>
  <section class="single">
    <div class="head">
      <div v-if="post.fields.image == undefined"
           class="img"
           :style="'background-image: url('+ defaultImg +');'
                  +'background-repeat:' + repeat +';'
                  +'background-size:' + size + ';'
                  +'background-position:' + position + ';'
                  +'background-attachment:' + attachment + ';'
                  +'filter:' + filter + ';'">
      </div>
      <div v-else
           class="img"
           :style="'background-image: url(' + post.fields.image.fields.file.url +');'
                  +'background-repeat:' + repeat +';'
                  +'background-size:' + size + ';'
                  +'background-position:' + position + ';'
                  +'background-attachment:' + attachment + ';'
                  +'filter:' + filter + ';'">
      </div>
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
    <div class="post-intro" 
         :style="'font-size:'+fontSize+'; line-height:'+lineHeight+';'"
         v-html="$md.render(post.fields.intro)">    
    </div>     
    <Swiper v-if="filterBy(postsRec, post.fields.tags[0].fields.name, 'fields.content').length > 0"
            :posts="filterBy(postsRec, post.fields.tags[0].fields.name, 'fields.content')"
            type="top-rec"
            class="top-rec" />  
    <Swiper v-else
            :posts="postsFeatured"
            type="rec" />          
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
      repeat: siteConfig.backgroundImageOption.repeat,
      size: siteConfig.backgroundImageOption.size,
      position: siteConfig.backgroundImageOption.position,
      attachment: siteConfig.backgroundImageOption.attachment,
      filter: siteConfig.backgroundImageOption.filter,
      defaultImg: siteConfig.postOption.defaultImg
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
    position relative
    overflow hidden
    text-align center
    min-height 350px
    .img
      position absolute
      top 0
      bottom 0
      width 100%
      z-index -1
    .text-box 
      padding 10px 0 30px
      .category 
        display inline-block
        padding 5px 10px
        border-bottom 3px solid #555
      h1 
        font-size 2rem
        margin 10px auto 20px
      .date 
        font-size 1rem
      .tags p
        border 1px solid #eee
        padding 0 10px
        height 25px
        line-height 25px
        border-radius 5px
        display inline-block
        font-size .8rem
        margin 0 2px
        cursor pointer  
  .top-rec
    width 600px
    margin 10px auto
  .post-intro
    width 600px
    margin 30px auto
    padding 20px 40px
    border-radius 5px
    h1,h2,h3,h4,h5,h6
      text-align left
      margin 5px 0
      padding 0
    p
      margin 0
  .intro:after
    display none
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
      font-size 1.5rem
      text-align center
    h2 
      font-size 1.2rem
      margin 30px 0 0
      padding-left 10px
      border-left 5px solid #555
    h3
      font-size 1rem  
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
    width 25%
    height 5px
    background #555
    border-radius 10px
@media (max-width: 1000px)
  .single
    .head
      .text-box 
        h1
          width auto   
    .post-intro,
    .top-rec
      width 80%      
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
        width 90%
        margin 20px auto  
        padding 10px 0
        a
          margin-left 10% 
@media (max-width: 768px) 
  .single 
    .head 
      width 100%
      margin 10px 0 0
      min-height 200px
      .text-box 
        top 3vw
      .text-box 
        h1 
          font-size 1.5rem
    .post-intro,
    .top-rec
      width 95%  
      margin 30px auto 0
      padding 0   
      h1
        font-size 1.2rem
    .body 
      width 95%
      padding 5px
      margin 0 auto
      text-align justify
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

