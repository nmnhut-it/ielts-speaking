"""
Generate TTS audio files for ALL IELTS content.
Uses Edge TTS (Microsoft's high-quality text-to-speech API).

Installation:
    pip install edge-tts

Usage:
    python generate_tts_all.py
"""

import re
import json
import asyncio
import sys
from pathlib import Path
import edge_tts

# Fix Windows console encoding
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Configuration
VOICE = "en-US-JennyNeural"
RATE = "+0%"
VOLUME = "+0%"

# Input files to process
INPUT_FILES = [
    {
        'file': 'scripts/module3-minimal.js',
        'output_dir': 'audio/module3-samples',
        'label': 'Module 3 (Speaking Part 2)'
    },
    {
        'file': 'scripts/ieltsLessons.js',
        'output_dir': 'audio/ielts-lessons',
        'label': 'IELTS Lessons'
    },
    {
        'file': 'scripts/module2-minimal.js',
        'output_dir': 'audio/module2-samples',
        'label': 'Module 2 (Speaking Part 1)'
    },
    {
        'file': 'scripts/module2-practice.js',
        'output_dir': 'audio/module2-practice',
        'label': 'Module 2 Practice'
    }
]


def extract_sample_answers(js_file_path):
    """
    Extract sample answers from JavaScript file.

    Args:
        js_file_path: Path to the JS file

    Returns:
        List of dictionaries containing topic and sample answer text
    """
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sample_answers = []

    # Pattern 1: sampleAnswer with text field (object)
    # Example: topic: '...', sampleAnswer: { text: '...' }
    pattern1 = r"(?:topic|question):\s*'([^']+)'.*?sampleAnswer:\s*\{[^}]*?text:\s*'((?:[^'\\]|\\.)*)'"
    matches1 = re.finditer(pattern1, content, re.DOTALL)

    for match in matches1:
        topic = match.group(1)
        text = match.group(2).replace("\\'", "'").replace('\\"', '"').replace("\\n", "\n")

        if text.strip():
            sample_answers.append({
                'topic': topic,
                'text': text
            })

    # Pattern 2: sampleAnswer as direct string value
    # Example: question: '...', sampleAnswer: '...'
    pattern2 = r"question:\s*'([^']+)',\s*sampleAnswer:\s*'((?:[^'\\]|\\.)*)'"
    matches2 = re.finditer(pattern2, content, re.DOTALL)

    for match in matches2:
        topic = match.group(1)
        text = match.group(2).replace("\\'", "'").replace('\\"', '"').replace("\\n", "\n")

        if text.strip():
            sample_answers.append({
                'topic': topic,
                'text': text
            })

    # Remove duplicates based on topic and text
    seen = set()
    unique_answers = []
    for item in sample_answers:
        key = (item['topic'], item['text'])
        if key not in seen:
            seen.add(key)
            item['id'] = len(unique_answers) + 1
            unique_answers.append(item)

    return unique_answers


async def generate_audio(text, output_path, voice=VOICE, rate=RATE, volume=VOLUME):
    """
    Generate MP3 audio file from text using Edge TTS.

    Args:
        text: Text to convert to speech
        output_path: Output file path for the MP3
        voice: Voice name to use
        rate: Speaking rate adjustment
        volume: Volume adjustment
    """
    communicate = edge_tts.Communicate(text, voice, rate=rate, volume=volume)
    await communicate.save(output_path)


