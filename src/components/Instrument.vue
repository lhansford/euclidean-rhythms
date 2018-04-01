<template>
  <p>Voice: {{ voice }}</p>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Instrument',
    props: {
      voice: {
        type: String,
      },
    },
    data() {
      return { voice: this.voice };
    },
  });
</script>