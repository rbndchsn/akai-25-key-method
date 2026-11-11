# Lesson 05 specification v1 | Playing the Black Keys

**Date:** 2026-11-11  
**Status:** Implemented as a dedicated offline lesson page.  
**Source:** User discovery that improvising exclusively on the black keys sounds harmonious; subsequent decisions to teach two tonal centers, F♯ major and D♯ minor, using the same five notes.  
**Audience:** Experienced guitarist/singer learning right-hand performance on an Akai MPK Mini Play mk3.  

## Instructional objective

Learners should be able to play and improvise with the five black keys, recognize two distinct tonal centers, play a supporting tonic triad, sing a line and respond with the keyboard, and finally perform without opening the site or using notation. The learner hears first and names the theory second.

## Musical facts

- Black-key pitch classes: C♯ D♯ F♯ G♯ A♯ (also enharmonically D♭ E♭ G♭ A♭ B♭).
- F♯ major pentatonic: F♯ G♯ A♯ C♯ D♯ (scale degrees 1 2 3 5 6). Tonic chord: F♯ A♯ C♯.
- D♯ minor pentatonic: D♯ F♯ G♯ A♯ C♯ (scale degrees 1 ♭3 4 5 ♭7). Tonic chord: D♯ F♯ A♯.
- Identical note collection, **different tonal centers and supporting harmonies**.
- Tonic and chord notes are plausible resolution points; other scale notes are melodic colors, not necessarily universally stable over every chord.
- No semitone neighbors within the five-note collection; this can make improvisation more forgiving but cannot guarantee that any note works with any harmonic backdrop.

## Sublesson A: F♯ major

1. Identify F♯, G♯, A♯, C♯, D♯ by their locations on the black keys.
2. Play F♯ A♯ C♯ as a right-hand tonic triad, using 1–3–5 as a flexible starting fingering.
3. Call: F♯ G♯ A♯ C♯; response: C♯ A♯ G♯ F♯.
4. Sing over the F♯ chord and answer the vocal line with a three-note keyboard phrase; make F♯ feel like arrival.
5. Four-bar mini-form: chord, sung phrase, response, tonic resolution.

## Sublesson B: D♯ minor

1. Keep exactly the same five black-key pitch classes; change the tonal center to D♯.
2. Play D♯ F♯ A♯ as a tonic triad, hearing the minor third F♯.
3. Call: D♯ F♯ G♯ A♯; response: A♯ G♯ F♯ D♯.
4. Use a soft organ or synthesizer pad, sing a line and answer using black keys; return to D♯.
5. Clarify that the Akai's onboard sounds do not create an independent sustained backing layer after releasing the keys.

## Interactive site design

- Match existing cream/forest-green/teal/gold theme and accessibility conventions.
- New `lessons/lesson_05_playing_the_black_keys.html`, with `assets/black-keys.css` and `assets/black-keys.js`.
- Reuse existing `assets/music-theory.js` to draw the 25-key SVG; use existing `assets/lessons.js` for menu, theme, print, checkboxes.
- Live controls: tonal center, all five notes vs tonic chord vs melodic call/response vs tonic note, visual register C2–C4 / C3–C5 / C4–C6, and rotating practice prompts.
- No audio playback, network requests, external assets, direct MIDI control, account, or persistent progress.
- Add Lesson 05 to root and lessons index, all site lesson navigation, and Lesson 04 next-page link.
- Do not silently modify the original illustrated handbook or old research specifications.

## QA acceptance

- Five black keys highlighted per octave (10 black keys over a two-octave 25-key window) in all-notes mode.
- F♯ major triad pitch classes F♯ A♯ C♯; D♯ minor triad D♯ F♯ A♯.
- Switching modes changes title, displayed notes, tonic, chord and call/response.
- Practice prompt generator cycles through four useful prompts.
- Internal links work in GitHub Pages and local file mode.
- Navigation appears in root, lesson index, existing lessons and new lesson.
- Site styling remains consistent on desktop and mobile; print and dark mode work.
