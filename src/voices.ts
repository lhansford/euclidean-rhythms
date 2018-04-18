import Tone from 'tone';

const DRUM = 'DRUM';
const PING = 'PING';
const PLUCK = 'PLUCK';
const SYNTH = 'SYNTH';

export const VOICES = [
  { value: DRUM, label: 'Drum' },
  { value: PING, label: 'Ping' },
  { value: PLUCK, label: 'Pluck' },
  { value: SYNTH, label: 'Synth' },
];

function createSynthVoice() {
  const reverb = new Tone.Freeverb(0.2).toMaster();
  const voice = new Tone.MonoSynth({
    type: 'sine',
    filter: {
      Q: 2,
      type: 'lowpass',
      rolloff: -24
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.5,
      release: 0.5,
    },
  }).connect(reverb);
  voice.useNote = true;
  return voice;
}


function createPluckVoice() {
  const reverb = new Tone.Freeverb(0.5).toMaster();
  const voice = new Tone.PluckSynth({
    dampening: 4000,
  }).connect(reverb);
  voice.useNote = true;
  return voice;
}

function createPingVoice() {
  const voice = new Tone.MetalSynth({
    harmonicity: 12,
    resonance: 800,
    modulationIndex: 20,
    envelope: {
      decay: 0.4,
    },
    volume: -15
  }).toMaster();
  voice.useNote = false;
  return voice;
}

function createDrumVoice() {
  const voice = new Tone.MembraneSynth({
    pitchDecay: 0.008,
    octaves: 2,
    envelope: {
      attack: 0.0006,
      decay: 0.5,
      sustain: 0
    }
  }).toMaster();
  voice.useNote = true;
  return voice
}

/**
 * Returns a ToneJS voice matching the given id.
 * @param {string} voiceId A valid voice id.
 * @returns {{}}
 */
export function getVoice(voiceId: string) {
  switch (voiceId) {
    case DRUM:
      return createDrumVoice();
    case PING:
      return createPingVoice();
    case PLUCK:
      return createPluckVoice(); 
    case SYNTH:
      return createSynthVoice();
    default:
      throw new Error('Invalid voice value used.');
  }
}
