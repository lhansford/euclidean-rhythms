/**
 * Converts a steps value and triggers value to a euclidean rhythm, and then rotates it the given
 * amount. The patterns is represented as a string of 0s and 1s.
 * @param {number} steps The number of steps in the the pattern.
 * @param {number} triggers The number of triggers.
 * @param {number} rotation The amount to rotate the pattern.
 * @returns {string}
 */
export function getEuclideanBinary(steps: number, triggers: number, rotation: number) {
  const safeRotation = rotation % steps;
  let zeroes = steps - triggers;
  const triggerArrays = Array(triggers).fill('1');
  let currentArrayIndex = 0;
  while (zeroes > 0) {
    triggerArrays[currentArrayIndex] += '0';
    if (currentArrayIndex === triggerArrays.length - 1) {
      currentArrayIndex = 0;
    } else {
      currentArrayIndex += 1;
    }
    zeroes -= 1;
  }
  const pattern = triggerArrays.reduce((prev, curr) => prev + curr, '');
  return safeRotation === 0 ? pattern : pattern.slice(-safeRotation) + pattern.slice(0, pattern.length - safeRotation);
}

/**
 * Converts a binary string (e.g. '00100') to a Part array readable by Tone.js.
 * @param {string} binary A string of 0s and 1s representing a euclidean rhythm.
 * @param {string} note The note to play (e.g 'c3')
 * @returns {Array<[string, string]>}
 */
function euclideanBinaryToPart(binary: string, note: string) {
  return binary
    .split('')
    .map((char, index) => char === '1' ? [`0:${index}`, note] : undefined)
    .filter(x => x !== undefined);
} 

export function getPart(steps: number, triggers: number, rotation: number, note: string) {
  return euclideanBinaryToPart(getEuclideanBinary(steps, triggers, rotation), note);
}