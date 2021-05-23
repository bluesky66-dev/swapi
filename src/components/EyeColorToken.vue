<template>

  <gl-filtered-search-token
    v-bind="{ ...this.$props, ...this.$attrs }"
    v-on="$listeners"
  >
    <template #view-token="{ inputValue, cssClasses, listeners }">
      <gl-token variant="search-value" :class="cssClasses" :style="containerStyle" v-on="listeners">
        {{ activeEyeColor ? activeEyeColor.title : inputValue }}
      </gl-token>
    </template>
    <template #suggestions>
      <gl-dropdown-divider v-if="loadingSuggestions || eyeColors.length" />
      <template v-if="loadingSuggestions">
        <gl-loading-icon />
      </template>
      <template v-else>
        <gl-filtered-search-suggestion :key="eyeColor.id" v-for="eyeColor in eyeColors" :value="eyeColor.name">
          <div class="d-flex">
            {{ eyeColor.title }}
          </div>
        </gl-filtered-search-suggestion>
      </template>
    </template>
  </gl-filtered-search-token>
</template>

<script>
import {GlFilteredSearch,
  GlFilteredSearchSuggestion,
  GlFilteredSearchToken,
  GlLoadingIcon,
  GlDropdownDivider,
  GlToken
} from '@gitlab/ui'

const eyeColors = [
  { id: 1, title: 'Blue', name: 'blue' },
  { id: 2, title: 'Yellow', name: 'yellow' },
  { id: 3, title: 'Red', name: 'red' },
  { id: 4, title: 'Brown', name: 'brown' },
  { id: 5, title: 'Blue Gray', name: 'blue-gray' }
]

export default {
  name: 'EyeColorToken',
  props: ['value', 'active'],
  inheritAttrs: false,
  data () {
    return {
      loadingView: false,
      loadingSuggestions: false,
      eyeColors: [],
      activeEyeColor: null
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
    currentValue () {
      return this.value.data.toLowerCase()
    },
    containerStyle () {
      return {}
    }
  },
  methods: {
    loadView () {
      this.loadingView = true
      setTimeout(() => {
        this.loadingView = false
        this.activeEyeColor = eyeColors.find((l) => l.title === this.value.data)
      }, 100)
    },
    loadSuggestions () {
      this.loadingSuggestions = true
      setTimeout(() => {
        this.loadingSuggestions = false
        this.eyeColors = eyeColors
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
