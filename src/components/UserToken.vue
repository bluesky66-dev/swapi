<template>
  <gl-filtered-search-token
    v-bind="{ ...this.$props, ...this.$attrs }"
    v-on="$listeners"
  >
    <template #view="{ inputValue }">
      <gl-loading-icon size="sm" v-if="loadingView" class="gl-mr-2" />
      <gl-avatar :size="16" :entity-name="inputValue" shape="circle" class="gl-mr-2" v-else />
      {{ activeUser ? getName(activeUser.name) : inputValue }}
    </template>
    <template #suggestions>
      <template v-if="loadingSuggestions">
        <gl-loading-icon />
      </template>
      <template v-else>
        <gl-filtered-search-suggestion :key="index" v-for="(user, index) in users" :value="getName(user.name)">
          <div class="gl-display-flex">
            <gl-avatar :size="32" :entity-name="getName(user.name)" />
            <div>
              <p class="gl-m-0">{{ getName(user.name) }}</p>
            </div>
          </div>
        </gl-filtered-search-suggestion>
      </template>
    </template>
  </gl-filtered-search-token>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  GlFilteredSearch,
  GlFilteredSearchToken,
  GlFilteredSearchSuggestion,
  GlLoadingIcon,
  GlAvatar
} from '@gitlab/ui'

export default {
  name: 'UserToken',
  props: ['value', 'active'],
  inheritAttrs: false,
  data () {
    return {
      loadingView: false,
      loadingSuggestions: false,
      users: [],
      activeUser: null
    }
  },
  components: {
    GlFilteredSearch,
    GlFilteredSearchToken,
    GlFilteredSearchSuggestion,
    GlLoadingIcon,
    GlAvatar
  },
  computed: {
    ...mapGetters('search', [
      'getPeopleURL',
      'getPeopleCount',
      'getPeopleArray',
      'getCurrentPage',
      'getPlanetArray'
    ])
  },
  methods: {
    loadView () {
      this.loadingView = true
      setTimeout(() => {
        this.loadingView = false
        this.activeUser = this.users.find((u) => this.getName(u.name) === this.value.data)
      }, 1000)
    },
    loadSuggestions () {
      this.loadingSuggestions = true
      setTimeout(() => {
        this.loadingSuggestions = false
        this.users = this.getPeopleArray[0].data
        console.log(this.users.length)
      }, 2000)
    },
    getName (name) {
      console.log('name', name.trim('"'))
      return name.trim('"')
    }
  },
  watch: {
    // eslint-disable-next-line func-names
    'value.data': function () {
      if (this.active) {
        this.loadSuggestions()
      }
    },
    active: {
      immediate: true,
      handler (newValue) {
        if (!newValue) {
          this.loadView()
        } else {
          this.loadSuggestions()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
