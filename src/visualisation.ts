
/**
 * Returns an array of coordinates (represented as an array with an x and y value) that can be used
 * to draw a polygon with sides and radius matching the given values.
 */
export function getPolygonPoints(sides: number, radius: number): Array<Array<number>> {
  let i = 0;
  const points = [];
  while (i < sides) {
    points.push([
      radius * Math.cos(2 * Math.PI * i / sides) + radius,
      radius * Math.sin(2 * Math.PI * i / sides) + radius,
    ]);
    i += 1;
  }
  return points
}

/**
 * Takes an array of coordinate tuples (e.g. [x, y]) and converts them to a string acceptable
 * by a HTML svg element.
 */
export function polygonPointsToString(points: Array<Array<number>>): string {
  return points.map(x => x.join(',')).join(' ');
}
