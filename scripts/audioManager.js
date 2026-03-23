// Audio Manager for IELTS Lessons
// Handles audio playback, caching in IndexedDB, and synchronization with visual content

class AudioManager {
    constructor() {
        this.dbName = LESSON_CONSTANTS.AUDIO_DB_NAME;
        this.storeName = LESSON_CONSTANTS.AUDIO_STORE_NAME;
        this.db = null;
        this.currentAudio = null;
        this.isPlaying = false;
        this.playbackCallbacks = {
            onPlay: null,
            onPause: null,
            onEnd: null,
            onTimeUpdate: null,
            onError: null
        };
    }

    // Initialize IndexedDB
    async initialize() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
                    store.createIndex('moduleId', 'moduleId', { unique: false });
                }
            };
        });
    }

    // Save audio blob to IndexedDB
    async saveAudio(audioId, audioBlob, metadata = {}) {
        if (!this.db) await this.initialize();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);

            const audioData = {
                id: audioId,
                blob: audioBlob,
                moduleId: metadata.moduleId || null,
                sectionId: metadata.sectionId || null,
                duration: metadata.duration || null,
                transcript: metadata.transcript || null,
                timestamp: Date.now()
            };

            const request = store.put(audioData);

            request.onsuccess = () => resolve(audioId);
            request.onerror = () => reject(request.error);
        });
    }

    // Load audio blob from IndexedDB
    async loadAudio(audioId) {
        if (!this.db) await this.initialize();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(audioId);

            request.onsuccess = () => {
                const result = request.result;
                resolve(result ? result.blob : null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    // Check if audio exists in cache
    async hasAudio(audioId) {
        if (!this.db) await this.initialize();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(audioId);

            request.onsuccess = () => resolve(!!request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Get all cached audio IDs
    async getAllAudioIds() {
        if (!this.db) await this.initialize();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAllKeys();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Get audio metadata
    async getAudioMetadata(audioId) {
        if (!this.db) await this.initialize();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(audioId);

            request.onsuccess = () => {
                const result = request.result;
                if (result) {
                    resolve({
                        id: result.id,
                        moduleId: result.moduleId,
                        sectionId: result.sectionId,
                        duration: result.duration,
                        transcript: result.transcript,
                        timestamp: result.timestamp
                    });
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    // Delete audio from cache
    async deleteAudio(audioId) {
        if (!this.db) await this.initialize();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(audioId);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Clear all cached audio
    async clearCache() {
        if (!this.db) await this.initialize();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Play audio by ID
    async play(audioId, options = {}) {
        try {
            // Stop current audio if playing
            if (this.currentAudio) {
                this.stop();
            }

            // Load audio from cache
            const audioBlob = await this.loadAudio(audioId);

            if (!audioBlob) {
                throw new Error(`Audio not found: ${audioId}`);
            }

            // Create audio element
            const audioUrl = URL.createObjectURL(audioBlob);
            this.currentAudio = new Audio(audioUrl);

            // Set playback options
            if (options.volume !== undefined) {
                this.currentAudio.volume = options.volume;
            }
            if (options.playbackRate !== undefined) {
                this.currentAudio.playbackRate = options.playbackRate;
            }
            if (options.startTime !== undefined) {
                this.currentAudio.currentTime = options.startTime;
            }

            // Set up event listeners
            this.currentAudio.onplay = () => {
                this.isPlaying = true;
                if (this.playbackCallbacks.onPlay) {
                    this.playbackCallbacks.onPlay(audioId);
                }
            };

            this.currentAudio.onpause = () => {
                this.isPlaying = false;
                if (this.playbackCallbacks.onPause) {
                    this.playbackCallbacks.onPause(audioId);
                }
            };

            this.currentAudio.onended = () => {
                this.isPlaying = false;
                URL.revokeObjectURL(audioUrl);
                if (this.playbackCallbacks.onEnd) {
                    this.playbackCallbacks.onEnd(audioId);
                }
            };

            this.currentAudio.ontimeupdate = () => {
                if (this.playbackCallbacks.onTimeUpdate) {
                    this.playbackCallbacks.onTimeUpdate(
                        this.currentAudio.currentTime,
                        this.currentAudio.duration
                    );
                }
            };

            this.currentAudio.onerror = (error) => {
                if (this.playbackCallbacks.onError) {
                    this.playbackCallbacks.onError(error);
                }
            };

            // Start playback
            await this.currentAudio.play();

            return {
                duration: this.currentAudio.duration,
                audioId: audioId
            };

        } catch (error) {
            console.error('Audio playback error:', error);
            if (this.playbackCallbacks.onError) {
                this.playbackCallbacks.onError(error);
            }
            throw error;
        }
    }

    // Pause current audio
    pause() {
        if (this.currentAudio && !this.currentAudio.paused) {
            this.currentAudio.pause();
        }
    }

    // Resume current audio
    resume() {
        if (this.currentAudio && this.currentAudio.paused) {
            this.currentAudio.play();
        }
    }

    // Stop and cleanup current audio
    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio.src = '';
            this.currentAudio = null;
            this.isPlaying = false;
        }
    }

    // Seek to specific time
    seek(timeInSeconds) {
        if (this.currentAudio) {
            this.currentAudio.currentTime = timeInSeconds;
        }
    }

    // Set volume (0.0 to 1.0)
    setVolume(volume) {
        if (this.currentAudio) {
            this.currentAudio.volume = Math.max(0, Math.min(1, volume));
        }
    }

    // Set playback rate
    setPlaybackRate(rate) {
        if (this.currentAudio) {
            this.currentAudio.playbackRate = rate;
        }
    }

    // Get current playback time
    getCurrentTime() {
        return this.currentAudio ? this.currentAudio.currentTime : 0;
    }

    // Get total duration
    getDuration() {
        return this.currentAudio ? this.currentAudio.duration : 0;
    }

    // Register callbacks
    on(event, callback) {
        if (this.playbackCallbacks.hasOwnProperty('on' + event.charAt(0).toUpperCase() + event.slice(1))) {
            this.playbackCallbacks['on' + event.charAt(0).toUpperCase() + event.slice(1)] = callback;
        }
    }

    // Remove callbacks
    off(event) {
        if (this.playbackCallbacks.hasOwnProperty('on' + event.charAt(0).toUpperCase() + event.slice(1))) {
            this.playbackCallbacks['on' + event.charAt(0).toUpperCase() + event.slice(1)] = null;
        }
    }

    // Export audio from cache (for backup)
    async exportAudio(audioId) {
        const audioBlob = await this.loadAudio(audioId);
        const metadata = await this.getAudioMetadata(audioId);

        if (!audioBlob) {
            throw new Error(`Audio not found: ${audioId}`);
        }

        return {
            blob: audioBlob,
            metadata: metadata,
            downloadUrl: URL.createObjectURL(audioBlob),
            filename: `${audioId}.mp3`
        };
    }

    // Import audio into cache
    async importAudio(audioId, file, metadata = {}) {
        const blob = file instanceof Blob ? file : new Blob([file], { type: 'audio/mpeg' });
        return await this.saveAudio(audioId, blob, metadata);
    }

    // Get cache statistics
    async getCacheStats() {
        if (!this.db) await this.initialize();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                const items = request.result;
                let totalSize = 0;

                items.forEach(item => {
                    if (item.blob) {
                        totalSize += item.blob.size;
                    }
                });

                resolve({
                    totalFiles: items.length,
                    totalSize: totalSize,
                    totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
                    files: items.map(item => ({
                        id: item.id,
                        size: item.blob ? item.blob.size : 0,
                        duration: item.duration,
                        timestamp: item.timestamp
                    }))
                });
            };

            request.onerror = () => reject(request.error);
        });
    }

    // Preload audio (load into memory without playing)
    async preload(audioId) {
        const audioBlob = await this.loadAudio(audioId);
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.preload = 'auto';
            return true;
        }
        return false;
    }

    // Batch preload multiple audio files
    async preloadMultiple(audioIds) {
        const results = await Promise.allSettled(
            audioIds.map(id => this.preload(id))
        );

        return {
            successful: results.filter(r => r.status === 'fulfilled' && r.value).length,
            failed: results.filter(r => r.status === 'rejected' || !r.value).length,
            total: audioIds.length
        };
    }
}

// Synchronized subtitle/transcript display
class SubtitleSync {
    constructor(audioManager) {
        this.audioManager = audioManager;
        this.currentTranscript = null;
        this.currentWordIndex = 0;
        this.displayElement = null;
        this.highlightCallback = null;
    }

    // Set transcript with timing information
    setTranscript(transcript) {
        // Transcript format: { text: "...", words: [{word: "hello", start: 0.5, end: 1.0}] }
        this.currentTranscript = transcript;
        this.currentWordIndex = 0;
    }

    // Set display element for showing transcript
    setDisplayElement(element) {
        this.displayElement = element;
    }

    // Set callback for highlighting words
    onHighlight(callback) {
        this.highlightCallback = callback;
    }

    // Start syncing with audio playback
    start() {
        if (!this.currentTranscript || !this.audioManager.currentAudio) return;

        this.audioManager.on('timeupdate', (currentTime) => {
            this.updateHighlight(currentTime);
        });
    }

    // Update highlighted word based on current time
    updateHighlight(currentTime) {
        if (!this.currentTranscript || !this.currentTranscript.words) return;

        const words = this.currentTranscript.words;

        // Find current word
        for (let i = 0; i < words.length; i++) {
            if (currentTime >= words[i].start && currentTime <= words[i].end) {
                if (i !== this.currentWordIndex) {
                    this.currentWordIndex = i;

                    // Trigger highlight callback
                    if (this.highlightCallback) {
                        this.highlightCallback(i, words[i]);
                    }

                    // Update display element
                    if (this.displayElement) {
                        this.displayCurrentWord();
                    }
                }
                break;
            }
        }
    }

    // Display current word in element
    displayCurrentWord() {
        if (!this.displayElement || !this.currentTranscript) return;

        const words = this.currentTranscript.words;
        let html = '';

        words.forEach((wordData, index) => {
            const isActive = index === this.currentWordIndex;
            const className = isActive ? 'word active' : 'word';
            html += `<span class="${className}" data-index="${index}">${wordData.word}</span> `;
        });

        this.displayElement.innerHTML = html;
    }

    // Stop syncing
    stop() {
        this.audioManager.off('timeupdate');
        this.currentWordIndex = 0;
    }
}

// Initialize global instance
if (typeof window !== 'undefined') {
    window.audioManager = new AudioManager();
}
