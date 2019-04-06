<template>
  <section class="rec post-list">
    <div class="section-title">
      <h2>これを読んだあなたにお薦めの記事</h2>
      <p class="subtitle">recommended</p>
    </div>
    <div v-if="postsRec.length > 0">
      <swiper :options="swiperOption">
        <SliderItem v-for="post in limitBy(postsRec, showNumRec)"
                    :key="post.sys.id"
                    :post="post" />
      </swiper>              
    </div>
    <div v-else>
      <swiper :options="swiperOption">
        <SliderItem v-for="post in limitBy(postsFeatured, showNumRec)"
                    :key="post.sys.id"
                    :post="post" />
      </swiper>                 
    </div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>                     
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
      showNumRec: siteConfig.listOption.showNumRec
    }
  },
  props: ['postsRec','postsFeatured','tag'],
  components: {
    SliderItem
  },
  mixins: [Vue2Filters.mixin],
}
</script>

<style lang="stylus" scoped>
.rec
  position relative
.swiper-button-prev,
.swiper-button-next
  top 45%
.swiper-button-prev
  background-image url('/left-arrow.svg')
.swiper-button-next
  background-image url('/right-arrow.svg')  

</style>
