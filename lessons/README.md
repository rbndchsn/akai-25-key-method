# Akai 25-Key Performance Method | v1

This is an offline learning website for the **Akai MPK Mini Play mk3**, designed for a singer/guitarist learning to perform with one hand on a 25-key keyboard.

## Start

Double-click **`index.html`**. It opens in your default browser, even without Wi-Fi.

For the copy in Google Drive on Windows:

`C:\Users\rbndc\My Drive\cowork_files\Akai_How2\lessons\index.html`

Keep the **entire `lessons` folder together**. Its HTML pages share the local files in `assets/`.

## Site map

| Page | Purpose |
|---|---|
| `index.html` | Course map and harmonica-friendly key guide |
| `lesson_01_chord_laboratory.html` | Chords, inversions and one-hand accompaniment |
| `lesson_02_blues_lab.html` | Major/minor I–IV–V, clickable 12-bar form, blues scales and arpeggios |
| `lesson_03_jazz_lab.html` | Major ii–V–I and minor iiø–V–i, shells and smooth inversions |
| `lesson_04_scales_arpeggios.html` | Scales, arpeggios, melodic call-and-response exercises |
| `lesson_05_playing_the_black_keys.html` | F♯ major / D♯ minor pentatonic improvisation; voice-and-synth exercises |
| `assets/black-keys.css` / `assets/black-keys.js` | Lesson 05-specific offline presentation and interactions |
| `assets/lessons.css` | Shared look-and-feel based on the existing illustrated Akai handbook |
| `assets/music-theory.js` | Offline pitch, chord, scale, voicing and keyboard SVG engine |
| `assets/lessons.js` | Interaction and page behavior |

## Practical notes

- **No internet is required** to use the diagrams, navigate lessons, switch theme, or complete exercises.
- A keyboard image shows **25 chromatic notes**, not 25 white keys. The displayed C2–C4 / C3–C5 / C4–C6 octave window is for practice only. Change octaves on the physical Akai using the actual OCTAVE buttons.
- Interactive controls do **not** connect to or program the physical keyboard.
- Checkboxes are session-only. They do not sync to Google Drive or claim to save progress.
- No auto-playing backing tracks and no claim that the Play mk3 supports built-in multitrack phrase looping or one-finger chord programming.
- The website links to `../akai_howto_v1_illustrated.html`; it should be beside the `lessons/` folder in the original project.

## Source and preservation

Built from Markdown specs saved in `../research/`: `lesson_course_spec_v1.md` and `lesson_01` through `lesson_04` specs. The original illustrated field guide and Markdown guide were **not edited**.

Version: v1.0, November 2026. Tested: desktop and 390px mobile layout, 37 content/function tests, and browser interaction checks.
