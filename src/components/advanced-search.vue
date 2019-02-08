<template>
  <div class="advanced-search-wrap">
    <span @click="showAdvancedSearch = !showAdvancedSearch" class="advanced-search-button">Advanced search</span>
    <div v-if="showAdvancedSearch" class="advanced-search-section">
      <div class="form-row">
        <div class="form-block">
          <label for="minIBU">IBU</label>
          <div class="input-wrap">
            <input v-model="searchProps.ibu_gt" @input="onSearchChange" v-validate="`min_value:0|max_value:${searchProps.ibu_lt || 100}`"
                   id="minIBU" type="number" min="0" max="100" placeholder="min" name="minIBU"> -
            <input v-model="searchProps.ibu_lt" @input="onSearchChange" v-validate="`min_value:${searchProps.ibu_gt || 0}|max_value:100`"
                   type="number" min="0" max="100" placeholder="max" name="maxIBU">
          </div>
          <div class="errors-wrap">
            <div>{{ errors.first('minIBU') }}</div>
            <div>{{ errors.first('maxIBU') }}</div>
          </div>
        </div>
        <div class="form-block">
          <label for="minABV">ABV</label>
          <div class="input-wrap">
            <input v-model="searchProps.abv_gt" @input="onSearchChange" v-validate="`min_value:0|max_value:${searchProps.abv_lt || 100}`"
                   id="minABV" name="minABV" type="number" placeholder="min"> -
            <input v-model="searchProps.abv_lt" @input="onSearchChange" v-validate="`min_value:${searchProps.abv_gt || 0}|max_value:100`"
                   id="maxABV" name="maxABV" type="number" placeholder="max">
          </div>
          <div class="errors-wrap">
            <div>{{ errors.first('minABV') }}</div>
            <div>{{ errors.first('maxABV') }}</div>
          </div>
        </div>
        <div class="form-block">
          <label for="minEBC">EBC</label>
          <div class="input-wrap">
            <input v-model="searchProps.ebc_gt" @input="onSearchChange" v-validate="`min_value:0|max_value:${searchProps.ebc_lt || 100}`"
                   name="minEBC" id="minEBC" type="number" placeholder="min"> -
            <input v-model="searchProps.ebc_lt" @input="onSearchChange" v-validate="`min_value:${searchProps.ebc_gt || 0}|max_value:100`"
                   id="maxEBC" name="maxEBC" type="number" placeholder="max">
          </div>
          <div class="errors-wrap">
            <div>{{ errors.first('minEBC') }}</div>
            <div>{{ errors.first('maxEBC') }}</div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-block form-block-50">
          <label for="brewedAfter">Brewed after</label>
          <div class="input-wrap">
            <input v-model="searchProps.brewed_after" @input="onSearchChange" id="brewedAfter" class="full-width-input" type="date" placeholder="brewed after">
          </div>
        </div>
        <div class="form-block form-block-50">
          <label for="brewedBefore">Brewed before</label>
          <div class="input-wrap">
            <input v-model="searchProps.brewed_before" @input="onSearchChange" id="brewedBefore" class="full-width-input" type="date" placeholder="brewed before">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "advanced-search",
  data() {
    return {
      showAdvancedSearch: false,
      searchProps: {}
    }
  },
  methods: {
    onSearchChange: _.debounce(function () {
      if (!this.errors.items.length) {
        let modifiedProps = {}
        Object.keys(this.searchProps).forEach(key => {
          if (this.searchProps[key] !== '') {
            if (key === 'brewed_before' || key === 'brewed_after') {
              const splitArr = this.searchProps[key].split('-')
              modifiedProps[key] = `${splitArr[1]}-${splitArr[0]}`
            } else {
              modifiedProps[key] = this.searchProps[key]
            }
          }
        })
        this.$emit('advanced-search', Object.assign({},modifiedProps))
      }
    }, 500)
  }
}
</script>

<style lang="sass" scoped>
  .advanced-search-button
    text-align: left
    display: block
    margin-bottom: 10px
    cursor: pointer

    &:hover
      text-decoration: underline

  .advanced-search-wrap
    margin: 0 auto
    max-width: 500px
    width: 100%

  .form-row
    display: flex

    &:not(:first-child)
      margin-top: 10px

    .form-block
      max-width: 33.3333%
      width: 100%
      flex-grow: 1

      &:not(:first-child)
        margin-left: 20px

      &.form-block-50
        max-width: 50%
        width: 100%

      label
        display: block
        text-align: left

      .input-wrap
        display: flex
        align-items: center

        input
          border: none
          padding: 5px
          width: 100%

    .errors-wrap
      font-size: 10px
      color: red
      text-align: left
</style>