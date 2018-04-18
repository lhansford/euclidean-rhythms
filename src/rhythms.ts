export const RHYTHMS = [
  {
    pattern: [2, 5, 0],
    label: 'Khafif-e-ramal',
    description: `
    E(2,5)=[x . x . .] is a thirteenth century Persian rhythm called Khafif-e-ramal [34]. It is also the metric
    pattern of the second movement of Tchaikovsky’s Symphony No. 6 [17]. When it is started on the second
    onset ([x . . x .]) it is the metric pattern of Dave Brubeck’s Take Five as well as Mars from The Planets by
    Gustav Holst [17].
`,
  },
  {
    pattern: [5, 8, 0],
    label: 'Cinquillo',
    description: `
    E(5,8)=[x . x x . x x .] is the Cuban cinquillo pattern.
`
  }
];

/**
 * Returns the rhythm object (found in RHYTHMS above), that matches the given triggers, steps and
 * rotation. If none is found then undefined is returned.
 * @param {number} triggers The number of triggers in the current rhythm.
 * @param {number} steps The number of steps in the current rhythm.
 * @param {number} rotation The rotation of the current rhythm.
 * @returns {{} | void}
 */
export function getRhythm(triggers: number, steps: number, rotation: number) {
  return RHYTHMS.find(r => JSON.stringify(r.pattern) === JSON.stringify([triggers, steps, rotation]));
}