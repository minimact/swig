/**
 * Client-Computed State Manager
 *
 * Manages variables that are computed on the client using external libraries
 * (lodash, moment, etc.) and syncs them to the server for SSR.
 *
 * This enables Option 1 auto-detection: developers use external libraries
 * naturally, and the system automatically handles client-server sync.
 */
/**
 * A function that computes a value based on component state
 */
export type ComputeFunction = () => any;
export declare function setDebugLogging(enabled: boolean): void;
/**
 * Register a client-computed variable for a component
 *
 * @param componentId - Unique identifier for the component
 * @param varName - Name of the variable being computed
 * @param computeFn - Function that computes the value
 * @param dependencies - Optional list of state keys this variable depends on
 */
export declare function registerClientComputed(componentId: string, varName: string, computeFn: ComputeFunction, dependencies?: string[]): void;
/**
 * Compute a single variable's value
 *
 * @param componentId - Component identifier
 * @param varName - Variable name
 * @returns The computed value or undefined if not found
 */
export declare function computeVariable(componentId: string, varName: string): any;
/**
 * Compute all client-computed variables for a component
 *
 * @param componentId - Component identifier
 * @returns Object with all computed values
 */
export declare function computeAllForComponent(componentId: string): Record<string, any>;
/**
 * Compute only variables that depend on a specific state key
 *
 * @param componentId - Component identifier
 * @param changedStateKey - State key that changed
 * @returns Object with affected computed values
 */
export declare function computeDependentVariables(componentId: string, changedStateKey: string): Record<string, any>;
/**
 * Get the last computed value without recomputing
 *
 * @param componentId - Component identifier
 * @param varName - Variable name
 * @returns The last computed value or undefined
 */
export declare function getLastValue(componentId: string, varName: string): any;
/**
 * Get all last computed values without recomputing
 *
 * @param componentId - Component identifier
 * @returns Object with all last computed values
 */
export declare function getAllLastValues(componentId: string): Record<string, any>;
/**
 * Check if a component has any client-computed variables
 *
 * @param componentId - Component identifier
 * @returns True if component has computed variables
 */
export declare function hasClientComputed(componentId: string): boolean;
/**
 * Get list of all computed variable names for a component
 *
 * @param componentId - Component identifier
 * @returns Array of variable names
 */
export declare function getComputedVariableNames(componentId: string): string[];
/**
 * Clear all computed variables for a component
 * Used when component is unmounted
 *
 * @param componentId - Component identifier
 */
export declare function clearComponent(componentId: string): void;
/**
 * Clear all computed variables (for testing/cleanup)
 */
export declare function clearAll(): void;
/**
 * Get debug info about registered computations
 * Useful for dev tools / debugging
 */
export declare function getDebugInfo(): {
    componentCount: number;
    components: Record<string, {
        variableCount: number;
        variables: string[];
    }>;
};
