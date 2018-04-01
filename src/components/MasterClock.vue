<template>
  <p>clock: {{ clock }}</p>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'MasterClock',
    props: {
      clock: {
        type: Number,
        default: 120,
      },
    },
    data() {
      return { clock: this.clock };
    },
  });
</script>