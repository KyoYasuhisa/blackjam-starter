<template>
  <section class="docs">
    <DocNav :docGroups="docGroups"
            :docs="docs" />
    <DocBody :groupName="doc.fields.docGroup.fields.name"
             :doc="doc" />       
  </section>
</template>

<script>
import siteConfig from '~/siteConfig.json'
import { createClient } from '~/plugins/contentful.js'
import DocNav from '~/components/DocNav.vue'
import DocBody from '~/components/DocBody.vue'

const client = createClient()

export default {
  head () {
    return {
      title: `${this.doc.fields.title} - ${siteConfig.title} | ${siteConfig.subtitle}`,
      meta: [{
        hid: `description`,
        name: 'description',
        content: `${this.doc.fields.title} - ${siteConfig.title} | ${siteConfig.subtitle}`,
      }]
    }
  },
  asyncData ({params}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'doc',
        'fields.slug': params.slug
      }),
      client.getEntries({
        'content_type': 'docGroup',
        order: 'fields.slug'
      }),
      client.getEntries({
        'content_type': 'doc',
        order: 'sys.createdAt'
      })
    ]).then(([doc,docGroups,docs]) => {
      return {
        doc: doc.items[0],
        docGroups: docGroups.items,
        docs: docs.items
      }
    }).catch(console.error)
  },
  components: {
    DocBody,
    DocNav
  }
}
</script>