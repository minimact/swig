import { TemplatePatch, Patch, LoopTemplate, VNode } from './types';
/**
 * Template Renderer
 *
 * Renders template patches with parameter values for runtime predictions.
 * Enables 98% memory reduction by storing patterns instead of concrete values.
 *
 * Example:
 *   template: "Count: {0}"
 *   params: [42]
 *   result: "Count: 42"
 */
export declare class TemplateRenderer {
    /**
     * Render a template string with parameters
     *
     * @param template - Template string with {0}, {1}, etc. placeholders
     * @param params - Parameter values to substitute
     * @returns Rendered string with parameters substituted
     *
     * @example
     * renderTemplate("Count: {0}", [42]) → "Count: 42"
     * renderTemplate("Hello, {0} {1}!", ["John", "Doe"]) → "Hello, John Doe!"
     */
    static renderTemplate(template: string, params: any[]): string;
    /**
     * Render a template patch with current state values
     *
     * @param templatePatch - Template patch data
     * @param stateValues - Current state values (key-value pairs)
     * @returns Rendered string
     *
     * @example
     * const tp = { template: "Count: {0}", bindings: ["count"], slots: [7] };
     * renderTemplatePatch(tp, { count: 42 }) → "Count: 42"
     *
     * @example Conditional
     * const tp = {
     *   template: "{0}",
     *   bindings: ["isActive"],
     *   conditionalTemplates: { "true": "Active", "false": "Inactive" },
     *   conditionalBindingIndex: 0
     * };
     * renderTemplatePatch(tp, { isActive: true }) → "Active"
     */
    static renderTemplatePatch(templatePatch: TemplatePatch, stateValues: Record<string, any>): string;
    /**
     * Convert a template patch to concrete patch(es) with current state
     *
     * @param patch - Template patch (UpdateTextTemplate, UpdatePropsTemplate, or UpdateListTemplate)
     * @param stateValues - Current state values
     * @returns Concrete patch or array of patches
     *
     * @example
     * const patch = {
     *   type: 'UpdateTextTemplate',
     *   path: [0, 0],
     *   templatePatch: { template: "Count: {0}", bindings: ["count"], slots: [7] }
     * };
     * materializePatch(patch, { count: 42 })
     * → { type: 'UpdateText', path: [0, 0], content: "Count: 42" }
     */
    static materializePatch(patch: Patch, stateValues: Record<string, any>): Patch | Patch[];
    /**
     * Materialize multiple template patches
     *
     * @param patches - Array of patches (template or concrete)
     * @param stateValues - Current state values
     * @returns Array of concrete patches
     */
    static materializePatches(patches: Patch[], stateValues: Record<string, any>): Patch[];
    /**
     * Apply transform to a value (Phase 6: Expression Templates)
     * Security: Only whitelisted transforms are allowed
     *
     * @param value - Raw value from state
     * @param transform - Transform string (e.g., "toFixed(2)", "* 100", "toUpperCase()")
     * @returns Transformed value
     *
     * @example
     * applyTransform(99.95, "toFixed(2)") → "99.95"
     * applyTransform(0.847, "* 100") → 84.7
     * applyTransform("hello", "toUpperCase()") → "HELLO"
     */
    static applyTransform(value: any, transform: string): any;
    /**
     * Format a value for template substitution
     *
     * @param value - Value to format
     * @returns String representation of value
     */
    private static formatValue;
    /**
     * Check if a patch is a template patch
     *
     * @param patch - Patch to check
     * @returns True if patch is a template patch
     */
    static isTemplatePatch(patch: Patch): boolean;
    /**
     * Extract bindings from a template patch
     *
     * @param patch - Template patch
     * @returns Array of state variable names, or empty array if not a template patch
     */
    static extractBindings(patch: Patch): string[];
    /**
     * Validate that all required bindings are present in state
     *
     * @param templatePatch - Template patch to validate
     * @param stateValues - Available state values
     * @returns True if all bindings are present
     */
    static validateBindings(templatePatch: TemplatePatch, stateValues: Record<string, any>): boolean;
    /**
     * Get missing bindings from state
     *
     * @param templatePatch - Template patch to check
     * @param stateValues - Available state values
     * @returns Array of missing binding names
     */
    static getMissingBindings(templatePatch: TemplatePatch, stateValues: Record<string, any>): string[];
    /**
     * Render loop template with current array state
     *
     * @param loopTemplate - Loop template data
     * @param stateValues - Current state values (must include array binding)
     * @returns Array of rendered VNodes
     *
     * @example
     * const template = {
     *   array_binding: "todos",
     *   item_template: {
     *     type: "Element",
     *     tag: "li",
     *     children_templates: [{
     *       type: "Text",
     *       template_patch: { template: "{0}", bindings: ["item.text"], slots: [0] }
     *     }]
     *   }
     * };
     * renderLoopTemplate(template, { todos: [{ text: "A" }, { text: "B" }] })
     * → [<li>A</li>, <li>B</li>]
     */
    static renderLoopTemplate(loopTemplate: LoopTemplate, stateValues: Record<string, any>): VNode[];
    /**
     * Flatten item object for template binding access
     *
     * @param itemState - Current state including item
     * @param item - The array item to flatten
     * @returns Flattened state with "item.property" keys
     *
     * @example
     * flattenItemState({ item: { id: 1, text: "A" } }, { id: 1, text: "A" })
     * → { "item.id": 1, "item.text": "A", item: {...}, ... }
     */
    private static flattenItemState;
    /**
     * Render item template to VNode
     *
     * @param itemTemplate - Template for individual list item
     * @param stateValues - State values with flattened item properties
     * @returns Rendered VNode
     */
    private static renderItemTemplate;
    /**
     * Convert rendered loop VNodes to concrete patches
     * Generates Create/Replace patches for list update
     *
     * @param parentPath - Path to parent element containing the list
     * @param vnodes - Rendered VNodes for list items
     * @returns Array of patches to update the list
     */
    private static convertLoopToPatches;
}
