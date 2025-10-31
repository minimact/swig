/**
 * Bridge for communicating prediction events to playground parent window
 * Emits postMessage events that the React playground can listen to
 */
export declare class PlaygroundBridge {
    private debugLogging;
    constructor(options?: {
        debugLogging?: boolean;
    });
    /**
     * Notify that a prediction was received from server
     */
    predictionReceived(data: {
        componentId: string;
        hintId: string;
        patchCount: number;
        confidence: number;
    }): void;
    /**
     * Notify that a cache hit occurred (instant patch application)
     */
    cacheHit(data: {
        componentId: string;
        hintId: string;
        latency: number;
        confidence: number;
        patchCount: number;
    }): void;
    /**
     * Notify that a cache miss occurred (had to compute on server)
     */
    cacheMiss(data: {
        componentId: string;
        methodName: string;
        latency: number;
        patchCount: number;
    }): void;
    /**
     * Notify that a correction was applied (prediction was wrong)
     */
    correctionApplied(data: {
        componentId: string;
        patchCount: number;
    }): void;
    /**
     * Post message to parent window (for iframe communication)
     */
    private postMessage;
    private log;
}
