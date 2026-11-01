import type { IconNamesUnion } from 'tgui-modern/components/Icon/types';

export type FallbackProps = {
  icon: IconNamesUnion;
} & Partial<{
  spin: true;
}>;
