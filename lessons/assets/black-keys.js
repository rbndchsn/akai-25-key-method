/* Lesson 05 interactive black-key laboratory. Offline, no audio, no tracking. */
(()=>{
'use strict';
const theory=window.AKAITheory;
const $=selector=>document.querySelector(selector);
const $$=selector=>Array.from(document.querySelectorAll(selector));
const pitchName={1:'C♯',3:'D♯',6:'F♯',8:'G♯',10:'A♯'};
const blackPitch=[1,3,6,8,10];
const lessons={
 major:{title:'F♯ major pentatonic',home:6,homeLabel:'F♯',chordName:'F♯ major',chord:[6,10,1],chordLabels:'F♯ · A♯ · C♯',notes:'F♯ · G♯ · A♯ · C♯ · D♯',
    call:[6,8,10,1],reply:[1,10,8,6],
    homeText:'F♯ is home. Let phrases relax toward F♯ and hear the bright, open major character.',
    chordText:'Play F♯–A♯–C♯ together. These three black keys form your F♯ major tonic triad.',
    callText:'F♯ → G♯ → A♯ → C♯. Move up, then leave a beat of silence.',
    replyText:'C♯ → A♯ → G♯ → F♯. Move down and rest on your tonic.',
    closeText:'End on F♯, preferably after a pause. Try singing a major-sounding line over F♯–A♯–C♯.'},
 minor:{title:'D♯ minor pentatonic',home:3,homeLabel:'D♯',chordName:'D♯ minor',chord:[3,6,10],chordLabels:'D♯ · F♯ · A♯',notes:'D♯ · F♯ · G♯ · A♯ · C♯',
    call:[3,6,8,10],reply:[10,8,6,3],
    homeText:'D♯ is home. The same five keys now lean toward a different tonal center, with a minor character.',
    chordText:'Play D♯–F♯–A♯ together. This three-black-key shape is your D♯ minor tonic triad.',
    callText:'D♯ → F♯ → G♯ → A♯. Rise through a short minor-colored idea.',
    replyText:'A♯ → G♯ → F♯ → D♯. Descend and let D♯ feel settled.',
    closeText:'End on D♯. Establish the D♯m chord first; sing while holding it, then release the keys and answer with a separate keyboard phrase.'}
};
let mode='major', focus='all', example=0;
function setText(id,v){const target=$(id);if(target)target.textContent=v;}
function render(){
 const d=lessons[mode],start=Number($('#blackkeys-register').value),end=start+24;
 const chosen=focus==='triad'?d.chord:focus==='call'?d.call:focus==='reply'?d.reply:focus==='home'?[d.home]:blackPitch;
 const targets=new Set(chosen);
 const selected=[];
 for(let midi=start;midi<=end;midi++){
  const p=theory.pc(midi);
  if(!targets.has(p))continue;
  selected.push({midi,role:p===d.home?'root':d.chord.includes(p)?'chord':'scale',display:pitchName[p]+theory.octaveFromMidi(midi)});
 }
 theory.drawKeyboard($('#keyboard-svg'),selected,{start});
 const captions={all:'All five notes, across two octaves. The teal note is your chosen tonic.',triad:d.chordText,call:d.callText,reply:d.replyText,home:d.homeText};
 setText('#blackkeys-current-title',d.title);
 setText('#blackkeys-note-readout',d.notes);
 setText('#blackkeys-tonic',d.homeLabel);
 setText('#blackkeys-chord-name',d.chordName);
 setText('#blackkeys-chord-notes',d.chordLabels);
 setText('#blackkeys-caption',captions[focus]);
 setText('#blackkeys-next-step',d.closeText);
 setText('#blackkeys-sequence',focus==='call'?d.callText:focus==='reply'?d.replyText:focus==='triad'?d.chordText:focus==='home'?d.homeText:'Try all five notes, then choose Call or Response to follow a short melodic phrase.');
 $$('.blackkeys-mode button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.center===mode)));
 const modeSelect=$('#blackkeys-center');if(modeSelect)modeSelect.value=mode;
}
function setMode(next,shouldScroll=false){if(!lessons[next])return;mode=next;focus='all';$('#blackkeys-focus').value='all';example=0;render();prompt();if(shouldScroll)$('#blackkeys-lab').scrollIntoView({behavior:'smooth',block:'start'});}
function prompt(){
 const d=lessons[mode];
 const prompts=[
  `Play ${d.chordLabels} as a chord for four slow beats. Release it. Invent a three-note melody using only black keys, ending on ${d.homeLabel}.`,
  `Sing one original lyric line. Answer with just two or three black-key notes. Leave silence after your answer and resolve toward ${d.homeLabel}.`,
  `Play the Call and Response patterns, then reverse their rhythms. Keep ${d.homeLabel} as your home note.`,
  `Change timbre to organ or synth pad. Play ${d.chordName}, release the chord, improvise a short phrase, and shape the filter only during a safe pause.`
 ];
 setText('#blackkeys-prompt',prompts[example%prompts.length]);example++;
}
document.addEventListener('DOMContentLoaded',()=>{
 if(!theory || !$('#keyboard-svg'))return;
 $$('.blackkeys-mode button').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.center)));
 $$('[data-open-center]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.openCenter,true)));
 $('#blackkeys-center').addEventListener('change',e=>setMode(e.target.value));
 $('#blackkeys-focus').addEventListener('change',e=>{focus=e.target.value;render()});
 $('#blackkeys-register').addEventListener('change',render);
 $('#blackkeys-new-prompt').addEventListener('click',prompt);
 render();prompt();
});
})();
