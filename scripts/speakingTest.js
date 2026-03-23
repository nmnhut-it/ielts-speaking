// IELTS Speaking Test with Deep Pronunciation Analysis
// Backend: Colab notebook running wav2vec2-phoneme model

// Constants
const SAMPLE_RATE = 16000; // wav2vec2 requirement
const PART_DURATIONS = {
    1: 300, // 5 minutes
    2: 240, // 4 minutes
    3: 300  // 5 minutes
};

// IELTS Questions Database
const IELTS_QUESTIONS = {
    1: [ // Part 1: Introduction & Interview
        {
            title: "Hometown",
            text: "Where do you come from? Can you describe your hometown?",
            expectedWords: ["hometown", "city", "village", "born", "live"]
        },
        {
            title: "Work or Study",
            text: "Do you work or are you a student? What do you like about your work/studies?",
            expectedWords: ["work", "study", "student", "job", "like"]
        },
        {
            title: "Hobbies",
            text: "What do you do in your free time? Do you have any hobbies?",
            expectedWords: ["free", "time", "hobby", "enjoy", "like"]
        }
    ],
    2: [ // Part 2: Long Turn
        {
            title: "Describe a Person",
            text: "Describe a person who has influenced you. You should say:\n- Who this person is\n- How you know them\n- What they are like\n- And explain why they have influenced you",
            preparationTime: 60,
            speakingTime: 120,
            expectedWords: ["person", "influenced", "know", "describe", "important"]
        },
        {
            title: "Describe a Place",
            text: "Describe a place you have visited that you particularly enjoyed. You should say:\n- Where it is\n- When you went there\n- What you did there\n- And explain why you enjoyed it",
            preparationTime: 60,
            speakingTime: 120,
            expectedWords: ["place", "visited", "enjoyed", "when", "what"]
        }
    ],
    3: [ // Part 3: Discussion
        {
            title: "Education",
            text: "How has education changed in your country in recent years? What do you think are the most important qualities for a teacher to have?",
            expectedWords: ["education", "changed", "important", "teacher", "quality"]
        },
        {
            title: "Technology",
            text: "How has technology affected communication between people? Do you think this is a positive or negative development?",
            expectedWords: ["technology", "communication", "positive", "negative", "development"]
        }
    ]
};

// State
let currentPart = null;
let currentQuestionIndex = 0;
let testStartTime = null;
let questionStartTime = null;
let timerInterval = null;
let prepTimerInterval = null;
let mediaRecorder = null;
let audioChunks = [];
let recordedBlob = null;
let backendUrl = null;
let testResults = [];
let audioContext = null;
let analyserNode = null;
let animationId = null;

// DOM Elements
const configSection = document.getElementById('configSection');
const testSelection = document.getElementById('testSelection');
const testInterface = document.getElementById('testInterface');
const resultsSection = document.getElementById('resultsSection');
const backendUrlInput = document.getElementById('backendUrl');
const saveConfigBtn = document.getElementById('saveConfigBtn');
const configStatus = document.getElementById('configStatus');
const testPartBtns = document.querySelectorAll('.test-part-btn');
const currentPartSpan = document.getElementById('currentPart');
const timerSpan = document.getElementById('timer');
const endTestBtn = document.getElementById('endTestBtn');
const questionTitle = document.getElementById('questionTitle');
const questionText = document.getElementById('questionText');
const preparationTime = document.getElementById('preparationTime');
const prepTimer = document.getElementById('prepTimer');
const startRecordBtn = document.getElementById('startRecordBtn');
const stopRecordBtn = document.getElementById('stopRecordBtn');
const playbackBtn = document.getElementById('playbackBtn');
const recordingStatus = document.getElementById('recordingStatus');
const waveformCanvas = document.getElementById('waveform');
const analysisSection = document.getElementById('analysisSection');
const overallScore = document.getElementById('overallScore');
const transcription = document.getElementById('transcription');
const phonemeComparison = document.getElementById('phonemeComparison');
const grammarFeedback = document.getElementById('grammarFeedback');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const retryBtn = document.getElementById('retryBtn');
const avgScore = document.getElementById('avgScore');
const questionsCount = document.getElementById('questionsCount');
const totalTime = document.getElementById('totalTime');
const detailedResults = document.getElementById('detailedResults');
const restartBtn = document.getElementById('restartBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadBackendConfig();
});

function setupEventListeners() {
    saveConfigBtn.addEventListener('click', saveBackendConfig);
    testPartBtns.forEach(btn => {
        btn.addEventListener('click', () => startTest(parseInt(btn.dataset.part)));
    });
    endTestBtn.addEventListener('click', endTest);
    startRecordBtn.addEventListener('click', startRecording);
    stopRecordBtn.addEventListener('click', stopRecording);
    playbackBtn.addEventListener('click', playRecording);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    retryBtn.addEventListener('click', retryQuestion);
    restartBtn.addEventListener('click', restart);
}

