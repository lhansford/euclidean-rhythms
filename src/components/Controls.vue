<template>
  <button class="c-play-button" v-if="!isPlaying" @click="play">
    <i class="far fa-play-circle"></i>
  </button>
  <button class="c-play-button" v-else @click="stop">
    <i class="far fa-pause-circle"></i>
  </button>
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

<style scoped>
  .c-play-button {
    -webkit-appearance: none;
    background: none;
    border: none;
    font-size: 2em;
    cursor: pointer;
    color: white;
  }
  .c-play-button:hover {
    color: #FF9A00;
  }
</style>