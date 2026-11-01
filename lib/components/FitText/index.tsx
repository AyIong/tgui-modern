import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getCssVariableValue } from 'tgui-modern/common/css';
import { classes } from 'tgui-modern/common/react';
import { unit } from 'tgui-modern/common/ui';
import type { FitTextProps } from './types';

export function FitText(props: FitTextProps) {
  const { children, ellipsis, maxFontSize, minFontSize, className } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [scale, setScale] = useState<number>(1);

  function getScale() {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) {
      return;
    }

    text.style.whiteSpace = 'nowrap';
    text.style.fontSize = unit(maxFontSize || getCssVariableValue('font-size')) as string; // font size variable always available
    const containerWidth = container.getBoundingClientRect().width;
    const textWidth = text.getBoundingClientRect().width;
    text.style.whiteSpace = '';
    text.style.fontSize = '';

    setScale(containerWidth / textWidth);
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(() => getScale());
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    getScale();
  }, [children, minFontSize, maxFontSize]);

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
      <span ref={textRef}>
        {children}
      </span>
    </div>
  );
}
