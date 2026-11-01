import { CSS_COLORS } from '@common/constants';
import { clamp01, keyOfMatchingRange, scale } from '@common/math';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import { AnimatedNumber } from '../AnimatedNumber';
import type { ProgressBarProps } from './types';

/**
 * ## ProgressBar
 *
 * Progress indicators inform users about the status of ongoing processes.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-progressbar--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-modern/?path=/docs/components-box--docs)
 */
export function ProgressBar(props: ProgressBarProps) {
  const {
    className,
    value,
    minValue,
    maxValue,
    color,
    ranges,
    empty,
    children,
    fractionDigits,
    vertical,
    compact,
    ...rest
  } = props;
  const scaledValue = scale(value, minValue || 0, maxValue || 1);
  const effectiveColor = color || (ranges && keyOfMatchingRange(value, ranges)) || 'primary';

  // We permit colors to be in hex format, rgb()/rgba() format,
  // a name for a color-<name> class, or a base CSS class.
  const outerProps = computeBoxProps(rest);
  const outerClasses = [
    'progressbar',
    vertical && 'vertical',
    compact && 'compact',
    className,
    computeBoxClassName(rest),
  ];
  const fillStyles = {
    '--percentage': `${clamp01(scaledValue) * 100}%`,
  };

  if (CSS_COLORS.includes(effectiveColor as any) || effectiveColor === 'primary') {
    // If the color is a color-<name> class, just use that.
    outerClasses.push(colorClassName(effectiveColor));
  } else {
    // Otherwise, pass our color into variable
    outerProps.style = { ...outerProps.style, '--bg-color': effectiveColor };
  }

  return (
    <div className={classes(outerClasses)} {...outerProps}>
      <div className="progressbar-fill" style={fillStyles} />
      {!compact && (children || !empty) && (
        <div className="progressbar-content">
          {children || (
            <>
              <AnimatedNumber value={Number((scaledValue * 100).toFixed(fractionDigits || 0))} />%
            </>
          )}
        </div>
      )}
    </div>
  );
}
