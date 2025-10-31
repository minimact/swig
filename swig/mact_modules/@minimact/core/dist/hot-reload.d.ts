/**
 * Minimact Hot Reload - Template-Based Approach
 *
 * Uses parameterized templates extracted at build time for INSTANT hot reload
 * Target: <5ms for all text/attribute edits
 * Memory: ~2KB per component (98% less than prediction-based)
 * Coverage: 100% (works with any value)
 *
 * Architecture:
 * - Build time: Babel plugin extracts templates from JSX
 * - Init: Load .templates.json files
 * - Hot reload: Apply template patches directly
 * - Fallback: Server re-render for structural changes (~150ms)
 */
import { type TemplateMap, type TemplatePatch } from './template-state';
import type { DOMPatcher } from './dom-patcher';
interface Minimact {
    domPatcher: DOMPatcher;
    getComponent(componentId: string): any;
}
export interface HotReloadConfig {
    enabled: boolean;
    wsUrl?: string;
    debounceMs: number;
    showNotifications: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
}
export interface HotReloadMessage {
    type: 'file-change' | 'template-patch' | 'template-map' | 'rerender-complete' | 'error' | 'connected';
    componentId?: string;
    filePath?: string;
    code?: string;
    vnode?: any;
    error?: string;
    timestamp: number;
    templatePatch?: TemplatePatch;
    templateMap?: TemplateMap;
}
export interface HotReloadMetrics {
    lastUpdateTime: number;
    updateCount: number;
    averageLatency: number;
    cacheHits: number;
    cacheMisses: number;
    errors: number;
}
/**
 * Hot Reload Manager
 * Handles client-side hot reload with optimistic updates
 */
export declare class HotReloadManager {
    private ws;
    private config;
    private minimact;
    private metrics;
    private previousVNodes;
    private previousTsx;
    private tsxPredictionCache;
    private detector;
    private pendingVerifications;
    private reconnectAttempts;
    private maxReconnectAttempts;
    constructor(minimact: Minimact, config?: Partial<HotReloadConfig>);
    /**
     * Get default WebSocket URL based on current location
     */
    private getDefaultWsUrl;
    /**
     * Connect to hot reload WebSocket server
     */
    private connect;
    /**
     * Attempt to reconnect to WebSocket
     */
    private attemptReconnect;
    /**
     * Handle incoming WebSocket message
     */
    private handleMessage;
    /**
     * Handle file change - PREDICTIVE MAPPING APPROACH
     * Try prediction cache first (0-5ms), fall back to server (150ms)
     */
    private handleFileChange;
    /**
     * Request server to re-render component (naive fallback)
     */
    private requestServerRerender;
    /**
     * Verify with server in background (non-blocking)
     */
    private verifyWithServer;
    /**
     * Handle template map initialization
     * Load templates from .templates.json file
     */
    private handleTemplateMap;
    /**
     * Handle template patch from hot reload
     * INSTANT update: <5ms for all text/attribute changes
     */
    private handleTemplatePatch;
    /**
     * Find DOM element by path array
     * Example: [0, 1, 0] → first child, second child, first child
     */
    private findElementByPath;
    /**
     * Populate TSX prediction cache from server hints
     * This integrates with the existing usePredictHint system
     */
    populateTsxCache(hint: any): void;
    /**
     * Handle error from server
     */
    private handleError;
    /**
     * Compute patches between two VNodes
     * Simple diff algorithm for MVP
     */
    private computePatches;
    /**
     * Check if two VNodes match
     */
    private vnodesMatch;
    /**
     * Flash component to show update
     */
    private flashComponent;
    /**
     * Update metrics
     */
    private updateMetrics;
    /**
     * Show toast notification
     */
    private showToast;
    /**
     * Log message
     */
    private log;
    /**
     * Get current metrics
     */
    getMetrics(): HotReloadMetrics;
    /**
     * Enable hot reload
     */
    enable(): void;
    /**
     * Disable hot reload
     */
    disable(): void;
    /**
     * Cleanup
     */
    dispose(): void;
}
export {};
