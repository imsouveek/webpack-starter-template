<template lang="pug">
  div
    h1 {{ heading }}
    p(
      v-html="text"
    )
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
  p {
    background: antiquewhite;
    padding: 10px 5px; 
    border-radius: 5px;
  }
</style>