<template>
  <header>
    <nuxt-link to='/'>
      <div class="logo-with-titles"
           v-if="logoWithTitles">
        <img :src="logoWithTitles" :alt="title">
      </div>
      <div class="logo-with-titles-small"
           v-if="logoWithTitles">
        <img v-if="logoWithTitlesSmall" 
             :src="logoWithTitlesSmall" 
             :alt="title">
        <img v-else 
             :src="logoWithTitles" 
             :alt="title">
      </div>
      <div class="logos"
           v-else>
        <div v-if="logo" 
           class="logo">
          <img :src="logo" :alt="title">
        </div>
        <div class="titles">
          <h1 class="title">
            {{ title }}
          </h1>
          <h2 class="subtitle">
            {{ subtitle }}
          </h2>
        </div>
      </div>
    </nuxt-link>  
    <label for="searcher" style="display: none;"></label>
    <input type="search" 
           name="searcher"
           id="searcher"
           aria-label="searcher"
           class="searcher"
           placeholder="Search posts"
           v-model="query"
           @keypress.enter="$router.push({ name: 'posts-getby-query',
                                           params: { 
                                              getby: 'search',
                                              query: query } })">                                                                       
  </header>
</template>

<script>
import siteConfig from '~/siteConfig.json'

export default {
  data () {
    return {
      query: '',
      logo: siteConfig.logo,
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      logoWithTitles: siteConfig.logoWithTitles,
      logoWithTitlesSmall: siteConfig.logoWithTitlesSmall
    }
  }
}
</script>

<style lang="stylus" scoped>
header
  position fixed
  top 0
  width 100%
  margin 0 auto
  padding 0 0 3px
  display flex
  flex-wrap nowrap
  justify-content flex-start
  background rgba(255,255,255,.6)
  z-index 100
  .logo-with-titles
    width 180px
    margin 12px 10px
    overflow hidden
    img
      width 100%
  .logo-with-titles-small
     display none   
     overflow hidden
     img
       width 100%
  .logos
    display flex
    flex-wrap nowrap
    justify-content flex-start
    .logo
      width 50px
      height 50px
      min-width 50px
      min-height 50px
      margin 10px 0 0 10px
      overflow hidden
      img 
        width 100%
    .titles 
      width 200px
      margin -6px 0 0 10px
      .title
        margin-bottom 8px
        font-size 1.8rem
        font-family 'Product Sans', sans-serif
        font-weight lighter
      .subtitle 
        margin-top -10px
        font-size .7rem
  nav
    display flex
    flex-wrap nowrap
    justify-content center
    margin-top 22px
    li
      list-style none
      margin 0 10px
      width 50px
      padding 0 5px 5px
      font-size 1.2rem
      text-align center
      border-bottom 3px solid #eee
      transition .2s
    li:hover
      border-bottom 3px solid #555
    .active
      border-bottom 3px solid #555
  .searcher
    width 100%
    display block
    width 95%
    margin 20px 12px 10px
    padding 0 20px
    border-radius 20px
    height 40px
    font-size .9rem
    border 3px solid #eee
    background rgba(255,255,255,.6)
    transition .2s
  .searcher:focus 
    outline none
  .searcher:hover 
    outline none
    border 3px solid #555
  .menu-btn
    margin 2px 20px 0 0
    background #eee
    border-radius 5px
    cursor pointer
    p
      margin 0
      padding 14px 15px 0
      text-align center
  .pay-btn
    background #555
    color white
    border-radius 5px
    height 33px
    line-height 33px  
    width 165px
    min-width 165px
    margin 15px 15px 0 0
    padding-right 5px
    border 3px solid #555
    text-align center
    font-size .9rem
    transition .2s
    cursor pointer
    .icon
      margin 0 5px
  .pay-btn:hover
    background white
    color #555
@media (max-width: 768px)
  header 
    width 100%
    display block
    text-align center
    position relative
    padding 10px 0
    border none
    .logo-with-titles
      display none
    .logo-with-titles-small
      display block
      width 10%  
      margin 10px auto
    .logos
      display block
      .logo 
        margin 10px auto 0
      .titles 
        width 100%
        margin 0
        .title
          margin 0 auto 8px
    nav 
      margin 0 0 10px 0
    .searcher
      width 100%
      margin 0 auto
      border-radius 0
      background #eee
    .searcher:hover
      background #555
      color white
    .pay-btn
      position fixed
      bottom 20px
      left 50%
      margin 0 0 0 -45%
      font-size .9rem
      width 90%
      height 30px
      min-width 90%
      min-height 30px
      line-height 30px
      border-radius 20px
      padding 0
</style>
