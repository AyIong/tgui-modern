import { useRef } from 'react';
import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import type { TabsCategoryProps } from './types';

export function TabsCategory(props: TabsCategoryProps) {
  const { children, name, className, color } = props;

  let hasAvailableTab: boolean = false;
  const contentRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    const content = contentRef.current;
    if (!content || content.querySelector('.tab.selected')) {
      return;
    }

    const availableTab = content.querySelector<HTMLDivElement>('.tab:not(.disabled)');
    if (availableTab) {
      hasAvailableTab = true;
      availableTab?.click();
    }
  }

  return (
    <div className={classes('tabs-category', className, colorClassName(color))}>
      <div className="tabs-category-title" onClick={!hasAvailableTab && handleClick}>
        <div className="tabs-category-title--text">{name}</div>
      </div>
      <div className="tabs-category-divider" />
      <div className="tabs-category-content">
        <div ref={contentRef} className="tabs-category-content--inner">
          {children}
        </div>
      </div>
    </div>
  );
}
