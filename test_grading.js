// Test Gemini grading with actual OGG audio files
// Usage: node test_grading.js [audio_file.ogg]
// Default: grades all .ogg files in the current directory

const fs = require('fs');

const API_KEY = 'AIzaSyBPj4CQmCVU0Qf602aRVFGQmMxLLkqP9CQ';
const MODEL = 'gemini-2.5-flash';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const QUESTION = 'How often do you use the internet?';
const FOLLOW_UP = 'What would you do if the internet went down for a whole day?';
const TRANSCRIPT = [
    'Even being honest as you listen is all small.',
    'Every day witness become an important goal of body life, especially for study and entertainment.',
    'I want to trust the information about the news in my countries.',
    'A murder raise every Internet whenever all this I feel a bit of power because I use quite often,',
    'but I would like to make a new activity when the Internet squared down.',
    'For instance, I go to school, review my classes on what it is.',
    'Or in the morals.',
    'I will go swimming with my girls, especially at the afternoon when we finish our this month.'
].join(' ');

const PROMPT = `You are a certified IELTS Speaking examiner marking a Part 1 (Interview) response.
Apply band descriptors STRICTLY. Default to lower band when ambiguous.
DO NOT be encouraging. DO NOT round up. Accuracy, not motivation.

QUESTION: "${QUESTION}"
FOLLOW-UP: "${FOLLOW_UP}"

STUDENT RESPONSE (transcript):
"""
${TRANSCRIPT}
"""

AUDIO is attached. Score Pronunciation from the recording. Note any mismatch with the transcript (garbled STT).

=== PASS 0 — COHERENCE INTEGRITY CHECK ===

A. AUDIO PRIMACY: score what the examiner HEARS. Transcript may be garbled STT.
   Note whether the audio is more coherent than the transcript suggests.

B. Label each sentence: [COHERENT] | [UNGRAMMATICAL] | [INCOHERENT]
   INCOHERENT = meaning cannot be recovered even in context.
   Tally + incoherence rate.

C. HARD CAPS (override all evidence):
   >50% incoherent -> FC<=4.0, GRA<=4.0, LR<=4.5
   >30% -> FC<=4.5, GRA<=4.5
   >15% -> FC<=5.5

D. SPEED TRAP: high WPM/word count/TTR never compensates for incoherence.

=== BAND DESCRIPTORS ===
FC: 4=links only simple sentences | 5=breakdowns occur | 6=coherence lost at times | 7=some hesitation
LR: 4=basic vocab/frequent inappropriacy | 5=familiar topics only | 6=wide enough despite inappropriacy
GRA: 4=basic forms/errors cause misunderstanding | 5=basic forms accurate/limited complex range
PR: 4=frequent mispronunciations cause strain | 5=some difficulty | 6=understood throughout

=== OUTPUT ===
## Pass 0 Coherence Report
(label each sentence, tally, rate, caps applied)

## Band Score
| Criterion | Band | Key evidence |
|---|---|---|
| Fluency & Coherence | X.X | quote |
| Lexical Resource | X.X | quote |
| Grammatical Range & Accuracy | X.X | quote |
| Pronunciation (audio-based) | X.X | quote |
| **Overall** | **X.X** | — |

## Audio vs Transcript Note
(did audio reveal the transcript was garbled? was the actual speech more/less coherent?)`;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function gradeWithAudio(audioFile) {
    console.log(`\nGrading: ${audioFile}`);
    const audioData = fs.readFileSync(audioFile);
    const audioB64 = audioData.toString('base64');

    const payload = {
        contents: [
            { parts: [{ inlineData: { mimeType: 'audio/ogg', data: audioB64 } }] },
            { parts: [{ text: PROMPT }] }
        ],
        generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 8192,
            thinkingConfig: { thinkingBudget: 0 }
        }
    };

    for (let attempt = 1; attempt <= 6; attempt++) {
        process.stdout.write(`  Attempt ${attempt}... `);
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: AbortSignal.timeout(120_000)
            });
            const json = await res.json();
            if (!res.ok) {
                const code = json?.error?.code;
                console.log(`HTTP ${res.status}`);
                if (code === 429) { console.log('  Quota exceeded — stopping'); return null; }
                if (attempt < 6) await sleep(15_000);
                continue;
            }
            const candidate = json.candidates?.[0];
            const text = candidate?.content?.parts?.[0]?.text || '';
            const finish = candidate?.finishReason || '?';
            console.log(`OK (${finish}, ${text.length} chars)`);
            return text;
        } catch (err) {
            console.log(`Error: ${err.message}`);
            if (attempt < 6) await sleep(10_000);
        }
    }
    return null;
}

(async () => {
    const audioFiles = process.argv[2]
        ? [process.argv[2]]
        : fs.readdirSync('.').filter(f => f.endsWith('.ogg')).sort();

    if (audioFiles.length === 0) {
        console.error('No .ogg files found. Pass a file path as argument or run from the project directory.');
        process.exit(1);
    }

    for (const file of audioFiles) {
        const result = await gradeWithAudio(file);
        if (result) {
            const outFile = file.replace('.ogg', '_grade.txt');
            fs.writeFileSync(outFile, result, 'utf8');
            console.log(`\n${'='.repeat(60)}\n${result}\n${'='.repeat(60)}`);
            console.log(`Saved to: ${outFile}`);
        }
    }
})();
