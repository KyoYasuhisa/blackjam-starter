<template>
  <section class="featured post-list">
    <swiper :options="swiperOption">
      <SliderItem v-for="post in filterBy(posts, true, 'fields.featured')"
               :key="post.sys.id"
               :post="post" />           
      <div class="swiper-pagination" slot="pagination"></div>              
    </swiper>
  </section>
</template>

<script>
import siteConfig from '~/siteConfig.json'
import SliderItem from '~/components/SliderItem.vue'
import Vue2Filters from 'vue2-filters'

export default {
  data() {
    return {
      swiperOption: siteConfig.swiperOption,
    }
  },
  props: ['posts'],
  components: {
    SliderItem
  },
  mixins: [Vue2Filters.mixin],
}
</script>

<style lang="stylus" scoped>
.featured
  width 100%
.swiper-pagination-bullet
  background #555
</style>
