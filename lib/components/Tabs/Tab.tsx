import { useRef } from 'react';
import { colorClassName } from 'tgui-modern/common/color';
import { canRender, classes } from 'tgui-modern/common/react';
import { computeBoxClassName, computeBoxProps } from 'tgui-modern/common/ui';
import { Icon } from '../Icon';
import { useTabs } from '.';
import type { TabProps } from './types';

export function Tab(props: TabProps) {
  const { className, selected, color, icon, leftSlot, rightSlot, children, onClick, ...rest } =
    props;
  const tabs = useTabs();
  const tabRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={tabRef}
      className={classes([
        'tab',
        className,
        selected && 'selected',
        colorClassName(color),
        computeBoxClassName(rest),
      ])}
      onClick={(event) => {
        tabs.selectedTab.current = tabRef.current;
        onClick?.(event);
      }}
      {...computeBoxProps(rest)}
    >
      <div className="tab-indicator" />
      {canRender(leftSlot) ? (
        <div className="tab-slot--left">{leftSlot}</div>
      ) : (
        icon && (
          <div className="tab-slot--left">
            <Icon {...icon} />
          </div>
        )
      )}
      <div className="tab-text">{children}</div>
      {canRender(rightSlot) && <div className="tab-slot--right">{rightSlot}</div>}
    </div>
  );
}
