/**
 * State Proxy - Compile-time construct for TypeScript IntelliSense
 *
 * This proxy provides type-safe access to component state, including lifted child state.
 * It is a COMPILE-TIME ONLY construct that gets transpiled to C# State property access.
 *
 * ⚠️ NEVER executes at runtime - the Babel plugin replaces all usages during transpilation.
 *
 * @example
 * // Basic usage
 * import { state } from 'minimact';
 * const value = state.myKey;  // → State["myKey"] in C#
 *
 * @example
 * // Lifted state (accessing child component state)
 * const childValue = state["ChildComponent.key"];  // → State["ChildComponent.key"] in C#
 *
 * @example
 * // Type-safe usage
 * interface MyState {
 *   count: number;
 *   "Child.isOpen": boolean;
 * }
 * const s = state as ComponentState<MyState>;
 * const count = s.count;  // ✅ Type: number
 */
export declare const state: Record<string, any>;
/**
 * Type-safe state interface for component state
 *
 * Define your component's state shape for full IntelliSense support.
 *
 * @example
 * interface MyComponentState {
 *   count: number;
 *   message: string;
 *   isOpen: boolean;
 *
 *   // Lifted child state (namespaced with component name)
 *   "ChildComponent.value": string;
 *   "ChildComponent.isValid": boolean;
 * }
 *
 * export default function MyComponent() {
 *   const s = state as ComponentState<MyComponentState>;
 *   const count = s.count;  // ✅ Type: number (IntelliSense works!)
 * }
 */
export type ComponentState<T = Record<string, any>> = T;
/**
 * Alternative export name for ComponentState
 */
export type State<T = Record<string, any>> = ComponentState<T>;
/**
 * Set state value (including lifted child state)
 *
 * This is a COMPILE-TIME ONLY construct that gets transpiled to C# SetState() calls.
 * It NEVER executes at runtime - the Babel plugin replaces it during transpilation.
 *
 * @example
 * // Set own state
 * import { setState } from 'minimact';
 * setState('myKey', 'myValue');  // → SetState("myKey", "myValue") in C#
 *
 * @example
 * // Set child state (lifted state pattern)
 * setState('ChildComponent.key', value);  // → SetState("ChildComponent.key", value) in C#
 *
 * @example
 * // Parent controlling child state
 * const handleReset = () => {
 *   setState("Counter.count", 0);
 *   setState("Timer.seconds", 0);
 * };
 */
export declare function setState(key: string, value: any): void;
