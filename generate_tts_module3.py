"""
Generate TTS audio files for IELTS Module 3 sample answers.
Uses Edge TTS (Microsoft's high-quality text-to-speech API).

Installation:
    pip install edge-tts

Usage:
    python generate_tts_module3.py
"""

import re
import json
import asyncio
import os
import sys
from pathlib import Path
import edge_tts

# Fix Windows console encoding
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')


# Configuration
INPUT_FILE = "scripts/module3-minimal.js"
OUTPUT_DIR = "audio/module3-samples"
VOICE = "en-US-JennyNeural"  # High-quality female voice, also try: en-GB-SoniaNeural, en-AU-NatashaNeural
RATE = "+0%"  # Speed: -50% to +50%
VOLUME = "+0%"  # Volume: -50% to +50%


def extract_sample_answers(js_file_path):
    """
    Extract sample answers from the JavaScript file.

    Args:
        js_file_path: Path to the module3-minimal.js file

    Returns:
        List of dictionaries containing topic and sample answer text
    """
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match each cue card object
    # Looking for: topic: '...', and sampleAnswer: { text: '...' }
    pattern = r"topic:\s*'([^']+)'.*?sampleAnswer:\s*\{[^}]*?text:\s*'((?:[^'\\]|\\.)*)'"

    matches = re.finditer(pattern, content, re.DOTALL)

    sample_answers = []
    for idx, match in enumerate(matches, 1):
        topic = match.group(1)
        # Unescape the JavaScript string
        text = match.group(2).replace("\\'", "'").replace("\\n", "\n")

        sample_answers.append({
            'id': idx,
            'topic': topic,
            'text': text
        })

    return sample_answers


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


async def process_all_samples():
    """
    Extract all sample answers and generate TTS audio files.
    """
    print("=" * 70)
    print("IELTS Module 3 - Sample Answer TTS Generator")
    print("=" * 70)
    print()

    # Create output directory
    output_dir = Path(OUTPUT_DIR)
    output_dir.mkdir(parents=True, exist_ok=True)
    print(f"✓ Output directory: {output_dir.absolute()}")

    # Extract sample answers
    print(f"✓ Reading from: {INPUT_FILE}")
    sample_answers = extract_sample_answers(INPUT_FILE)
    print(f"✓ Found {len(sample_answers)} sample answers")
    print()

    # Generate metadata JSON
    metadata = []

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

        # Generate TTS audio
        await generate_audio(text, str(output_path))

        file_size_kb = output_path.stat().st_size / 1024
        print(f"✓ ({file_size_kb:.1f} KB)")
        print()

        # Add to metadata
        metadata.append({
            'id': idx,
            'topic': topic,
            'filename': filename,
            'text': text,
            'word_count': len(text.split()),
            'file_size_kb': round(file_size_kb, 2)
        })

    # Save metadata
    metadata_path = output_dir / "metadata.json"
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)

    print("=" * 70)
    print(f"✓ Successfully generated {len(sample_answers)} audio files")
    print(f"✓ Metadata saved to: {metadata_path}")
    print(f"✓ Total size: {sum(m['file_size_kb'] for m in metadata):.1f} KB")
    print("=" * 70)


async def list_available_voices():
    """
    List all available Edge TTS voices for English.
    """
    print("\nAvailable English voices:")
    print("-" * 70)

    voices = await edge_tts.list_voices()
    english_voices = [v for v in voices if v['Locale'].startswith('en-')]

    for voice in english_voices[:20]:  # Show first 20
        gender = voice['Gender']
        name = voice['ShortName']
        locale = voice['Locale']
        print(f"  {name:40} ({gender:6}, {locale})")

    print("-" * 70)
    print(f"Total English voices: {len(english_voices)}")
    print(f"\nCurrent voice: {VOICE}")
    print()


async def test_sample():
    """
    Generate a test sample to verify TTS is working.
    """
    test_text = (
        "I'd like to talk about a time last year when I helped my elderly neighbor, "
        "Mrs. Chen, who lives alone in the apartment next to mine. This is a test "
        "of the text-to-speech system for IELTS speaking practice."
    )

    output_dir = Path(OUTPUT_DIR)
    output_dir.mkdir(parents=True, exist_ok=True)
    test_file = output_dir / "test-sample.mp3"

    print("Generating test sample...")
    await generate_audio(test_text, str(test_file))
    print(f"✓ Test sample saved to: {test_file}")
    print(f"✓ File size: {test_file.stat().st_size / 1024:.1f} KB")


def main():
    """
    Main entry point.
    """
    import argparse

    parser = argparse.ArgumentParser(
        description="Generate TTS audio for IELTS Module 3 sample answers"
    )
    parser.add_argument(
        '--list-voices',
        action='store_true',
        help='List available English voices'
    )
    parser.add_argument(
        '--test',
        action='store_true',
        help='Generate a test sample'
    )
    parser.add_argument(
        '--voice',
        type=str,
        default=VOICE,
        help=f'Voice to use (default: {VOICE})'
    )

    args = parser.parse_args()

    # Update global voice if specified
    if args.voice != VOICE:
        globals()['VOICE'] = args.voice

    if args.list_voices:
        asyncio.run(list_available_voices())
    elif args.test:
        asyncio.run(test_sample())
    else:
        asyncio.run(process_all_samples())


if __name__ == "__main__":
    main()
