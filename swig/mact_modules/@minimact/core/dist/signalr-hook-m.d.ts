/**
 * SignalR hook state (lightweight SignalM implementation)
 */
export interface SignalRHookState<T = any> {
    data: T | null;
    error: string | null;
    connected: boolean;
    connectionId: string | null;
}
/**
 * Hook: useSignalR
 * Connects to a SignalR hub using the lightweight SignalM client
 *
 * This is the SignalM-based implementation of useSignalR.
 * It connects to server-side SignalR hubs but uses the lightweight SignalM client.
 * Bundle size: ~3 KB vs 15 KB for full SignalR client.
 *
 * Usage:
 * const notifications = useSignalR('/minimact', (message) => {
 *   console.log('New notification:', message);
 * });
 */
export declare function useSignalR<T = any>(hubUrl: string, onMessage?: (data: T) => void, options?: {
    reconnectInterval?: number;
    debugLogging?: boolean;
    autoConnect?: boolean;
}): {
    state: SignalRHookState<T>;
    send: (methodName: string, ...args: any[]) => Promise<void>;
    on: (methodName: string, handler: (...args: any[]) => void) => void;
    off: (methodName: string, handler: (...args: any[]) => void) => void;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
};
