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
        <tr
          v-for="bucket in buckets"
          :key="bucket.id"
        >
          <td>
            <VLink :to="bucket.html_url">{{ bucketName(bucket, known) }}</VLink>
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
import nprogress from 'nprogress'
import ScoopMixin from '../mixins/scoop'

export default {
  mixins: [ScoopMixin],

  data: () => ({
    known: {},
    buckets: [],
  }),

  async mounted() {
    if (!window.SCOOP_BUCKETS) {
      this.findBuckets().then(items => {
        this.buckets = window.SCOOP_BUCKETS = items
      })
    } else {
      this.buckets = window.SCOOP_BUCKETS
    }

    if (!window.SCOOP_KNOWN_BUCKETS) {
      this.getKnownBuckets().then(known => {
        this.known = window.SCOOP_KNOWN_BUCKETS = known
      })
    } else {
      this.known = window.SCOOP_KNOWN_BUCKETS
    }
  },
}
</script>
