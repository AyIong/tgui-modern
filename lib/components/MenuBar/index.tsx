import { FloatingTree } from '@floating-ui/react';
import { createContext, useContext, useMemo, useState } from 'react';
import { MenuDropdown } from './MenuDropdown';
import { MenuItem } from './MenuItem';
import type { MenuBarContextProps, MenuBarProps } from './types';

const MenuBarContext = createContext<MenuBarContextProps | null>(null);

export function useMenuBar() {
  const context = useContext(MenuBarContext);
  if (!context) {
    throw new Error('Subcomponent must be used inside <MenuBar>');
  }
  return context;
}

export function MenuBar(props: MenuBarProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const value = useMemo(() => ({ openId, setOpenId }), [openId]);

  return (
    <FloatingTree>
      <MenuBarContext.Provider value={value}>
        <nav className="menubar">{props.children}</nav>
      </MenuBarContext.Provider>
    </FloatingTree>
  );
}

MenuBar.Item = MenuItem;

MenuBar.Dropdown = MenuDropdown;
