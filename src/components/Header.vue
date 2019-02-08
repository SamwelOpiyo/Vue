<template>
  <header class="header">
    <section class="header-main">
      <h1>The Beer Bank</h1>
      <span>Find your favourite beer here</span>
      <input class="search-field" type="text" placeholder="Search for beer name" v-model.trim="searchWord" @input="onInput">
      <advanced-search @advanced-search="onAdvancedSearch"/>
    </section>
  </header>
</template>

<script>
import _ from 'lodash'
import AdvancedSearch from "@/components/advanced-search"

export default {
  name: "Header",
  components: {AdvancedSearch},
  data() {
    return {
      searchWord: ''
    }
  },
  methods: {
    onInput: _.debounce(function() {
      this.$emit('search-word', this.searchWord)
    }, 500),
    onAdvancedSearch(options) {
      this.$emit('advanced-search', options)
    }
  }
}
</script>

<style lang="sass" scoped>
  .header
    background-color: #e99736
    color: #fff
    padding: 0 15px 30px

    .header-main
      text-align: center

      h1
        margin: 0

      span
        display: block
        margin-bottom: 10px

      .search-field
        border: none
        max-width: 500px
        width: 100%
        padding: 5px
</style>