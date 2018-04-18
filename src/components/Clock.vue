<template>
	<section>
    <input v-model.number="masterClock" type="number">
    <button v-on:click="setMasterClock">Set BPM</button>
	</section>
</template>


<script lang="ts">
  import Tone from 'tone';

  import EventBus from './eventBus';
  import Controls from './components/Controls.vue';
  import Instrument from './components/Instrument.vue';

  let lastId = 0;

  type State = {
    masterClock: string | number,
  };

  const state: State = {
    masterClock: 120,
  };

  export default {
    name: 'Clock',
    data() { return state },
    methods: {
      setMasterClock: function() {
        if (typeof(state.masterClock) !== 'string' && state.masterClock > 0) {
          Tone.Transport.bpm.rampTo(state.masterClock, 1);
        }
      }
    },
  }
</script>

<style scoped>
</style>