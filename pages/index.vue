<template>
  <section class="container">
    <div v-for="post in posts"
         :key="post.sys.id">
      <nuxt-link :to="{name: 'post-slug', params: { slug: post.fields.slug } }">
        {{ post.fields.title }}      
      </nuxt-link>  
    </div>
  </section>
</template>

<script>
import { createClient } from "~/plugins/contentful.js" //追加

const client = createClient() //追加

export default { 
  asyncData ({env}) { //追加
    return Promise.all([
      // authorデータを全て取得
      client.getEntries({
        'sys.id': env.CTF_AUTHOR_ID
      }),
　　　 // postデータを全て取得
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      }),
      // tagデータを全て取得
      client.getEntries({
        'content_type': 'tag',
        order: '-sys.createdAt'
      })
    // 取得した３つのデータをそれぞれauthors, posts, tagsに入れる  
    ]).then(([authors, posts, tags]) => {
      // authorsの最初のアイテム、postsとtagsの全アイテムをそれぞれauthor, posts, tagsに入れる
      return {
        author: authors.items[0],
        posts: posts.items,
        tags: tags.items
      }
    }).catch(console.error)
  }
}
</script>

<style>

</style>

