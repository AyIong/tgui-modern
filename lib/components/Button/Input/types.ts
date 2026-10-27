import type { ReactNode } from 'react';
import type { ButtonProps } from '../types';

export type ButtonInputProps = Partial<{
  /** Text to display on the button exclusively. If left blank, displays the value */
  children: ReactNode;
  /** The value of the input */
  value: string;
  /** Max length of the input */
  maxLength: number;
  /** Action on outside click or enter key */
  onCommit: (value: string) => void;
}> &
  Omit<ButtonProps, 'selected' | 'circular' | 'onClick'>;
