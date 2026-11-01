import { computeBoxProps } from '@common/ui';
import { useEffect, useRef } from 'react';
import type { ImageProps } from './types';

const maxAttempts = 5;
const attemptCooldown = 1000;
const transparentImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/**
 * ## Image
 *
 * A wrapper for the `<img>` element.
 *
 * It can attempt to fix broken images by fetching them again with `fixErrors`.
 * It will also try to fix blurry images by rendering them pixelated.
 */
export function Image(props: ImageProps) {
  const { allowBlur, fixErrors, objectFit, src, ...rest } = props;

  const attempts = useRef(0);
  const timer = useRef<NodeJS.Timeout>(null);

  const computedProps = computeBoxProps(rest);
  computedProps.style = {
    ...computedProps.style,
    imageRendering: allowBlur ? 'auto' : 'pixelated',
    objectFit: objectFit || 'fill',
  };

  function clearTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }

  function handleError(event: React.SyntheticEvent<HTMLImageElement>): void {
    if (!fixErrors || attempts.current >= maxAttempts) {
      clearTimer();
      return;
    }

    const imgElement = event.currentTarget;
    timer.current = setTimeout(() => {
      imgElement.src = `${src}?attempt=${attempts.current}`;
      attempts.current++;
    }, attemptCooldown);
  }

  /** Cleans up any stray timers */
  useEffect(() => {
    return () => clearTimer();
  }, []);

  return <img alt="dm icon" draggable="false" src={src || transparentImg} onError={handleError} {...computedProps} />;
}
