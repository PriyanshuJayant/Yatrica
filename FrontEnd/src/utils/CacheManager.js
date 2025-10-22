/**
 * Advanced Cache Manager
 * Handles multiple storage strategies with TTL, versioning, and quota management
 */

import { indexedDBManager } from './IndexedDBManager';

const CACHE_VERSION = '1.0.0';
const CACHE_PREFIX = 'yatrica_cache_';

/**
 * Storage Types
 */
export const StorageType = {
  MEMORY: 'memory',
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
  INDEXED_DB: 'indexedDB',
};

/**
 * Cache Strategies
 */
export const CacheStrategy = {
  CACHE_FIRST: 'cache-first',    // Try cache first, fallback to network
  NETWORK_FIRST: 'network-first', // Try network first, fallback to cache
  CACHE_ONLY: 'cache-only',       // Only use cache
  NETWORK_ONLY: 'network-only',   // Only use network
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate', // Return cache, fetch in background
};

/**
 * In-memory cache store
 */
const memoryCache = new Map();

/**
 * Cache Entry Structure
 */
class CacheEntry {
  constructor(data, ttl = null) {
    this.data = data;
    this.timestamp = Date.now();
    this.ttl = ttl; // Time to live in milliseconds
    this.version = CACHE_VERSION;
    this.accessCount = 0;
    this.lastAccessed = Date.now();
  }

  isExpired() {
    if (!this.ttl) return false;
    return Date.now() - this.timestamp > this.ttl;
  }

  access() {
    this.accessCount++;
    this.lastAccessed = Date.now();
  }
}

/**
 * Cache Manager Class
 */
