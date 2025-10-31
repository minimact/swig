import { HintQueue } from './hint-queue';
import { DOMPatcher } from './dom-patcher';
import { PlaygroundBridge } from './playground-bridge';
import { IConnectionManager } from './connection-manager';
import { ServerTask, ServerTaskImpl, ServerTaskOptions } from './server-task';
import { ServerReducer, ServerReducerImpl } from './server-reducer';
/**
 * Component instance context for hooks
 */
export interface ComponentContext {
    componentId: string;
    element: HTMLElement;
    state: Map<string, any>;
    effects: Array<{
        callback: () => void | (() => void);
        deps: any[] | undefined;
        cleanup?: () => void;
    }>;
    refs: Map<string, {
        current: any;
    }>;
    serverTasks?: Map<string, ServerTaskImpl<any>>;
    serverReducers?: Map<string, ServerReducerImpl<any, any>>;
    computedValues?: Map<string, any>;
    hintQueue: HintQueue;
    domPatcher: DOMPatcher;
    playgroundBridge?: PlaygroundBridge;
    signalR: IConnectionManager;
}
/**
 * Set the current component context (called before render)
 */
export declare function setComponentContext(context: ComponentContext): void;
/**
 * Clear the current component context (called after render)
 */
export declare function clearComponentContext(): void;
/**
 * useState hook - manages component state with hint queue integration
 */
export declare function useState<T>(initialValue: T): [T, (newValue: T | ((prev: T) => T)) => void];
/**
 * useEffect hook - runs side effects after render
 */
export declare function useEffect(callback: () => void | (() => void), deps?: any[]): void;
/**
 * useRef hook - creates a mutable ref object
 */
export declare function useRef<T>(initialValue: T): {
    current: T;
};
/**
 * Cleanup all effects for a component
 */
export declare function cleanupEffects(context: ComponentContext): void;
/**
 * Array operation metadata for semantic state updates
 * @public
 */
export interface ArrayOperation {
    type: 'Append' | 'Prepend' | 'InsertAt' | 'RemoveAt' | 'UpdateAt';
    index?: number;
    item?: any;
}
/**
 * Enhanced state setter with array helper methods
 */
export interface ArrayStateSetter<T> {
    (newValue: T[] | ((prev: T[]) => T[])): void;
    append(item: T): void;
    prepend(item: T): void;
    insertAt(index: number, item: T): void;
    removeAt(index: number): void;
    updateAt(index: number, updates: Partial<T> | ((prev: T) => T)): void;
    clear(): void;
    appendMany(items: T[]): void;
    removeMany(indices: number[]): void;
    removeWhere(predicate: (item: T) => boolean): void;
    updateWhere(predicate: (item: T) => boolean, updates: Partial<T>): void;
}
/**
 * useServerTask - Execute long-running operations on the server with reactive client state
 *
 * @param taskFactory - Optional async function (will be transpiled to C# by Babel plugin)
 * @param options - Configuration options for the server task
 * @returns ServerTask interface with status, result, and control methods
 *
 * @example
 * const analysis = useServerTask(async () => {
 *   // This code runs on the SERVER (transpiled to C#)
 *   const data = await fetchData();
 *   return processData(data);
 * });
 *
 * // In JSX:
 * <button onClick={analysis.start}>Start</button>
 * {analysis.running && <Spinner />}
 * {analysis.complete && <div>{analysis.result}</div>}
 */
export declare function useServerTask<T>(taskFactory?: () => Promise<T>, options?: ServerTaskOptions): ServerTask<T>;
/**
 * useServerReducer - React-like reducer that executes on the server
 *
 * Similar to React's useReducer, but the reducer function runs on the server side.
 * This allows complex state transitions with validation, side effects, and database
 * operations to happen server-side while maintaining reactive UI updates.
 *
 * @example
 * ```tsx
 * type CounterState = { count: number };
 * type CounterAction = { type: 'increment' } | { type: 'decrement' } | { type: 'set', value: number };
 *
 * const counter = useServerReducer<CounterState, CounterAction>({ count: 0 });
 *
 * // In JSX:
 * <button onClick={() => counter.dispatch({ type: 'increment' })}>+</button>
 * <span>{counter.state.count}</span>
 * <button onClick={() => counter.dispatch({ type: 'decrement' })}>-</button>
 * {counter.dispatching && <Spinner />}
 * {counter.error && <div>Error: {counter.error.message}</div>}
 * ```
 *
 * @example
 * ```tsx
 * // With async dispatch (await the result)
 * const handleReset = async () => {
 *   const newState = await counter.dispatchAsync({ type: 'set', value: 0 });
 *   console.log('Counter reset to:', newState.count);
 * };
 * ```
 */
export declare function useServerReducer<TState, TAction>(initialState: TState): ServerReducer<TState, TAction>;
