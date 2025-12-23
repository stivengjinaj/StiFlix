class CacheService {
    constructor() {
        this.cache = new Map();
        this.timestamps = new Map();
        this.cacheDuration = 1000 * 60 * 30;
    }

    set(key, data) {
        this.cache.set(key, data);
        this.timestamps.set(key, Date.now());
    }

    get(key) {
        if (!this.cache.has(key)) return null;

        const timestamp = this.timestamps.get(key);
        const isExpired = Date.now() - timestamp > this.cacheDuration;

        if (isExpired) {
            this.cache.delete(key);
            this.timestamps.delete(key);
            return null;
        }

        return this.cache.get(key);
    }

    clear() {
        this.cache.clear();
        this.timestamps.clear();
    }
}

export default CacheService;