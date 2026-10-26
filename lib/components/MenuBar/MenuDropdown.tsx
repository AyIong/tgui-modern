import {
  FloatingNode,
  FloatingPortal,
  flip,
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { useId, useState } from 'react';
import { uiRootId } from 'tgui-modern/common/constants';
import { classes } from 'tgui-modern/common/react';
import { unit } from 'tgui-modern/common/ui';
import { Icon } from '../Icon';
import { useMenuBar } from '.';
import type { MenuDropdownProps } from './types';

export function MenuDropdown(props: MenuDropdownProps) {
  const { display, openWidth, disabled } = props;

  const menuBar = useMenuBar();
  const dropdownId = useId();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const isNested = parentId != null;

  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = isNested ? localOpen : menuBar.openId === dropdownId;
  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    placement: isNested ? 'right-start' : 'bottom-start',
    middleware: [flip({ padding: 6, fallbackAxisSideDirection: 'end' })],
    open: isOpen,
    onOpenChange(open, _, reason) {
      if (isNested) {
        setLocalOpen(open);
        return;
      }

      if (open) {
        menuBar.setOpenId(dropdownId);
      } else if (reason !== 'hover') {
        menuBar.setOpenId((value) => (value === dropdownId ? null : value));
      }
    },
  });

  const click = useClick(context, {
    enabled: !disabled && !isNested,
    toggle: false,
  });
  const hover = useHover(context, {
    enabled: !disabled && (isNested || menuBar.openId !== null),
    handleClose: isNested ? safePolygon() : null,
    move: false,
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, dismiss]);

  return (
    <FloatingNode id={nodeId}>
      <div
        ref={refs.setReference}
        className={classes(
          'menubar-item menubar-dropdown',
          isNested && 'nested',
          isOpen && 'selected',
          disabled && 'disabled',
        )}
        {...getReferenceProps()}
      >
        {
          /* Added to be consistent with MenuItem */
          isNested && <Icon color="transparent" name="0" />
        }
        <div className="menubar-dropdown-display">{display}</div>
        {isNested && <Icon mr={-0.5} name="chevron-right" />}
      </div>
      {isOpen && (
        <FloatingPortal id={uiRootId}>
          <div
            ref={refs.setFloating}
            className={classes('menubar-dropdown-content', isNested && 'nested')}
            data-placement={context.placement}
            style={{ ...floatingStyles, width: unit(openWidth) }}
            {...getFloatingProps()}
          >
            {props.children}
          </div>
        </FloatingPortal>
      )}
    </FloatingNode>
  );
}
