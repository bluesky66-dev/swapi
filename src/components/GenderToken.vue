<template>
  <gl-filtered-search-token
    v-bind="{ ...this.$props, ...this.$attrs }"
    v-on="$listeners"
  >
    <template #suggestions>
      <gl-dropdown-divider v-if="loadingSuggestions || genders.length"/>
      <template v-if="loadingSuggestions">
        <gl-loading-icon/>
      </template>
      <template v-else>
        <gl-filtered-search-suggestion :key="gender.id" v-for="gender in genders" :value="gender.name">
          {{ gender.title }}
        </gl-filtered-search-suggestion>
      </template>
    </template>
  </gl-filtered-search-token>
</template>

<script>
import {
  GlFilteredSearch,
  GlFilteredSearchSuggestion,
  GlFilteredSearchToken,
  GlLoadingIcon,
  GlDropdownDivider,
  GlToken
} from '@gitlab/ui'
import {mapGetters} from 'vuex'

const genders = [
  { id: 1, title: 'Male', name: 'male' },
  { id: 2, title: 'Female', name: 'female' }
]

export default {
  name: 'GenderToken',
  props: ['value', 'active'],
  inheritAttrs: false,
  data () {
    return {
      loadingView: false,
      loadingSuggestions: false,
      genders: []
    }
  },
  components: {
    GlFilteredSearch,
    GlFilteredSearchToken,
    GlFilteredSearchSuggestion,
    GlLoadingIcon,
    GlDropdownDivider,
    GlToken
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
    loadSuggestions () {
      this.loadingSuggestions = true
      setTimeout(() => {
        this.loadingSuggestions = false
        this.genders = genders
      }, 2000)
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
        if (newValue) {
          this.loadSuggestions()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
