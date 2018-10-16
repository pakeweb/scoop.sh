const head = require('./head')

module.exports = {
  title: 'Scoop',
  description: 'A command-line installer for Windows',
  head,
  themeConfig: {
    lastUpdated: true,
    serviceWorker: {
      updatePopup: true
    },
    editLinks: true,
    repo: 'pakeweb/scoop.sh',
    docsDir: 'docs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Concepts', link: '/concepts/' },
      { text: 'Miscellaneous', link: '/miscellaneous/' },
      { text: 'FAQ', link: '/faq/' },
      { text: 'GitHub', link: 'https://github.com/lukesampson/scoop' },
    ]
  }
}
