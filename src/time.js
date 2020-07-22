/**
 * Helpers for converting the time from and to minutes
 * @module time
 */

export function minutes(microseconds) {
  return microseconds / 1000 / 60;
}

export function microseconds(minutes) {
  return minutes * 60 * 1000;
}
