<template>

  <div>
    <div class="search-box app-search-box">
      <input type="text" v-model="query" @change="search" placeholder="App name" />
    </div>
    <table>
      <thead>
        <tr>
          <th>App ({{ apps.length || 0 }})</th>
          <th>Bucket</th>
          <th>File</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="apps.length">
          <tr v-for="app in apps" :key="app.sha">
            <td>{{ app.name.replace('.json', '') }}</td>
            <td><img class="avatar" :src="app.repository.owner.avatar_url + '&amp;s=20'"> <a :href="app.repository.url">{{ app.repository.full_name }}</a></a></td>
            <td><a :href="app.html_url">{{ app.path }}</a></td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="3">No apps found, please try again</td>
        </tr>
      </tbody>
    </table>
    <h2 id="buckets"><a href="#buckets" aria-hidden="true" class="header-anchor">#</a> Buckets</h2>
    <p>Add your bucket to this list by adding <strong>scoop-bucket</strong> as a topic to your GitHub repository.</p>
    <table>
      <thead>
        <tr>
          <th>Bucket ({{ buckets.length || 0 }})</th>
          <th>Description</th>
          <th style="text-align: right;">Stars</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="buckets.length">
            <tr v-for="bucket in buckets" :key="bucket.id">
              <td>
                <img class="avatar" :src="bucket.owner.avatar_url + '&amp;s=20'">
                <a class="external" target="_blank" rel="noopener noreferrer" :href="bucket.html_url">{{ bucket.full_name }}</a>
              </td>
              <td>{{ bucket.description }}</td>
              <td style="text-align: right;">{{ bucket.stargazers_count }}</td>
            </tr>
        </template>
        <tr v-else>
          <td colspan="3">Loading ...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    threshold: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      scrollTop: null,
      buckets: [],
      apps: [],
      query: '',
      apps_found: false,
    }
  },
  mounted () {
    this.axios.get('https://api.github.com/search/repositories?q=topic:scoop-bucket').then((response) => {
      this.buckets = response.data.items
    })
  },
  methods: {
    search (value) {
      let buckets_string = ''
      this.buckets.forEach((bucket) => {
        buckets_string += `+repo:${bucket.full_name}`
      })
      this.axios.get(`https://api.github.com/search/code?q=${this.query}+in:file+extension:json${buckets_string}`).then((response) => {
        this.apps = response.data.items
        this.apps_found = response.data.total_count > 0
      })
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.scrollTop = 0
    }
  },
  computed: {
    show () {
      return this.scrollTop > this.threshold
    }
  }
}
</script>

<style lang="stylus">
$borderColor = #eaecef

.avatar
  height 20px
  width 20px
  border-radius 2px

.app-search-box
  margin-left 1rem
  margin-right 1rem
  input
    cursor text
    width 10rem
    border 1px solid darken($borderColor, 10%)

    &:focus
      cursor text
</style>