// Backend Configuration
function loadBackendConfig() {
    const saved = localStorage.getItem('speakingTestBackendUrl');
    if (saved) {
        backendUrl = saved;
        backendUrlInput.value = saved;
        showStatus(configStatus, 'Backend URL loaded', 'success');
    }
}

function saveBackendConfig() {
    const url = backendUrlInput.value.trim();
    if (!url) {
        showStatus(configStatus, 'Please enter a valid URL', 'error');
        return;
    }

    backendUrl = url;
    localStorage.setItem('speakingTestBackendUrl', url);
    showStatus(configStatus, 'Backend URL saved successfully', 'success');
}

function showStatus(element, message, type) {
    element.textContent = message;
    element.className = `status-message ${type}`;
    element.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }
}

// Test Flow
function startTest(part) {
    if (!backendUrl) {
        showStatus(configStatus, 'Please configure backend URL first', 'error');
        return;
    }

    currentPart = part;
    currentQuestionIndex = 0;
    testStartTime = Date.now();
    testResults = [];

    configSection.classList.add('hidden');
    testSelection.classList.add('hidden');
    testInterface.classList.remove('hidden');

    currentPartSpan.textContent = part;
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const questions = IELTS_QUESTIONS[currentPart];
    if (currentQuestionIndex >= questions.length) {
        endTest();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionTitle.textContent = question.title;
    questionText.textContent = question.text;

    analysisSection.classList.add('hidden');
    recordedBlob = null;
    audioChunks = [];
    playbackBtn.disabled = true;
    startRecordBtn.disabled = false;
    stopRecordBtn.disabled = true;

    questionStartTime = Date.now();

    // Show preparation time for Part 2
    if (currentPart === 2 && question.preparationTime) {
        preparationTime.classList.remove('hidden');
        startPreparationTimer(question.preparationTime);
    } else {
        preparationTime.classList.add('hidden');
    }
}

function startTimer() {
    let elapsed = 0;
    timerInterval = setInterval(() => {
        elapsed++;
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Auto-end test if time limit reached
        if (elapsed >= PART_DURATIONS[currentPart]) {
            endTest();
        }
    }, 1000);
}

function startPreparationTimer(seconds) {
    let remaining = seconds;
    prepTimer.textContent = remaining;

    prepTimerInterval = setInterval(() => {
        remaining--;
        prepTimer.textContent = remaining;

        if (remaining <= 0) {
            clearInterval(prepTimerInterval);
            preparationTime.classList.add('hidden');
            showStatus(recordingStatus, 'Preparation time finished. You may start speaking now.', 'info');
        }
    }, 1000);
}

function endTest() {
    clearInterval(timerInterval);
    clearInterval(prepTimerInterval);
    stopRecording();

    testInterface.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    displayResults();
}

function displayResults() {
    const totalTestTime = Math.floor((Date.now() - testStartTime) / 1000);
    const minutes = Math.floor(totalTestTime / 60);
    const seconds = totalTestTime % 60;

    totalTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    questionsCount.textContent = testResults.length;

    if (testResults.length > 0) {
        const average = testResults.reduce((sum, r) => sum + r.score, 0) / testResults.length;
        avgScore.textContent = `${Math.round(average * 100)}%`;

        // Display detailed results
        detailedResults.innerHTML = testResults.map((result, i) => `
            <div class="result-item">
                <div class="result-item-header">
                    <span class="result-item-question">Question ${i + 1}: ${result.question}</span>
                    <span class="result-item-score">${Math.round(result.score * 100)}%</span>
                </div>
                <div>${result.errors || 0} pronunciation errors</div>
            </div>
        `).join('');
    } else {
        avgScore.textContent = '--';
        detailedResults.innerHTML = '<p>No questions completed.</p>';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function retryQuestion() {
    loadQuestion();
}

function restart() {
    resultsSection.classList.add('hidden');
    configSection.classList.remove('hidden');
    testSelection.classList.remove('hidden');
}

// Audio Recording
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                sampleRate: SAMPLE_RATE,
                channelCount: 1,
                echoCancellation: true,
                noiseSuppression: true
            }
        });

        // Setup audio visualization
        audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: SAMPLE_RATE });
        const source = audioContext.createMediaStreamSource(stream);
        analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 2048;
        source.connect(analyserNode);

        visualizeWaveform();

        // Setup MediaRecorder
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            recordedBlob = new Blob(audioChunks, { type: 'audio/webm' });
            playbackBtn.disabled = false;

            // Stop visualization
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }

            // Close audio context
            if (audioContext) {
                audioContext.close();
                audioContext = null;
            }

            // Analyze recording
            await analyzeRecording();
        };

        mediaRecorder.start();
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = false;
        showStatus(recordingStatus, 'Recording... Speak clearly into your microphone.', 'info');

    } catch (error) {
        console.error('Error starting recording:', error);
        showStatus(recordingStatus, 'Error accessing microphone. Please check permissions.', 'error');
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        startRecordBtn.disabled = false;
        stopRecordBtn.disabled = true;
        showStatus(recordingStatus, 'Recording stopped. Analyzing...', 'info');
    }
}

