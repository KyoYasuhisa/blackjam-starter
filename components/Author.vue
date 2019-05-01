<template>
  <section class="author">
    <div class="author-head">
      <div v-if="author.fields.avatar != undefined"
           class="avatar"
           :style="'background-image: url(' + author.fields.avatar.fields.file.url +');'">
      </div>  
      <div v-else
           class="avatar"
           :style="'background-image: url('+ defaultImg +');'">
      </div> 
      <div class="texts">
        <p class="name"><span>Author:</span> {{ author.fields.name }}</p>
        <a v-if="author.fields.twitter != undefined"
           :href="'https://twitter.com/' + author.fields.twitter" target="blank">
          <p class="twitter">@{{ author.fields.twitter }}</p>
        </a>
      </div>
    </div>
    <p v-if="author.fields.shortBio != undefined"
       class="author-content">{{ author.fields.shortBio }}</p>
  </section>
</template>

<script>
import siteConfig from '~/siteConfig.json'

export default {
  props: ['author'],
  data () {
    return {
      defaultImg: siteConfig.postOption.defaultImg
    }
  }
}
</script>

<style lang="stylus" scoped>
.author 
  text-align left
  margin 0 auto 100px
  position relative
  background rgba(255,255,255,.4)
  padding 10px
  .author-head
    display flex
    flex-wrap nowrap
    justify-content flex-start
    .avatar
      width 80px
      height 80px
      max-width 80px
      max-height 80px
      min-width 80px
      min-height 80px
      margin-right 10px
      border-radius 50%
      border 1px solid #eee  
      overflow hidden
      position relative
      top 8px
      background-repeat no-repeat
      background-size cover
    .texts
      .name 
        font-size 1.5rem
        font-weight bold
        margin-bottom 0
        span 
          font-size .9rem
      .twitter 
        display inline-block
        margin-top 0
        padding-bottom 2px
        border-bottom 2px solid #eee
        transition .2s
      .twitter:hover 
        border-bottom 2px solid #555
  .author-content
    background #eee
    border-radius 5px
    padding 10px
    margin 10px auto 0
    font-size .9rem
    line-height 1.5rem
  .copyright 
    text-align center
    font-size .8rem
</style>


