import { useRef } from 'react';
import { classes } from 'tgui-modern/common/react';
import { Icon } from '../Icon';
import { PAGE_SCROLL_RATIO } from './helpers';
import { useScrollEdges, useScrollIntoView, useSmoothScroll } from './hooks';
import type { ScrollerButtonProps, ScrollerProps } from './types';

/**
 * ## Scroller
 *
 * Allows you to easily add a horizontal scroll.
 *
 * It supports smooth scroll and will automatically,
 * add needed buttons on left/right corners.
 * Сomponent also monitors the size of both itself and the elements contained within it.
 *
 * You can pass the `disabled` prop, in this case, the component will not be initialized,
 * but still return wrapped element you pass.
 */
export function Scroller(props: ScrollerProps) {
  const { children, disabled, scrollTo, className } = props;

  const scrollableRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight } = useScrollEdges(scrollableRef, disabled);
  const scrollBy = useSmoothScroll(scrollableRef, disabled);
  useScrollIntoView(scrollTo, disabled);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  function scrollByPage(direction: -1 | 1) {
    const scrollable = scrollableRef.current;
    if (scrollable) {
      scrollBy(direction * scrollable.clientWidth * PAGE_SCROLL_RATIO);
    }
  }

  return (
    <>
      <ScrollerButton hidden={!canScrollLeft} direction="left" onClick={() => scrollByPage(-1)} />
      <div
        ref={scrollableRef}
        className={classes(
          'scroller',
          className,
          canScrollLeft && 'scrollable-left',
          canScrollRight && 'scrollable-right',
        )}
      >
        {children}
      </div>
      <ScrollerButton hidden={!canScrollRight} direction="right" onClick={() => scrollByPage(1)} />
    </>
  );
}

function ScrollerButton(props: ScrollerButtonProps) {
  const { hidden, direction, onClick } = props;
  return (
    <div
      className={classes('scroller-button', direction, hidden && 'hidden')}
      hidden={hidden}
      onClick={onClick}
    >
      <Icon name={`chevron-${direction}`} />
    </div>
  );
}
