import { clamp } from 'tgui-modern/common/math';
import type { Interaction } from './types';

/** Finds the proper window object to fix iframe embedding issues */
export function getParentWindow(node?: HTMLDivElement | null): Window {
  return node?.ownerDocument?.defaultView || self;
}

/** Returns a relative position of the pointer inside the node's bounding box */
export function getRelativePosition(
  node: HTMLDivElement,
  event: MouseEvent | PointerEvent,
): Interaction {
  const rect = node.getBoundingClientRect();
  const pointer = event;

  return {
    left: clamp(
      (pointer.pageX - (rect.left + getParentWindow(node).pageXOffset)) / rect.width,
      0,
      1,
    ),
    top: clamp(
      (pointer.pageY - (rect.top + getParentWindow(node).pageYOffset)) / rect.height,
      0,
      1,
    ),
  };
}
