<template>
  <div v-if="beer"
       class="modal-wrap">
    <div class="modal">
      <button @click="closeModal" class="close-modal-button fa fa-close"></button>
      <section class="modal-body">
        <div class="beer-columns">
          <div class="beer-column-image">
            <img :src="beer.image_url" alt="">
          </div>
          <div class="beer-column-content">
            <h2>{{ beer.name }}</h2>
            <span class="tagline">{{ beer.tagline }}</span>
            <div class="divider"></div>
            <ul class="beer-characteristics">
              <li><strong>IBU:</strong> {{ beer.ibu }} </li>
              <li><strong>ABV:</strong> {{ beer.abv }} %</li>
              <li><strong>EBC:</strong> {{ beer.ebc }}</li>
            </ul>
            <p>
              {{ beer.description }}
            </p>
            <div class="served">
              <strong>Best served with:</strong>
              <ul class="served-list">
                <li v-for="food in beer.food_pairing">{{ food }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <similar-beers :beer="beer" />
    </div>
    <div class="modal-back" @click="closeModal"></div>
  </div>
</template>

<script>
import SimilarBeers from "@/components/similar-beers"
export default {
  name: "Beer-modal",
  components: {SimilarBeers},
  props: {
    beer: {
      type: Object
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    }
  }
}
</script>

<style lang="sass" scoped>
  .modal-wrap
    z-index: 999
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    align-items: center
    justify-content: center
    display: flex
    overflow: auto

  .modal
    position: relative
    z-index: 1
    max-width: 500px
    width: 100%
    padding: 50px 15px 30px
    background-color: #fff
    border-radius: 3px
    opacity: 0
    transition: opacity .5s ease
    pointer-events: none

    .show-modal &
      opacity: 1
      pointer-events: auto

    .close-modal-button
      border: none
      background: none
      -webkit-appearance: none
      position: absolute
      right: 10px
      top: 10px
      cursor: pointer

  .modal-back
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: rgba(0,0,0, .2)
    opacity: 0
    transition: opacity .5s ease
    pointer-events: none

    .show-modal &
      opacity: 1
      pointer-events: auto

  .beer-columns
    display: flex

    .beer-column-image
      flex-grow: 0
      margin-right: 30px

      img
        max-height: 500px
        max-width: 150px

    .beer-column-content
      color: #666

      h2
        color: #e99736
        margin-bottom: 0

      .tagline
        display: inline-block
        color: #ccc
        margin-bottom: 10px

      .divider
        width: 70px
        height: 5px
        background-color: #A64896
        margin-bottom: 15px

      .beer-characteristics
        list-style: none
        margin: 0 0 10px
        padding: 0

        li
          display: inline-block

          &:not(:first-child)
            margin-left: 10px

      p
        font-size: 14px

      .served
        font-size: 14px
</style>