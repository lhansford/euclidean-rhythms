<template>
	<div id="app">
		<h1>Euclidean Rhythms</h1>
    <controls v-bind:isPlaying="isPlaying"></controls>
    <master-clock v-bind:clock="masterClock"></master-clock>
    <div v-for="instrument in instruments">
      <instrument v-bind="instrument"></instrument>
    </div>
    <button v-if="instruments.length < 6" v-on:click="addInstrument">Add Instrument</button>
	</div>
</template>

<script lang="ts">
  import Tone from 'tone';

  import EventBus from './eventBus';
  import Controls from './components/Controls.vue';
  import Instrument from './components/Instrument.vue';
  import MasterClock from './components/MasterClock.vue';

  const SINE = 'sine';
  

  const baseInstrument = {
    voice: SINE,
    steps: 4,
    triggers: 4,
    rotation: 0,
  };

  const state = {
    masterClock: 120,
    instruments: [Object.assign({}, baseInstrument)],
    isPlaying: true,
  };

  EventBus.$on('setIsPlaying', (isPlaying: boolean) => {
    state.isPlaying = isPlaying;
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  });
  
  var synth = new Tone.Synth().toMaster();
  var loop = new Tone.Loop(function(time: number){
    synth.triggerAttackRelease("C3", "8n", time);
  }, "4n");
  loop.start();

  Tone.Transport.start();

  export default {
    name: 'App',
    data() { return state },
    components: {
      Controls,
      MasterClock,
      Instrument,
    },
    methods: {
      addInstrument: function() {
        if (state.instruments.length < 6) {
          state.instruments.push(Object.assign({}, baseInstrument));
        }
      },
    },
  }
</script>