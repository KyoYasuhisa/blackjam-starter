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
    <nav>
      <nuxt-link to='/tips'>
        <li :class="{ active: $route.name == 'tips-getby-query' || $route.name == 'tips-slug' || $route.name == 'tips' }">Tips</li>
      </nuxt-link>
      <nuxt-link to='/docs'>    
        <li :class="{ active: $route.name == 'docs-getby-query' || $route.name == 'docs-slug' || $route.name == 'docs' }">Docs</li>
      </nuxt-link>  
    </nav>   
    <input v-if="$route.name == 'tips-getby-query' || $route.name == 'tips-slug' || $route.name == 'tips'"
           class="searcher" 
           type="search" 
           placeholder="Search Tips"
           v-model="query"
           @keypress.enter="$router.push({ name: 'tips-getby-query',
                                           params: { 
                                             getby: 'search',
                                             query: query } })">
    <input v-if="$route.name == 'docs-getby-query' || $route.name == 'docs-slug' || $route.name == 'docs'"
           class="searcher" 
           type="search" 
           placeholder="Search Docs"
           v-model="query"
           @keypress.enter="$router.push({ name: 'docs-getby-query',
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
      categoriesFeatured: siteConfig.categoriesFeatured,
      isOpen: true
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
  padding 5px 0
  display flex
  flex-wrap nowrap
  justify-content flex-start
  background white
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
      margin-bottom 0
      font-size 2rem
      font-family 'Hi Melody', sans-serif
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
    margin 12px
    padding 0 20px
    border-radius 20px
    height 40px
    font-size .9rem
    border 3px solid #eee
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
      margin 0
      .title
        margin 0 auto
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
</style>
