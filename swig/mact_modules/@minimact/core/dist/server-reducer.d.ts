/**
 * Server Reducer - Client-side representation of a reducer that executes on the server
 *
 * Similar to React's useReducer, but the reducer function runs on the server side.
 * This allows complex state transitions with validation, side effects, and database
 * operations to happen server-side while maintaining reactive UI updates.
 */
/**
 * Server reducer interface - Represents a reducer executing on the server
 */
export interface ServerReducer<TState, TAction> {
    state: TState;
    dispatch(action: TAction): void;
    dispatchAsync(action: TAction): Promise<TState>;
    readonly dispatching: boolean;
    readonly error?: Error;
    lastDispatchedAt?: Date;
    lastActionType?: string;
}
/**
 * Server reducer implementation
 */
export declare class ServerReducerImpl<TState, TAction> implements ServerReducer<TState, TAction> {
    private reducerId;
    private componentId;
    private signalR;
    private context;
    state: TState;
    dispatching: boolean;
    error?: Error;
    lastDispatchedAt?: Date;
    lastActionType?: string;
    private _pendingPromise?;
    private _pendingResolve?;
    private _pendingReject?;
    constructor(reducerId: string, componentId: string, signalR: any, context: any, initialState: TState);
    /**
     * Dispatch an action to the server (fire-and-forget)
     */
    dispatch(action: TAction): void;
    /**
     * Dispatch an action to the server and wait for the result
     */
    dispatchAsync(action: TAction): Promise<TState>;
    /**
     * Update reducer state from server
     * Called by Minimact when server sends reducer state updates via SignalR
     */
    _updateFromServer(newState: TState, error?: string): void;
    /**
     * Trigger component re-render
     * Uses hint queue to check for predicted patches
     */
    private _triggerRerender;
}
