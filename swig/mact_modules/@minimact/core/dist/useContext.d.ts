/**
 * useContext - Server-side cache system with multiple scope types
 *
 * This reimagines React's context API as a Redis-like in-memory cache
 * that enables shared state across components with flexible lifetime management.
 */
import type { ComponentContext } from './hooks';
export interface ContextOptions {
    scope?: 'request' | 'session' | 'application' | 'url';
    urlPattern?: string;
    expiry?: number;
    defaultValue?: any;
}
export interface Context<T> {
    key: string;
    options: ContextOptions;
}
/**
 * Set the current component context for hook execution
 * Called internally by Minimact before rendering
 */
export declare function setContextHookContext(context: ComponentContext): void;
/**
 * Clear the current component context after rendering
 * Called internally by Minimact after rendering
 */
export declare function clearContextHookContext(): void;
/**
 * Create a context with specified scope and options
 *
 * @example
 * // Session-scoped user context
 * const UserContext = createContext<User>('current-user', {
 *   scope: 'session',
 *   expiry: 3600000 // 1 hour
 * });
 *
 * @example
 * // URL-scoped dashboard filters
 * const DashboardFilters = createContext<Filters>('dashboard-filters', {
 *   scope: 'url',
 *   urlPattern: '/dashboard/*',
 *   expiry: 3600000
 * });
 */
export declare function createContext<T>(key: string, options?: ContextOptions): Context<T>;
/**
 * Use a context - returns [value, setValue, clearValue]
 *
 * Unlike React's useContext, this doesn't require a Provider component.
 * The context is stored server-side in a cache with the specified scope.
 *
 * @returns Tuple of [value, setValue, clearValue]
 *
 * @example
 * // Read and write to context
 * function LoginForm() {
 *   const [_, setUser] = useContext(UserContext);
 *
 *   const handleLogin = async (credentials) => {
 *     const user = await authenticate(credentials);
 *     setUser(user); // Stored in session-scoped cache
 *   };
 *
 *   return <form onSubmit={handleLogin}>...</form>;
 * }
 *
 * @example
 * // Read from context (different component, no parent-child relationship needed)
 * function UserProfile() {
 *   const [user] = useContext(UserContext);
 *
 *   if (!user) return <Login />;
 *   return <div>Welcome, {user.name}</div>;
 * }
 */
export declare function useContext<T>(context: Context<T>): [T | undefined, (value: T) => void, () => void];