function playRecording() {
    if (recordedBlob) {
        const audio = new Audio(URL.createObjectURL(recordedBlob));
        audio.play();
    }
}

function visualizeWaveform() {
    const canvas = waveformCanvas;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        animationId = requestAnimationFrame(draw);

        analyserNode.getByteTimeDomainData(dataArray);

        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#2c2c2c';
        ctx.beginPath();

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * canvas.height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    }

    draw();
}

// Audio Processing & Analysis
async function analyzeRecording() {
    if (!recordedBlob || !backendUrl) {
        showStatus(recordingStatus, 'Cannot analyze: missing recording or backend URL', 'error');
        return;
    }

    try {
        // Convert WebM to WAV 16kHz mono
        showStatus(recordingStatus, 'Converting audio to WAV format...', 'info');
        const wavBlob = await convertToWav(recordedBlob);

        // Convert to base64
        const base64Audio = await blobToBase64(wavBlob);

        // Get expected text from current question
        const question = IELTS_QUESTIONS[currentPart][currentQuestionIndex];
        const expectedText = question.expectedWords ? question.expectedWords.join(' ') : '';

        // Send to backend (Gradio format)
        showStatus(recordingStatus, 'Sending to backend for phoneme analysis...', 'info');
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [base64Audio, expectedText]  // Gradio format
            })
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        // Gradio wraps result in 'data' array, and our function returns JSON string
        const result = JSON.parse(responseData.data[0]);
        displayAnalysis(result);
        showStatus(recordingStatus, 'Analysis complete!', 'success');

        // Save result
        testResults.push({
            question: question.title,
            score: result.accuracy || 0,
            errors: result.errors ? result.errors.length : 0,
            timestamp: Date.now() - questionStartTime
        });

    } catch (error) {
        console.error('Analysis error:', error);
        showStatus(recordingStatus, `Analysis failed: ${error.message}`, 'error');

        // Show fallback message
        analysisSection.classList.remove('hidden');
        transcription.textContent = 'Analysis failed. Please check your backend configuration.';
    }
}

async function convertToWav(webmBlob) {
    // Decode WebM audio using Web Audio API
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: SAMPLE_RATE });
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Resample to 16kHz mono if needed
    let samples;
    if (audioBuffer.numberOfChannels === 1) {
        samples = audioBuffer.getChannelData(0);
    } else {
        // Mix down to mono
        const left = audioBuffer.getChannelData(0);
        const right = audioBuffer.getChannelData(1);
        samples = new Float32Array(left.length);
        for (let i = 0; i < left.length; i++) {
            samples[i] = (left[i] + right[i]) / 2;
        }
    }

    // Create WAV file
    const wavBuffer = encodeWAV(samples, SAMPLE_RATE);
    return new Blob([wavBuffer], { type: 'audio/wav' });
}

function encodeWAV(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    // WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // fmt chunk size
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, 1, true); // mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // byte rate
    view.setUint16(32, 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    writeString(view, 36, 'data');
    view.setUint32(40, samples.length * 2, true);

    // Write PCM samples
    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        offset += 2;
    }

    return buffer;
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Display Analysis Results
function displayAnalysis(result) {
    analysisSection.classList.remove('hidden');

    // Display overall score
    const accuracy = result.accuracy || 0;
    overallScore.textContent = `${Math.round(accuracy * 100)}%`;

    // Display transcription
    transcription.textContent = result.transcription || 'No transcription available';

    // Display phoneme comparison
    if (result.phonemes_expected && result.phonemes_actual) {
        const maxLength = Math.max(result.phonemes_expected.length, result.phonemes_actual.length);
        phonemeComparison.innerHTML = '';

        for (let i = 0; i < maxLength; i++) {
            const expected = result.phonemes_expected[i] || '--';
            const actual = result.phonemes_actual[i] || '--';
            const isCorrect = expected === actual;

            const item = document.createElement('div');
            item.className = `phoneme-item ${isCorrect ? 'correct' : 'error'}`;
            item.innerHTML = `
                <div>
                    <span class="phoneme-word">Position ${i + 1}</span>
                </div>
                <div>
                    <span class="phoneme-expected">Expected: ${expected}</span>
                    <span style="margin: 0 12px;">→</span>
                    <span class="phoneme-actual ${isCorrect ? 'correct' : 'error'}">Actual: ${actual}</span>
                </div>
            `;
            phonemeComparison.appendChild(item);
        }
    } else {
        phonemeComparison.innerHTML = '<p>Phoneme analysis not available from backend</p>';
    }

    // Grammar feedback (check if Gemini is available)
    if (window.geminiProcessor && document.body.classList.contains('advanced-mode')) {
        // Note: This would require integrating Gemini - placeholder for now
        document.querySelector('.grammar-feedback').classList.remove('hidden');
        grammarFeedback.textContent = 'Grammar analysis coming soon...';
    }
}
