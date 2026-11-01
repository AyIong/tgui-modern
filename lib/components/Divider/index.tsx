import { classes } from 'tgui-modern/common/react';

type Props = Partial<{
  /** Divider thickness. */
  size: number;
  /** Divide content vertically. */
  vertical: boolean;
}>;

/**
 *
 * ## Divider
 *
 * Draws a horizontal or vertical line, dividing a section into groups.
 * Works like the good old `<hr>` element, but it's fancier.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-modern/?path=/docs/components-divider--docs)
 */
export function Divider(props: Props) {
  const { size, vertical } = props;
  return (
    <div
      className={classes('divider', vertical && 'divider-vertical')}
      style={{ '--size': size }}
    />
  );
}
