<template>
  <main>
    <div
      class="relative pt-16 pb-32 flex content-center items-center justify-center "
      style="min-height: 50px; margin-bottom: 50px;"
    >
      <div
        class="absolute top-0 w-full h-full bg-center bg-cover"
        style='background-image: url("/img/background.jpg");'
      >
        <span
          id="blackOverlay"
          class="w-full h-full absolute opacity-25 bg-black"
        ></span>
      </div>
    </div>
    <section class="pb-20 bg-white -mt-32 ">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center">
          <div class="lg:pt-12 pt-6 w-full md:w-8/12 px-4 text-center">
            <div
              class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
            >
            </div>
          </div>
        </div>
        <div
          class="flex flex-wrap mt-16 overflow-y-hidden overflow-x-scroll lg:overflow-visible search flex-col items-start"
        >
          <div
            class="mb-8 flex justify-start items-center border rounded max-w-2xl w-full py-2 px-3 shadow"
          >
            <gl-filtered-search v-model="value" :available-tokens="tokens" style="width: 100%" />
          </div>
          <Pagination :totalResults="Number(this.getPeopleCount)" />
          <Table
            v-if="this.getPeopleArray.length > 0"
            :peopleData="filteredList"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Table from '@/components/PeopleTable'
import Pagination from '@/components/Pagination'
import { mapGetters, mapActions } from 'vuex'
import {
  GlFilteredSearch,
  GlFilteredSearchToken,
  GlFilteredSearchSuggestion
} from '@gitlab/ui'
import UserToken from '@/components/UserToken'
import GenderToken from '@/components/GenderToken'
import EyeColorToken from '@/components/EyeColorToken'

const tokens = [
  { type: 'user', icon: 'user', title: 'Name', token: UserToken },
  { type: 'gender', icon: 'clock', title: 'Gender', token: GenderToken },
  { type: 'eyeColor', icon: 'labels', title: 'Eye Color', token: EyeColorToken }
]

export default {
  data () {
    return {
      tokens: tokens,
      value: [],
      searchTerm: ''
    }
  },
  created () {
    this.fetchPeopleData(1)
  },
  components: {
    Table,
    Pagination,
    GlFilteredSearch,
    GlFilteredSearchToken,
    GlFilteredSearchSuggestion
  },
  computed: {
    filteredList () {
      let filtered = this.people
      console.log('search term', this.value)
      for (let i = 0; i < this.value.length; i++) {
        const item = this.value[i]
        switch (item.type) {
          case 'user':
            console.log('item.value.data', item.value.data.replaceAll('"', ''))
            if (item.value.operator === '=') {
              filtered = filtered.filter(person => {
                return person.name === item.value.data.replaceAll('"', '')
              })
            } else {
              filtered = filtered.filter(person => {
                return person.name !== item.value.data.replaceAll('"', '')
              })
            }
            break
          case 'gender':
            if (item.value.operator === '=') {
              filtered = filtered.filter(person => {
                return person.gender === item.value.data
              })
            } else {
              filtered = filtered.filter(person => {
                return person.gender !== item.value.data
              })
            }
            break
          case 'eyeColor':
            if (item.value.operator === '=') {
              filtered = filtered.filter(person => {
                return person.eye_color === item.value.data
              })
            } else {
              filtered = filtered.filter(person => {
                return person.eye_color !== item.value.data
              })
            }
            break
        }
      }
      return filtered
    },
    people () {
      return this.getPeopleArray.filter(
        ppl => ppl.page === this.getCurrentPage
      )[0].data
        ? this.getPeopleArray.filter(ppl => ppl.page === this.getCurrentPage)[0]
          .data
        : []
    },
    ...mapGetters('search', [
      'getPeopleURL',
      'getPeopleCount',
      'getPeopleArray',
      'getCurrentPage',
      'getPlanetArray'
    ])
  },
  methods: {
    ...mapActions('search', [
      'peopleCount',
      'addToPeopleArray',
      'addToPlanetArray',
      'fetchPeopleData'
    ]),
    navigateToSearch () {
      const el = this.$el.getElementsByClassName('search')[0]
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style>
.search::-webkit-scrollbar {
  height: 10px;
}
.search::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.164);
  -webkit-border-radius: 10px;
}
.search::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #ffe300;
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
}
.search::-webkit-scrollbar-thumb:window-inactive {
  background: #ffe300;
}
</style>
