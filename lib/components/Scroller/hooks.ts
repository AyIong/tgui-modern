import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { clamp } from 'tgui-modern/common/math';
import { EDGE_TOLERANCE_PX, getMaxScrollLeft, SMOOTHING_FACTOR } from './helpers';

/**
 * Tracks whether there is hidden content on the left / right of the scrollable.
 * Reacts to scrolling and to any size change of the container or its children.
 */
export function useScrollEdges(
  scrollableRef: RefObject<HTMLDivElement | null>,
  disabled?: boolean,
) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (disabled || !scrollable) {
      return;
    }

    const updateEdges = () => {
      setCanScrollLeft(scrollable.scrollLeft > EDGE_TOLERANCE_PX);
      setCanScrollRight(scrollable.scrollLeft < getMaxScrollLeft(scrollable) - EDGE_TOLERANCE_PX);
    };

    /**
     * Watch the container and every direct child.
     * Content can grow without the container resizing.
     * For example, when user adds new tab in chat.
     */
    const resizeObserver = new ResizeObserver(updateEdges);
    const observeSizes = () => {
      resizeObserver.disconnect();
      resizeObserver.observe(scrollable);
      Array.from(scrollable.children).forEach((child) => {
        resizeObserver.observe(child);
      });
    };

    const mutationObserver = new MutationObserver(observeSizes);
    mutationObserver.observe(scrollable, { childList: true });
    scrollable.addEventListener('scroll', updateEdges, { passive: true });
    observeSizes();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      scrollable.removeEventListener('scroll', updateEdges);
    };
  }, [scrollableRef, disabled]);

  return { canScrollLeft, canScrollRight };
}

/**
 * Smooth horizontal scrolling.
 * Also converts the vertical mouse wheel into horizontal scrolling.
 */
export function useSmoothScroll(
  scrollableRef: RefObject<HTMLDivElement | null>,
  disabled?: boolean,
) {
  const targetScrollLeft = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const scrollBy = useCallback(
    (delta: number) => {
      const scrollable = scrollableRef.current;
      if (!scrollable) {
        return false;
      }

      const isAnimating = animationFrameId.current !== null;
      const startScrollLeft = isAnimating ? targetScrollLeft.current : scrollable.scrollLeft;
      const nextScrollLeft = clamp(startScrollLeft + delta, 0, getMaxScrollLeft(scrollable));
      targetScrollLeft.current = nextScrollLeft;

      if (!isAnimating) {
        function animate() {
          if (!scrollable) {
            return;
          }

          const distance = targetScrollLeft.current - scrollable.scrollLeft;
          if (Math.abs(distance) < 1) {
            scrollable.scrollLeft = targetScrollLeft.current;
            animationFrameId.current = null;
            return;
          }

          scrollable.scrollLeft +=
            Math.sign(distance) * Math.max(1, Math.abs(distance) * SMOOTHING_FACTOR);
          animationFrameId.current = requestAnimationFrame(animate);
        }

        animationFrameId.current = requestAnimationFrame(animate);
      }

      return nextScrollLeft !== startScrollLeft;
    },
    [scrollableRef],
  );

  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (disabled || !scrollable) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      if (scrollBy(event.deltaY)) {
        event.preventDefault();
      }
    };

    scrollable.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      scrollable.removeEventListener('wheel', handleWheel);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [scrollableRef, disabled, scrollBy]);

  return scrollBy;
}

/**
 * Scrolls `target` into the horizontal center
 * whenever element changes (instantly first time).
 */
export function useScrollIntoView(target?: RefObject<HTMLDivElement | null>, disabled?: boolean) {
  const previousElement = useRef<HTMLElement | null>(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    const element = target?.current;
    if (disabled || !element || element === previousElement.current) {
      return;
    }

    previousElement.current = element;
    element.scrollIntoView({
      behavior: hasScrolled.current ? 'smooth' : 'auto',
      inline: 'center',
      block: 'nearest', // do not scroll page vertically
    });
    hasScrolled.current = true;
  });
}
