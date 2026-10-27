import type { ButtonProps } from '../types';

export type ButtonFileProps = {
  accept: string;
  multiple?: boolean;
  onSelectFiles: (files: string | string[]) => void;
} & ButtonProps;
