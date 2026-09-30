import { describe, it, expect } from 'vitest';
import { formatDesignMd, validateDesignMd } from '../serializers/design-md.js';

describe('Canonical design.md Serializer & Validator', () => {
  it('formats structured tokens and hierarchy into standard design.md', () => {
    const markdown = formatDesignMd({
      frontmatter: {
        schema_version: '1.0',
        pipeline: 'antigravity_vision_to_spec',
        source: {
          image_name: 'landing-hero.png',
          resolution: '1920x1080',
          aspect_ratio: '16:9',
          detected_type: 'landing_page',
        },
        target: {
          framework: 'React (Next.js)',
          styling: 'Tailwind CSS v3.4+',
          token_format: 'Tailwind Config',
        },
      },
      context: {
        primaryPurpose: 'SaaS conversion landing hero',
        targetAudience: 'Software engineers and founders',
        visualTone: 'Minimalist, dark-mode, high-density',
      },
      tokens: {
        colors: [
          { name: 'Canvas Dark', hex: '#0B0F17', role: 'canvas', contrastRatioAgainstCanvas: '1:1' },
          { name: 'Primary Accent', hex: '#6366F1', role: 'accent', contrastRatioAgainstCanvas: '7.8:1' },
        ],
        typography: [
          {
            level: 'Display 1',
            estimatedFontFamily: 'Inter, sans-serif',
            fontSizePx: 56,
            fontWeight: 700,
            lineHeightPx: 64,
          },
        ],
        spacing: [
          { name: 'space-4', valuePx: 16, usage: 'Default card padding' },
        ],
      },
      hierarchy: [
        {
          name: 'HeroContainer',
          layout: 'Flexbox Column',
          gap: '24px',
          padding: '48px',
          children: [
            { name: 'HeadlineGroup', layout: 'Flexbox Column', notes: 'Badge + H1 + Subtitle' },
            { name: 'CtaButtonGroup', layout: 'Flexbox Row', notes: 'Primary CTA + Secondary Github button' },
          ],
        },
      ],
      visualTraits: [
        'Subtle radial glow in indigo behind main headline',
        'Bento box card with 1px semi-transparent border',
      ],
      codeTemplate: 'export function Hero() { return <section>...</section>; }',
    });

    const validation = validateDesignMd(markdown);
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
    expect(markdown).toContain('schema_version: "1.0"');
    expect(markdown).toContain('pipeline: "antigravity_vision_to_spec"');
    expect(markdown).toContain('## 1. Context & Metadata');
    expect(markdown).toContain('## 2. Extracted Design Tokens');
    expect(markdown).toContain('## 3. Component Hierarchy Tree');
    expect(markdown).toContain('## 4. Key Visual Traits & Stylistic Motifs');
    expect(markdown).toContain('## 5. Reusable Code Template');
  });

  it('catches missing sections in invalid design.md', () => {
    const invalidMd = '# Incomplete spec\nSome random content without tokens';
    const validation = validateDesignMd(invalidMd);
    expect(validation.valid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });
});
