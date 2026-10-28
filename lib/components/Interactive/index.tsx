/**
 * MIT License
 * https://github.com/omgovich/react-colorful/
 *
 * Copyright (c) 2020 Vlad Shilov <omgovich@ya.ru>
 */

import type { KeyboardEvent, PointerEvent } from 'react';
import { isArrow, KEY } from 'tgui-modern/common/keys';
import { getRelativePosition } from './helpers';
import type { InteractiveProps } from './types';

/**
 * ## Interactive
 *
 * A low-level component that handles pointer and keyboard interactions.
 *
 * See an example of usage in the story:
 * - [View Colorpicker story](https://tgstation.github.io/tgui-core/?path=/story/interfaces-colorpickermodal--default)
 */
export function Interactive(props: InteractiveProps) {
  const { onMove, onKey, children, containerRef, style, ...rest } = props;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    // Prevent text selection
    event.preventDefault();

    // Only trigger if this element has captured the pointer (is dragging)
    if (containerRef.current?.hasPointerCapture(event.pointerId)) {
      onMove(getRelativePosition(containerRef.current, event.nativeEvent));
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>): void {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    // Prevent text selection
    event.preventDefault();
    element.focus();
    // Capture the pointer so we receive events even if mouse leaves the div
    element.setPointerCapture(event.pointerId);
    onMove(getRelativePosition(element, event.nativeEvent));
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>): void {
    containerRef.current?.releasePointerCapture(event.pointerId);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    const key = event.key;
    if (!isArrow(key)) {
      return;
    }

    // Do not scroll page by arrow keys when document is focused on the element
    event.preventDefault();
    // Send relative offset to the parent component.
    onKey({
      left: key === KEY.Right ? 0.05 : key === KEY.Left ? -0.05 : 0,
      top: key === KEY.Down ? 0.05 : key === KEY.Up ? -0.05 : 0,
    });
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="slider"
      className="react-colorful__interactive"
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
}
