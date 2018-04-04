


function getEuclideanBinary(steps: number, triggers: number) {
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
  return triggerArrays.reduce((prev, curr) => prev + curr, '');
}

function euclideanBinaryToPart(binary: string, note: string) {
  return binary
    .split('')
    .map((char, index) => char === '1' ? [`0:${index}`, note] : undefined)
    .filter(x => x !== undefined);
} 

export function getPart(steps: number, triggers: number, rotation: number, note: string) {
  return euclideanBinaryToPart(getEuclideanBinary(steps, triggers), note);
}