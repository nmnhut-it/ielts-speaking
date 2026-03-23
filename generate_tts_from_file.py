"""
Generate TTS audio from text file using Edge TTS.

Usage:
    python generate_tts_from_file.py

Reads from: tts-request.txt
Output: audio/custom/
"""

import asyncio
import sys
from pathlib import Path
import edge_tts
import re

# Fix Windows console encoding
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Configuration
INPUT_FILE = "tts-request.txt"
OUTPUT_DIR = "audio/custom"
VOICE = "en-US-JennyNeural"
RATE = "+0%"
VOLUME = "+0%"


def parse_input_file(file_path):
    """
    Parse input file. Supports multiple formats:
    1. Plain text (one line = one file)
    2. Numbered list (1. Text here)
    3. Custom format: FILENAME|Text here
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    items = []
    auto_index = 1

    for line in lines:
        line = line.strip()

        # Skip empty lines and comments
        if not line or line.startswith('#'):
            continue

        # Format: FILENAME|Text
        if '|' in line:
            parts = line.split('|', 1)
            filename = parts[0].strip()
            text = parts[1].strip()
            items.append({
                'filename': filename if filename.endswith('.mp3') else f"{filename}.mp3",
                'text': text
            })

        # Format: 1. Text or 1) Text
        elif re.match(r'^\d+[\.\)]\s+', line):
            text = re.sub(r'^\d+[\.\)]\s+', '', line)
            # Use first 20 words for filename
            words = text.split()[:20]
            safe_name = '-'.join(words)
            safe_name = re.sub(r'[^\w\s-]', '', safe_name)[:100]
            items.append({
                'filename': f"{auto_index:02d}-{safe_name}.mp3",
                'text': text
            })
            auto_index += 1

        # Plain text
        else:
            # Use first 20 words for filename
            words = line.split()[:20]
            safe_name = '-'.join(words)
            safe_name = re.sub(r'[^\w\s-]', '', safe_name)[:100]
            items.append({
                'filename': f"{auto_index:02d}-{safe_name}.mp3",
                'text': line
            })
            auto_index += 1

    return items


async def generate_audio(text, output_path, voice=VOICE, rate=RATE, volume=VOLUME):
    """Generate MP3 audio file from text using Edge TTS."""
    communicate = edge_tts.Communicate(text, voice, rate=rate, volume=volume)
    await communicate.save(output_path)


async def process_all():
    """Process all text entries and generate TTS audio."""
    print("="*70)
    print("Edge TTS Generator from File")
    print("="*70)
    print(f"Voice: {VOICE}")
    print(f"Rate: {RATE}, Volume: {VOLUME}")
    print("="*70)
    print()

    # Check input file exists
    input_path = Path(INPUT_FILE)
    if not input_path.exists():
        print(f"❌ ERROR: {INPUT_FILE} not found!")
        print()
        print("Create a file named 'tts-request.txt' with one of these formats:")
        print()
        print("Format 1 - Plain text:")
        print("  Hello world")
        print("  This is a test")
        print()
        print("Format 2 - Numbered list:")
        print("  1. First sentence")
        print("  2. Second sentence")
        print()
        print("Format 3 - Custom filename:")
        print("  greeting|Hello world")
        print("  test|This is a test")
        print()
        return

    # Parse input file
    print(f"Reading from: {INPUT_FILE}")
    items = parse_input_file(INPUT_FILE)

    if not items:
        print("❌ No text found in input file!")
        return

    print(f"✓ Found {len(items)} text entries")
    print()

    # Create output directory
    output_dir = Path(OUTPUT_DIR)
    output_dir.mkdir(parents=True, exist_ok=True)
    print(f"✓ Output directory: {output_dir.absolute()}")
    print()

    # Process each item
    total_size = 0
    for idx, item in enumerate(items, 1):
        filename = item['filename']
        text = item['text']
        output_path = output_dir / filename

        print(f"[{idx}/{len(items)}] {filename}")
        print(f"    ├─ Words: {len(text.split())}")
        print(f"    ├─ Text: {text[:60]}{'...' if len(text) > 60 else ''}")
        print(f"    └─ Generating audio...", end=" ", flush=True)

        try:
            await generate_audio(text, str(output_path))
            file_size_kb = output_path.stat().st_size / 1024
            total_size += file_size_kb
            print(f"✓ ({file_size_kb:.1f} KB)")
        except Exception as e:
            print(f"❌ Error: {e}")

        print()

    print("="*70)
    print(f"✓ Successfully generated {len(items)} audio files")
    print(f"✓ Total size: {total_size:.1f} KB ({total_size/1024:.1f} MB)")
    print(f"✓ Output: {output_dir.absolute()}")
    print("="*70)


def main():
    """Main entry point."""
    asyncio.run(process_all())


if __name__ == "__main__":
    main()
