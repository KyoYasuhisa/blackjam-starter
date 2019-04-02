<template>
  <section class="top">
    <div class="titles">
      <h1 class="title">{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <div class="logo">
      <img :src="logo">
    </div>
    <div class="message">
      <div class="avatar">
        <div class="img">
          <img :src="author.fields.avatar.fields.file.url" alt="avatar">
        </div>  
        <p>{{ author.fields.name }}</p>
       </div> 
      <p>blackJAMは「静的サイトジェネレータ」と「ヘッドレスCMS」によって構成されるモダンでハイスペックなブログを今すぐかんたんに始めるためのテンプレートです。</p>
    </div>
    <div class="top-btn">
      <fa-layers full-width class="fa-2x icon">
        <fa :icon="faFeatherAlt"/>
      </fa-layers>
      500円でモダンブログをはじめる
    </div>
    <nuxt-link to="/tips">
      <div class="top-btn">
        <fa-layers full-width class="icon">
          <fa :icon="faEye"/>
        </fa-layers>
        Live Demoをみる
      </div>
    </nuxt-link>  
    <p class="copyright">Copyright 2019. {{ author.fields.name }}. All Rights Reserved. The logo was created by cato Barend van Scalkwyk from Noun Project.</p>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import siteConfig from '~/siteConfig.json'
import List from '~/components/List.vue'
import Footer from '~/components/Footer.vue'
import Vue2Filters from 'vue2-filters'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

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
      })
    ]).then(([authors]) => {
      return {
        author: authors.items[0]
      }
    }).catch(console.error)
  },
  data () {
    return {
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      logo: siteConfig.logo 
    }
  },
  computed: {
    faEye () {
      return faEye
    },
    faFeatherAlt () {
      return faFeatherAlt
    }
  }
}
</script>

<style lang="stylus" scoped>
.titles
  text-align center
  .title
    font-size 5rem
    font-family 'Amatic SC', sans-serif
    margin 50px 0 0
  .subtitle
    font-size .8rem
    font-weight bold
    margin 0  
.logo
  margin 0 auto -60px
  width 200px
  overflow hidden
  img
    width 100%
.message
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  width 360px
  margin 20px auto
  padding 10px
  border 1px solid #eee
  border-radius 5px
  font-size .9rem
  .avatar
    text-align center
    margin-right 10px
    .img
      width 50px
      height 50px
      max-width 50px
      max-height 50px
      border-radius 50%
      overflow hidden
      border 1px solid #eee
      img
        width 100%
    p
      margin 0
.top-btn
  width 250px
  margin 10px auto
  text-align center   
  background white
  color #555
  padding 10px 25px 12px
  border 1px solid #eee
  border-radius 40px
  font-weight bold
  transition .2s
  .icon
    font-size 1.5rem
    margin 0 10px 0 0
    position relative
    top 3px
.top-btn:hover
  box-shadow 0 0 5px rgba(0,0,0,.3)
.copyright
  text-align center
  font-size .8rem
@media (max-width: 768px)
  .message
    width 80%
  .buy-btn
    width 80%
</style>

