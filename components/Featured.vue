<template>
  <section class="featured post-list">
    <swiper :options="swiperOption">
      <SliderItem v-for="post in filterBy(posts, true, 'fields.featured')"
               :key="post.sys.id"
               :post="post" />
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>                     
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
.swiper-button-prev,
.swiper-button-next
  display none
@media (max-width: 768px)
  .swiper-button-prev,
  .swiper-button-next
    display block
    top 40%
  .swiper-button-prev
    background-image url('/left-arrow.svg')
  .swiper-button-next
    background-image url('/right-arrow.svg')  
</style>
