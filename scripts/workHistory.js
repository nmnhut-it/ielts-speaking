/* Work History — IndexedDB persistence for IELTS Part 1 practice attempts
   Stores transcripts, audio blobs, feedback, and scores per question. */

const WORK_HISTORY_DB_NAME = 'ielts_work_history';
const WORK_HISTORY_STORE = 'attempts';
const WORK_HISTORY_DB_VERSION = 1;

class WorkHistory {
    constructor(dbName = WORK_HISTORY_DB_NAME) {
        this.dbName = dbName;
        this.db = null;
    }

    async openDB() {
        if (this.db) return this.db;
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, WORK_HISTORY_DB_VERSION);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(WORK_HISTORY_STORE)) {
                    const store = db.createObjectStore(WORK_HISTORY_STORE, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    store.createIndex('questionIndex', 'questionIndex', { unique: false });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('studentName', 'studentName', { unique: false });
                }
            };
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async saveWork(entry) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(WORK_HISTORY_STORE, 'readwrite');
            const store = tx.objectStore(WORK_HISTORY_STORE);
            const request = store.add(entry);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getWork(questionIndex) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(WORK_HISTORY_STORE, 'readonly');
            const store = tx.objectStore(WORK_HISTORY_STORE);
            const index = store.index('questionIndex');
            const request = index.getAll(questionIndex);
            request.onsuccess = () => {
                const results = request.result || [];
                results.sort((a, b) => b.timestamp - a.timestamp);
                resolve(results[0] || null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async getAllWork() {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(WORK_HISTORY_STORE, 'readonly');
            const store = tx.objectStore(WORK_HISTORY_STORE);
            const request = store.getAll();
            request.onsuccess = () => {
                const results = request.result || [];
                results.sort((a, b) => b.timestamp - a.timestamp);
                resolve(results);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async deleteWork(id) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(WORK_HISTORY_STORE, 'readwrite');
            const store = tx.objectStore(WORK_HISTORY_STORE);
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getWorkCount() {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(WORK_HISTORY_STORE, 'readonly');
            const store = tx.objectStore(WORK_HISTORY_STORE);
            const request = store.count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async updateFeedback(questionIndex, feedbackHtml) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(WORK_HISTORY_STORE, 'readwrite');
            const store = tx.objectStore(WORK_HISTORY_STORE);
            const index = store.index('questionIndex');
            const request = index.openCursor(questionIndex, 'prev');
            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    const updated = cursor.value;
                    updated.geminiFeedback = feedbackHtml;
                    cursor.update(updated);
                    resolve(updated.id);
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    async getWorkById(id) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(WORK_HISTORY_STORE, 'readonly');
            const store = tx.objectStore(WORK_HISTORY_STORE);
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    static async renderHistoryList(containerId) {
        if (!window.workHistory) return;
        const history = await window.workHistory.getAllWork();
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!history.length) {
            container.innerHTML = '<p class="history-empty">No practice history yet</p>';
            return;
        }

        let html = '';
        for (const entry of history) {
            const date = new Date(entry.timestamp).toLocaleDateString();
            const time = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const score = entry.scores?.overall || '\u2014';
            const qLabel = entry.questionText || ('Q' + (entry.questionIndex + 1));
            const hasAudio = !!(entry.mainAudioBlob);
            const hasFeedback = !!(entry.geminiFeedback);

            html += '<div class="history-item" data-id="' + entry.id + '">';
            html += '  <div class="history-meta">' + date + ' ' + time + ' \u00b7 Band ' + score + '</div>';
            html += '  <div class="history-question">' + escapeHistoryHtml(qLabel) + '</div>';
            html += '  <div class="history-actions">';
            if (hasAudio) {
                html += '    <button class="history-btn" onclick="playHistoryAudio(' + entry.id + ', this)">&#9654; Play</button>';
            }
            if (hasFeedback) {
                html += '    <button class="history-btn" onclick="toggleHistoryFeedback(' + entry.id + ', this)">View Feedback</button>';
            }
            html += '    <button class="history-btn history-btn-delete" onclick="deleteHistoryEntry(' + entry.id + ', this)">&#10005;</button>';
            html += '  </div>';
            html += '  <div class="history-feedback-expand" id="historyFeedback_' + entry.id + '" style="display:none;"></div>';
            html += '</div>';
        }
        container.innerHTML = html;
    }
}

/** Escape HTML for history rendering */
function escapeHistoryHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/** Play audio blob from a history entry */
async function playHistoryAudio(id, btn) {
    if (!window.workHistory) return;
    const entry = await window.workHistory.getWorkById(id);
    if (!entry || !entry.mainAudioBlob) return;

    // Stop any currently playing history audio
    if (window._historyAudioEl) {
        window._historyAudioEl.pause();
        window._historyAudioEl = null;
    }

    const url = URL.createObjectURL(entry.mainAudioBlob);
    const audio = new Audio(url);
    window._historyAudioEl = audio;
    audio.onended = () => {
        URL.revokeObjectURL(url);
        window._historyAudioEl = null;
        if (btn) btn.textContent = '\u25b6 Play';
    };
    if (btn) btn.textContent = '\u25a0 Stop';
    audio.play();
}

/** Toggle inline feedback display for a history entry */
async function toggleHistoryFeedback(id, btn) {
    const container = document.getElementById('historyFeedback_' + id);
    if (!container) return;

    if (container.style.display !== 'none') {
        container.style.display = 'none';
        if (btn) btn.textContent = 'View Feedback';
        return;
    }

    if (!container.innerHTML) {
        const entry = await window.workHistory.getWorkById(id);
        if (entry && entry.geminiFeedback) {
            container.innerHTML = entry.geminiFeedback;
        } else {
            container.innerHTML = '<p style="color:#94a3b8;">No feedback available.</p>';
        }
    }
    container.style.display = 'block';
    if (btn) btn.textContent = 'Hide Feedback';
}

/** Delete a history entry */
async function deleteHistoryEntry(id, btn) {
    if (!window.workHistory) return;
    await window.workHistory.deleteWork(id);
    const item = btn.closest('.history-item');
    if (item) item.remove();

    // Check if list is now empty
    const container = document.getElementById('historyList');
    if (container && !container.querySelector('.history-item')) {
        container.innerHTML = '<p class="history-empty">No practice history yet</p>';
    }
}

// Initialize on load
window.workHistory = new WorkHistory();
