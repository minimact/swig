import { ComponentMetadata } from './types';
import { ClientStateManager } from './client-state';
/**
 * Handles hydration of server-rendered HTML with client interactivity
 * Identifies and manages client zones, server zones, and hybrid zones
 */
export declare class HydrationManager {
    private clientState;
    private components;
    private debugLogging;
    constructor(clientState: ClientStateManager, options?: {
        debugLogging?: boolean;
    });
    /**
     * Hydrate a component root element
     */
    hydrateComponent(componentId: string, rootElement: HTMLElement): void;
    /**
     * Hydrate client-only zones (data-minimact-client-scope)
     */
    private hydrateClientZones;
    /**
     * Bind elements with data-bind attribute to state
     */
    private bindStateElements;
    /**
     * Check if an element is within a client scope
     */
    private isInClientScope;
    /**
     * Determine which property to bind (value, textContent, innerHTML)
     */
    private determineBindProperty;
    /**
     * Get initial value from an element
     */
    private getInitialValue;
    /**
     * Dehydrate (cleanup) a component
     */
    dehydrateComponent(componentId: string): void;
    /**
     * Get component metadata
     */
    getComponent(componentId: string): ComponentMetadata | undefined;
    /**
     * Update server state for a component
     */
    updateServerState(componentId: string, key: string, value: any): void;
    /**
     * Hydrate all components on the page
     */
    hydrateAll(): void;
    /**
     * Debug logging
     */
    private log;
}
