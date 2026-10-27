import { useRef, useState } from 'react';
import { classes } from 'tgui-modern/common/react';
import { useInput } from 'tgui-modern/hooks/useInput';
import { ButtonContainer, ButtonContent, renderIcon } from '..';
import type { ButtonInputProps } from './types';

export function ButtonInput(props: ButtonInputProps) {
  const { children, disabled, value, maxLength, startIcon, endIcon, onCommit, ...rest } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { innerValue, ...interactions } = useInput<HTMLInputElement, string>(inputRef, {
    dontUseTabForIndent: true,
    disabled,
    value,
    onBlur: handleBlur,
    onEscape: handleBlur,
    onEnter: onCommit,
  });

  const [isActive, setActive] = useState<boolean>(false);
  function handleBlur() {
    if (isActive) {
      setActive(false);
    }
  }

  return (
    <ButtonContainer
      className={classes('button-input', disabled && 'disabled', isActive && 'active')}
      onClick={() => !disabled && setActive(true)}
      {...rest}
    >
      {isActive && (
        <input
          ref={inputRef}
          autoFocus
          className="button-input--input"
          autoComplete="off"
          spellCheck="false"
          value={innerValue}
          disabled={!!disabled}
          maxLength={maxLength}
          type="text"
          {...interactions}
        />
      )}
      {startIcon && renderIcon(startIcon)}
      <ButtonContent className="button-input-content">{children || innerValue}</ButtonContent>
      {endIcon && renderIcon(endIcon)}
    </ButtonContainer>
  );
}
