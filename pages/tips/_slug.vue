<template>
  <section class="single">
    <div class="head">
      <div class="cover"></div> 
      <img :src="post.fields.image.fields.file.url" alt="thumbnail">
      <div class="text-box">
        <nuxt-link :to="{ name: 'tips-getby-query', 
                          params: { 
                            getby: 'category',
                            query: post.fields.category.fields.slug } }">
          <p class="category">
            {{ post.fields.category.fields.name }}
          </p>
        </nuxt-link>
        <h1>{{ post.fields.title }}</h1>
        <div class="tags">
          <li v-for="tag in post.fields.tags"
              :key="tag.sys.id"
              @click="$router.push({ name: 'tips-getby-query', 
                                     params: { 
                                       getby: 'tag',
                                       query: tag.sys.id } })">
            {{ tag.fields.name }}
          </li>
        </div>
      </div>
    </div>
    <div class="sns">
      <a :href='"https://twitter.com/share?url="+baseURL+"/post/"+post.fields.slug+"&via="+author.fields.twitter+"&related="+author.fields.twitter+"&text="+post.fields.title' 
         rel="nofollow" 
         target="_blank">
        <fa-layers full-width class="fa-2x icon">
          <fa :icon="faTwitter"/>
        </fa-layers>
      </a>
      <a :href='"http://www.facebook.com/share.php?u="+baseURL+"/post/"+post.fields.slug' 
         rel="nofollow" 
         target="_blank">
        <fa-layers full-width class="fa-2x icon">
          <fa :icon="faFacebook"/>
        </fa-layers>
      </a>
      <fa-layers full-width class="fa-2x icon"
                 @click="copyLink">
        <fa :icon="faLink"/>
      </fa-layers>
    </div>
    <div class="body" v-html="$md.render(post.fields.content)"></div>
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
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const client = createClient()

export default {
  head () {
    return {
      title: `${this.post.fields.title} | ${siteConfig.title} - ${siteConfig.subtitle}`,
      meta: [{
        hid: `description`,
        name: 'description',
        content: `${this.post.fields.title} | ${siteConfig.title} - ${siteConfig.subtitle}`,
      }]
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
        'content_type': 'tag',
        order: '-sys.createdAt'
      })
    ]).then(([authors, post, posts, tags]) => {
      return {
        author: authors.items[0],
        post: post.items[0],
        posts: posts.items,
        tags: tags.items
      }
    }).catch(console.error)
  },
  data () {
    return {
      swiperOption: siteConfig.swiperOption,
      baseURL: siteConfig.baseURL,
      title: siteConfig.title,
      subtitle: siteConfig.subtitle
    }
  },
  components: {
    List,
    Footer
  },
  computed: {
    faTwitter () {
      return faTwitter
    },
    faFacebook () {
      return faFacebook
    },
    faLink () {
      return faLink
    }
  },
  methods: {
    copyLink () {
      navigator.clipboard.writeText(this.baseURL+'/post/'+this.post.fields.slug)
      .then(function() {
        alert('URL Copied!')
      })
    }
  }
}
</script>

<style lang="stylus">
.single 
  .sns
    position fixed
    top 30vh
    left 20px
    padding 0 15px
    border-radius 5px
    background rgba(255,255,255,.8)
    z-index 20
    .icon
      display block
      margin 20px 0
      cursor pointer
  .head 
    width 100%
    height calc(30vw + 100px)
    max-height 400px
    margin 0 0 30px 0
    overflow hidden
    position relative
    .cover 
      position absolute
      background rgba(255,255,255,.9)
      top 0
      bottom 0
      width 100%
    img 
      width 100%
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
    .tags li 
      list-style none
      border 1px solid #555
      padding 5px 10px
      border-radius 5px
      display inline-block
      font-size .8rem
      margin 0 2px
      cursor pointer
  .body 
    width 600px
    margin 50px auto 200px
    font-size 1rem
    line-height 2.4rem
    .table-of-contents
      position fixed
      width 180px
      top 30vh
      right 5px
      border-radius 5px
      padding 0 12px
      margin 40px 0
      background rgba(255,255,255,.8)
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

    h2 
      margin 0 0 -10px
      padding-top 60px
      font-size 1.4rem
    h3 
      font-size 1rem
      margin 30px 0 -20px 0
      background #eee
      padding 5px 10px
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
    .sns
      top auto
      left auto
      bottom 10px
      right 10px      
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
      h2
        padding-top 20px
      .hljs 
        background rgba(0,0,0,.9)
        border-radius 0
        padding 10px
        margin 0 -2.5%
</style>

