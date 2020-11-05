import { storable } from './storable';

export const ELAPSED = 'elapsed';
export const REMAINING = 'remaining';

export const mode = storable('timeDisplayMode', {
  initialValue: ELAPSED
});
