<template>

  <div>
    <div class="search-box app-search-box">
      <input type="text" v-model="query" @input="search" placeholder="App name" />
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
            <td>
              <img class="avatar" :src="app.repository.owner.avatar_url + '&amp;s=20'">
              <a target="_blank" rel="noopener noreferrer" :href="app.repository.html_url">{{ app.repository.full_name }}</a>
            </td>
            <td><a target="_blank" rel="noopener noreferrer" :href="app.html_url">{{ app.path }}</a></td>
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
                <a target="_blank" rel="noopener noreferrer" :href="bucket.html_url">{{ bucket.full_name }}</a>
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
import debounce from "tiny-debounce";
import nprogress from "nprogress";

export default {
  props: {
    threshold: {
      type: Number,
      default: 300
    }
  },

  data() {
    return {
      scrollTop: null,
      buckets: [],
      apps: [],
      query: "",
      apps_found: false
    };
  },
  mounted() {
    nprogress.configure({ showSpinner: false });
    nprogress.start();
    this.axios
      .get("https://api.github.com/search/repositories?q=topic:scoop-bucket")
      .then(response => {
        this.buckets = response.data.items;
        nprogress.done();
      });
  },
  methods: {
    search: debounce(function() {
      nprogress.start();

      let buckets = "";
      this.buckets.forEach(bucket => {
        buckets += `+repo:${bucket.full_name}`;
      });

      buckets = encodeURI(buckets);
      const query = encodeURI(this.query);
      this.axios
        .get(
          `https://api.github.com/search/code?q=${query}+in:file+extension:json${buckets}`
        )
        .catch(err => {
          nprogress.done();
        })
        .then(({ data: { items, total_count } }) => {
          this.apps = items;
          console.log({ total_count });
          this.apps_found = total_count > 0;
          nprogress.done();
        });
    }, 1000),

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.scrollTop = 0;
    }
  },
  computed: {
    show() {
      return this.scrollTop > this.threshold;
    }
  }
};
</script>

<style lang="stylus">
$borderColor = #eaecef;

.avatar {
  height: 20px;
  width: 20px;
  border-radius: 2px;
}

.app-search-box {
  margin-left: 1rem;
  margin-right: 1rem;

  input {
    cursor: text;
    width: 10rem;
    border: 1px solid darken($borderColor, 10%);

    &:focus {
      cursor: text;
    }
  }
}
</style>