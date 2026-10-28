import type { ReactNode } from 'react';
import type { BoxProps } from 'tgui-modern/components/Box/types';
import type { IconProps } from 'tgui-modern/components/Icon/types';

export type TabProps = Partial<{
  /** Any FontAwesome icon. */
  icon: IconProps;
  /** Left slot content. */
  leftSlot: ReactNode;
  /** Right slot content. */
  rightSlot: ReactNode;
  /** Whether the tab is selected. */
  selected: boolean;
  /** Whether the tab is disabled. */
  disabled: boolean;
  /** Called when element is clicked. */
  onClick: (event?) => void;
}> &
  BoxProps;
