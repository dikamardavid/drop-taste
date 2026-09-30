import { FigmaNode } from './figma.js';

export type CaptureType = 'page' | 'component' | 'image';

export interface CaptureDimensions {
  width: number;
  height: number;
}

export interface CaptureMetadata {
  url: string;
  siteName: string;
  title: string;
  category?: string;
  tags: string[];
  dimensions: CaptureDimensions;
  capturedAt: string; // ISO-8601
}

export interface PageCapturePayload {
  type: 'page';
  metadata: CaptureMetadata;
  domHtml: string;
  computedStyles: Record<string, unknown>;
  figmaAst?: FigmaNode;
  thumbnailUrl?: string;
}

export interface ComponentCapturePayload {
  type: 'component';
  metadata: CaptureMetadata;
  targetKind: 'component' | 'screen';
  domHtml: string;
  computedStyles: Record<string, unknown>;
  figmaAst?: FigmaNode;
  thumbnailUrl?: string;
}

export interface ImageCapturePayload {
  type: 'image';
  metadata: CaptureMetadata;
  imageUrl: string;
  mimeType: string;
  fileSizeBytes: number;
  designMd?: string;
}

export type CapturePayload =
  | PageCapturePayload
  | ComponentCapturePayload
  | ImageCapturePayload;

export interface CaptureRecord {
  id: string;
  userId: string;
  type: CaptureType;
  title: string;
  sourceUrl: string;
  siteName: string;
  category: string;
  tags: string[];
  dimensions: CaptureDimensions;
  assetUrl?: string;
  designMd?: string;
  figmaPayload?: string;
  createdAt: string;
  updatedAt: string;
}
