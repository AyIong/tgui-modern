/**
 * MIT License
 * https://github.com/omgovich/react-colorful/
 */

import { classes } from '@common/react';
import type { PointerProps } from './types';

export function Pointer(props: PointerProps) {
  const { className, color, left, top = 0.5 } = props;

  return (
    <div
      className={classes(['react-colorful__pointer', className])}
      style={{
        top: `${top * 100}%`,
        left: `${left * 100}%`,
      }}
    >
      <div className="react-colorful__pointer-fill" style={{ backgroundColor: color }} />
    </div>
  );
}
