<template>
  <div id="app">
    <ul class="header-menu">
      <li><router-link :to="'/'">Home</router-link></li>
      <li><router-link :to="'/favourite'">Favourite</router-link></li>
    </ul>
    <Header @search-word="onSearchWord" @advanced-search="onAdvancedSearch"/>
    <main class="main">
      <div class="container">
        <router-view :search-word="searchWord" :advanced-search-option="advancedSearchOption"></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import './assets/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import './assets/styles.sass'

import Header from "@/components/Header"

export default {
  name: 'app',
  components: {
    Header
  },
  data() {
    return {
      searchWord: '',
      advancedSearchOption: {}
    }
  },
  methods: {
    onSearchWord(word) {
      this.searchWord = word
    },
    onAdvancedSearch(options) {
      this.advancedSearchOption = options
    }
  }
}
</script>

<style lang="sass" scoped>
  .header-menu
    background-color: #e99736
    z-index: 1
    display: flex
    justify-content: flex-end
    list-style: none
    position: sticky
    top: 0
    margin: 0
    padding: 5px 15px

    li
      &:first-child
        margin-right: 10px

    a
      color: #fff

      &.router-link-exact-active
        color: #000

  .beer-cards
    margin-top: 30px
</style>
