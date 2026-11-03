import type { ReactNode } from 'react';
import type { BoxProps } from '../Box/types';
import type { ButtonBaseProps } from '../Button/types';
import type { ImageButtonImagesProps } from './ImageSwitch/types';

export type ImageButtonProps = Omit<ButtonBaseProps, 'variant' | 'innerStyle' | 'fluid'> &
  ImageButtonCommonProps &
  ImageButtonImagesProps &
  BoxProps;

type ImageButtonCommonProps = Partial<{
  /**
   * Special container for buttons.
   * You can put any other component here.
   * Has some special stylings!
   * Example: `buttons={<Button>Send</Button>}`
   */
  buttons: ReactNode;
  /**
   * Same as buttons, but. Have disabled pointer-events on content inside if non-fluid.
   * Fluid version have humburger layout.
   * Can be used with buttons prop.
   */
  buttonsAlt: ReactNode;
  /** Parameter responsible for the size of the image, component and standard "stubs". */
  imageSize: number;
}> &
  ImageButtonContentProps;

export type ImageButtonContentProps = Partial<{
  /**
   * Changes the layout of the button, making it fill the entire horizontally available space.
   * Allows the use of `title`
   */
  fluid: boolean;
  children: ReactNode;
  /** Requires `fluid` for work. Adds divider under children and makes it bold. */
  description: ReactNode;
}>;
