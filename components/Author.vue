<template>
  <section class="author">
    <img :src="author.fields.avatar.fields.file.url" alt="avatar">
    <p class="name"><span>Author:</span> {{ author.fields.name }}</p>
    <a :href="'https://twitter.com/' + author.fields.twitter" target="blank">
      <p class="twitter">@{{ author.fields.twitter }}</p>
    </a>
    <p class="short-bio">{{ author.fields.shortBio }}</p>
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
  img 
    position absolute
    top -100px
    right 0
    z-index -1
    width 180px
  .name 
    font-size 2rem
    font-weight bold
    margin-bottom 0
    span 
      font-size 1rem
  .twitter 
    display inline-block
    margin-top 0
    padding-bottom 2px
    border-bottom 2px solid #eee
    transition .2s
  .twitter:hover 
    border-bottom 2px solid #555
  .copyright 
    text-align center
    font-size .8rem
</style>


