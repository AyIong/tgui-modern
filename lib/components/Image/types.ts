import type { BoxProps } from '../Box/types';

export type ImageProps = Partial<{
  /** Allows image to be blurred when scaled. Use on hi-res images */
  allowBlur: boolean;
  /**
   * False by default. Good if you're fetching images on UIs that do not auto
   * update. This will attempt to fix the 'x' icon 5 times.
   */
  fixErrors: boolean;
  /** Fill is default. */
  objectFit: 'contain' | 'cover';
  /**
   * The image source.
   *
   * Use transparent base64 pixel if there is no src so we don't get a broken
   * image icon when using assets.
   */
  src: string;
}> &
  BoxProps;

export type RetryState = {
  /** The src that failed */
  base: string;
  /** The url we last put on the element */
  written: string;
  /** How many retries this src has had */
  attempts: number;
};
