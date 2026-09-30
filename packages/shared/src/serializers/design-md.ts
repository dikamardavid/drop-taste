import { ParsedDesignMd, DesignMdFrontmatter } from '../types/design-md.js';

/**
 * Generates canonical design.md Markdown content from structured data.
 */
export function formatDesignMd(data: Omit<ParsedDesignMd, 'rawMarkdown'>): string {
  const fm = data.frontmatter;
  
  const yamlLines = [
    '---',
    `schema_version: "${fm.schema_version}"`,
    `pipeline: "${fm.pipeline}"`,
    'source:',
    `  image_name: "${fm.source.image_name}"`,
    `  resolution: "${fm.source.resolution}"`,
    `  aspect_ratio: "${fm.source.aspect_ratio}"`,
    `  detected_type: "${fm.source.detected_type}"`,
    'target:',
    `  framework: "${fm.target.framework}"`,
    `  styling: "${fm.target.styling}"`,
    `  token_format: "${fm.target.token_format}"`,
    '---',
  ].join('\n');

  const colorsTable = [
    '| Token Name | HEX Code | Role / Semantic Scope | Contrast Ratio |',
    '| :--- | :--- | :--- | :--- |',
    ...data.tokens.colors.map(
      (c) => `| ${c.name} | \`${c.hex}\` | ${c.role} | ${c.contrastRatioAgainstCanvas ?? 'N/A'} |`
    ),
  ].join('\n');

  const typographyTable = [
    '| Level | Estimated Font Family | Size (px) | Weight | Line Height | Letter Spacing |',
    '| :--- | :--- | :--- | :--- | :--- | :--- |',
    ...data.tokens.typography.map(
      (t) => `| ${t.level} | ${t.estimatedFontFamily} | ${t.fontSizePx}px | ${t.fontWeight} | ${t.lineHeightPx ? `${t.lineHeightPx}px` : 'auto'} | ${t.letterSpacing ?? 'normal'} |`
    ),
  ].join('\n');

  const spacingTable = [
    '| Step | Value (px) | Usage Intent |',
    '| :--- | :--- | :--- |',
    ...data.tokens.spacing.map(
      (s) => `| ${s.name} | ${s.valuePx}px | ${s.usage} |`
    ),
  ].join('\n');

  const hierarchyMarkdown = data.hierarchy
    .map((node) => `- **${node.name}** (${node.layout}${node.gap ? `, gap: ${node.gap}` : ''}${node.padding ? `, padding: ${node.padding}` : ''})\n` +
      (node.children ?? []).map((ch) => `  - ${ch.name}: ${ch.layout} (${ch.notes ?? ''})`).join('\n')
    )
    .join('\n');

  const traitsMarkdown = data.visualTraits.map((trait) => `- ${trait}`).join('\n');

  return `${yamlLines}

# Canonical Design Specification: ${fm.source.image_name}

## 1. Context & Metadata
- **Primary Purpose:** ${data.context.primaryPurpose}
- **Target Audience:** ${data.context.targetAudience}
- **Visual Tone & Personality:** ${data.context.visualTone}

## 2. Extracted Design Tokens

### Color Palette
${colorsTable}

### Typography Scale
${typographyTable}

### Spacing & Geometry
${spacingTable}

## 3. Component Hierarchy Tree
${hierarchyMarkdown}

## 4. Key Visual Traits & Stylistic Motifs
${traitsMarkdown}

## 5. Reusable Code Template
\`\`\`tsx
${data.codeTemplate || '// Code template ready for framework synthesis'}
\`\`\`
`;
}

/**
 * Validates whether a markdown string contains valid canonical design.md structure
 */
export function validateDesignMd(markdown: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!markdown.startsWith('---')) {
    errors.push('Missing YAML frontmatter opening "---"');
  }
  if (!markdown.includes('schema_version: "1.0"')) {
    errors.push('Missing or invalid schema_version "1.0"');
  }
  if (!markdown.includes('pipeline: "antigravity_vision_to_spec"')) {
    errors.push('Missing pipeline "antigravity_vision_to_spec"');
  }
  if (!markdown.includes('## 1. Context & Metadata')) {
    errors.push('Missing section 1. Context & Metadata');
  }
  if (!markdown.includes('## 2. Extracted Design Tokens')) {
    errors.push('Missing section 2. Extracted Design Tokens');
  }
  if (!markdown.includes('## 3. Component Hierarchy Tree')) {
    errors.push('Missing section 3. Component Hierarchy Tree');
  }
  if (!markdown.includes('## 4. Key Visual Traits & Stylistic Motifs')) {
    errors.push('Missing section 4. Key Visual Traits & Stylistic Motifs');
  }
  if (!markdown.includes('## 5. Reusable Code Template')) {
    errors.push('Missing section 5. Reusable Code Template');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
