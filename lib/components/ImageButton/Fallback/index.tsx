import { Icon } from '../../Icon';
import type { FallbackProps } from './types';

export function Fallback(props: FallbackProps) {
  const { icon, spin } = props;
  return <Icon className="imagebutton--fallback" name={icon} animation={spin && 'spin'} />;
}
