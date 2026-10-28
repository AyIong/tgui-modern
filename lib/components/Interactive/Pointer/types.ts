export type PointerProps = {
  left: number;
  color: string;
} & Partial<{
  className?: string;
  top?: number;
}>;
