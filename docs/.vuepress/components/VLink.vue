<template>
  <router-link
    v-if="!isExternal(link)"
    :to="link"
    :exact="exact"
  >
    <slot />
  </router-link>
  <a
    v-else
    :href="link"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    <slot />
    <OutboundLink v-if="!inbound" />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '@default-theme/util'

export default {
  props: {
    to: {
      required: true,
      type: String,
    },
    inbound: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    link() {
      return ensureExt(this.to)
    },

    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          rootLink => rootLink === this.link
        )
      }
      return this.link === '/'
    },
  },

  methods: {
    isExternal,
    isMailto,
    isTel,
  },
}
</script>
