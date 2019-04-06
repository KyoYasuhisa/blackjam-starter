<template>
  <section class="side-btns">
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
               @click="copyURL">
      <fa :icon="faLink"/>
    </fa-layers>
  </section>
</template>

<script>
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import siteConfig from '~/siteConfig.json'

export default {
  data () {
    return {
      baseURL: siteConfig.baseURL,
    }
  },
  props: ['post','author'],
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
    async copyURL() {
      await this.$copyText(this.baseURL+'/post/'+this.post.fields.slug)
      .then(() => {
        alert('記事ページへのリンクをクリップボードにコピーしました。')
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
.side-btns
    position fixed
    top 35vh
    left 20px
    padding 0 15px
    border-radius 5px
    z-index 20
    .icon
      display block
      margin 20px 0
      cursor pointer
@media (max-width: 1000px)
  .side-btns
    top auto
    left auto
    bottom 60px
    right 10px
</style>

