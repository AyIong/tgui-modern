import type { ReactNode, RefObject } from 'react';

export type ScrollerProps = {
  /** Scrollable element content  */
  children: ReactNode;
} & Partial<{
  /** Scroller content class name */
  className: string;
  /** If true, will do nothing */
  disabled: boolean;
  /** Element ref to which scrolling will be performed.  */
  scrollTo: RefObject<HTMLDivElement | null>;
}>;

export type ScrollerButtonProps = {
  /** If true, button will be hidden. */
  hidden: boolean;
  /** Basically, just changes className. */
  direction: 'left' | 'right';
  /** What will be done when you clock on it. */
  onClick: () => void;
};
