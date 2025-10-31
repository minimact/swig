/**
 * TSX Pattern Detector
 *
 * Detects common edit patterns in TSX code to enable instant hot reload
 * via prediction cache lookup (0-5ms instead of 50ms with esbuild)
 */
export interface TsxEditPattern {
    type: 'text-content' | 'class-name' | 'attribute' | 'inline-style' | 'element-added' | 'element-removed' | 'complex';
    confidence: number;
    path?: string;
    oldValue?: string;
    newValue?: string;
    oldClasses?: string[];
    newClasses?: string[];
    attribute?: string;
    styleProperty?: string;
    element?: string;
}
export interface DiffResult {
    added: string[];
    removed: string[];
    unchanged: string[];
}
export declare class TsxPatternDetector {
    /**
     * Detect what kind of edit was made to TSX code
     * Returns a pattern that can be matched against prediction cache
     */
    detectEditPattern(oldTsx: string, newTsx: string): TsxEditPattern;
    /**
     * Compute line-based diff between old and new TSX
     */
    private computeDiff;
    /**
     * Detect pure text content change
     * Example: <div>Hello</div> → <div>Hello World</div>
     */
    private detectTextChange;
    /**
     * Detect className change
     * Example: className="btn" → className="btn btn-primary"
     */
    private detectClassChange;
    /**
     * Detect attribute change
     * Example: disabled="true" → disabled="false"
     */
    private detectAttributeChange;
    /**
     * Detect inline style change
     * Example: style={{ color: 'red' }} → style={{ color: 'blue' }}
     */
    private detectStyleChange;
    /**
     * Detect element added or removed
     * Example: Adding <div>New</div> to JSX
     */
    private detectElementChange;
    /**
     * Extract attributes from JSX element
     */
    private extractAttributes;
    /**
     * Parse inline style object
     * Example: "color: 'red', fontSize: '16px'" → { color: 'red', fontSize: '16px' }
     */
    private parseInlineStyle;
    /**
     * Build cache key from pattern
     * Used to lookup pre-computed patches
     */
    buildCacheKey(componentId: string, pattern: TsxEditPattern): string;
    /**
     * Simple hash for element string
     */
    private hashElement;
}
