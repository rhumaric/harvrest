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

export function humanize({ hours, minutes, seconds }) {
  const parts = [];
  if (hours) {
    parts.push(`${hours} hours`);
  }
  if (minutes) {
    parts.push(`${minutes} minutes`);
  }
  if (seconds) {
    parts.push(`${seconds} seconds`);
  }
  return parts.join(', ');
}

export function breakdown(microseconds) {
  // Use the Date object to help with formatting date
  const date = new Date(0, 0, 0, 0, 0, microseconds / 1000);
  return {
    seconds: date.getSeconds(),
    minutes: date.getMinutes(),
    hours: date.getHours()
  };
}

export function clock({ hours, minutes, seconds }) {
  if (hours) {
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  }

  return `${padTime(minutes)}:${padTime(seconds)}`;
}

export function datetimeAttribute({ hours, minutes, seconds }) {
  return `PT${hours || 0}H${minutes || 0}M${seconds || 0}S`;
}

export function padTime(value) {
  return `${value}`.padStart(2, '0');
}
