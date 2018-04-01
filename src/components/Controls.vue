<template>
  <button v-if="!isPlaying" @click="play">Play</button>
  <button v-else @click="stop">Stop</button>
</template>

<script lang="ts">
  import EventBus from './../eventBus';

  export default {
    name: 'Controls',
    props: {
      isPlaying: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      play: function() {
        EventBus.$emit('setIsPlaying', true);
      },
      stop: function() {
        EventBus.$emit('setIsPlaying', false);
      },
    }
  }
</script>