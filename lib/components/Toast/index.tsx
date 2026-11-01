import { useEffect, useRef, useState } from 'react';
import { toast as hotToast, resolveValue, type Toast, useToaster } from 'react-hot-toast/headless';
import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { ToastProps } from './types';

// How long toast will be visible in milliseconds
const defaultDuration = 5000;
// Maximum visible toasts
const toastsLimit = 3;
// How long pause will continue after mouse leaves toasts in ms.
const mouseLeaveCooldown = 300;

export function Toaster() {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  const toastsLength = toasts.length;
  const mouseLeaveTimeout = useRef<NodeJS.Timeout>(null);
  const [paused, setPaused] = useState<boolean>(false);

  function clearTimer() {
    if (mouseLeaveTimeout.current) {
      clearTimeout(mouseLeaveTimeout.current);
      mouseLeaveTimeout.current = null;
    }
  }

  function handleMouseEnter() {
    clearTimer();
    if (!paused) {
      startPause();
      setPaused(true);
    }
  }

  function handleMouseLeave() {
    clearTimer();
    mouseLeaveTimeout.current = setTimeout(() => {
      endPause();
      setPaused(false);
    }, mouseLeaveCooldown);
  }

  // Remove pause if user closed every toast manually
  useEffect(() => {
    if (toastsLength === 1 && paused) {
      endPause();
      setPaused(false);
      clearTimer();
    }
  }, [toastsLength]);

  return (
    <div
      className={classes('toaster', paused && 'paused', toastsLength === 0 && 'empty')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {toasts.map((toastElement, toastIndex) => {
        const isOffLimit = toastIndex >= toastsLimit;
        return (
          <div
            key={toastElement.id}
            className={classes(
              'toast',
              !toastElement.visible && 'hidden',
              isOffLimit && 'off-limit',
            )}
            style={{
              '--index': toastIndex,
              '--duration': `${toastElement.duration || defaultDuration}ms`,
            }}
          >
            {resolveValue(toastElement.message, toastElement)}
          </div>
        );
      })}
    </div>
  );
}

export function toast(props: ToastProps) {
  const { className, title, content, buttons, icon, color, duration } = props;
  const ourToast = (toastInstance: Toast) => (
    <div className={classes('toast-inner', className, colorClassName(color))}>
      <div className={classes('toast-content--wrapper', icon && 'has-icon')}>
        {icon && (
          <div className="toast-icon">
            <Icon color={icon.color || color || 'primary'} {...icon} />
          </div>
        )}
        <div className="toast-content">
          <div className="toast-content--title">
            <div className="title">{title}</div>
            <Button
              color={color || 'primary'}
              variant="transparent"
              startIcon="times"
              onClick={() => {
                hotToast.dismiss(toastInstance.id);
              }}
            />
          </div>
          <div className="toast-content--description">{content}</div>
        </div>
      </div>
      {buttons && <div className="toast-buttons">{buttons}</div>}
      <div className="toast-progress" />
    </div>
  );

  return hotToast.custom(ourToast, {
    duration: duration || defaultDuration,
    removeDelay: 200,
  });
}
