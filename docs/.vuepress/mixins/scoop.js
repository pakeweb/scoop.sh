import nprogress from 'nprogress'

export default {
  methods: {
    isMainBucket(o) {
      const name =
        typeof o === 'string'
          ? o
          : o.repository
            ? o.repository.full_name
            : o.full_name
      return name === 'lukesampson/scoop'
    },

    getKnownBuckets() {
      nprogress.start()
      return this.axios
        .get(
          'https://raw.githubusercontent.com/lukesampson/scoop/master/buckets.json'
        )
        .then(({ data }) => nprogress.done() && data)
        .catch(() => nprogress.done())
    },

    findBuckets() {
      nprogress.start()
      return this.axios
        .get('https://api.github.com/search/repositories?q=topic:scoop-bucket')
        .then(response => nprogress.done() && response.data.items)
        .catch(() => nprogress.done())
    },

    bucketName(bucket, known) {
      return this.isMainBucket(bucket)
        ? 'Main'
        : Object.keys(known).find(x => known[x].startsWith(bucket.html_url)) ||
            bucket.full_name
    },
  },
}
