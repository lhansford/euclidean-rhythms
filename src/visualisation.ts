
export function getPolygonPoints(sides: number, radius: number) {
  let i = 0;
  const points = [];
  while (i < sides) {
    const point = [
      radius * Math.cos(2 * Math.PI * i / sides) + radius,
      radius * Math.sin(2 * Math.PI * i / sides) + radius,
    ];
    points.push(point);
    i += 1;
  }
  return points
}

export function polygonPointsToString(points: Array<Array<number>>) {
  return points.map(x => x.join(',')).join(' ');
}
