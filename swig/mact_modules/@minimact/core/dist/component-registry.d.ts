/**
 * MinimactComponentRegistry
 *
 * First-class system for tracking component instances by type.
 * Bridges the gap between type-based templates (ProductDetailsPage)
 * and instance-based rendering (GUID e11850fd-...).
 *
 * Responsibilities:
 * - Register component instances during hydration
 * - Lookup instances by type (for hot reload)
 * - Lookup instance by ID (for patches)
 * - Unregister components on cleanup
 */
import type { ComponentContext } from './hooks';
export interface ComponentMetadata {
    /** Component class name (e.g., "ProductDetailsPage") */
    type: string;
    /** Component instance GUID (e.g., "e11850fd-9898-4fca-8991-5c4065601284") */
    instanceId: string;
    /** Root DOM element with data-minimact-component-id */
    element: HTMLElement;
    /** Component context (state, effects, refs, etc.) */
    context: ComponentContext;
}
export declare class MinimactComponentRegistry {
    /** Map: componentType → Set<ComponentMetadata> */
    private typeToInstances;
    /** Map: instanceId → ComponentMetadata */
    private instanceToMeta;
    /**
     * Register a component instance
     * Called during hydration when component is discovered
     */
    register(meta: ComponentMetadata): void;
    /**
     * Unregister a component instance
     * Called during cleanup or when component is removed
     */
    unregister(instanceId: string): void;
    /**
     * Get all instances of a component type
     * Used by hot reload to apply templates to all instances
     */
    getByType(type: string): ComponentMetadata[];
    /**
     * Get a specific component instance by ID
     * Used by patch application and state updates
     */
    getByInstanceId(instanceId: string): ComponentMetadata | undefined;
    /**
     * Get all registered component types
     */
    getTypes(): string[];
    /**
     * Get total number of registered instances
     */
    getInstanceCount(): number;
    /**
     * Get statistics for debugging
     */
    getStats(): {
        types: number;
        instances: number;
        typeBreakdown: Record<string, number>;
    };
    /**
     * Clear all registered components
     * Used for testing or full page reset
     */
    clear(): void;
}
