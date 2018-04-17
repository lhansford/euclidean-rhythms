<template>
	<div id="app" class="c-main">
		<h1 class="c-main__title">Euclidean Rhythms</h1>
    <div class="c-controls">
      <controls v-bind:isPlaying="isPlaying"></controls>
      <clock></clock>
    </div>
    <section class="c-instruments">
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
  import Clock from './components/Clock.vue';
  import Instrument from './components/Instrument.vue';

  let lastId = 0;

  type State = {
    isPlaying: boolean,
    masterClockStep: number,
    instruments: Array<{ _id: number }>,
  };

  const state: State = {
    instruments: [{ _id: 0 }],
    isPlaying: true,
    masterClockStep: 1, // Start from 1 to match how its usually counted in music.
  };

  EventBus.$on('setIsPlaying', (isPlaying: boolean) => {
    state.isPlaying = isPlaying;
    isPlaying ? Tone.Transport.start() : Tone.Transport.pause();
  });

  Tone.Transport.start();
  Tone.Transport.scheduleRepeat(function(time: any){
    // state.masterClockStep = state.masterClockStep === 8 ? 1 : state.masterClockStep + 1; // Working in 4/4 with 8ths.
    state.masterClockStep += 1;
  }, "8n");

  export default {
    name: 'App',
    data() { return state },
    components: {
      Controls,
      Instrument,
      Clock,
    },
    methods: {
      addInstrument: function() {
        if (state.instruments.length < 6) {
          state.instruments.push({ _id: ++lastId });
        }
      }
    },
  }
</script>

<style scoped>
  .c-main {
    background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
    min-height: 100vh;
    color: white;
    font-family: monospace;
  }

  .c-main__title {
    text-align: center;
    padding: 1em;
    font-size: 2em;
  }
  
  .c-instruments {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .c-controls {
    display: flex;
  }

</style>