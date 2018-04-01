<template>
  <p>Voice: {{ voice }}</p>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tone from 'tone';

  import { getPart } from './../euclidean';

  const voice = new Tone.PluckSynth().toMaster();

  export default Vue.extend({
    name: 'Instrument',
    props: {
      voice: {
        type: String,
      },
      steps: {
        type: Number,
      },
      triggers: {
        type: Number,
      }
    },
    created: function () {
      var note = Math.random() * 1000;
      console.log(getPart(this.steps, this.triggers, 0))
      const part = new Tone.Part(function(time: any, note: any){
        //the notes given as the second element in the array
        //will be passed in as the second argument
        voice.triggerAttackRelease(note, "8n", time);
      }, getPart(this.steps, this.triggers, 0));
      part.loop = true;
      // var loop = new Tone.Loop(function(time: number){
      //   voice.triggerAttackRelease(note, "8n", 0);
      // }, "4n");
      // loop.start();
      part.start(0);
    },
    data() {
      return { voice: this.voice };
    },
  });
</script>