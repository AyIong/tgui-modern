import type { DmIconProps } from 'tgui-modern/components/DmIcon/types';
import type { IconNamesUnion } from 'tgui-modern/components/Icon/types';

type AssetProps = {
  /** Generated asset class name, with sizing on end: `assetname32x32` */
  src: string[];
  /**
   * Asset size. Used for asset scaling. Example: `assetSize={32}`
   * With that, you can use `imageSize` to set asset image size in px.
   * By default, it's 32px. So if you have 32x32 you don't need to touch it.
   */
  size?: number;
};

export type ImageButtonImagesProps = Partial<{
  /** Asset cache. Example: `asset={{ src: ['assetname32x32', thing.key] }}` */
  asset: AssetProps;
  /** Classic way to put images. Example: `base64={thing.image}` */
  base64: string;
  /** <DmIcon> component props */
  dmIcon: DmIconProps;
  /** Prop `src` of Image component. Example: `imageSrc={resolveAsset(thing.image)}` */
  imageSrc: string;
  /** Replaces default "question" icon when image missing. */
  fallbackIcon: IconNamesUnion;
}>;

export type FallbackProps = {
  icon: IconNamesUnion;
} & Partial<{
  animate: true;
}>;
