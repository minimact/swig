/**
 * useComputed Hook
 *
 * Compute values on the client using browser-only APIs or external libraries,
 * then sync to the server for rendering.
 *
 * This replaces the conceptually flawed "useClientState" with a sound approach:
 * - Client computes values using browser APIs (lodash, moment, geolocation, crypto)
 * - Results are synced to server via UpdateClientComputedState
 * - Server accesses values via GetClientState<T>(key) for rendering
 * - Server still does ALL rendering (dehydrationist architecture)
 */
import type { ComponentContext } from './hooks';
export interface UseComputedOptions<T = any> {
    /** Enable memoization (default: true) */
    memoize?: boolean;
    /** Cache expiry in milliseconds (e.g., 5000 = 5 seconds) */
    expiry?: number;
    /** Debounce sync to server (milliseconds) */
    debounce?: number;
    /** Throttle sync to server (milliseconds) */
    throttle?: number;
    /** Initial value before first computation */
    initialValue?: T;
}
/**
 * Set the current component context for useComputed
 * Called by setComponentContext in hooks.ts
 */
export declare function setComputedContext(context: ComponentContext): void;
/**
 * Clear the current component context
 */
export declare function clearComputedContext(): void;
/**
 * useComputed Hook
 *
 * @param key - Unique identifier for server-side access via GetClientState<T>(key)
 * @param computeFn - Function that computes the value (runs on client)
 * @param deps - Dependency array (like useEffect)
 * @param options - Configuration options
 * @returns The computed value
 *
 * @example
 * // With lodash
 * const sortedUsers = useComputed('sortedUsers', () => {
 *   return _.sortBy(users, 'name');
 * }, [users]);
 *
 * @example
 * // With geolocation
 * const location = useComputed('location', async () => {
 *   const pos = await new Promise((resolve) => {
 *     navigator.geolocation.getCurrentPosition(resolve);
 *   });
 *   return { lat: pos.coords.latitude, lng: pos.coords.longitude };
 * }, []);
 *
 * @example
 * // With memoization and expiry
 * const result = useComputed('result', () => compute(data), [data], {
 *   memoize: true,
 *   expiry: 5000  // Cache for 5 seconds
 * });
 */
export declare function useComputed<T>(key: string, computeFn: () => T, deps?: any[], options?: UseComputedOptions<T>): T;
