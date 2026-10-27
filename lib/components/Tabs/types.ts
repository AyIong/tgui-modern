import type { ReactNode } from 'react';
import type { BoxProps } from '../Box/types';
import type { IconProps } from '../Icon/types';

export type TabsProps = Partial<{
  /**
   * Similarly to `fill` on
   * [Section](https://github.com/tgstation/tgui-core/tree/main/lib/components/Section.tsx),
   * tabs will fill all available vertical space. Only makes sense in a vertical
   * configuration.
   */
  fill: boolean;
  /** If true, tabs will take all available horizontal space. */
  fluid: boolean;
  /** If true, tabs can occupy more than one line. */
  wrap: boolean;
  /** Use a vertical configuration, where tabs will be stacked vertically. */
  vertical: boolean;
}> &
  BoxProps;

export type TabProps = Partial<{
  /** Any FontAwesome icon */
  icon: IconProps;
  /** Left slot content */
  leftSlot: ReactNode;
  /** Right slot content */
  rightSlot: ReactNode;
  /** Whether the tab is selected */
  selected: boolean;
  /** Called when element is clicked */
  onClick: (e?) => void;
}> &
  BoxProps;
