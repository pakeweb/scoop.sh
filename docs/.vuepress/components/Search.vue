<template>

  <div class="apps">
    <div class="hero">
      <h1 v-if="query" class="typing">>_ scoop search {{query}}</h1>
      <h1 v-else>Search for Apps</h1>
      <div class="action">
        <div class="search-box app-search-box">
          <input type="text" v-model="query" @input="search" placeholder="App name" autofocus />
        </div>
        <p class="description" v-if="query && found !== false">
          <template v-if="found">
            Found {{found}} apps for query `{{query}}`
          </template>
          <template v-else>
            No app found with query `{{query}}`
          </template>
        </p>
      </div>
    </div>
    <div class="results" style="margin-top: 1.5rem">
      <modal :is-open="showApp" :click-outside="toggleApp" class="app-modal" overlayClass="app-modal-overlay">
        <div v-if="showApp">
          <h3>{{selectedApp.name.replace('.json', '')}} ({{selectedApp.version}})</h3>
          <p>{{selectedApp.description}}</p>
          <p v-if="!isInternalBucket(selectedApp.repository)">
            Add bucket command:
            <cite>scoop bucket add {{selectedApp.repository.full_name}}</cite>
          </p>
          <p>
            Install command:
            <cite>scoop install {{selectedApp.name.replace('.json', '')}}</cite>
          </p>
        </div>
      </modal>
      <div v-for="app in apps" :key="app.sha" class="result-list" @click="openApp(app)">
        <div class="result-headline">{{app.name.replace('.json', '')}}</div>
        <div class="result-desc">
          <div>
            Score: {{app.score}}
          </div>
          Bucket:
          <div>
            - Name:
            <Link v-if="!isInternalBucket(app)" :to="app.repository.html_url">{{ app.repository.full_name }}</Link>
            <span v-else> Internal</span>
          </div>
          <div>
            - Description:
            {{app.repository.description}}
          </div>
          <div>
            - Author:
            <Link :to="app.repository.owner.html_url">
              {{app.repository.owner.login}}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "tiny-debounce";
import nprogress from "nprogress";
import Modal from "vue-slim-modal";

export default {
  components: {
    Modal
  },
  data() {
    return {
      buckets: [],
      apps: [],
      showApp: false,
      selectedApp: {},
      query: "",
      found: false
    };
  },

  computed: {
    bucketsList() {
      return encodeURI(
        "+repo:" +
          this.buckets
            .map(el => {
              return el.full_name;
            })
            .join("+repo:")
      );
    }
  },

  mounted() {
    nprogress.configure({ showSpinner: false });

    window.SCOOP_APPS = window.SCOOP_APPS || new Map();

    // fetch for official repo
    if (!window.SCOOP_OFFICIAL_APPS) {
      nprogress.start();
      this.axios
        .get(
          "https://api.github.com/search/code?q=sort:updated+in:file+extension:json+repo:lukesampson/scoop+path:bucket&sort=updated"
        )
        .then(response => {
          this.apps = window.SCOOP_OFFICIAL_APPS = response.data.items;
          nprogress.done();
        });
    } else {
      this.apps = window.SCOOP_OFFICIAL_APPS;
    }

    if (!window.SCOOP_BUCKETS) {
      nprogress.start();
      this.axios
        .get("https://api.github.com/search/repositories?q=topic:scoop-bucket")
        .then(response => {
          this.buckets = window.SCOOP_BUCKETS = response.data.items;
          nprogress.done();
        });
    } else {
      this.buckets = window.SCOOP_BUCKETS;
    }
  },

  methods: {
    toggleApp() {
      this.showApp = !this.showApp
    },

    isInternalBucket(o) {
      const name = typeof o === 'string' ? o : o.repository ? o.repository.full_name : o.full_name
      return name === 'lukesampson/scoop'
    },

    async openApp(app) {
      if (!window.SCOOP_APPS.has(app.sha)) {
        nprogress.start();
        const { data } = await this.axios.get(
          app.html_url
            .replace("github.com", "raw.githubusercontent.com")
            .replace("/blob/", "/")
        );
        window.SCOOP_APPS.set(app.sha, data);

        nprogress.done();
      }

      this.selectedApp = {
        ...app,
        ...window.SCOOP_APPS.get(app.sha)
      };
      this.toggleApp()
      console.log(this.selectedApp)
    },
    search: debounce(function() {
      this.found = false;
      // One char always return zero
      if (this.query.length < 2) return;

      nprogress.start();

      const query = encodeURI(this.query);
      const buckets = this.bucketsList;
      const url = `https://api.github.com/search/code?q=${query}+in:file+extension:json${buckets}`;

      this.axios
        .get(url)
        .catch(err => {
          nprogress.done();
        })
        .then(({ data: { items, total_count } }) => {
          this.apps = items;
          this.found = total_count;
          nprogress.done();
        });
    }, 1000)
  }
};
</script>

<style lang="stylus">
@import '~vue-slim-modal/themes/default.css'
$borderColor = #eaecef;

.hero {
  text-align: center;
}

.avatar {
  height: 20px;
  width: 20px;
  border-radius: 2px;
}

.app-search-box {
  margin-left: 1rem;
  margin-right: 1rem;
  width: 95%;

  input {
    cursor: text;
    width: 90% !important;
    border: 1px solid darken($borderColor, 10%);

    &:focus {
      cursor: text;
    }
  }
}

.typing {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  animation: typing 3.5s steps(40, end);
  margin-left: auto;
  margin-right: auto;
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

.results {
  margin: 1.5rem auto;

  .result-list {
    margin: 1rem auto;
    cursor: pointer;

    .result-headline {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
.app-modal
  min-width 70%
  padding 2rem
</style>
