/**
 * IndexedDB Utility
 * Handles large data storage with quota management and versioning
 */

const DB_NAME = 'YatricaCache';
const DB_VERSION = 1;
const STORE_NAME = 'cache';
const MAX_STORAGE_MB = 50; // Maximum storage limit

/**
 * IndexedDB Manager Class
 */
export class IndexedDBManager {
  constructor() {
    this.db = null;
    this.isSupported = this._checkSupport();
  }

  /**
   * Check if IndexedDB is supported
   */
  _checkSupport() {
    return typeof indexedDB !== 'undefined';
  }

  /**
   * Initialize database
   */
  async init() {
    if (!this.isSupported) {
      throw new Error('IndexedDB is not supported in this browser');
    }

    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          
          // Create indexes
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          objectStore.createIndex('size', 'size', { unique: false });
          objectStore.createIndex('ttl', 'ttl', { unique: false });
        }
      };
    });
  }

  /**
   * Set data in IndexedDB
   */
  async set(key, data, ttl = null) {
    await this.init();

    const size = this._calculateSize(data);
    const entry = {
      key,
      data,
      timestamp: Date.now(),
      ttl,
      size,
      accessCount: 0,
      lastAccessed: Date.now(),
    };

    // Check quota before storing
    const canStore = await this._checkQuota(size);
    if (!canStore) {
      await this._evictOldEntries();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.put(entry);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(new Error(`Failed to set data for key: ${key}`));
    });
  }

  /**
   * Get data from IndexedDB
   */
  async get(key) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.get(key);

      request.onsuccess = () => {
        const entry = request.result;

        if (!entry) {
          resolve(null);
          return;
        }

        // Check if expired
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
          this.delete(key);
          resolve(null);
          return;
        }

        // Update access count
        entry.accessCount++;
        entry.lastAccessed = Date.now();
        objectStore.put(entry);

        resolve(entry.data);
      };

      request.onerror = () => reject(new Error(`Failed to get data for key: ${key}`));
    });
  }

  /**
   * Delete data from IndexedDB
   */
  async delete(key) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.delete(key);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(new Error(`Failed to delete data for key: ${key}`));
    });
  }

  /**
   * Check if key exists
   */
  async has(key) {
    const data = await this.get(key);
    return data !== null;
  }

  /**
   * Get all keys
   */
  async getAllKeys() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.getAllKeys();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get all keys'));
    });
  }

  /**
   * Get all entries
   */
  async getAll() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get all entries'));
    });
  }

  /**
   * Clear all data
   */
  async clear() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(new Error('Failed to clear IndexedDB'));
    });
  }

  /**
   * Get storage usage statistics
   */
  async getStats() {
    await this.init();

    const entries = await this.getAll();
    
    let totalSize = 0;
    let expiredCount = 0;
    const now = Date.now();

    entries.forEach(entry => {
      totalSize += entry.size || 0;
      if (entry.ttl && now - entry.timestamp > entry.ttl) {
        expiredCount++;
      }
    });

    return {
      totalEntries: entries.length,
      totalSize: `${(totalSize / (1024 * 1024)).toFixed(2)} MB`,
      totalSizeBytes: totalSize,
      expiredCount,
      maxSize: `${MAX_STORAGE_MB} MB`,
      usagePercent: `${((totalSize / (MAX_STORAGE_MB * 1024 * 1024)) * 100).toFixed(2)}%`,
    };
  }

  /**
   * Clean expired entries
   */
  async cleanExpired() {
    await this.init();

    const entries = await this.getAll();
    const now = Date.now();
    let cleanedCount = 0;

    for (const entry of entries) {
      if (entry.ttl && now - entry.timestamp > entry.ttl) {
        await this.delete(entry.key);
        cleanedCount++;
      }
    }

    return cleanedCount;
  }

  // ==================== Private Methods ====================

  /**
   * Calculate data size in bytes
   */
  _calculateSize(data) {
    try {
      const jsonString = JSON.stringify(data);
      return new Blob([jsonString]).size;
    } catch {
      return 0;
    }
  }

  /**
   * Check if there's enough quota
   */
  async _checkQuota(requiredSize) {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      const available = estimate.quota - estimate.usage;
      return available > requiredSize;
    }

    // Fallback: check current storage usage
    const stats = await this.getStats();
    const maxBytes = MAX_STORAGE_MB * 1024 * 1024;
    return stats.totalSizeBytes + requiredSize < maxBytes;
  }

  /**
   * Evict old entries when quota is exceeded
   */
  async _evictOldEntries() {
    const entries = await this.getAll();
    
    // Sort by last accessed time (LRU)
    entries.sort((a, b) => a.lastAccessed - b.lastAccessed);

    // Remove oldest 25% of entries
    const toRemove = Math.ceil(entries.length * 0.25);
    
    for (let i = 0; i < toRemove; i++) {
      await this.delete(entries[i].key);
    }
  }

  /**
   * Close database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

/**
 * Singleton instance
 */
export const indexedDBManager = new IndexedDBManager();

/**
 * Helper function to store large JSON data
 */
export async function storeJSON(key, data, ttl = null) {
  return await indexedDBManager.set(key, data, ttl);
}

/**
 * Helper function to retrieve large JSON data
 */
export async function retrieveJSON(key) {
  return await indexedDBManager.get(key);
}

/**
 * Helper function to store images/blobs
 */
export async function storeBlob(key, blob, ttl = null) {
  return await indexedDBManager.set(key, blob, ttl);
}

/**
 * Helper function to retrieve images/blobs
 */
export async function retrieveBlob(key) {
  return await indexedDBManager.get(key);
}

export default indexedDBManager;
