const path = require('path');
const globby = require('globby');
const head = require('./head');

module.exports = {
  title: 'Scoop',
  description: 'A command-line installer for Windows',
  head,
  themeConfig: {
    lastUpdated: true,
    serviceWorker: {
      updatePopup: {
        message: 'Documentation has been updated.',
        buttonText: 'Refresh'
      }
    },
    editLinks: true,
    repo: 'pakeweb/scoop.sh',
    docsDir: 'docs',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Apps', link: '/apps/' },
      { text: 'Buckets', link: '/buckets/' },
      { text: 'Concepts', link: '/concepts/' },
      { text: 'FAQ', link: '/faq/' },
      { text: 'GitHub', link: 'https://github.com/lukesampson/scoop' }
    ],
    sidebar: {
      ...aside('/guide/', { title: 'Miscellaneous' })
    }
  },
  dest: 'dist'
};

function aside(dir, holder, merge = true) {
  const cwd = path.join(__dirname, '..', dir);
  const ignore = ['README.md', 'readme.md', 'index.md'];
  const files = globby.sync('*.md', { cwd, ignore });

  let sides = {};

  if (holder && holder.title) {
    holder.children = holder.children ? holder.children.concat(files) : files;
    sides[dir] = [holder];
  } else {
    sides[dir] = files;
  }

  if (merge) {
    sides[dir].unshift('');
  }
  return sides;
}
