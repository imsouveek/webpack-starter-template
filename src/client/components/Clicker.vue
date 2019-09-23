<template lang="pug">
  h2(@click='increment')
    | Click Me!  {{ count }}
</template>

<script>
export default {
  name: "Clicker",
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count += 1;
    }
  }
}
</script>

<style scoped>
  h2 {
    text-shadow: 0 0 20px green;
    color: white;
    font-size: 3em;
  }
</style>