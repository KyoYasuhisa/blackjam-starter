<template>
  <section class="container">
    <h1>{{ post.fields.title }}</h1>
  </section>
</template>

<script>
import { createClient } from "~/plugins/contentful.js" //追加

const client = createClient() //追加

export default { 
  asyncData ({env,params}) { //追加
    return Promise.all([
      // authorデータを全て取得
      client.getEntries({
        'sys.id': env.CTF_AUTHOR_ID
      }),
　　　 // postデータを全て取得
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug
      }),
      // tagデータを全て取得
      client.getEntries({
        'content_type': 'tag',
        order: '-sys.createdAt'
      })
    // 取得した３つのデータをそれぞれauthors, posts, tagsに入れる  
    ]).then(([authors, post, tags]) => {
      // authorsの最初のアイテム、postsとtagsの全アイテムをそれぞれauthor, posts, tagsに入れる
      return {
        author: authors.items[0],
        post: post.items[0],
        tags: tags.items
      }
    }).catch(console.error)
  }
}
</script>

<style>

</style>

