<template>
  <section class="featured post-list">
    <div class="section-title">
      <h1 v-if="type == 'rec'">あなたへのお薦め</h1>
      <h1 v-else>注目の記事</h1>
      <p v-if="type == 'rec'" 
         class="subtitle">recommended</p>
      <p v-else 
         class="subtitle">featured</p>
    </div>
    <div class="posts">
      <BoxItem v-for="post in posts"
               :key="post.sys.id"
               :post="post" />    
    </div>
  </section>
</template>

<script>
import BoxItem from '~/components/BoxItem.vue'
export default {
  props: ['posts','type'],
  components: {
      BoxItem
  }
}
</script>

