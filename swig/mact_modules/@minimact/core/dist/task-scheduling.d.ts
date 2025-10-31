/**
 * Task scheduling hooks for fine-grained render timing control
 * useMicroTask - runs before paint (microtask queue)
 * useMacroTask - runs after paint (task queue)
 */
/**
 * Hook: useMicroTask
 * Schedules a callback to run in the microtask queue (before next paint)
 * Perfect for: DOM measurements, layout calculations, critical updates
 */
export declare function useMicroTask(callback: () => void): void;
/**
 * Hook: useMacroTask
 * Schedules a callback to run in the task queue (after paint)
 * Perfect for: Analytics, logging, non-critical updates, deferred work
 */
export declare function useMacroTask(callback: () => void, delay?: number): void;
/**
 * Hook: useAnimationFrame
 * Schedules a callback for the next animation frame
 * Perfect for: Animations, visual updates, smooth transitions
 */
export declare function useAnimationFrame(callback: (timestamp: number) => void): number;
/**
 * Hook: useIdleCallback
 * Schedules a callback for when the browser is idle
 * Perfect for: Low-priority work, background tasks, optimization
 */
export declare function useIdleCallback(callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions): number;
/**
 * Cancel an animation frame
 */
export declare function cancelAnimationFrame(id: number): void;
/**
 * Cancel an idle callback
 */
export declare function cancelIdleCallback(id: number): void;
