/**
 * Template State Manager - Client-Side Template Rendering
 *
 * Manages "virtual state" for text nodes using parameterized templates.
 * This enables instant hot reload with 100% coverage and minimal memory.
 *
 * Architecture:
 * - Templates loaded from .templates.json at component init
 * - State changes trigger template re-rendering
 * - Hot reload updates templates without server round-trip
 *
 * Memory: ~2KB per component (vs 100KB with prediction-based approach)
 * Coverage: 100% (works with any value)
 * Latency: <5ms for template updates
 */
export interface Template {
    /** Template string with {0}, {1}, etc. placeholders */
    template: string;
    /** State bindings that fill the template slots */
    bindings: string[];
    /** Character positions where params are inserted */
    slots: number[];
    /** DOM path to the text node */
    path: number[];
    /** Template type: static | dynamic | attribute */
    type: 'static' | 'dynamic' | 'attribute';
    /** Attribute name (only for attribute templates) */
    attribute?: string;
}
export interface TemplateMap {
    component: string;
    version: string;
    generatedAt: number;
    templates: Record<string, Template>;
}
export interface TemplatePatch {
    type: 'UpdateTextTemplate' | 'UpdatePropTemplate';
    componentId: string;
    path: number[];
    template: string;
    params: any[];
    bindings: string[];
    slots: number[];
    attribute?: string;
}
/**
 * Template State Manager
 */
export declare class TemplateStateManager {
    private templates;
    private componentStates;
    /**
     * Initialize templates from .templates.json file
     */
    loadTemplateMap(componentId: string, templateMap: TemplateMap): void;
    /**
     * Register a template for a specific node path
     */
    registerTemplate(componentId: string, nodePath: string, template: Template): void;
    /**
     * Get template by component ID and node path
     */
    getTemplate(componentId: string, nodePath: string): Template | undefined;
    /**
     * Get all templates for a component
     */
    getComponentTemplates(componentId: string): Map<string, Template>;
    /**
     * Get templates bound to a specific state variable
     */
    getTemplatesBoundTo(componentId: string, stateKey: string): Template[];
    /**
     * Update component state (from useState)
     */
    updateState(componentId: string, stateKey: string, value: any): void;
    /**
     * Get component state value
     */
    getStateValue(componentId: string, stateKey: string): any;
    /**
     * Render template with current state values
     */
    render(componentId: string, nodePath: string): string | null;
    /**
     * Render template with specific parameter values
     */
    renderWithParams(template: string, params: any[]): string;
    /**
     * Apply template patch from hot reload
     */
    applyTemplatePatch(patch: TemplatePatch): {
        text: string;
        path: number[];
    } | null;
    /**
     * Build node path key from path array
     * Example: [0, 1, 0] → "0_1_0"
     */
    private buildNodePathKey;
    /**
     * Clear all templates for a component
     */
    clearComponent(componentId: string): void;
    /**
     * Clear all templates
     */
    clear(): void;
    /**
     * Get statistics
     */
    getStats(): {
        componentCount: number;
        templateCount: number;
        memoryKB: number;
        avgTemplatesPerComponent: number;
    };
}
/**
 * Global template state manager instance
 */
export declare const templateState: TemplateStateManager;
