<template>
  <section class="comments">
    <div class="section-title">
      <h2>Comments</h2>
      <p class="subtitle">{{ commentMessage }}</p>
    </div>
    <vue-disqus :shortname="disqusShortName"
                :title="title"
                :url="baseURL+'/'+slug">
    </vue-disqus>
  </section>
</template>

<script>
import siteConfig from '~/siteConfig.json'

export default {
  data () {
    return {
      baseURL: siteConfig.baseURL,
      disqusShortName: siteConfig.disqusShortName,
      commentMessage: siteConfig.commentMessage
    }
  },
  props: ['title','slug']
}
</script>

<style lang="stylus">
.comments
  margin 0 auto 30px
</style>

