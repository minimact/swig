import { ComponentState } from './types';
/**
 * Manages client-side state (useClientState) with reactive updates
 * Handles local state that doesn't require server round-trips
 */
export declare class ClientStateManager {
    private states;
    private subscribers;
    private debugLogging;
    constructor(options?: {
        debugLogging?: boolean;
    });
    /**
     * Initialize client state for a component
     */
    initializeComponent(componentId: string, initialState?: ComponentState): void;
    /**
     * Get client state value
     */
    getState(componentId: string, key: string): any;
    /**
     * Set client state value and trigger updates
     */
    setState(componentId: string, key: string, value: any): void;
    /**
     * Subscribe to state changes
     */
    subscribe(componentId: string, key: string, callback: (value: any, oldValue: any) => void): () => void;
    /**
     * Notify all subscribers of a state change
     */
    private notifySubscribers;
    /**
     * Get all state for a component
     */
    getComponentState(componentId: string): ComponentState | undefined;
    /**
     * Update multiple state values at once
     */
    updateState(componentId: string, updates: ComponentState): void;
    /**
     * Clear state for a component
     */
    clearComponent(componentId: string): void;
    /**
     * Bind state to a DOM element's value/content
     */
    bindToElement(componentId: string, key: string, element: HTMLElement, property?: 'value' | 'textContent' | 'innerHTML'): () => void;
    /**
     * Update a DOM element based on property type
     */
    private updateElement;
    /**
     * Bind input element to state (two-way binding)
     */
    bindInput(componentId: string, key: string, input: HTMLInputElement | HTMLTextAreaElement): () => void;
    /**
     * Debug logging
     */
    private log;
}
