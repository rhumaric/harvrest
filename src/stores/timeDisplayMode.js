import { storable } from './storable';

export const ELAPSED = 'elapsed';
export const REMAINING = 'remaining';

export const timeDisplayMode = storable('timeDisplayMode', {
  initialValue: ELAPSED
});
