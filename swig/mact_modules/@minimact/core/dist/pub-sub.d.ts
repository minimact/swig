/**
 * Client-side pub/sub event aggregator
 * Enables component-to-component communication without prop drilling
 */
export interface PubSubMessage<T = any> {
    value: T;
    error?: string;
    waiting?: number;
    source?: string;
    timestamp: number;
    isStale?: boolean;
}
type Subscriber<T = any> = (message: PubSubMessage<T>) => void;
/**
 * Global event aggregator for client-side pub/sub
 */
declare class EventAggregator {
    private channels;
    private debugLogging;
    constructor(options?: {
        debugLogging?: boolean;
    });
    /**
     * Subscribe to a channel
     */
    subscribe<T = any>(channel: string, callback?: Subscriber<T>): PubSubMessage<T>;
    /**
     * Unsubscribe from a channel
     */
    unsubscribe(channel: string, callback: Subscriber): void;
    /**
     * Publish a message to a channel
     */
    publish<T = any>(channel: string, value: T, options?: {
        source?: string;
        error?: string;
        waiting?: number;
    }): void;
    /**
     * Clear a channel
     */
    clear(channel: string): void;
    /**
     * Clear all channels
     */
    clearAll(): void;
    /**
     * Get stats
     */
    getStats(): {
        totalChannels: number;
        channels: {
            name: string;
            subscribers: number;
            hasLastMessage: boolean;
        }[];
    };
    private log;
}
export declare function getEventAggregator(options?: {
    debugLogging?: boolean;
}): EventAggregator;
/**
 * Hook: usePub - Publish to a channel
 */
export declare function usePub<T = any>(channel: string): (value: T, options?: {
    source?: string;
    error?: string;
    waiting?: number;
}) => void;
/**
 * Hook: useSub - Subscribe to a channel
 */
export declare function useSub<T = any>(channel: string, callback?: (message: PubSubMessage<T>) => void): PubSubMessage<T>;
export {};
