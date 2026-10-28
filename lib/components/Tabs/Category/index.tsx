import { useRef } from 'react';
import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import type { CategoryProps } from './types';

export function Category(props: CategoryProps) {
  const { children, name, className, color } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  function handleClick() {
    const content = contentRef.current;
    if (!content || content.querySelector('.tab.selected')) {
      return;
    }

    content.querySelector<HTMLDivElement>('.tab:not(.disabled)')?.click();
  }

  return (
    <div className={classes('tabs-category', className, colorClassName(color))}>
      <div className="tabs-category-title" onClick={handleClick}>
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
