import type { RefObject } from 'react';
import type { BoxProps } from '../Box/types';

export type TabContextProps = {
  /** The currently selected <Tab> element, used by <Scroller> to scroll to it. */
  selectedTab: RefObject<HTMLDivElement | null>;
};

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
