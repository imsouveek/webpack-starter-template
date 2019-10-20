<template lang="pug">
  div
    h1 {{ heading }}
    .card(v-html="text")
</template>

<script>
export default {
  name: "Bio",
  props:
  {
    heading: {
      type: String,
      default: "BLAH"
    },
    text: {
      type: String,
      default: "More and more BLAH"
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .card {
    background: antiquewhite;
    padding: 10px 5px;
    border-radius: 5px;
  }
</style>