import { useLayoutEffect, useRef, useState } from 'react';
import { getCssVariableValue } from 'tgui-modern/common/css';
import { classes } from 'tgui-modern/common/react';
import { unit } from 'tgui-modern/common/ui';
import type { FitTextProps } from './types';

export function FitText(props: FitTextProps) {
  const { children, ellipsis, maxFontSize, minFontSize } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) {
      return;
    }

    function getScale() {
      if (!container || !text) {
        return;
      }

      const containerWidth = container.clientWidth;
      text.style.whiteSpace = 'nowrap';
      text.style.fontSize = unit(maxFontSize || getCssVariableValue('font-size')) as string;

      const textWidth = text.scrollWidth;
      text.style.whiteSpace = '';
      text.style.fontSize = '';

      const nextScale = textWidth > 0 ? containerWidth / textWidth : 1;
      setScale((prev) => (Math.abs(prev - nextScale) > 0.001 ? nextScale : prev));
    }

    getScale();

    const observer = new ResizeObserver(getScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, [children, minFontSize, maxFontSize, ellipsis]);

  return (
    <div
      ref={containerRef}
      className={classes('fittext', ellipsis && 'ellipsis')}
      style={{
        '--font-size-min': unit(minFontSize || '8px'),
        '--font-size-max': unit(maxFontSize),
        '--scale': scale,
      }}
    >
      <span ref={textRef}>{children}</span>
    </div>
  );
}
