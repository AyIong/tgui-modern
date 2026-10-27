/** How close to an edge still counts as at the edge in px. */
export const EDGE_TOLERANCE_PX = 3;
/** Share of the remaining distance covered on every animation frame. */
export const SMOOTHING_FACTOR = 0.2;
/** Share of the visible width scrolled by one click on an arrow button. */
export const PAGE_SCROLL_RATIO = 0.5;

export function getMaxScrollLeft(scrollable: HTMLElement) {
  return scrollable.scrollWidth - scrollable.clientWidth;
}
