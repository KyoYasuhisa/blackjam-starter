<template>
  <header>
    <nuxt-link to='/'>
      <div class="logo">
        <img :src="logo" alt="logo">
      </div>
    </nuxt-link>  
    <nuxt-link to='/'>  
      <div class="titles">
        <h1 class="title">
          {{ title }}
        </h1>
        <h2 class="subtitle">
          {{ subtitle }}
        </h2>
      </div>
    </nuxt-link>
    <input class="searcher" 
           type="search" 
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
      subtitle: siteConfig.subtitle
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
  padding 0 0 5px
  display flex
  flex-wrap nowrap
  justify-content flex-start
  background rgba(255,255,255,.6)
  z-index 100
  box-shadow 0 0 3px #eee
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
    margin -6px 0 0 5px
    .title
      margin-bottom 8px
      font-size 1.8rem
      font-family 'Amatic SC', sans-serif
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
    display block
    width 80%
    margin 15px 12px 10px
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
