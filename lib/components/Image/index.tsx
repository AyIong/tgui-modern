import { computeBoxProps } from '@common/ui';
import { type SyntheticEvent, useEffect, useRef } from 'react';
import { attemptCooldown, maxAttempts, transparentImg, withAttempt } from './helpers';
import type { ImageProps, RetryState } from './types';

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

  const retry = useRef<RetryState>(null);
  const timer = useRef<NodeJS.Timeout>(null);

  const computedProps = computeBoxProps(rest);
  computedProps.style = {
    ...computedProps.style,
    imageRendering: allowBlur ? 'auto' : 'pixelated',
    objectFit: objectFit || 'fill',
  };

  /** Retries a failed src a second later, up to maxAttempts times, without ever writing over a newer src */
  function handleError(event: SyntheticEvent<HTMLImageElement>): void {
    const imgElement = event.currentTarget;
    const current = imgElement.getAttribute('src') || '';

    let state = retry.current;
    if (!state || (current !== state.base && current !== state.written)) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = null;
      state = { base: current, written: current, attempts: 0 };
      retry.current = state;
    }

    if (!fixErrors || state.attempts >= maxAttempts) {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = null;
      return;
    }

    if (timer.current) {
      return;
    }

    timer.current = setTimeout(() => {
      timer.current = null;
      if (imgElement.getAttribute('src') !== state.written) {
        return;
      }
      state.written = withAttempt(state.base, state.attempts);
      state.attempts++;
      imgElement.src = state.written;
    }, attemptCooldown);
  }

  /** Cleans up any stray timers */
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <img
      alt="dm icon"
      draggable="false"
      src={src || transparentImg}
      onError={handleError}
      {...computedProps}
    />
  );
}
