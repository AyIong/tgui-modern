import { useRef } from 'react';
import { colorClassName } from 'tgui-modern/common/color';
import { canRender, classes } from 'tgui-modern/common/react';
import { computeBoxClassName, computeBoxProps } from 'tgui-modern/common/ui';
import { useButton } from 'tgui-modern/hooks/useButton';
import { Icon } from '../../Icon';
import { useTabs } from '..';
import type { TabProps } from './types';

export function Tab(props: TabProps) {
  const {
    children,
    className,
    selected,
    disabled,
    color,
    icon,
    leftSlot,
    rightSlot,
    onClick,
    ...rest
  } = props;
  const tabs = useTabs();
  const tabRef = useRef<HTMLDivElement>(null);
  const interactions = useButton({
    disabled,
    onClick: (event) => {
      console.log('Selected Tab');
      tabs.selectedTab.current = tabRef.current;
      onClick?.(event);
    },
  });

  return (
    <div
      ref={tabRef}
      className={classes([
        'tab',
        className,
        selected && 'selected',
        disabled && 'disabled',
        colorClassName(color),
        computeBoxClassName(rest),
      ])}
      {...interactions}
      {...computeBoxProps(rest)}
    >
      <div className="tab-indicator" />
      <div className="tab-content">
        {canRender(leftSlot) ? (
          <div className="tab-content--slot">{leftSlot}</div>
        ) : (
          icon && (
            <div className="tab-content--slot">
              <Icon {...icon} />
            </div>
          )
        )}
        <div className="tab-content--text">{children}</div>
        {canRender(rightSlot) && <div className="tab-content--slot">{rightSlot}</div>}
      </div>
    </div>
  );
}
