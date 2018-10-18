<template>
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
            <Link :to="bucket.owner.html_url" inbound>
              <img width="20" class="avatar" :src="bucket.owner.avatar_url + '&amp;s=20'">
            </Link>
            <Link :to="bucket.html_url">{{ bucket.full_name }}</Link>
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
</template>


<script>
import nprogress from "nprogress";

export default {
  data: () => ({
    buckets: []
  }),
  mounted() {
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
  }
};
</script>
