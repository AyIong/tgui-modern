import { classes } from 'tgui-modern/common/react';
import { computeBoxClassName, computeBoxProps } from 'tgui-modern/common/ui';
import { Tab } from './Tab';
import type { TabsProps } from './types';

export function Tabs(props: TabsProps) {
  const { className, vertical, fill, fluid, wrap, children, ...rest } = props;
  return (
    <div
      className={classes([
        'tabs',
        fill && 'fill',
        fluid && 'fluid',
        wrap && 'wrap',
        vertical && 'vertical',
        className,
        computeBoxClassName(rest),
      ])}
      {...computeBoxProps(rest)}
    >
      {children}
    </div>
  );
}

Tabs.Tab = Tab;
