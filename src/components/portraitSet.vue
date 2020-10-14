<template>
  <div class="portraits">
    <single-portrait
      v-for="portrait in portraits"
      :key="portrait.id"
      :portrait="portrait"
    ></single-portrait>
  </div>
</template>

<script>
import SinglePortrait from "../components/portrait";
export default {
  name: "portrait-set",
  components: {
    SinglePortrait
  },
  computed: {
    portraits() {
      return this.$store.state.portrait;
    }
  },
  props: {
    portrait: Object
  }
};
</script>

<style lang="scss" scoped>
.portraits {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
