import { ArrayOperation } from './hooks';
/**
 * Manages SignalM connection to the Minimact server hub
 *
 * Drop-in replacement for SignalRManager using lightweight SignalM
 * Bundle size: ~3 KB gzipped (vs 18 KB with SignalR)
 */
export declare class SignalMManager {
    private connection;
    private debugLogging;
    private eventHandlers;
    constructor(hubUrl?: string, options?: {
        reconnectInterval?: number;
        debugLogging?: boolean;
    });
    /**
     * Setup SignalM event handlers
     */
    private setupEventHandlers;
    /**
     * Start the SignalM connection
     */
    start(): Promise<void>;
    /**
     * Stop the SignalM connection
     */
    stop(): Promise<void>;
    /**
     * Register a component with the server
     */
    registerComponent(componentId: string): Promise<void>;
    /**
     * Invoke a component method on the server
     */
    invokeComponentMethod(componentId: string, methodName: string, args?: any): Promise<void>;
    /**
     * Update client state on the server (single key-value)
     */
    updateClientState(componentId: string, key: string, value: any): Promise<void>;
    /**
     * Update multiple client-computed state values on the server
     * Used for external library computations (lodash, moment, etc.)
     */
    updateClientComputedState(componentId: string, computedValues: Record<string, any>): Promise<void>;
    /**
     * Update component state on the server (from useState hook)
     * This keeps server state in sync with client state changes
     */
    updateComponentState(componentId: string, stateKey: string, value: any): Promise<void>;
    /**
     * Update DOM element state on the server (from useDomElementState hook)
     * This keeps server aware of DOM changes for accurate rendering
     */
    updateDomElementState(componentId: string, stateKey: string, snapshot: any): Promise<void>;
    /**
     * Update component state with array operation metadata
     * This provides semantic intent for array mutations, enabling precise template extraction
     */
    updateComponentStateWithOperation(componentId: string, stateKey: string, newValue: any, operation: ArrayOperation): Promise<void>;
    /**
     * Update query results on the server (from useDomQuery hook)
     * This keeps server aware of query results for accurate rendering
     */
    updateQueryResults(componentId: string, queryKey: string, results: any[]): Promise<void>;
    /**
     * Generic invoke method for calling server hub methods
     */
    invoke(methodName: string, ...args: any[]): Promise<void>;
    /**
     * Subscribe to events
     */
    on(event: string, handler: Function): void;
    /**
     * Unsubscribe from events
     */
    off(event: string, handler: Function): void;
    /**
     * Emit event to subscribers
     */
    private emit;
    /**
     * Debug logging
     */
    private log;
    /**
     * Get connection state
     * Maps SignalM ConnectionState to SignalR HubConnectionState for compatibility
     */
    get state(): string;
    /**
     * Get connection ID
     * SignalM doesn't expose connection IDs (always returns null)
     */
    get connectionId(): string | null;
}
