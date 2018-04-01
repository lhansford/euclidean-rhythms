<template>
  <p>Voice: {{ voice }}</p>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tone from 'tone';

  export default Vue.extend({
    name: 'Instrument',
    props: {
      voice: {
        type: String,
      },
    },
    created: function () {
      var note = Math.random() * 1000;
      var synth = new Tone.Synth().toMaster();
      var loop = new Tone.Loop(function(time: number){
        synth.triggerAttackRelease(note, "8n", time);
      }, "4n");
      loop.start();
    },
    data() {
      return { voice: this.voice };
    },
  });
</script>