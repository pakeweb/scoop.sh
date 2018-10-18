const head = require('./head')

module.exports = {
  title: 'Scoop',
  description: 'A command-line installer for Windows',
  head,
  themeConfig: {
    lastUpdated: true,
    serviceWorker: {
      updatePopup: {
        message: "Documentation has been updated.",
        buttonText: "Refresh"
      }
    },
    editLinks: true,
    repo: 'pakeweb/scoop.sh',
    docsDir: 'docs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Apps', link: '/apps/' },
      { text: 'Buckets', link: '/buckets/' },
      { text: 'FAQ', link: '/faq/' },
      { text: 'GitHub', link: 'https://github.com/lukesampson/scoop' },
    ]
  },
  dest: 'dist'
}
