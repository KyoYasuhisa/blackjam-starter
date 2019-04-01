<template>
  <section class="top">
    <h1>{{ title }}</h1>
    <div class="logo">
      <img :src="logo">
    </div>
    <p class="buy-btn">コーヒー１杯分(500円)のお金でblackJAMをはじめる</p>
    <p class="copyright">Copyright 2019. {{ author.fields.name }}. All Rights Reserved. The logo was created by cato Barend van Scalkwyk from Noun Project.</p>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import siteConfig from '~/siteConfig.json'
import List from '~/components/List.vue'
import Footer from '~/components/Footer.vue'
import Vue2Filters from 'vue2-filters'

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
      logo: siteConfig.logo
    }
  }
}
</script>

<style lang="stylus" scoped>
h1
  font-size 5rem
  text-align center
  font-family 'Amatic SC', sans-serif
  margin 50px 0 0
.logo
  margin 0 auto -60px
  width 300px
  overflow hidden
  img
    width 100%
.buy-btn
  margin 0 auto 100px
  width 174px
  text-align center   
  background #555
  color white
  padding 10px 25px
  border 3px solid #555
  border-radius 40px
  font-weight bold
  cursor pointer
  transition .2s
.buy-btn:hover
  background white
  color #555
.copyright
  text-align center
  font-size .8rem
</style>

