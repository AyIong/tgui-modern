import type { ReactNode } from 'react';

export type FitTextProps = {
  /** Text that will be fitted */
  children: ReactNode;
} & Partial<{
  /**
   * Removes line breaks and truncates text when it overflows,
   * leaving an ellipsis at the end
   */
  ellipsis: boolean;
  /**
   * The smallest permissible font size that can be achieved
   * Default is 8px;
   */
  minFontSize: number | string;
  /**
   * The maximum permissible font size that can be achieved.
   * By default, used font-size variable
   */
  maxFontSize: number | string;
  className: string;
}>;
