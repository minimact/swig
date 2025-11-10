import { Patch } from './types';
/**
 * Applies DOM patches from the server to the actual DOM
 * Server sends DOM index-based patches - client just does simple array indexing!
 */
export declare class DOMPatcher {
    private debugLogging;
    constructor(options?: {
        debugLogging?: boolean;
    });
    /**
     * Apply an array of patches to a root element
     */
    applyPatches(rootElement: HTMLElement, patches: Patch[]): void;
    /**
     * Apply a single patch to the DOM
     */
    private applyPatch;
    /**
     * Create and insert a new node
     * The path is in node.path (converted DOM index path from server)
     */
    private patchCreate;
    /**
     * Remove a node from the DOM
     */
    private patchRemove;
    /**
     * Replace a node with a new one
     */
    private patchReplace;
    /**
     * Update text content of a text node
     */
    private patchUpdateText;
    /**
     * Update element properties/attributes
     */
    private patchUpdateProps;
    /**
     * Reorder children based on keys
     */
    private patchReorderChildren;
    /**
     * Get a DOM element by its DOM index path
     * Simple array indexing through childNodes - server handles all null path complexity!
     */
    private getElementByPath;
    /**
     * Create a DOM element from a VNode
     */
    private createElementFromVNode;
    /**
     * Replace entire HTML (fallback when patches aren't available)
     */
    replaceHTML(rootElement: HTMLElement, html: string): void;
    /**
     * Debug logging
     */
    private log;
}
