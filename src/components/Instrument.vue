<template>
  <div>
    <instrument-visualisation :currentStep="currentStep" :steps="stepsAsNumber" :triggers="triggersAsNumber" :rotation="rotationAsNumber"></instrument-visualisation>
    <input v-model.number="triggers" type="number">
    <input v-model.number="steps" type="number">
    <input v-model.number="rotation" type="number">
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
    rotationAsNumber: number,
  } = {
    voiceType: SINE,
    steps: 8,
    triggers: 3,
    stepsAsNumber: 8, // Because subcomponents rely on this being a number, but actual value can change to string due to HTML input.
    triggersAsNumber: 3, // Because subcomponents rely on this being a number, but actual value can change to string due to HTML input.
    rotationAsNumber: 0, // Because subcomponents rely on this being a number, but actual value can change to string due to HTML input.
    rotation: 0,
    currentStep: 1, // Working with 1-indexing to match music usage.
    part: undefined,
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getNote() {
    const index = getRandomInt(10);
    const notes = ['C6', 'C7', 'C3', 'C4', 'C5', 'E6', 'E7', 'E3', 'E4', 'E5']
    return notes[index];
  }

  function createVoice() {
    const reverb = new Tone.Freeverb(0.5).toMaster();
    const voice = new Tone.PluckSynth({
      // attackNoise: 1,
      // dampening: 4000,
      // resonance: Math.random(),
    }).connect(reverb);
    return voice;
  }

  function createPart(voice: any, steps: number, triggers: number, rotation: number, note: string) {
    const part = new Tone.Part(function(time: any, note: any){
      voice.triggerAttackRelease(note, "16n", time);
    }, getPart(steps, triggers, rotation, note));
    part.loop = true;
    part.loopEnd = `0:${steps}`;
    part.playbackRate = 4;
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
      this.currentStep = this.masterClockStep % this.stepsAsNumber;
      if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string' && typeof(this.rotation) !== 'string') {
        this.part = createPart(this.voice, this.steps, this.triggers, this.rotation, this.note);
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
        if (this.currentStep >= this.stepsAsNumber) {
          this.currentStep = 1;
        } else {
          this.currentStep += 1;
        }
        if (this.currentStep === 1 && this.part && this.part.state !== 'started') {
          // This is used only when changing steps as it allows us to await the master clock catching
          // up to the step of this instrument.
          this.part.start();
        }
      },
      steps: function() {
        if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string' && typeof(this.rotation) !== 'string') {
          this.stepsAsNumber = this.steps;
          const part = this.part;
          if (part !== undefined) {
            part.dispose();
          }
          this.currentStep = 1; // Reset current step.
          this.part = createPart(this.voice, this.steps, this.triggers, this.rotation, this.note);
        }
      },
      triggers: function() {
        if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string' && typeof(this.rotation) !== 'string') {
          this.triggersAsNumber = this.triggers;
          if (this.part !== undefined) {
            this.part.dispose();
          }
          this.part = createPart(this.voice, this.steps, this.triggers, this.rotation, this.note);
          this.part.start();
        }
      },
      rotation: function() {
        if (typeof(this.steps) !== 'string' && typeof(this.triggers) !== 'string' && typeof(this.rotation) !== 'string') {
          this.rotationAsNumber = this.rotation;
          if (this.part !== undefined) {
            this.part.dispose();
          }
          this.part = createPart(this.voice, this.steps, this.triggers, this.rotation, this.note);
          this.part.start();
        }
      },
    }
  });
</script>