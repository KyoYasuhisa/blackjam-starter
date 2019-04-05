<template>
  <section class="docs">
    <DocNav :docGroups="docGroups"
            :docs="docs" />
    <DocBody :groupName="docs[0].fields.docGroup.fields.name"
             :doc="docs[0]" />
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import siteConfig from '~/siteConfig.json'
import DocNav from '~/components/DocNav.vue'
import DocBody from '~/components/DocBody.vue'

const client = createClient()

export default { 
  head () {
    return {
      title: `Docs - ${siteConfig.title} | ${siteConfig.subtitle}`,
      meta: [{
        hid: `description`,
        name: 'description',
        content: `Docs - ${siteConfig.title} | ${siteConfig.subtitle}`,
      }]
    }
  },
  asyncData () {
    return Promise.all([
      client.getEntries({
        'content_type': 'docGroup',
        order: 'fields.slug'
      }),
      client.getEntries({
        'content_type': 'doc',
        order: 'sys.createdAt'
      })
    ]).then(([docGroups, docs]) => {
      return {
        docGroups: docGroups.items,
        docs: docs.items
      }
    }).catch(console.error)
  },
  components: {
    DocNav,
    DocBody
  }
}
</script>

<style lang="stylus">
.docs
  .doc-body
    margin-left 280px
    padding 0 5%
@media (max-width: 768px)
  .docs
    .doc-body
      margin-left 0
      padding 0
</style>

