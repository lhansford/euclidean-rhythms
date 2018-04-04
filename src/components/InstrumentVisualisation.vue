<template>
  <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <polygon :points="points" style="fill:transparent;stroke:black;stroke-width:1" />
    <line :x1="x1" :y1="y1" x2="100" y2="40" style="stroke:rgb(255,0,0);stroke-width:2" />
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';

  import { getPolygonPointsAsString, getLineStart } from './../visualisation.ts';

  export default Vue.extend({
    name: 'InstrumentVisualisation',
    props: {
      currentStep: {
        type: Number,
      },
    },
    data: function() {
      console.log(this)
      return {
        points: getPolygonPointsAsString(6),
      };
    },
    computed: {
      x1: function() {
        return getLineStart(6, this.currentStep)[0]
      },
      y1: function() {
        return getLineStart(6, this.currentStep)[1]
      },
    },
  });
</script>

<style scoped>
  .polygon {
    background: red;
    height: 100px;
    width: 100px;
  }
</style>