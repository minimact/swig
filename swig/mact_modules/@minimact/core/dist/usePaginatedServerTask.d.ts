/**
 * usePaginatedServerTask - Pagination built on useServerTask
 *
 * Extends the existing useServerTask infrastructure to add pagination capabilities.
 * Reuses transpilers, FFI bridge, and task runtime for zero additional complexity.
 */
/**
 * Pagination parameters passed to the fetch function
 */
export interface PaginationParams<TFilter = any> {
    page: number;
    pageSize: number;
    filters: TFilter;
}
/**
 * Options for configuring a paginated server task
 */
export interface PaginatedServerTaskOptions<T, TFilter = any> {
    /** Number of items per page (default: 20) */
    pageSize?: number;
    /** Function to get total count (for calculating total pages) */
    getTotalCount: (filters: TFilter) => Promise<number>;
    /** Enable automatic prefetching of next page (default: false) */
    prefetchNext?: boolean;
    /** Enable automatic prefetching of previous page (default: false) */
    prefetchPrev?: boolean;
    /** Dependencies that trigger re-fetch when changed */
    dependencies?: any[];
    /** Runtime selection: 'csharp' or 'rust' (inherited from useServerTask) */
    runtime?: 'csharp' | 'rust';
    /** Enable parallel execution (for Rust runtime with Rayon) */
    parallel?: boolean;
}
/**
 * Paginated server task result
 */
export interface PaginatedServerTask<T> {
    items: T[];
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
    pending: boolean;
    error?: string;
    hasNext: boolean;
    hasPrev: boolean;
    next: () => void;
    prev: () => void;
    goto: (page: number) => void;
    refresh: () => void;
    _fetchTask: any;
    _countTask: any;
}
/**
 * usePaginatedServerTask Hook
 *
 * Wraps useServerTask to provide pagination with intelligent prefetching.
 *
 * @example
 * const users = usePaginatedServerTask(
 *   async ({ page, pageSize, filters }) => {
 *     return await db.users
 *       .where(u => filters.role ? u.role === filters.role : true)
 *       .skip((page - 1) * pageSize)
 *       .take(pageSize)
 *       .toList();
 *   },
 *   {
 *     pageSize: 20,
 *     getTotalCount: async (filters) => {
 *       return await db.users
 *         .where(u => filters.role ? u.role === filters.role : true)
 *         .count();
 *     },
 *     prefetchNext: true,
 *     dependencies: [filters]
 *   }
 * );
 */
export declare function usePaginatedServerTask<T, TFilter = any>(fetchFn: (params: PaginationParams<TFilter>) => Promise<T[]>, options: PaginatedServerTaskOptions<T, TFilter>): PaginatedServerTask<T>;
