import { useRef } from 'react';
import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import { computeBoxProps } from 'tgui-modern/common/ui';
import { DraggableControl } from 'tgui-modern/hooks/useDraggable/DraggableControl';
import { useDraggable } from 'tgui-modern/hooks/useDraggable/index';
import { AnimatedNumber } from '../AnimatedNumber';
import type { NumberInputProps } from './types';

export function NumberInput(props: NumberInputProps) {
  const {
    // Draggable props (passthrough)
    value,
    minValue,
    maxValue,
    disabled,
    step,
    sensitivity,
    tickWhileDragging,
    onChange,
    // Own props
    className,
    color,
    unit,
    width,
    format,
    style,
    ...rest
  } = props;

  const draggableRef = useRef<HTMLDivElement>(null);
  const { percentage, displayValue, dragging, editing, setEditing } = useDraggable(draggableRef, {
    vertical: true,
    value,
    minValue,
    maxValue,
    disabled,
    step,
    sensitivity,
    tickWhileDragging,
    onChange,
  });
  const formattedValue = format ? format(displayValue) : displayValue;

  return (
    <DraggableControl
      editing={editing}
      setEditing={setEditing}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      onChange={onChange}
    >
      <div
        ref={draggableRef}
        className={classes('numberinput', disabled && 'disabled', className, colorClassName(color))}
        {...computeBoxProps({
          style: {
            '--width': `${width}ch`,
            '--percentage': percentage.internal,
            ...style,
          },
          ...rest,
        })}
      >
        <div className="numberinput-bar">
          <div className={classes('numberinput-bar--fill', dragging && 'dragging')} />
          <div className="numberinput-bar--placeholder" />
        </div>
        <span className="numberinput-value">
          {dragging ? formattedValue : <AnimatedNumber value={displayValue} format={format} />}
          {unit}
        </span>
      </div>
    </DraggableControl>
  );
}
