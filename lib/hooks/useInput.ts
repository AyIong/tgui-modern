import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type RefObject,
  useEffect,
  useId,
  useState,
} from 'react';
import { isEscape, KEY } from 'tgui-modern/common/keys';
import { inputDebounce } from 'tgui-modern/common/timer';
import type { BaseInputProps } from 'tgui-modern/components/Input/types';
import type { BaseTextAreaProps } from 'tgui-modern/components/TextArea/types';

/**
 * Returns input handlers for text inputs.
 */
type WritableElement = HTMLInputElement | HTMLTextAreaElement;

type UseInputProps<TElement, TInput extends string | number> = Partial<{
  isNumeric?: boolean;
  onKeyDown?: React.KeyboardEventHandler<TElement>;
}> &
  BaseInputProps<TElement, TInput> &
  BaseTextAreaProps;

function getMarkupString(
  inputText: string,
  markupType: string,
  startPosition: number,
  endPosition: number,
): string {
  return `${inputText.substring(0, startPosition)}${markupType}${inputText.substring(startPosition, endPosition)}${markupType}${inputText.substring(endPosition)}`;
}

function toStoredValue<TInput>(raw: string, isNumeric?: boolean): TInput {
  return (isNumeric ? Number(raw) : raw) as TInput;
}

export function useInput<TElement extends WritableElement, TInput extends string | number>(
  ref: RefObject<TElement | null>,
  props: UseInputProps<TElement, TInput>,
) {
  const {
    isNumeric,
    alwaysUpdate,
    disabled,
    expensive,
    selfClear,
    userMarkup,
    dontUseTabForIndent,
    value,
    onChange,
    onKeyDown,
    onBlur,
    onEnter,
    onEscape,
  } = props;

  const emptyValue = (isNumeric ? 0 : '') as TInput;
  const [innerValue, setInnerValue] = useState<TInput>(value || emptyValue);
  const id = useId();

  /** Updates the initial value on props change */
  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const valueChanged = value !== innerValue;
    const inputBlured = document.activeElement !== ref.current;

    if ((inputBlured && valueChanged) || alwaysUpdate) {
      setInnerValue(value || emptyValue);
    }
  }, [value, alwaysUpdate]);

  function tryOnChange(value: TInput, event?: ChangeEvent<TElement>) {
    if (!onChange || disabled) {
      return;
    }

    if (expensive) {
      const debounceTime = typeof expensive === 'number' ? expensive : 250;
      inputDebounce(id, debounceTime)(() => onChange?.(value, event));
    } else {
      onChange?.(value, event);
    }
  }

  function handleBlur(_event: FocusEvent<TElement>) {
    onBlur?.(innerValue as TInput);
  }

  /**
   * Called each time when you typing something.
   * If expensive prop is present or have number,
   * will be called only when you stop typing.
   */
  function handleChange(event: ChangeEvent<TElement>): void {
    const finalValue = toStoredValue<TInput>(event.currentTarget.value, isNumeric);

    setInnerValue(finalValue);
    tryOnChange(finalValue, event);
  }

  function handleEnter(event: KeyboardEvent<TElement>, finalValue: TInput) {
    event.preventDefault();
    onEnter?.(finalValue, event);
    if (selfClear) {
      setInnerValue(emptyValue);
    }
    event.currentTarget.blur();
  }

  function handleEscape(event: KeyboardEvent<TElement>, finalValue: TInput) {
    event.preventDefault();
    onEscape?.(finalValue, event);
    event.currentTarget.blur();
  }

  function handleTab(event: KeyboardEvent<TElement>) {
    event.preventDefault();
    let { value, selectionStart, selectionEnd } = event.currentTarget;
    const start = selectionStart || 0;
    const end = selectionEnd || start;

    const newValue = `${value.substring(0, start)}\t${value.substring(end)}`;
    setInnerValue(newValue as TInput);
    selectionEnd = start + 1;

    // Save our tabulation on backend
    onChange?.(newValue as TInput, event as any);
  }

  function handleMinus(event: KeyboardEvent<TElement>) {
    event.preventDefault();
    const newValue = (Number(innerValue) * -1) as TInput;
    setInnerValue(newValue);
    tryOnChange(newValue, event as any);
  }

  function handleUserMarkup(event: KeyboardEvent<TElement>, userMarkup: string) {
    event.preventDefault();

    let { value, selectionStart, selectionEnd } = event.currentTarget;
    const start = selectionStart || 0;
    const end = selectionEnd || start;

    const newValue = getMarkupString(value, userMarkup, start, end);
    setInnerValue(newValue as TInput);
    selectionEnd = end + userMarkup.length * 2;

    // Save markup on backend
    onChange?.(newValue as TInput, event as any);
  }

  function handleKeyDown(event: React.KeyboardEvent<TElement>): void {
    if (disabled) {
      return;
    }

    onKeyDown?.(event);
    const finalValue = toStoredValue<TInput>(event.currentTarget.value, isNumeric);

    // Enter
    // Prevent calling it on Shift + Enter (save new line behaviour)
    if (event.key === KEY.Enter && !event.shiftKey) {
      handleEnter(event, finalValue);
      return;
    }

    // Escape
    if (isEscape(event.key)) {
      handleEscape(event, finalValue);
      return;
    }

    // Tab
    if (!dontUseTabForIndent && event.key === KEY.Tab) {
      handleTab(event);
      return;
    }

    // Minus
    if (isNumeric && event.key === KEY.Minus) {
      handleMinus(event);
      return;
    }

    // User markup
    const modKey = event.ctrlKey || event.metaKey;
    if (userMarkup && modKey && userMarkup[event.key]) {
      handleUserMarkup(event, userMarkup[event.key]);
      return;
    }
  }

  return {
    innerValue: innerValue,
    onBlur: handleBlur,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  };
}
