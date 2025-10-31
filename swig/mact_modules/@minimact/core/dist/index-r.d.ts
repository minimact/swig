import { MinimactOptions } from './types';
/**
 * Main Minimact client runtime
 * Orchestrates SignalR, DOM patching, state management, and hydration
 */
export declare class Minimact {
    private signalR;
    private domPatcher;
    private clientState;
    private hydration;
    private hintQueue;
    private playgroundBridge;
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
export { SignalRManager } from './signalr-manager';
export { DOMPatcher } from './dom-patcher';
export { ClientStateManager } from './client-state';
export { EventDelegation } from './event-delegation';
export { HydrationManager } from './hydration';
export { HintQueue } from './hint-queue';
export { registerClientComputed, computeVariable, computeAllForComponent, computeDependentVariables, getLastValue, getAllLastValues, hasClientComputed, getComputedVariableNames, clearComponent as clearClientComputedComponent, getDebugInfo as getClientComputedDebugInfo } from './client-computed';
export { TemplateStateManager, templateState } from './template-state';
export type { Template, TemplateMap } from './template-state';
export { TemplateRenderer } from './template-renderer';
export { useState, useEffect, useRef, useServerTask, setComponentContext, clearComponentContext } from './hooks';
export type { ComponentContext } from './hooks';
export { useComputed } from './useComputed';
export type { UseComputedOptions } from './useComputed';
export { createContext, useContext, setContextHookContext, clearContextHookContext } from './useContext';
export type { Context, ContextOptions } from './useContext';
export type { ServerTask, ServerTaskOptions, ServerTaskStatus } from './server-task';
export { usePaginatedServerTask } from './usePaginatedServerTask';
export type { PaginatedServerTask, PaginatedServerTaskOptions, PaginationParams } from './usePaginatedServerTask';
export { usePub, useSub } from './pub-sub';
export type { PubSubMessage } from './pub-sub';
export { useMicroTask, useMacroTask, useAnimationFrame, useIdleCallback } from './task-scheduling';
export { useSignalR } from './signalr-hook';
export type { SignalRHookState } from './signalr-hook';
export * from './types';
export default Minimact;