async def process_file(file_config, session_metadata):
    """
    Process a single JavaScript file and generate TTS audio.

    Args:
        file_config: Dictionary with file, output_dir, and label
        session_metadata: List to append metadata to
    """
    js_file = file_config['file']
    output_dir = Path(file_config['output_dir'])
    label = file_config['label']

    print(f"\n{'='*70}")
    print(f"Processing: {label}")
    print(f"{'='*70}")

    # Check if file exists
    if not Path(js_file).exists():
        print(f"⚠️  File not found: {js_file}")
        return

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    print(f"✓ Output directory: {output_dir.absolute()}")

    # Extract sample answers
    print(f"✓ Reading from: {js_file}")
    sample_answers = extract_sample_answers(js_file)

    if not sample_answers:
        print(f"⚠️  No sample answers found in {js_file}")
        return

    print(f"✓ Found {len(sample_answers)} sample answers")
    print()

    # Generate metadata for this file
    file_metadata = []

    # Process each sample answer
    for item in sample_answers:
        idx = item['id']
        topic = item['topic']
        text = item['text']

        # Create safe filename
        safe_topic = re.sub(r'[^\w\s-]', '', topic).strip()
        safe_topic = re.sub(r'[-\s]+', '-', safe_topic)[:60]
        filename = f"{idx:02d}-{safe_topic}.mp3"
        output_path = output_dir / filename

        print(f"[{idx}/{len(sample_answers)}] {topic}")
        print(f"    ├─ Words: {len(text.split())}")
        print(f"    ├─ File: {filename}")
        print(f"    └─ Generating audio...", end=" ", flush=True)

        try:
            # Generate TTS audio
            await generate_audio(text, str(output_path))

            file_size_kb = output_path.stat().st_size / 1024
            print(f"✓ ({file_size_kb:.1f} KB)")

            # Add to metadata
            file_metadata.append({
                'id': idx,
                'topic': topic,
                'filename': filename,
                'text': text,
                'word_count': len(text.split()),
                'file_size_kb': round(file_size_kb, 2)
            })
        except Exception as e:
            print(f"❌ Error: {e}")

        print()

    # Save metadata for this file
    metadata_path = output_dir / "metadata.json"
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(file_metadata, f, indent=2, ensure_ascii=False)

    total_size = sum(m['file_size_kb'] for m in file_metadata)
    print(f"✓ Successfully generated {len(file_metadata)} audio files")
    print(f"✓ Metadata saved to: {metadata_path}")
    print(f"✓ Total size: {total_size:.1f} KB")

    # Add to session metadata
    session_metadata.append({
        'source': label,
        'file': js_file,
        'output_dir': str(output_dir),
        'count': len(file_metadata),
        'total_size_kb': round(total_size, 2)
    })


async def process_all():
    """
    Process all input files and generate TTS audio.
    """
    print("="*70)
    print("IELTS Complete TTS Generator (Edge TTS)")
    print("="*70)
    print(f"Voice: {VOICE}")
    print(f"Rate: {RATE}, Volume: {VOLUME}")
    print("="*70)

    session_metadata = []

    # Process each file
    for file_config in INPUT_FILES:
        await process_file(file_config, session_metadata)

    # Save session summary
    print(f"\n{'='*70}")
    print("SESSION SUMMARY")
    print(f"{'='*70}")

    total_files = sum(m['count'] for m in session_metadata)
    total_size = sum(m['total_size_kb'] for m in session_metadata)

    for item in session_metadata:
        print(f"✓ {item['source']}: {item['count']} files ({item['total_size_kb']:.1f} KB)")

    print(f"\n{'='*70}")
    print(f"✓ TOTAL: {total_files} audio files generated")
    print(f"✓ Total size: {total_size:.1f} KB ({total_size/1024:.1f} MB)")
    print(f"{'='*70}")

    # Save session metadata
    session_file = Path("audio/generation-summary.json")
    session_file.parent.mkdir(parents=True, exist_ok=True)
    with open(session_file, 'w', encoding='utf-8') as f:
        json.dump({
            'voice': VOICE,
            'rate': RATE,
            'volume': VOLUME,
            'files_processed': session_metadata,
            'total_files': total_files,
            'total_size_kb': round(total_size, 2)
        }, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Session summary saved to: {session_file}")


def main():
    """Main entry point."""
    asyncio.run(process_all())


if __name__ == "__main__":
    main()
