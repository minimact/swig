import { DOMPatcher } from './dom-patcher';
import { MinimactComponentRegistry } from './component-registry';
import { MinimactOptions } from './types';
/**
 * Main Minimact client runtime
 * Orchestrates SignalM (lightweight WebSocket), DOM patching, state management, and hydration
 *
 * Bundle size: ~10 KB gzipped (vs 25 KB with SignalR)
 */
export declare class Minimact {
    private signalR;
    domPatcher: DOMPatcher;
    private clientState;
    private hydration;
    private hintQueue;
    private playgroundBridge;
    componentRegistry: MinimactComponentRegistry;
    private hotReload;
    private eventDelegation;
    private options;
    private rootElement;
    constructor(rootElement?: HTMLElement | string, options?: MinimactOptions);
    /**
     * Start the Minimact runtime
     */
    start(): Promise<void>;
    /**
     * Stop the Minimact runtime
     */
    stop(): Promise<void>;
    /**
     * Setup SignalR event handlers
     */
    private setupSignalRHandlers;
    /**
     * Register all components with the server
     */
    private registerAllComponents;
    /**
     * Manually hydrate a component
     */
    hydrateComponent(componentId: string, element: HTMLElement): void;
    /**
     * Get component by ID (for hot reload)
     */
    getComponent(componentId: string): any;
    /**
     * Register all hydrated components in the registry
     * Extracts component type from ViewModel metadata
     */
    private registerHydratedComponents;
    /**
     * Get client state for a component
     */
    getClientState(componentId: string, key: string): any;
    /**
     * Set client state for a component
     */
    setClientState(componentId: string, key: string, value: any): void;
    /**
     * Subscribe to client state changes
     */
    subscribeToState(componentId: string, key: string, callback: (value: any) => void): () => void;
    /**
     * Recompute client-computed variables after state change and sync to server
     */
    private recomputeAndSyncClientState;
    /**
     * Get SignalR connection state
     */
    get connectionState(): string;
    /**
     * Get SignalR connection ID
     */
    get connectionId(): string | null;
    /**
     * Debug logging
     */
    private log;
}
export { SignalMManager } from './signalm-manager';
export { DOMPatcher } from './dom-patcher';
export { ClientStateManager } from './client-state';
export { EventDelegation } from './event-delegation';
export { HydrationManager } from './hydration';
export { HintQueue } from './hint-queue';
export { HotReloadManager } from './hot-reload';
export type { HotReloadConfig, HotReloadMessage, HotReloadMetrics } from './hot-reload';
export { registerClientComputed, computeVariable, computeAllForComponent, computeDependentVariables, getLastValue, getAllLastValues, hasClientComputed, getComputedVariableNames, clearComponent as clearClientComputedComponent, getDebugInfo as getClientComputedDebugInfo } from './client-computed';
export { TemplateStateManager, templateState } from './template-state';
export type { Template, TemplateMap } from './template-state';
export { TemplateRenderer } from './template-renderer';
export { useState, useProtectedState, useEffect, useRef, useServerTask, useServerReducer, useMarkdown, setComponentContext, clearComponentContext, ComponentContext } from './hooks';
export { state, setState, ComponentState, State } from './state-proxy';
export { useComputed } from './useComputed';
export type { UseComputedOptions } from './useComputed';
export { createContext, useContext, setContextHookContext, clearContextHookContext } from './useContext';
export type { Context, ContextOptions } from './useContext';
export type { ServerTask, ServerTaskOptions, ServerTaskStatus } from './server-task';
export type { ServerReducer } from './server-reducer';
export { usePaginatedServerTask } from './usePaginatedServerTask';
export type { PaginatedServerTask, PaginatedServerTaskOptions, PaginationParams } from './usePaginatedServerTask';
export { usePub, useSub } from './pub-sub';
export type { PubSubMessage } from './pub-sub';
export { useMicroTask, useMacroTask, useAnimationFrame, useIdleCallback } from './task-scheduling';
export { useSignalR } from './signalr-hook-m';
export type { SignalRHookState } from './signalr-hook-m';
export { MinimactComponentRegistry } from './component-registry';
export type { ComponentMetadata } from './component-registry';
export * from './types';
export default Minimact;
