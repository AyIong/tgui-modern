import { unit } from '@common/ui';
import { useRef, useState } from 'react';
import { classes } from 'tgui-modern/common/react';
import { useButton } from 'tgui-modern/hooks/useButton';
import { Button, ButtonContainer, ButtonContent, ButtonIcon } from '../Button';
import { Floating } from '../Floating';
import { Icon } from '../Icon';
import { DropdownMenu } from './DropdownMenu';
import { DIRECTION, getOptionIndex, getOptionValue } from './helpers';
import type { DropdownMenuHandle, DropdownProps } from './types';

/**
 * ## Dropdown
 *
 * A simple dropdown box component. Lets the user select from a list of options
 * and displays selected entry.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-dropdown--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-modern/?path=/docs/components-box--docs)
 */
export function Dropdown(props: DropdownProps) {
  const {
    color,
    buttons,
    placeholder,
    className,
    displayText,
    icon,
    iconOnly,
    maxItems,
    options,
    width,
    menuWidth,
    selected,
    disabled,
    onClick,
    onSelected,
  } = props;

  const [isOpen, setOpen] = useState(false);
  const dropdownMenuRef = useRef<DropdownMenuHandle>(null);
  const interactions = useButton({
    captureKeys: true,
    disabled: disabled && !isOpen,
    onClick: (value) => {
      onClick?.(value);
      setOpen(!isOpen);
    },
  });

  const selectedIndex = getOptionIndex(options, selected);
  const displayedText =
    displayText || (selected && getOptionValue(selected)) || placeholder || 'Select...';

  /** Update the selected value when clicking the left/right buttons */
  function updateSelected(direction: DIRECTION): void {
    if (options.length < 1 || disabled) {
      return;
    }

    let newIndex: number;
    const startIndex = 0;
    const endIndex = options.length - 1;

    if (selectedIndex < 0) {
      newIndex = direction === 'next' ? endIndex : startIndex; // No selection yet
    } else if (direction === 'next') {
      newIndex = selectedIndex === endIndex ? startIndex : selectedIndex + 1; // Move to next option
    } else {
      newIndex = selectedIndex === startIndex ? endIndex : selectedIndex - 1; // Move to previous option
    }

    if (isOpen) {
      dropdownMenuRef.current?.scrollToIndex(newIndex);
    }

    onSelected?.(getOptionValue(options[newIndex]));
  }

  return (
    <div
      style={{ width: unit(width) }}
      className={classes('dropdown', isOpen && 'dropdown-open', iconOnly && 'icon-only', className)}
    >
      <Floating
        handleOpen={isOpen}
        disabled={disabled}
        contentAutoWidth={!menuWidth}
        placement={iconOnly && 'bottom-start'}
        contentClasses="dropdown-menu-wrapper"
        contentStyles={!!menuWidth && { width: unit(menuWidth) }}
        content={
          <DropdownMenu
            ref={dropdownMenuRef}
            color={color}
            maxItems={maxItems}
            options={options}
            selected={selected}
            onSelected={(value) => {
              onSelected?.(value);
              setOpen(false);
            }}
          />
        }
      >
        <ButtonContainer color={color} className="dropdown-handler" {...interactions}>
          {icon && <ButtonIcon className="dropdown-icon" {...icon} />}
          <ButtonContent className="dropdown-text">{displayedText}</ButtonContent>
          <div className="dropdown-chevrons">
            <Icon className="dropdown-chevron up" name="chevron-up" />
            <Icon className="dropdown-chevron down" name="chevron-down" />
          </div>
        </ButtonContainer>
      </Floating>
      {buttons && (
        <>
          <Button
            disabled={disabled}
            startIcon="chevron-left"
            onClick={() => {
              updateSelected(DIRECTION.Previous);
            }}
          />
          <Button
            disabled={disabled}
            startIcon="chevron-right"
            onClick={() => {
              updateSelected(DIRECTION.Next);
            }}
          />
        </>
      )}
    </div>
  );
}
