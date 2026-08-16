import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

const widths = [600, 900, 1200, 1600];

export function imageSrc(assetId: string, width: number): string {
  return builder.image(assetId).width(width).auto("format").quality(72).url();
}

export function imageSrcSet(assetId: string): string {
  return widths.map((w) => `${imageSrc(assetId, w)} ${w}w`).join(", ");
}
