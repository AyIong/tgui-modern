import { classes } from 'tgui-modern/common/react';
import { useButton } from 'tgui-modern/hooks/useButton';
import { Icon } from '../Icon';
import { useMenuBar } from '.';
import type { MenuItemProps } from './types';

export function MenuItem(props: MenuItemProps) {
  const { checked, disabled, onClick } = props;

  const menuBar = useMenuBar();
  const interactions = useButton({
    disabled,
    onClick: (value) => {
      onClick?.(value);
      menuBar.setOpenId(null);
    },
  });

  return (
    <div
      className={classes('menubar-item', disabled && 'disabled', checked && 'checked')}
      {...interactions}
    >
      <Icon className="menubar-item-checkbox" name="check" />
      {props.children}
    </div>
  );
}
