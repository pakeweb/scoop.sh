module.exports = {
  '*.{js,vue}': ['prettier --write', 'eslint --fix --no-ignore', 'git add'],
  '*.json': ['prettier --write', 'git add'],
  '*.styl': [
    'stylus-supremacy format --options .vscode/settings.json -r',
    'git add'
  ],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add']
};
