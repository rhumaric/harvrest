export function none() {
  return {};
}

export function flipHorizontally(
  node,
  { duration, delay, oppositeDirection = false } = {}
) {
  const factor = oppositeDirection ? -1 : 1;
  return {
    duration,
    delay,
    css: t =>
      `transform: perspective(200em) rotateY(${(factor * (1 - t)) / 4}turn)`
  };
}
