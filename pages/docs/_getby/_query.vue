<template>
  <section class="docs">
    <DocNav :docGroups="docGroups"
            :docs="docs" />
    <div class="doc-body" 
         v-if="queryDocs.length > 0">
      <DocItem v-for="doc in queryDocs"
               :key="doc.sys.id"
               :doc="doc" />
    </div>
    <div v-else
         class="doc-list not-found">
      <p>記事が見つかりませんでした...</p>
    </div>
  </section>
</template>

<script>
import siteConfig from '~/siteConfig.json'
import { createClient } from '~/plugins/contentful.js'
import DocNav from '~/components/DocNav.vue'
import DocItem from '~/components/DocItem.vue'

const client = createClient()

export default {
  head () {
    return {
      title: `Search: ${this.$route.params.query} - ${siteConfig.title} | ${siteConfig.subtitle}`,
      meta: [{
        hid: `description`,
        name: 'description',
        content: `${this.$route.params.query} - ${siteConfig.title} | ${siteConfig.subtitle}`,
      }]
    }
  },
  asyncData ({params}) {
    if (params.getby == 'search') {
      return Promise.all([
        client.getEntries({
          'content_type': 'doc',
          query: params.query,
          order: '-sys.createdAt'
        }),
        client.getEntries({
          'content_type': 'docGroup',
          order: 'fields.slug'
        }),
        client.getEntries({
          'content_type': 'doc',
          order: 'sys.createdAt'
        })
      ]).then(([queryDocs,docGroups,docs]) => {
        return {
          queryDocs: queryDocs.items,
          docGroups: docGroups.items,
          docs: docs.items
        }
      }).catch(console.error)
    }
  },
  components: {
    DocNav,
    DocItem
  }
}
</script>

<style lang="stylus" scoped>
.not-found 
  text-align center
</style>

