import { Patch } from './types';
/**
 * Manages hint queue for usePredictHint
 * Stores pre-computed patches and applies them when state changes match
 */
export declare class HintQueue {
    private hints;
    private debugLogging;
    private maxHintAge;
    constructor(options?: {
        debugLogging?: boolean;
    });
    /**
     * Queue a hint from the server
     */
    queueHint(data: {
        componentId: string;
        hintId: string;
        patches: Patch[];
        confidence: number;
        predictedState: Record<string, any>;
    }): void;
    /**
     * Check if a state change matches any queued hint
     * Returns patches if match found, null otherwise
     */
    matchHint(componentId: string, stateChanges: Record<string, any>): {
        hintId: string;
        patches: Patch[];
        confidence: number;
    } | null;
    /**
     * Check if predicted state matches actual state change
     */
    private stateMatches;
    /**
     * Remove hints older than maxHintAge
     */
    private cleanupStaleHints;
    /**
     * Clear all hints for a component
     */
    clearComponent(componentId: string): void;
    /**
     * Clear all hints
     */
    clearAll(): void;
    /**
     * Get stats about queued hints
     */
    getStats(): {
        totalHints: number;
        templateHints: number;
        concreteHints: number;
        templatePercentage: number;
        hintsByComponent: Record<string, number>;
    };
    private log;
}
