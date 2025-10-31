/**
 * SignalR hook state
 */
export interface SignalRHookState<T = any> {
    data: T | null;
    error: string | null;
    connected: boolean;
    connectionId: string | null;
}
/**
 * Hook: useSignalR
 * Connects to a SignalR hub and provides real-time updates
 *
 * Usage:
 * const notifications = useSignalR('/hubs/notifications', (message) => {
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
