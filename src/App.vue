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
  import EventBus from './eventBus';
  import Controls from './components/Controls.vue';
  import Instrument from './components/Instrument.vue';
  import MasterClock from './components/MasterClock.vue';

  const SINE = 'sine';

  const audioContext = new AudioContext(); // TODO: Do this for other browsers https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
  var oscillator = audioContext.createOscillator();
  var gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  oscillator.frequency.value = 1500; // value in hertz
  // oscillator.start();

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
  });

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