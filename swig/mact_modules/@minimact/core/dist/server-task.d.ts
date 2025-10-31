/**
 * Server Task - Client-side representation of a long-running server task
 *
 * Provides reactive state management for async operations that execute on the server.
 * Automatically syncs state changes from server and triggers component re-renders.
 */
export type ServerTaskStatus = 'idle' | 'running' | 'complete' | 'error' | 'cancelled';
/**
 * Options for configuring a server task
 */
export interface ServerTaskOptions {
    /** Enable streaming mode (for async generators) */
    stream?: boolean;
    /** Estimated number of chunks (for progress calculation in streaming mode) */
    estimatedChunks?: number;
    /** Callback invoked for each chunk in streaming mode */
    onChunk?: (chunk: any, index: number) => void;
    /** Maximum number of chunks to keep in memory (for memory management) */
    maxChunksInMemory?: number;
}
/**
 * Server task interface - Represents a long-running operation on the server
 */
export interface ServerTask<T> {
    status: ServerTaskStatus;
    progress: number;
    result?: T;
    error?: Error;
    streaming: boolean;
    partial?: T;
    chunks: T[];
    chunkCount: number;
    start(...args: any[]): void;
    retry(...args: any[]): void;
    cancel(): void;
    promise: Promise<T>;
    startedAt?: Date;
    completedAt?: Date;
    duration?: number;
    readonly idle: boolean;
    readonly running: boolean;
    readonly complete: boolean;
    readonly failed: boolean;
    readonly cancelled: boolean;
}
/**
 * Server task implementation
 */
export declare class ServerTaskImpl<T> implements ServerTask<T> {
    private taskId;
    private componentId;
    private signalR;
    private context;
    status: ServerTaskStatus;
    progress: number;
    result?: T;
    error?: Error;
    startedAt?: Date;
    completedAt?: Date;
    duration?: number;
    streaming: boolean;
    partial?: T;
    chunks: T[];
    chunkCount: number;
    private _promise?;
    private _resolve?;
    private _reject?;
    private _options;
    constructor(taskId: string, componentId: string, signalR: any, context: any, options?: ServerTaskOptions);
    private _createPromise;
    get promise(): Promise<T>;
    get idle(): boolean;
    get running(): boolean;
    get complete(): boolean;
    get failed(): boolean;
    get cancelled(): boolean;
    /**
     * Start the server task with optional arguments
     */
    start(...args: any[]): void;
    /**
     * Retry a failed or cancelled task
     */
    retry(...args: any[]): void;
    /**
     * Cancel a running task
     */
    cancel(): void;
    /**
     * Update task state from server
     * Called by Minimact when server sends task state updates via SignalR
     */
    _updateFromServer(state: any): void;
    /**
     * Trigger component re-render
     * Uses hint queue to check for predicted patches
     */
    private _triggerRerender;
}
