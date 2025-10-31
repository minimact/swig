import type { HintQueue } from './hint-queue';
import type { DOMPatcher } from './dom-patcher';
import type { PlaygroundBridge } from './playground-bridge';
/**
 * Event delegation system for handling component events
 * Uses a single root listener for performance
 */
export declare class EventDelegation {
    private rootElement;
    private componentMethodInvoker;
    private debugLogging;
    private eventListeners;
    private hintQueue?;
    private domPatcher?;
    private playgroundBridge?;
    constructor(rootElement: HTMLElement, componentMethodInvoker: (componentId: string, methodName: string, args?: any) => Promise<void>, options?: {
        debugLogging?: boolean;
        hintQueue?: HintQueue;
        domPatcher?: DOMPatcher;
        playgroundBridge?: PlaygroundBridge;
    });
    /**
     * Setup event delegation for common events
     */
    private setupEventDelegation;
    /**
     * Create an event listener for a specific event type
     */
    private createEventListener;
    /**
     * Find the nearest element with an event handler attribute
     */
    private findHandlerElement;
    /**
     * Get event handler information from element
     */
    private getEventHandler;
    /**
     * Find the component ID for an element
     */
    private findComponentId;
    /**
     * Execute an event handler
     */
    private executeHandler;
    /**
     * Try to match a hint in the queue for this method invocation
     * Simplified version - checks if there's a hint matching the method name
     */
    private tryMatchHint;
    /**
     * Find the component element by component ID
     */
    private findComponentElement;
    /**
     * Cleanup event listeners
     */
    destroy(): void;
    /**
     * Debug logging
     */
    private log;
}
