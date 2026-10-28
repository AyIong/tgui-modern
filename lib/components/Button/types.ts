import type { CssColors } from '@common/constants';
import type { CSSProperties, ReactNode } from 'react';
import type { BoxProps } from '../Box/types';
import type { IconNamesUnion, IconProps } from '../Icon/types';
import type { TooltipContentProps } from '../Tooltip/types';

export type ButtonInteractionProps = Partial<{
  /** Captures keyboard events */
  captureKeys: boolean;
  /** Called when element is clicked */
  onClick: (event: any) => void;
  /** Called when element is clicked but with RMB */
  onRightClick: (event: any) => void;
  /** Called when the button is missing focus */
  onBlur: (event: FocusEvent) => void;
}>;

export type ButtonBaseProps = Partial<{
  /** Chages component color palette */
  color: CssColors;
  /** Fill all available horizontal space */
  fluid: boolean;
  /** Disables button and makes it semi-transparent */
  disabled: boolean;
  /** Activates the button (gives it a green color) */
  selected: boolean;
  /** Changes button style */
  variant: 'filled' | 'transparent';
  /** A fancy, boxy tooltip, which appears when hovering over the button */
  tooltip: string | TooltipContentProps | false;
}> &
  ButtonInteractionProps &
  ButtonContentProps &
  BoxProps<HTMLDivElement>;

export type ButtonContentProps = Partial<{
  className: string;
  children: ReactNode;
  /** The styles to be passed to Button__content */
  innerStyle: CSSProperties;
}>;

export type ButtonIconProps = IconProps | IconNamesUnion;
export type ButtonProps = Partial<{
  /** Makes the button circular, with fixed ratio size 1:1 */
  circular: boolean;
  /** Adds an left side icon to the button */
  startIcon: ButtonIconProps;
  /** Adds an right side icon to the button */
  endIcon: ButtonIconProps;
}> &
  ButtonBaseProps;
