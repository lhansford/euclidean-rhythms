<template>
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <polygon :points="points" style="fill:transparent;stroke:black;stroke-width:1" />
    <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" style="stroke:rgb(255,0,0);stroke-width:2" />
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';

  import { polygonPointsToString, getPolygonPoints } from './../visualisation.ts';

  export default Vue.extend({
    name: 'InstrumentVisualisation',
    props: {
      currentStep: {
        type: Number,
      },
      steps: {
        type: Number,
      },
    },
    data: function () {
      return { pointsArray: getPolygonPoints(this.steps, 100) };
    },
    computed: {
      x1: function(): number {
        return this.pointsArray[this.currentStep][0]
      },
      y1: function(): number {
        return this.pointsArray[this.currentStep][1]
      },
      x2: function(): number {
        const step = this.currentStep > this.steps - 2 ? 0 : this.currentStep + 1;
        console.log(step)
        return this.pointsArray[step][0]
      },
      y2: function(): number {
        const step = this.currentStep > this.steps - 2 ? 0 : this.currentStep + 1;
        return this.pointsArray[step][1]
      },
      points: function() {
        this.pointsArray = getPolygonPoints(this.steps, 100);
        return polygonPointsToString(this.pointsArray);
      }
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