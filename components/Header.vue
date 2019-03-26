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
           placeholder="Search"
           v-model="query"
           @keypress.enter="$router.push({ name: 'getby-query',
                                           params: { 
                                             getby: 'search',
                                             query: query } })">
  </header>
</template>

<script>
import siteConfig from "~/siteConfig.json"

export default {
  data () {
    return {
      query: '',
      logo: siteConfig.logo,
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      categoriesFeatured: siteConfig.categoriesFeatured
    }
  }
}
</script>


<style lang="stylus" scoped>
header
  width 100%
  margin 0 auto
  padding 0
  display flex
  flex-wrap nowrap
  justify-content flex-start
  background white
  border-bottom 1px solid #eee
  .logo
    width 50px
    height 50px
    min-width 50px
    min-height 50px
    border 1px solid #eee
    border-radius 5px
    margin 7px 0 0 10px
    overflow hidden
    img 
      width 100%
  .titles 
    width 300px
    margin -10px 0 0 5px
    .title
      margin-bottom 0
      font-size 2rem
      font-family 'Hi Melody', sans-serif
    .subtitle 
      margin-top 0
      font-size .7rem
  .searcher 
    display block
    width 80%
    margin 12px
    padding 0 20px
    border-radius 20px
    height 40px
    font-size .9rem
    border 1px solid #eee
  .searcher:focus 
    outline none
    border 1px solid #555
@media (max-width: 768px)
  header 
    width 100%
    display block
    text-align center
    position relative
    padding-bottom 15px
    border none
    .logo 
      margin 10px auto 0
    .titles 
      width 100%
      margin 0 auto 10px
      .title
        margin-top 0
    .searcher
      width 98%
      margin 0 auto
      text-align center
</style>
