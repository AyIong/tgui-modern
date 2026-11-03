import { KEY } from 'tgui-modern/common/keys';
import type { ButtonInteractionProps } from 'tgui-modern/components/Button/types';

/**
 * Returns input handlers for
 * clickable elements, such as buttons.
 */
type useButtonProps = Partial<{
  /** Prevents events */
  disabled: boolean;
}> &
  ButtonInteractionProps;

export function useButton(props: useButtonProps) {
  const { disabled, captureKeys, onClick, onRightClick } = props;

  function handleClick(event) {
    if (!disabled) {
      onClick?.(event);
    }
  }

  function handleRightClick(event) {
    if (!disabled && onRightClick) {
      event.preventDefault();
      onRightClick(event);
    }
  }

  function handleKeyDown(event) {
    if (!captureKeys) {
      return;
    }

    // Simulate a click when pressing space or enter.
    if (event.key === KEY.Space || event.key === KEY.Enter) {
      event.preventDefault();

      if (!disabled) {
        onClick?.(event);
      }
    }
  }

  return {
    onClick: handleClick,
    onContextMenu: handleRightClick,
    onKeyDown: handleKeyDown,
  };
}
