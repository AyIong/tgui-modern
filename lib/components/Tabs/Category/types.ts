import type { ReactNode } from 'react';
import type { CssColors } from 'tgui-modern/common/constants';

export type TabsCategoryProps = {
  /** Category title. */
  name: string;
  /** Tabs.Tab elements. */
  children: ReactNode;
} & Partial<{
  /** Category accent color. */
  color: CssColors;
  /** Category element class name. */
  className: string;
}>;
