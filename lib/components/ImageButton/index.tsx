import { colorClassName } from 'tgui-modern/common/color';
import { classes } from 'tgui-modern/common/react';
import { computeBoxProps } from 'tgui-modern/common/ui';
import { useButton } from 'tgui-modern/hooks/useButton';
import { FitText } from '../FitText';
import { Tooltip } from '../Tooltip';
import { ImageSwitch } from './ImageSwitch';
import type { ImageButtonContentProps, ImageButtonProps } from './types';

/**
 * ## ImageButton
 *
 * Stylized button, with the ability to easily and simply insert any picture into it.
 * - Without image, will be default question icon.
 * - If an image is specified but for some reason cannot be displayed, there will be an animated fallback until it is loaded.
 *
 * - [View documentation on tgui core](https://tgstation.github.io/tgui-core/?path=/docs/components-imagebutton--docs)
 * - [View inherited Box props](https://tgstation.github.io/tgui-core/?path=/docs/components-box--docs)
 */
export function ImageButton(props: ImageButtonProps) {
  const {
    children,
    className,
    buttons,
    buttonsAlt,
    fluid,
    color,
    style,
    selected,
    disabled,
    description,
    tooltip,
    asset,
    base64,
    dmIcon,
    imageSrc,
    imageSize,
    fallbackIcon,
    onClick,
    onRightClick,
    ...rest
  } = props;

  const interactions = useButton({
    disabled,
    onClick,
    onRightClick,
  });

  let button = (
    <div
      className={classes([
        'imagebutton',
        fluid && 'fluid',
        selected && 'selected',
        disabled && 'disabled',
        !(onClick || onRightClick) && 'passive',
        className,
        colorClassName(selected ? 'good' : color),
      ])}
      {...computeBoxProps({
        style: {
          '--image-size': imageSize && `${imageSize}px`,
          ...style,
        },
        ...rest,
      })}
    >
      <div tabIndex={-1} className="imagebutton-inner" {...interactions}>
        <div className="imagebutton-inner--image">
          <ImageSwitch
            asset={asset}
            base64={base64}
            dmIcon={dmIcon}
            imageSrc={imageSrc}
            fallbackIcon={fallbackIcon}
          />
        </div>
        <div className="imagebutton-inner--content">
          <Content fluid={fluid} description={description}>
            {children}
          </Content>
        </div>
      </div>
      {buttons && <div className="imagebutton-buttons">{buttons}</div>}
      {buttonsAlt && <div className="imagebutton-buttons alternative">{buttonsAlt}</div>}
    </div>
  );

  const tooltipProps =
    typeof tooltip === 'string' ? { content: tooltip, placement: 'bottom' } : tooltip;
  if (tooltipProps) {
    button = <Tooltip {...tooltipProps}>{button}</Tooltip>;
  }

  return button;
}

function Content(props: ImageButtonContentProps) {
  const { fluid, description, children } = props;
  if (!children) {
    return; // No children no content. Sounds weird
  }

  if (fluid) {
    return (
      <>
        <span className={classes(['title', description && 'has-description'])}>{children}</span>
        {description && <span className="description">{description}</span>}
      </>
    );
  }

  return <FitText ellipsis>{children}</FitText>;
}
