<template>
  <div class="c-instrument">
    <div class="c-instrument__visualisation">
      <instrument-visualisation :currentStep="currentStep" :steps="stepsAsNumber" :triggers="triggersAsNumber" :rotation="rotationAsNumber"></instrument-visualisation>
    </div>
    <div class="c-instrument__form">
      <label for="voice">Sound</label>
      <select id="voice" v-model="selectedVoice">
        <option v-for="option in voiceOptions" v-bind:value="option.value">
          {{ option.label }}
        </option>
      </select>
      <label for="triggers">Triggers</label>
      <input id="triggers" v-model.number="triggers" type="number">
      <label for="steps">Steps</label>
      <input id="steps" v-model.number="steps" type="number">
      <label for="rotation">Rotation</label>
      <input id="rotation" v-model.number="rotation" type="number">
    </div>
    <p class="c-instrument__description" v-if="description">{{ description }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tone from 'tone';

  import InstrumentVisualisation from './InstrumentVisualisation.vue';
  import EventBus from './../eventBus';
  import { getPart } from './../euclidean';
  import { getRhythm } from './../rhythms';
  import { getVoice, VOICES } from './../voices';

  const defaultState: {
    steps: number | string,
    triggers: number | string,
    rotation: number | string,
    part: void | any,
    currentStep: number,
    stepsAsNumber: number,
    triggersAsNumber: number,
    rotationAsNumber: number,
    voiceOptions: Array<{ value: string, label: string}>,
    selectedVoice: string,
  } = {
    steps: 8,
    triggers: 5,
    stepsAsNumber: 8, // Because subcomponents rely on this being a number, but actual value can change to string due to HTML input.
    triggersAsNumber: 5, // Because subcomponents rely on this being a number, but actual value can change to string due to HTML input.
    rotationAsNumber: 0, // Because subcomponents rely on this being a number, but actual value can change to string due to HTML input.
    rotation: 0,
    currentStep: 8, // Working with 1-indexing to match music usage. Start on last step so we move to first step on first tick.
    part: undefined,
    voiceOptions: VOICES,
    selectedVoice: VOICES[0].value,
  };

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getNote(): string {
    const index = getRandomInt(3);
    const notes = ['C3', 'C4', 'E3']
    return notes[index];
  }

  function createPart(voice: any, steps: number, triggers: number, rotation: number, note: string) {
    const part = new Tone.Part(function(time: any, note: any){
      voice.useNote ?
        voice.triggerAttackRelease(note, "16n", time) :
        voice.triggerAttackRelease("16n", time);
    }, getPart(steps, triggers, rotation, note));
    part.loop = true;
    part.loopEnd = `0:${steps}`;
    part.playbackRate = 2;
    return part;
  }

  export default Vue.extend({
    name: 'Instrument',
    components: {
      InstrumentVisualisation,
    },
    props: {
      masterClockStep: {
        type: Number,
      },
    },
    created: function () {
      if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string' && typeof(this.rotation) !== 'string') {
        this.part = createPart(this.voice, this.steps, this.triggers, this.rotation, this.note);
      }
    },
    data() {
      return Object.assign(
        {},
        defaultState,
        { voice: getVoice(defaultState.selectedVoice), note: getNote(), },
      );
    },
    computed: {
      description: function(): string | undefined {
        const rhythm = getRhythm(this.triggersAsNumber, this.stepsAsNumber, this.rotationAsNumber);
        return rhythm ? rhythm.description : undefined;
      },
    },
    watch: {
      masterClockStep: function() {
        if (this.currentStep >= this.stepsAsNumber) {
          this.currentStep = 1;
        } else {
          this.currentStep += 1;
        }
        if (this.masterClockStep % this.stepsAsNumber === 0 && this.part && this.part.state !== 'started') {
          // This allows us to await the master clock catching up to the step of this instrument.
          this.part.start();
          this.currentStep = 1;
        }
      },
      steps: function() {
        if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string' && typeof(this.rotation) !== 'string') {
          this.stepsAsNumber = this.steps;
          this.generateNewPart();
        }
      },
      triggers: function() {
        if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string' && typeof(this.rotation) !== 'string') {
          this.triggersAsNumber = this.triggers;
          this.generateNewPart();
        }
      },
      rotation: function() {
        if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string' && typeof(this.rotation) !== 'string') {
          this.rotationAsNumber = this.rotation;
          this.generateNewPart();
        }
      },
      selectedVoice: function () {
        this.voice = getVoice(this.selectedVoice);
        this.generateNewPart();
      }
    },
    methods: {
      generateNewPart: function() {
        if (this.part !== undefined) {
          this.part.dispose();
        }
        this.part = createPart(this.voice, this.stepsAsNumber, this.triggersAsNumber, this.rotationAsNumber, this.note);
      },
    },
  });
</script>

<style scoped>
  .c-instrument {
    display: flex;
  }

  .c-instrument__form {
    display: flex;
    flex-direction: column;
  }

  .c-instrument__description {
    margin: 0 1em;
  }
</style>