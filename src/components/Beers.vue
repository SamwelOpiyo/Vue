<template>
  <div class="beer-cards">
    <h2 v-if="$route.name === 'favourite'">Favourite page</h2>
    <div class="row">
      <BeerCard v-for="beer in beers"
                :beer="beer"
                :key="beer.id"
                :is-favourite="beersLS.includes(beer.id)"
                @showModal="showModal"
                @addToFavourite="addToFavourite"/>
    </div>
    <infinite-loading :identifier="infiniteId"
                      @infinite="getBeers"></infinite-loading>
    <beer-modal :beer="activeBeer"
                @close-modal="closeModal"/>
  </div>
</template>

<script>
import BeerCard from "@/components/Beer-card"
import InfiniteLoading from 'vue-infinite-loading'

import {BEERS_API} from './../common/axios'
import BeerModal from "@/components/Beer-modal"

export default {
  name: "Beers",
  components: {BeerModal, BeerCard, InfiniteLoading},
  props: {
    searchWord: {
      type: String
    },
    advancedSearchOption: {
      type: Object
    }
  },
  data() {
    return {
      beersLS: [],
      page: 1,
      perPage: 24,
      beers: [],
      infiniteId: 0,
      activeBeer: null
    }
  },
  watch: {
    searchWord() {
      this.resetInfiniteLoader()
    },
    advancedSearchOption: {
      handler() {
        this.resetInfiniteLoader()
      },
      deep: true
    },
    $route() {
      this.resetInfiniteLoader()
    }
  },
  mounted() {
    this.getLSBeers()
  },
  methods: {
    getLSBeers() {
      this.beersLS = localStorage.favouriteBeers
          ? localStorage.favouriteBeers.split(',').map(item => +item)
          : []
    },
    addToFavourite(id) {
      this.getLSBeers()

      if (this.beersLS.includes(id)) {
        if (this.$route.name === 'favourite') {
          this.beers.splice(this.beers.findIndex(element => {
            return element.id === id
          }), 1)
        }
        this.beersLS.splice(this.beersLS.indexOf(id), 1)
      } else {
        this.beersLS.push(id)
      }

      window.localStorage.setItem('favouriteBeers', this.beersLS.join(','))
    },
    async getBeers($state) {
      let params = {
        page: this.page,
        per_page: this.perPage
      }

      this.searchWord ? params.beer_name = this.searchWord.replace(' ', '_') : null

      params = {...params, ...this.advancedSearchOption}

      if (this.$route.name === 'favourite') {
        let favouriteString = ''

        this.beersLS.forEach((item, index) => {
          index === 0 ? favouriteString += item : favouriteString += `|${item}`
        })
        params.ids = favouriteString
      }

      const res = await BEERS_API.get('beers', { params })

      if (res.data.length) {
        this.page += 1
        this.beers.push(...res.data)
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    resetInfiniteLoader() {
      this.page = 1
      this.beers = []
      this.infiniteId += 1
    },
    showModal(beer) {
      this.activeBeer = beer
      document.body.classList.add('show-modal')
    },
    closeModal() {
      this.activeBeer = null
      document.body.classList.remove('show-modal')
    }
  }
}
</script>