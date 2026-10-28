import { createContext, useContext, useRef } from 'react';
import { classes } from 'tgui-modern/common/react';
import { computeBoxClassName, computeBoxProps } from 'tgui-modern/common/ui';
import { Scroller } from '../Scroller';
import { Tab } from './Tab';
import type { TabContextProps, TabsProps } from './types';

const TabsContext = createContext<TabContextProps | null>(null);

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Must be used inside <Tabs>');
  }
  return context;
}

export function Tabs(props: TabsProps) {
  const { className, vertical, fill, fluid, wrap, children, ...rest } = props;
  const selectedTab = useRef<HTMLDivElement>(null);

  return (
    <TabsContext.Provider value={{ selectedTab }}>
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
        <Scroller className="tabs-content" disabled={vertical || wrap} scrollTo={selectedTab}>
          {children}
        </Scroller>
      </div>
    </TabsContext.Provider>
  );
}

Tabs.Tab = Tab;
