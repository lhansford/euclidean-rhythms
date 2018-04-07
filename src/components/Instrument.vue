<template>
  <div>
    <instrument-visualisation :currentStep="currentStep" :steps="stepsAsNumber" :triggers="triggersAsNumber"></instrument-visualisation>
    <input v-model.number="triggers" type="number">
    <input v-model.number="steps" type="number">
    <p>Voice: {{ voiceType }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tone from 'tone';

  import InstrumentVisualisation from './InstrumentVisualisation.vue';
  import EventBus from './../eventBus';
  import { getPart } from './../euclidean';
  const SINE = 'sine';
  const defaultState: {
    voiceType: string,
    steps: number | string,
    triggers: number | string,
    rotation: number | string,
    part: void | any,
    currentStep: number,
    stepsAsNumber: number,
    triggersAsNumber: number,
  } = {
    voiceType: SINE,
    steps: 8,
    triggers: 3,
    stepsAsNumber: 8, // Because subcomponents rely on this being a number, but actual value can change to string due to HTML input.
    triggersAsNumber: 3, // Because subcomponents rely on this being a number, but actual value can change to string due to HTML input.
    rotation: 0,
    currentStep: 0,
    part: undefined,
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getNote() {
    const index = getRandomInt(5);
    const notes = ['C6', 'C7', 'C3', 'C4', 'C5']
    return notes[index];
  }

  function createVoice() {
    console.log('create voice')
    const reverb = new Tone.Freeverb(0.5).toMaster();
    const voice = new Tone.PluckSynth({
      // attackNoise: 1,
      // dampening: 4000,
      // resonance: Math.random(),
    }).connect(reverb);
    return voice;
  }

  function createPart(voice: any, steps: number, triggers: number, note: string) {
    console.log('create part')
    console.log(getPart(steps, triggers, 0, note))
    const part = new Tone.Part(function(time: any, note: any){
      voice.triggerAttackRelease(note, "16n", time);
    }, getPart(steps, triggers, 0, note));
    part.loop = true;
    part.loopEnd = `0:${steps}`;
    part.playbackRate = 2;
    // part.interval = steps;
    console.log(part)
    part.start(0);
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
      if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string') {
        this.part = createPart(this.voice, this.steps, this.triggers, this.note);
      }
    },
    data() {
      return Object.assign(
        {},
        defaultState,
        { voice: createVoice(), note: getNote(), },
      );
    },
    watch: {
      masterClockStep: function() {
        if (this.currentStep >= this.stepsAsNumber - 1) {
          this.currentStep = 0;
        } else {
          this.currentStep += 1;
        }
        // console.log(`I: ${this.currentStep}`)
      },
      steps: function() {
        if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string') {
          this.stepsAsNumber = this.steps;
          const part = this.part;
          if (part !== undefined) {
            part.dispose();
          }
          this.part = createPart(this.voice, this.steps, this.triggers, this.note);
        }
      },
      triggers: function() {
        if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string') {
          this.triggersAsNumber = this.triggers;
          if (this.part !== undefined) {
            this.part.dispose();
          }
          this.part = createPart(this.voice, this.steps, this.triggers, this.note);
        }
      },
    }
  });
</script>