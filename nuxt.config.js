const config = require('./.contentful.json')
const siteConfig = require('./siteConfig.json')
const contentful = require('contentful')
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
})

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: siteConfig.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: siteConfig.title+' | '+siteConfig.subtitle }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: siteConfig.favicon },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-dark.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Hi+Melody' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#555' },
  /*
  ** Build configuration
  */
  plugins: [
    '~/plugins/vue2-filters'
  ],
  build: {
    /*
    ** Run ESLint on save
    */
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
          'content_type': config.CTF_BLOG_POST_TYPE_ID
        }),
        client.getEntries({
          'content_type': 'category'
        }),
        client.getEntries({
          'content_type': 'tag'
        }),
      ]).then(([posts,categories,tags]) => {
        return [
          ...posts.items.map(post => `post/${post.fields.slug}`),
          ...categories.items.map(category => `category/${category.fields.slug}`),
          ...tags.items.map(tag => `category/${tag.fields.slug}`)
        ]
      })
    }
  },
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  }
}

