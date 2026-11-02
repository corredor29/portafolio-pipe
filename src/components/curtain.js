/** Curtain travel as a multiple of the viewport height (scroll distance the lift takes). */
export const CURTAIN = 1.6;
/** Smooth ease-in-out (cubic-ish, cinematic): gentle start, soft landing. */
export const easeCurtain = (t) => {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
