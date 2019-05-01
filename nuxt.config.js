const config = require('./.contentful.json')
const siteConfig = require('./siteConfig.json')
const contentful = require('contentful')
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
})

module.exports = {
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_AUTHOR_ID: config.CTF_AUTHOR_ID
  },
  modules: [ 
    '@nuxtjs/pwa',
    'nuxt-clipboard2',
    ['@nuxtjs/google-adsense', {
      id: siteConfig.adsenseID
    }],
    ['@nuxtjs/google-analytics', {
      id: siteConfig.analyticsID
    }],
    '@nuxtjs/markdownit',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-regular-svg-icons',
          icons: ['far']
        }
      ]
    }]
  ],
  head: {
    title: siteConfig.title+' | '+siteConfig.subtitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: siteConfig.title+' | '+siteConfig.subtitle }
    ], 
    link: [
      { rel: 'mask-icon', href: siteConfig.favicon }
    ],
    script: [
      { async: true, customElement: 'amp-auto-ads', src: 'https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js' }
    ]
  },
  manifest: siteConfig.manifest,
  loading: siteConfig.loaderOption,
  plugins: [
    '~/plugins/vue2-filters',
    '~/plugins/vue2-touch-events',
    '~/plugins/disqus'
  ], 
  markdownit: { 
    html: true,
    injected: true,
    linkify: true,
    breaks: false,
    use: [
      'markdown-it-anchor',
      'markdown-it-table-of-contents',
      'markdown-it-highlightjs',
      'markdown-it-katex',
      'markdown-it-footnote',
      'markdown-it-video',
      ['markdown-it-container', 'bubble'],
      ['markdown-it-container', 'bubble-i']
    ] 
  },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes () {
      return Promise.all([
        client.getEntries({
          'content_type': 'post'
        }),
        client.getEntries({
          'content_type': 'category'
        }),
        client.getEntries({
          'content_type': 'tag'
        })
      ]).then(([posts,categories,tags]) => {
        return [
          ...posts.items.map(post => `posts/${post.fields.slug}`),
          ...categories.items.map(category => `posts/category/${category.fields.slug}`),
          ...tags.items.map(tag => `posts/tag/${tag.fields.slug}`)
        ]
      })
    }
  }
}

