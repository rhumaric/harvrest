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
    parts.push(pluralize('hour', hours));
  }
  if (minutes) {
    parts.push(pluralize('minute', minutes));
  }
  if (seconds) {
    parts.push(pluralize('second', seconds));
  }
  return parts.join(', ');
}

function pluralize(root, amount) {
  if (amount === 1) {
    return `${amount} ${root}`;
  } else {
    return `${amount} ${root + 's'}`;
  }
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
