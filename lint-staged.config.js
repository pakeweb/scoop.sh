module.exports = {
  "*.js": ["prettier --write", "eslint --fix", "git add"],
  "*.json": ["prettier --write", "git add"],
  "*.vue": ["prettier --write", "eslint --fix", "git add"],
  "*.styl": [
    "stylus-supremacy format --options .vscode/settings.json -r",
    "git add"
  ],
  "*.{png,jpeg,jpg,gif,svg}": ["imagemin-lint-staged", "git add"]
};
