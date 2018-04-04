<template>
	<div id="app">
		<h1>Euclidean Rhythms</h1>
    {{ currentNote }}
    <controls v-bind:isPlaying="isPlaying"></controls>
    <master-clock v-bind:clock="masterClock"></master-clock>
    <div v-for="instrument in instruments" v-bind:key="instrument._id">
      <instrument v-bind="instrument" v-bind:masterClockStep="masterClockStep"></instrument>
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

  let lastId = 0;

  const state = {
    masterClock: 120,
    instruments: [{ _id: 0 }],
    isPlaying: true,
    masterClockStep: 0,
  };

  EventBus.$on('setIsPlaying', (isPlaying: boolean) => {
    state.isPlaying = isPlaying;
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  });

  EventBus.$on('setMasterClock', (bpm: number) => {
    state.masterClock = bpm;
    Tone.Transport.bpm.rampTo(bpm, 5);
  });

  Tone.Transport.start();
  Tone.Transport.scheduleRepeat(function(time: any){
    state.masterClockStep = state.masterClockStep === 7 ? 0 : state.masterClockStep + 1;
  }, "8n");

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
          state.instruments.push({ _id: ++lastId });
        }
      },
    },
  }
</script>