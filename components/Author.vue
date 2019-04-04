<template>
  <section class="author">
    <div class="head">
      <div class="img">
        <img :src="author.fields.avatar.fields.file.url" alt="avatar">
      </div>  
      <div class="texts">
        <p class="name"><span>Author:</span> {{ author.fields.name }}</p>
        <a :href="'https://twitter.com/' + author.fields.twitter" target="blank">
          <p class="twitter">@{{ author.fields.twitter }}</p>
        </a>
      </div>
    </div>
    <p class="body">{{ author.fields.shortBio }}</p>
  </section>
</template>

<script>
export default {
  props: ['author']
}
</script>

<style lang="stylus" scoped>
.author 
  text-align left
  margin 0 auto 100px
  position relative
  background rgba(255,255,255,.4)
  .head
    text-align center
    height auto
    margin-bottom 0
    .img
      width 80px
      height 80px
      max-width 80px
      max-height 80px
      border-radius 50%
      border 1px solid #eee  
      margin 0 auto -10px
      overflow hidden
      position relative
      top 8px
      img 
        width 100%
    .texts
      margin 0 auto
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
  .body
    border 1px solid #eee
    border-radius 5px
    padding 10px
    margin 0 auto
    font-size 1rem
    line-height 1.5rem
  .copyright 
    text-align center
    font-size .8rem
</style>


