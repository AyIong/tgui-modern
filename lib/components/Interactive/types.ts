import type { CSSProperties, ReactNode, RefObject } from 'react';

export type Interaction = {
  left: number;
  top: number;
};

export type InteractiveProps = {
  /** Child elements */
  children: ReactNode;
  /** Optional styles */
  style?: CSSProperties;
  /** Ref to the container element */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Callback when key is pressed */
  onKey: (offset: Interaction) => void;
  /** Callback when interaction moves */
  onMove: (interaction: Interaction) => void;
};
