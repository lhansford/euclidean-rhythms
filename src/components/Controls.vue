<template>
  <p>is playing: {{ isPlaying ? 'yes' : 'no' }}</p>
</template>

<script lang="ts">
  export default {
    name: 'Controls',
    props: {
      isPlaying: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>