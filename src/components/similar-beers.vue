<template>
  <section class="similar-beers" v-if="beers.length">
    <h3>You might also like:</h3>
    <ul class="similar-beers-list">
      <li v-for="beer in beers" :key="beer.id"><a>
        <img :src="beer.image_url" alt="">
        <span class="name">{{ beer.name }}</span>
      </a></li>
    </ul>
  </section>
</template>

<script>
import {BEERS_API} from './../common/axios'

export default {
  name: "similar-beers",
  props: {
    beer: {
      type: Object
    }
  },
  data() {
    return {
      beers: []
    }
  },
  mounted() {
    this.getSimilarBeers()
  },
  methods: {
    async getSimilarBeers() {
      let params = {
        page: 1,
        per_page: 3,
        yeast: this.beer.ingredients.yeast.replace(' ', '_')
      }

      const res = await BEERS_API.get('beers', { params })
      this.beers = res.data
    }
  }
}
</script>

<style lang="sass" scoped>
  .similar-beers
    margin-top: 20px

    h3
      color: #e99736

  .similar-beers-list
    display: flex
    padding: 0
    margin: 0
    list-style: none

    li
      width: 33.3333%

      &:not(:first-child)
        margin-left: 15px

      a
        font-weight: bold
        color: #333
        padding: 10px
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        cursor: pointer
        border: 1px solid #ccc
        height: 100%

      img
        max-width: 100%
        max-height: 150px
        margin-bottom: 10px
</style>