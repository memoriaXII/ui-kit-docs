/** Tracks whether any in-app client-side navigation has happened within the
 * current session. The back button uses this flag to decide whether to
 * pop the Next.js router stack or to redirect the user to the home screen
 * when they landed here via a deep link from another Freedom miniapp.
 */
let depth = 0;
let isGoingBack = false;
export const trackInternalNavigation = () => {
  if (isGoingBack) {
    depth = Math.max(0, depth - 1);
    isGoingBack = false;
  } else {
    depth += 1;
  }
};
export const markGoingBack = () => {
  isGoingBack = true;
};
export const resetGoingBack = () => {
  isGoingBack = false;
};
export const resetHistory = () => {
  depth = 0;
  isGoingBack = true;
};
export const hasInternalHistory = () => depth > 0;
