<template>
  <div class="beer-card-wrap col-lg-4 col-sm-6">
    <section class="beer-card">
      <i class="favourite-icon fa"
         :class="favouriteIcon"
         @click="addToFavourite"></i>
      <a @click="showModal">
        <img :src="beer.image_url" alt="">
        <h3>{{ beer.name }}</h3>
        <p>{{ beer.tagline }}</p>
      </a>
    </section>
  </div>
</template>

<script>
export default {
  name: "Beer-card",
  props: {
    beer: {
      type: Object
    },
    isFavourite: {
      type: Boolean
    }
  },
  computed: {
    favouriteIcon() {
      return this.isFavourite ? 'fa-star' : 'fa-star-o'
    }
  },
  methods: {
    addToFavourite() {
      this.$emit('addToFavourite', this.beer.id)
    },
    showModal() {
      this.$emit('showModal', this.beer)
    }
  }
}
</script>

<style lang="sass" scoped>
  .beer-card-wrap
    margin-bottom: 30px

  .beer-card
    background-color: #fff
    border-radius: 3px
    box-shadow: 0 0 5px 0 rgba(0,0,0, .1)
    transition: transform .3s ease, box-shadow .6s ease
    position: relative
    display: flex
    justify-content: center
    height: 100%

    &:hover
      transform: scale(1.05)
      box-shadow: 0 0 12px 0 rgba(0,0,0, .1)

    .favourite-icon
      position: absolute
      right: 15px
      top: 15px

      &.fa-star,
      &:hover
        cursor: pointer
        color: #e99736

    a
      padding: 15px
      display: flex
      flex-direction: column
      align-items: center
      cursor: pointer
      width: 100%

      &:hover
        text-decoration: none

    img
      max-width: 100%
      max-height: 200px

    h3
      color: #e99736
      margin-bottom: 0
      margin-top: 5px

    p
      color: #ccc

</style>