import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import { computeBoxClassName, computeBoxProps } from 'tgui-modern/common/ui';
import { useButton } from 'tgui-modern/hooks/useButton';
import type { BoxProps } from '../Box/types';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon/types';
import { Tooltip } from '../Tooltip';
import { Checkbox } from './Checkbox';
import { Confirm } from './Confirm';
import { ButtonFile } from './File';
import { ButtonInput } from './Input';
import type { ButtonBaseProps, ButtonContentProps, ButtonIconProps, ButtonProps } from './types';

/**
 * ## Button
 *
 * Buttons allow users to take actions, and make choices, with a single click.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-button--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-modern/?path=/docs/components-box--docs)
 */
export function Button(props: ButtonProps) {
  const {
    children,
    circular,
    startIcon,
    endIcon,
    disabled,
    className,
    innerStyle,
    captureKeys,
    onClick,
    onRightClick,
    ...rest
  } = props;
  const interactions = useButton({
    captureKeys,
    disabled,
    onClick,
    onRightClick,
  });

  return (
    <ButtonContainer
      className={classes(circular && 'circular', className)}
      {...rest}
      {...interactions}
    >
      {startIcon && renderIcon(startIcon)}
      {children && <ButtonContent innerStyle={innerStyle}>{children}</ButtonContent>}
      {endIcon && renderIcon(endIcon)}
    </ButtonContainer>
  );
}

export function ButtonContainer(props: ButtonBaseProps) {
  const { children, fluid, color, variant, className, disabled, selected, tooltip, ...rest } =
    props;

  let finalButtonContainer = (
    <div
      tabIndex={-1}
      className={classes(
        className,
        'button',
        variant || 'filled',
        fluid && 'fluid',
        disabled && 'disabled',
        colorClassName(selected ? 'good' : color),
        computeBoxClassName(rest),
      )}
      {...computeBoxProps(rest)}
    >
      {children}
    </div>
  );

  if (tooltip) {
    if (typeof tooltip === 'string') {
      finalButtonContainer = <Tooltip content={tooltip}>{finalButtonContainer}</Tooltip>;
    } else {
      finalButtonContainer = <Tooltip {...tooltip}>{finalButtonContainer}</Tooltip>;
    }
  }

  return finalButtonContainer;
}

export function ButtonIcon(props: ButtonIconProps & BoxProps) {
  const iconProps = typeof props === 'string' ? { name: props } : props;
  return <Icon className={classes(props.className, 'button-icon')} {...(iconProps as IconProps)} />;
}

export function renderIcon(icon: ButtonIconProps) {
  return <ButtonIcon {...((typeof icon === 'string' ? { name: icon } : icon) as IconProps)} />;
}

export function ButtonContent(props: ButtonContentProps) {
  const { children, innerStyle, className } = props;
  return (
    <div className={classes(className, 'button-content')} style={innerStyle}>
      {children}
    </div>
  );
}

Button.Checkbox = Checkbox;
Button.Confirm = Confirm;
Button.Input = ButtonInput;
Button.File = ButtonFile;
