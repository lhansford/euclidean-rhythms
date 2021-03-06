<template>
  <div class="c-visualisation">
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <svg v-for="trigger in points.triggerPoints">
        <polygon :points="trigger" style="fill:black;" />
      </svg>
      <polygon :points="points.currentStepPoints" style="fill:#FF9A00;" />
    </svg>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  import { polygonPointsToString, getPolygonPoints, getCurrentStepPolygonPoints } from './../visualisation.ts';
  import { getEuclideanBinary } from './../euclidean.ts';

  export default Vue.extend({
    name: 'InstrumentVisualisation',
    props: {
      currentStep: {
        type: Number,
      },
      steps: {
        type: Number,
      },
      triggers: {
        type: Number,
      },
      rotation: {
        type: Number,
      }
    },
    data: function () {
      return {
        pointsArray: getPolygonPoints(this.steps, 100),
      };
    },
    computed: {
      points: function(): {} {
        this.pointsArray = getPolygonPoints(this.steps, 100);
        const binary = getEuclideanBinary(this.steps, this.triggers, this.rotation).split('');
        return {
          currentStepPoints: polygonPointsToString(getCurrentStepPolygonPoints(this.currentStep - 1, this.pointsArray)),
          polygonPoints: polygonPointsToString(this.pointsArray),
          triggerPoints: binary
            .map((step: string, index: number) => (step === '0' ? [] : getCurrentStepPolygonPoints(index, this.pointsArray)))
            .filter((x: Array<Array<number>>) => x.length)
            .map((x: Array<Array<number>>) => polygonPointsToString(x)),
        };
      },
    },
  });
</script>

<style scoped>
  .c-visualisation {
    margin: 1em;
  }
</style>
