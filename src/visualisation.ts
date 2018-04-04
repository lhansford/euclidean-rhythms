function getPolygonPoints(sides: number) {
  if (sides === 6) {
    return [[60,20], [100,40], [100,80], [60,100], [20,80], [20,40]];
  }
  return [];
}

export function getPolygonPointsAsString(sides: number) {
  return getPolygonPoints(sides).map(x => x.join(',')).join(' ');
}

export function getLineStart(sides: number, currentNote: number) {
  const points = getPolygonPoints(sides);
  return points[currentNote];
}