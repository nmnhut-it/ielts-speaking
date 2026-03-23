// Model Cache Manager — tracks Transformers.js ONNX model cache with expiry control
// Uses IndexedDB for metadata, Cache API for actual model storage (managed by Transformers.js)

const CACHE_NAME = 'transformers-cache';
const DB_NAME = 'ielts_model_cache';
const STORE_NAME = 'cache_metadata';
const DB_VERSION = 1;
const DEFAULT_EXPIRY_DAYS = 30;
const EXPIRY_WARNING_DAYS = 5;

const MODEL_REGISTRY = [
    { id: 'Xenova/whisper-small.en', label: 'Whisper Small.en (STT)', estimatedSize: '~466 MB' },
    { id: 'Xenova/whisper-tiny.en', label: 'Whisper Tiny.en (STT, lighter)', estimatedSize: '~150 MB' },
];

class ModelCacheManager {
    constructor() {
        this.db = null;
    }

    // Open IndexedDB for metadata storage
    async initDB() {
        if (this.db) return this.db;
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                e.target.result.createObjectStore(STORE_NAME, { keyPath: 'modelName' });
            };
            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            req.onerror = () => reject(req.error);
        });
    }

    // Read metadata for a model from IndexedDB
    async getMetadata(modelName) {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const req = tx.objectStore(STORE_NAME).get(modelName);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error);
        });
    }

    // Store metadata after a model download completes
    async recordModelDownload(modelName) {
        const db = await this.initDB();
        const record = {
            modelName,
            cachedAt: Date.now(),
            expiryDays: DEFAULT_EXPIRY_DAYS,
        };
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).put(record);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    // Delete metadata for a model
    async deleteMetadata(modelName) {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).delete(modelName);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    // Check if model files exist in the Cache API
    async isModelCached(modelName) {
        try {
            const cache = await caches.open(CACHE_NAME);
            const keys = await cache.keys();
            return keys.some(r => r.url.includes(modelName.replace('/', '%2F')) || r.url.includes(modelName));
        } catch {
            return false;
        }
    }

    // Get approximate byte size of cached model files
    async getModelSize(modelName) {
        try {
            const cache = await caches.open(CACHE_NAME);
            const keys = await cache.keys();
            const matching = keys.filter(r =>
                r.url.includes(modelName.replace('/', '%2F')) || r.url.includes(modelName)
            );
            let total = 0;
            for (const key of matching) {
                const resp = await cache.match(key);
                if (resp) {
                    const blob = await resp.clone().blob();
                    total += blob.size;
                }
            }
            return total;
        } catch {
            return 0;
        }
    }

    // Check if a model's cache has expired
    async isModelExpired(modelName) {
        const meta = await this.getMetadata(modelName);
        if (!meta) return false; // no record means not tracked yet
        const expiresAt = meta.cachedAt + meta.expiryDays * 86400000;
        return Date.now() > expiresAt;
    }

    // Clear a specific model from Cache API and metadata
    async clearModelCache(modelName) {
        try {
            const cache = await caches.open(CACHE_NAME);
            const keys = await cache.keys();
            const matching = keys.filter(r =>
                r.url.includes(modelName.replace('/', '%2F')) || r.url.includes(modelName)
            );
            for (const key of matching) {
                await cache.delete(key);
            }
        } catch { /* cache may not exist */ }
        await this.deleteMetadata(modelName);
    }

    // Clear all Transformers.js cache
    async clearAllCache() {
        try {
            await caches.delete(CACHE_NAME);
        } catch { /* ignore */ }
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).clear();
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    // Get total storage estimate via StorageManager API
    async getCacheSizeTotal() {
        if (navigator.storage && navigator.storage.estimate) {
            const est = await navigator.storage.estimate();
            return { usage: est.usage || 0, quota: est.quota || 0 };
        }
        return { usage: 0, quota: 0 };
    }

    // Build full status for all registered models
    async getCacheStatus() {
        const results = {};
        for (const model of MODEL_REGISTRY) {
            const cached = await this.isModelCached(model.id);
            const meta = await this.getMetadata(model.id);
            const size = cached ? await this.getModelSize(model.id) : 0;
            const expiresAt = meta ? meta.cachedAt + meta.expiryDays * 86400000 : null;
            const daysLeft = expiresAt ? Math.ceil((expiresAt - Date.now()) / 86400000) : null;
            results[model.id] = {
                label: model.label,
                estimatedSize: model.estimatedSize,
                cached,
                sizeBytes: size,
                sizeFormatted: formatBytes(size),
                cachedAt: meta ? new Date(meta.cachedAt) : null,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
                daysLeft,
                expired: meta ? Date.now() > expiresAt : false,
                expiringSoon: daysLeft !== null && daysLeft <= EXPIRY_WARNING_DAYS && daysLeft > 0,
            };
        }
        return results;
    }
}

// Format bytes to human-readable string
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const val = bytes / Math.pow(1024, i);
    return `${val < 10 ? val.toFixed(1) : Math.round(val)} ${units[i]}`;
}

window.modelCacheManager = new ModelCacheManager();
window.MODEL_REGISTRY = MODEL_REGISTRY;
