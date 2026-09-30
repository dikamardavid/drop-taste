/**
 * Drop Taste - Normalized Figma Node AST
 * Represents auto-layout frames, text nodes, vectors, and paints for clipboard & plugin rendering.
 */

export type FigmaPaintType = 'SOLID' | 'IMAGE' | 'GRADIENT_LINEAR';

export interface FigmaColor {
  r: number; // 0..1
  g: number; // 0..1
  b: number; // 0..1
  a?: number; // 0..1
}

export interface FigmaPaint {
  type: FigmaPaintType;
  color?: FigmaColor;
  opacity?: number;
  imageRef?: string;
}

export type FigmaLayoutMode = 'NONE' | 'HORIZONTAL' | 'VERTICAL';
export type FigmaPrimaryAxisAlign = 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN';
export type FigmaCounterAxisAlign = 'MIN' | 'MAX' | 'CENTER' | 'BASELINE';
export type FigmaLayoutSizing = 'FIXED' | 'HUG' | 'FILL';

export interface BaseFigmaNode {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
}

export interface FigmaFrameNode extends BaseFigmaNode {
  type: 'FRAME';
  layoutMode: FigmaLayoutMode;
  primaryAxisAlignItems: FigmaPrimaryAxisAlign;
  counterAxisAlignItems: FigmaCounterAxisAlign;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  itemSpacing: number;
  width: number;
  height: number;
  layoutSizingHorizontal: FigmaLayoutSizing;
  layoutSizingVertical: FigmaLayoutSizing;
  fills: FigmaPaint[];
  strokes?: FigmaPaint[];
  strokeWeight?: number;
  cornerRadius?: number | [number, number, number, number];
  children: FigmaNode[];
}

export interface FigmaTextNode extends BaseFigmaNode {
  type: 'TEXT';
  characters: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  lineHeight: number | 'AUTO';
  letterSpacing: number;
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  fills: FigmaPaint[];
}

export interface FigmaVectorNode extends BaseFigmaNode {
  type: 'VECTOR';
  width: number;
  height: number;
  svgData?: string;
  fills: FigmaPaint[];
  strokes?: FigmaPaint[];
}

export interface FigmaImageNode extends BaseFigmaNode {
  type: 'IMAGE';
  width: number;
  height: number;
  imageUrl: string;
  cornerRadius?: number;
  fills: FigmaPaint[];
}

export type FigmaNode = FigmaFrameNode | FigmaTextNode | FigmaVectorNode | FigmaImageNode;
