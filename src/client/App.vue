<template lang="pug">
  .profile
      img(src="./images/Souveek Bose 1514053 Casual.jpg")
      Blog(
        :heading="heading",
        :text="text"
      )
</template>

<script>
import Blog from './components/Blog.vue';
import Bio from '../data/bio';
import Markdown from '../data/sample.md'

export default {
  name: "App",
  components: {
    Blog
  },
  data() {
    return {
      heading: Markdown.title,
      text: Markdown.__content
    };
  }
}
</script>