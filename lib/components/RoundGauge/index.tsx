import { clamp01, keyOfMatchingRange, scale } from '@common/math';
import { computeBoxClassName, computeBoxProps } from '@common/ui';
import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { Icon } from '../Icon';
import type { RoundGaugeProps } from './types';

/**
 * ## RoundGauge
 *
 * The RoundGauge component provides a visual representation of a single metric, as well as being capable of showing
 * informational or cautionary boundaries related to that metric.
 *
 * Example:
 *
 * ```tsx
 * <RoundGauge
 *  size={1.75}
 *  value={tankPressure}
 *  minValue={0}
 *  maxValue={pressureLimit}
 *  alertAfter={pressureLimit * 0.7}
 *  ranges={{
 *     good: [0, pressureLimit * 0.7],
 *     average: [pressureLimit * 0.7, pressureLimit * 0.85],
 *     bad: [pressureLimit * 0.85, pressureLimit],
 *   }}
 *   format={formatPressure}
 * />
 * ```
 *
 * The alert on the gauge is optional, and will only be shown if the `alertAfter` prop is defined. When defined, the alert
 * will begin to flash the respective color upon which the needle currently rests, as defined in the `ranges` prop.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-roundgauge--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-modern/?path=/docs/components-box--docs)
 */
export function RoundGauge(props: RoundGaugeProps) {
  const {
    alertAfter,
    alertBefore,
    className,
    format,
    value,
    minValue,
    maxValue,
    size,
    ranges,
    style,
    ...rest
  } = props;

  const minV = minValue || 1;
  const maxV = maxValue || 1;
  const clampedValue = clamp01(scale(value, minV, maxV));
  const scaledRanges = ranges ? {} : { primary: [0, 1] };

  if (ranges) {
    for (const key in ranges) {
      const range = ranges[key];
      scaledRanges[key] = [scale(range[0], minV, maxV), scale(range[1], minV, maxV)];
    }
  }

  function shouldShowAlert(): boolean {
    // If both after and before alert props are set, and value is between them
    if (alertAfter && alertBefore && value > alertAfter && value < alertBefore) {
      return true;
    }
    // If only alertAfter is set and value is greater than alertAfter
    if (alertAfter && value > alertAfter) {
      return true;
    }
    // If only alertBefore is set and value is less than alertBefore
    if (alertBefore && value < alertBefore) {
      return true;
    }
    // If none of the above conditions are met
    return false;
  }

  const alertActive = shouldShowAlert();
  const alertColor = keyOfMatchingRange(clampedValue, scaledRanges);
  const rings = Object.keys(scaledRanges).map((color) => {
    const col_ranges = scaledRanges[color];
    return (
      <circle
        key={color}
        className={colorClassName(color)}
        style={{
          '--range': col_ranges[1] - col_ranges[0],
          '--rotation': `${180 + 180 * col_ranges[0]}deg`,
        }}
      />
    );
  });

  return (
    <div className="roundgauge-wrapper">
      <div
        className={classes('roundgauge', className, computeBoxClassName(rest))}
        {...computeBoxProps({
          style: {
            '--size': size,
            '--fill-percentage': `${clampedValue * 50}%`,
            '--needle-rotation': `${clampedValue * 180 - 90}deg`,
            ...style,
          },
          ...rest,
        })}
      >
        <svg className="roundgauge-rings" viewBox="0 0 100 50">
          {(alertAfter || alertBefore) && (
            <Icon
              className={classes(
                'roundgauge-icon',
                alertActive && 'alert',
                colorClassName(alertColor),
              )}
              name="triangle-exclamation"
            />
          )}
          <g>{rings}</g>
          <g className="roundgauge-rings--fill">{rings}</g>
        </svg>
        {/**
         * The needle is in a separate SVG because `overflow: visible`
         * on the first one stops clipping circles.
         */}
        <svg className="roundgauge-needle--wrapper" viewBox="0 0 100 50">
          <g className="roundgauge-needle">
            <polygon
              className={classes('roundgauge-needle--line', alertActive && 'alert')}
              points="47,50 50,15 53,50"
            />
            <circle className="roundgauge-needle--circle" cx="50" cy="50" r="8" />
          </g>
        </svg>
      </div>
      <AnimatedNumber format={format} value={value} />
    </div>
  );
}
