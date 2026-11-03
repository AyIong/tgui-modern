import { classes } from 'tgui-modern/common/react';
import { DmIcon } from '../../DmIcon';
import { Icon } from '../../Icon';
import { Image } from '../../Image';
import type { FallbackProps, ImageButtonImagesProps } from './types';

/**
 * There is too many options to show image... can't we just use unified one?
 * Priority is: base64 -> imageSrc -> dmIcon -> asset -> question icon
 */
export function ImageSwitch(props: ImageButtonImagesProps) {
  const { base64, imageSrc, dmIcon, asset, fallbackIcon } = props;

  const src = base64 ? `data:image/png;base64,${base64}` : imageSrc;
  if (src) {
    return <Image src={src} />;
  }

  if (dmIcon) {
    return <DmIcon {...dmIcon} fallback={dmIcon.fallback || <Fallback animate icon="toolbox" />} />;
  }

  if (asset) {
    return <Image className={classes(asset)} />;
  }

  return <Fallback icon={fallbackIcon || 'question'} />;
}

function Fallback(props: FallbackProps) {
  const { icon, animate } = props;
  return <Icon className="imagebutton-fallback" name={icon} animation={animate && 'bounce'} />;
}
