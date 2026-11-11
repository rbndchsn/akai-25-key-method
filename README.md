# Akai 25-Key Performance Method

An offline-first, illustrated teaching site for musicians using the Akai MPK Mini Play mk3. Designed around playing and singing with a two-octave miniature keyboard rather than recreating traditional piano technique.

## Open the website

- **[Course homepage](index.html)**
- **[Complete Akai field guide](akai_howto_v1_illustrated.html)**
- **[Lesson index](lessons/index.html)**

Lessons: one-hand chord laboratory, blues I–IV–V, jazz ii–V–I and iiø–V–i, scales, arpeggios and black-key pentatonic improvisation. Includes interactive diagrams, inversions, and a C diatonic harmonica context.

## Local/offline use

Download the entire repository (GitHub → Code → Download ZIP), extract it, then open `index.html` in a modern browser. All site styling, diagrams and interactive code are local. External research references require an internet connection.

## GitHub Pages

To publish a public repository using GitHub Pages, go to **Settings → Pages → Build and deployment → Deploy from a branch**, then choose **main** and **/(root)** and save. GitHub Pages will serve `index.html` from the repository root.

## Project structure

- `index.html` — site entrance
- `akai_howto_v1_illustrated.html` — stand-alone illustrated reference
- `lessons/index.html` — course overview
- `lessons/lesson_*.html` — interactive lessons
- `lessons/assets/` — shared CSS and JavaScript

## Scope

This is an independent educational resource, not affiliated with Akai Professional. The browser diagrams explain music theory; they do not control the hardware. The device does not have standalone audio looping or a one-key automatic chord mode.

The original research and drafting workspace is maintained separately and is not included in this public website repository.

## Latest addition: Lesson 05

[Playing the Black Keys](lessons/lesson_05_playing_the_black_keys.html) explores the same five black notes as **F♯ major pentatonic** and **D♯ minor pentatonic**. It includes an interactive keyboard, two separate teaching paths, chord-and-melody experiments, singing and composition exercises, and an offline practice prompt generator. It uses local `lessons/assets/black-keys.css` and `black-keys.js`.

The lesson is designed around **musical autonomy**: play by ear, build chord shapes, recognize a tonal center, improvise, then close the screen and perform.
