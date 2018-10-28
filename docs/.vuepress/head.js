module.exports = [
  [
    'link',
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
  ],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
  ],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
  ],
  ['link', { rel: 'manifest', href: '/manifest.json' }],
  [
    'link',
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
  ],
  ['meta', { name: 'msapplication-TileColor', content: '#2b5797' }],
  ['meta', { name: 'theme-color', content: '#ffffff' }],
  [
    'link',
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com/',
      crossorigin: true,
    },
  ],
  [
    'link',
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css?family=Source+Sans+Pro|Source+Code+Pro',
    },
  ],
]
