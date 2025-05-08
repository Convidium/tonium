type CacheEntry<T> = {
    value: T;
    timestamp: number;
    frequency: number;
};

type EvictionPolicy = 'LRU' | 'LFU' | 'TIME' | 'CUSTOM';

interface MemoOptions<TArgs extends any[], TResult> {
    maxSize?: number;
    ttl?: number; // ttl in ms
    policy?: EvictionPolicy;
    customEvict?: (cache: Map<string, CacheEntry<TResult>>) => void;
    serializeArgs?: (...args: TArgs) => string;
}

export function memoize<TArgs extends any[], TResult>(
    fn: (...args: TArgs) => TResult | Promise<TResult>,
    {
        maxSize = Infinity,
        ttl,
        policy = 'LRU',
        customEvict,
        serializeArgs = (...args) => JSON.stringify(args),
    }: MemoOptions<TArgs, TResult> = {}
): (...args: TArgs) => Promise<TResult> {
    const cache = new Map<string, CacheEntry<TResult>>();

    const evict = () => {
        if (cache.size <= maxSize) return;

        if (policy === 'CUSTOM' && customEvict) {
            customEvict(cache);
        } else if (policy === 'LFU') {
            let leastUsedKey: string | null = null;
            let minFreq = Infinity;

            for (const [key, entry] of cache.entries()) {
                if (entry.frequency < minFreq) {
                    minFreq = entry.frequency;
                    leastUsedKey = key;
                }
            }
            if (leastUsedKey) cache.delete(leastUsedKey);
        } else {
            // LRU or default
            const oldest = [...cache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
            if (oldest) cache.delete(oldest[0]);
        }
    };

    return async (...args: TArgs): Promise<TResult> => {
        const key = serializeArgs(...args);
        const now = Date.now();

        const cached = cache.get(key);
        if (cached) {
            if (ttl && now - cached.timestamp > ttl) {
                cache.delete(key); // expired
            } else {
                cached.timestamp = now;
                cached.frequency++;
                return cached.value;
            }
        }

        const result = await Promise.resolve(fn(...args));
        cache.set(key, { value: result, timestamp: now, frequency: 1 });

        if (cache.size > maxSize) {
            evict();
        }

        return result;
    };
}