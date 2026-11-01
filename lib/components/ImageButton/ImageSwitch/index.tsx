import { classes } from 'tgui-modern/common/react';
import { DmIcon } from '../../DmIcon';
import { Image } from '../../Image';
import { Fallback } from '../Fallback';
import type { ImageButtonImagesProps } from './types';

/** There is too many options to show image... can't we just use unified one? */
export function ImageSwitch(props: ImageButtonImagesProps) {
  const { base64, imageSrc, dmIcon, asset, fallbackIcon } = props;

  const src = base64 ? `data:image/png;base64,${base64}` : imageSrc;
  if (src) {
    return <Image src={src} />;
  }

  if (dmIcon) {
    return <DmIcon {...dmIcon} fallback={dmIcon.fallback || <Fallback icon="spinner" spin />} />;
  }

  if (asset) {
    return <Image className={classes(asset)} />;
  }

  return <Fallback icon={fallbackIcon || 'question'} />;
}