export class CacheManager {
  constructor(options = {}) {
    this.defaultTTL = options.defaultTTL || 5 * 60 * 1000; // 5 minutes
    this.defaultStorage = options.defaultStorage || StorageType.MEMORY;
    this.maxMemoryEntries = options.maxMemoryEntries || 100;
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
    };
  }

  /**
   * Generate cache key with prefix
   */
  _getKey(key) {
    return `${CACHE_PREFIX}${key}`;
  }

  /**
   * Set cache entry
   */
  async set(key, data, options = {}) {
    const {
      ttl = this.defaultTTL,
      storage = this.defaultStorage,
    } = options;

    const cacheKey = this._getKey(key);
    const entry = new CacheEntry(data, ttl);

    try {
      switch (storage) {
        case StorageType.MEMORY:
          this._setMemory(cacheKey, entry);
          break;
        case StorageType.LOCAL:
          this._setLocalStorage(cacheKey, entry);
          break;
        case StorageType.SESSION:
          this._setSessionStorage(cacheKey, entry);
          break;
        case StorageType.INDEXED_DB:
          await this._setIndexedDB(cacheKey, entry);
          break;
        default:
          this._setMemory(cacheKey, entry);
      }

      this.stats.sets++;
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get cache entry
   */
  async get(key, options = {}) {
    const { storage = this.defaultStorage } = options;
    const cacheKey = this._getKey(key);

    let entry = null;

    try {
      switch (storage) {
        case StorageType.MEMORY:
          entry = this._getMemory(cacheKey);
          break;
        case StorageType.LOCAL:
          entry = this._getLocalStorage(cacheKey);
          break;
        case StorageType.SESSION:
          entry = this._getSessionStorage(cacheKey);
          break;
        case StorageType.INDEXED_DB:
          entry = await this._getIndexedDB(cacheKey);
          break;
        default:
          entry = this._getMemory(cacheKey);
      }

      // Check if entry exists and is not expired
      if (entry && !entry.isExpired()) {
        entry.access();
        this.stats.hits++;
        return entry.data;
      }

      // Entry expired or doesn't exist
      if (entry && entry.isExpired()) {
        await this.delete(key, { storage });
      }

      this.stats.misses++;
      return null;
    } catch (error) {
      this.stats.misses++;
      return null;
    }
  }

  /**
   * Delete cache entry
   */
  async delete(key, options = {}) {
    const { storage = this.defaultStorage } = options;
    const cacheKey = this._getKey(key);

    try {
      switch (storage) {
        case StorageType.MEMORY:
          memoryCache.delete(cacheKey);
          break;
        case StorageType.LOCAL:
          localStorage.removeItem(cacheKey);
          break;
        case StorageType.SESSION:
          sessionStorage.removeItem(cacheKey);
          break;
        case StorageType.INDEXED_DB:
          await this._deleteIndexedDB(cacheKey);
          break;
      }

      this.stats.deletes++;
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clear all cache entries
   */
  async clear(options = {}) {
    const { storage } = options;

    try {
      if (!storage || storage === StorageType.MEMORY) {
        memoryCache.clear();
      }

      if (!storage || storage === StorageType.LOCAL) {
        this._clearStorage(localStorage);
      }

      if (!storage || storage === StorageType.SESSION) {
        this._clearStorage(sessionStorage);
      }

      if (!storage || storage === StorageType.INDEXED_DB) {
        await this._clearIndexedDB();
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if key exists and is valid
   */
  async has(key, options = {}) {
    const data = await this.get(key, options);
    return data !== null;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0
      ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2)
      : 0;

    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      memorySize: memoryCache.size,
      localStorageSize: this._getStorageSize(localStorage),
      sessionStorageSize: this._getStorageSize(sessionStorage),
    };
  }

  /**
   * Reset statistics
   */
  resetStats() {
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
    };
  }

  // ==================== Private Methods ====================

  /**
   * Memory cache operations
   */
  _setMemory(key, entry) {
    // Implement LRU eviction if needed
    if (memoryCache.size >= this.maxMemoryEntries) {
      const oldestKey = this._findLRUKey();
      if (oldestKey) memoryCache.delete(oldestKey);
    }
    memoryCache.set(key, entry);
  }

  _getMemory(key) {
    return memoryCache.get(key);
  }

  _findLRUKey() {
    let oldestKey = null;
    let oldestTime = Date.now();

    for (const [key, entry] of memoryCache) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  /**
   * LocalStorage operations
   */
  _setLocalStorage(key, entry) {
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      // Quota exceeded, clear old entries
      if (error.name === 'QuotaExceededError') {
        this._clearOldEntries(localStorage);
        localStorage.setItem(key, JSON.stringify(entry));
      } else {
        throw error;
      }
    }
  }

  _getLocalStorage(key) {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      return Object.assign(new CacheEntry(null), parsed);
    } catch {
      return null;
    }
  }

  /**
   * SessionStorage operations
   */
  _setSessionStorage(key, entry) {
    try {
      sessionStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        this._clearOldEntries(sessionStorage);
        sessionStorage.setItem(key, JSON.stringify(entry));
      } else {
        throw error;
      }
    }
  }

  _getSessionStorage(key) {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      return Object.assign(new CacheEntry(null), parsed);
    } catch {
      return null;
    }
  }

  /**
   * IndexedDB operations
   */
  async _setIndexedDB(key, entry) {
    try {
      await indexedDBManager.set(key, entry.data, entry.ttl);
      return true;
    } catch (error) {
      return false;
    }
  }

  async _getIndexedDB(key) {
    try {
      const data = await indexedDBManager.get(key);
      if (data === null) return null;
      
      // Return as CacheEntry format
      const entry = new CacheEntry(data);
      return entry;
    } catch (error) {
      return null;
    }
  }

  async _deleteIndexedDB(key) {
    try {
      await indexedDBManager.delete(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  async _clearIndexedDB() {
    try {
      await indexedDBManager.clear();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Helper methods
   */
  _clearStorage(storage) {
    const keys = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        keys.push(key);
      }
    }
    keys.forEach(key => storage.removeItem(key));
  }

  _clearOldEntries(storage) {
    const entries = [];
    
    // Collect all cache entries
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        try {
          const item = JSON.parse(storage.getItem(key));
          entries.push({ key, timestamp: item.timestamp });
        } catch {
          // Invalid entry, remove it
          storage.removeItem(key);
        }
      }
    }

    // Sort by timestamp and remove oldest 25%
    entries.sort((a, b) => a.timestamp - b.timestamp);
    const toRemove = Math.ceil(entries.length * 0.25);
    
    for (let i = 0; i < toRemove; i++) {
      storage.removeItem(entries[i].key);
    }
  }

  _getStorageSize(storage) {
    let size = 0;
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        const item = storage.getItem(key);
        size += item ? item.length : 0;
      }
    }
    return `${(size / 1024).toFixed(2)} KB`;
  }
}

/**
 * Singleton instance
 */
export const cacheManager = new CacheManager({
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  defaultStorage: StorageType.MEMORY,
  maxMemoryEntries: 100,
});

export default cacheManager;
