<template>
	<div id="app">
		<h1>Euclidean Rhythms</h1>
    <controls v-bind:isPlaying="isPlaying"></controls>
    <input v-model.number="masterClockInput" type="number">
    <button v-on:click="setMasterClock">Set</button>
    <section class="instruments">
      <div v-for="instrument in instruments" v-bind:key="instrument._id">
        <instrument v-bind="instrument" v-bind:masterClockStep="masterClockStep"></instrument>
      </div>
    </section>
    <button v-if="instruments.length < 6" v-on:click="addInstrument">Add Instrument</button>
	</div>
</template>

<script lang="ts">
  import Tone from 'tone';

  import EventBus from './eventBus';
  import Controls from './components/Controls.vue';
  import Instrument from './components/Instrument.vue';

  let lastId = 0;

  type State = {
    masterClockInput: string | number,
    masterClock: number,
    isPlaying: boolean,
    masterClockStep: number,
    instruments: Array<{ _id: number }>,
  };

  const state: State = {
    masterClock: 120,
    masterClockInput: 120,
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

  Tone.Transport.start();
  Tone.Transport.scheduleRepeat(function(time: any){
    state.masterClockStep = state.masterClockStep === 7 ? 0 : state.masterClockStep + 1;
    // console.log(state.masterClockStep)
  }, "8n");

  export default {
    name: 'App',
    data() { return state },
    components: {
      Controls,
      Instrument,
    },
    methods: {
      addInstrument: function() {
        if (state.instruments.length < 6) {
          state.instruments.push({ _id: ++lastId });
        }
      },
      setMasterClock: function() {
        if (typeof(state.masterClockInput) !== 'string' && state.masterClockInput > 0) {
          state.masterClock = state.masterClockInput;
          Tone.Transport.bpm.rampTo(state.masterClock, 1);
        }
      }
    },
  }
</script>

<style scoped>
  .instruments {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>