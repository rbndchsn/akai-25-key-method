/* AKAI_How2 course interface | local-only, no persistence or network */
(() => {
'use strict';
const T=window.AKAITheory, $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const option=(val,label,selected)=>`<option value="${val}" ${val===selected?'selected':''}>${label}</option>`;
const N=(a)=>a.join(' · '), reg=()=>Number($('#register')?.value||48);
const legend='<div class="legend"><span><i class="legend-root"></i>Root / tonic</span><span><i class="legend-chord"></i>Chord tones</span><span><i class="legend-scale"></i>Additional scale tones</span></div>';
function setText(id,v){const e=$(id); if(e)e.textContent=v;}
function showKeyboard(notes,warnings=[]){const svg=$('#keyboard-svg'); if(!svg)return; T.drawKeyboard(svg,notes,{start:reg()});const w=$('#range-warning'); if(w){w.hidden=!warnings.length;w.textContent=warnings.length?'Outside this illustrated 25-key window: '+warnings.join(', ')+'. Use Octave +/− on the actual Akai, or choose another inversion.':'';}}
function keyboardFromVoicing(v){let a=v.notes.map((x,i)=>({...x,role:T.pc(x.midi)===T.parseNote(v.root)?'root':'chord'}));showKeyboard(a,T.formatOffboard(v.notes,reg()));setText('#keyboard-note-readout',N(v.notes.map(x=>x.display)));setText('#voicing-caption',`Suggested ${v.style==='shell'?'shell':(v.inversion?'inversion '+v.inversion:'root-position')} voicing; educational octave labels. Change the physical Akai register using its OCTAVE buttons.`);}
function scaleView(root,kind){const names=T.scale(root,kind);const hi=T.scaleHighlights(names,root,reg());showKeyboard(hi,[]);setText('#keyboard-note-readout',N(names));setText('#voicing-caption',`Scale pitch classes across the 25-key window. The Akai does not automatically generate this scale.`);return names;}
function fillKeySelector(sel,majorMinor=true){sel.innerHTML=T.KEYS.map(k=>option(k.id,k.id+(k.mode==='major'?' major':' minor'),'C')).join('');}
function registerEvents(cb){$('#register')?.addEventListener('change',cb);}
function initSite(){const page=document.body.dataset.page;$$('.nav-links a').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop())a.classList.add('current');if(page==='index'&&a.getAttribute('href')==='index.html')a.classList.add('current')});
 const theme=$('#toggle-theme'); if(theme){theme.addEventListener('click',()=>{document.body.classList.toggle('dark');theme.textContent=document.body.classList.contains('dark')?'☀ Light mode':'☾ Dark mode';});}
 $('#menu-toggle')?.addEventListener('click',()=>{const side=$('#side-nav');side.classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(side.classList.contains('open')));});
 $('#print-guide')?.addEventListener('click',()=>window.print());
 $$('.checkpoint input[type=checkbox]').forEach(c=>c.addEventListener('change',()=>{const el=$('#checkpoint-feedback');if(el)el.textContent=$$('.checkpoint input:checked').length+' of '+$$('.checkpoint input[type=checkbox]').length+' practice checks completed in this visit. Progress is not saved.';}));
}
function initChords(){
 const sel=$('#root'),ql=$('#quality'),inv=$('#inversion');
 sel.innerHTML=['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'].map(n=>option(n,n,'C')).join('');
 const qualities=['major','minor','dim','aug','sus2','sus4','maj7','dom7','m7','m7b5','dim7','six','add9'];ql.innerHTML=qualities.map(q=>option(q,T.QUALITY[q].label,'maj7')).join('');
 function render(){const rt=sel.value,q=ql.value,max=T.QUALITY[q].intervals.length-1; if(+inv.value>max)inv.value='0';
  for(const x of Array.from(inv.options))x.hidden=+x.value>max;
  const v=T.realVoicing(rt,q,+inv.value,reg());keyboardFromVoicing(v);
  setText('#current-symbol',T.symbol(rt,q));setText('#chord-formula',N(T.QUALITY[q].intervals.map(String)));
  setText('#main-explainer',`${T.QUALITY[q].label}: ${N(T.chord(rt,q))}. The inversion changes which note is lowest; it does not change the chord's identity.`);
 }
 [sel,ql,inv,$('#register')].forEach(x=>x.addEventListener('change',render));render();
 $$('.demo-chord').forEach(b=>b.addEventListener('click',()=>{sel.value=b.dataset.root;ql.value=b.dataset.quality;inv.value=b.dataset.inv||'0';render();$('#chord-lab').scrollIntoView({behavior:'smooth',block:'start'});}));
}
function initBlues(){
 const key=$('#blues-key'),form=$('#form'),voicing=$('#voicing'),focus=$('#focus'),barGrid=$('#bar-grid'),alt=$('#minor-v-dominant');
 fillKeySelector(key);key.value='G';let active=0;
 function render(){const k=T.keyObj(key.value),minor=k.mode==='minor',chords=T.blues(k.id,minor&&alt.checked),sequence=T.progressionSequence(form.value==='quick'?2:1);
 const labels=[...chords.map(c=>T.symbol(c.root,c.quality))];
 barGrid.innerHTML=sequence.map((ci,i)=>`<button class="bar-tile ${active===i?'active':''}" data-bar="${i}" aria-pressed="${active===i}"><span class="bar-num">BAR ${String(i+1).padStart(2,'0')}</span><strong>${labels[ci]}</strong><small>${chords[ci].roman}</small></button>`).join('');
 barGrid.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{active=Number(b.dataset.bar);render();}));
 const c=chords[sequence[active]],sym=T.symbol(c.root,c.quality),q=c.quality,inv=voicing.value;
 setText('#active-bar',`Bar ${active+1} / 12 · ${c.roman} · ${sym}`);
 setText('#blues-chords',chords.map(c=>`${c.roman} ${T.symbol(c.root,c.quality)}`).join('   ·   '));
 const tonalKey=T.keyObj(key.value);
 setText('#harp-note',tonalKey.harmonica);
 $('#minor-alt').hidden=!minor;
 const focusVal=focus.value;$('#mix-warning').hidden=!(focusVal==='mixolydian'&&minor);
 let caption='';
 if(focusVal==='chord'||focusVal==='arp'){
  const v=T.realVoicing(c.root,q,inv==='shell'?0:Number(inv),reg(),inv==='shell'?'shell':'close');keyboardFromVoicing(v);
  const notes=T.chord(c.root,q);
  caption=focusVal==='arp'?`Arpeggio: ${N(notes)}. Play one note at a time in a deliberate rhythmic pattern.`:`Chord: ${N(notes)}. Use a compact one-hand shape.`;
  if(inv==='shell')caption+=' The fifth is omitted in the three-note seventh-chord shell.';
 } else {
  const sc=focusVal==='pent'?'minorPent':focusVal==='mixolydian'?'mixolydian':'blues';
  const root=focusVal==='mixolydian'?c.root:k.root;
  const names=scaleView(root,sc);
  caption=`${T.SCALE[sc].label}: ${N(names)}. Listen for chord tones as points of arrival.`;
  if(minor&&sc==='mixolydian')caption+=' Mixolydian is an optional dominant-seventh color, not the standard tonic minor blues scale.';
 }
 setText('#blues-explainer',caption);
 setText('#form-note',form.value==='quick'?'Quick-change: bar 2 goes to IV instead of staying on I.':'Standard: I remains through bars 1–4.');
 }
 [key,form,voicing,focus,alt,$('#register')].forEach(el=>el.addEventListener('change',()=>{active=Math.min(active,11);render();}));
 $('#next-bar')?.addEventListener('click',()=>{active=(active+1)%12;render();});
 $('#previous-bar')?.addEventListener('click',()=>{active=(active+11)%12;render();});
 render();
}
function initJazz(){
 const key=$('#jazz-key'),voicing=$('#jazz-voicing'),focus=$('#jazz-focus'),cards=$('#jazz-cards');fillKeySelector(key);let active=0;
 function render(){const k=T.keyObj(key.value),cs=T.jazz(k.id),mode=voicing.value,selected=cs[active];
 cards.innerHTML=cs.map((c,i)=>`<button class="harmonic-card ${active===i?'active':''}" data-step="${i}" aria-pressed="${active===i}"><span class="roman">${c.roman}</span><strong>${T.symbol(c.root,c.quality)}</strong><span>${c.description}</span></button>`).join('');
 cards.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{active=Number(b.dataset.step);render();}));
 setText('#jazz-progression',cs.map(c=>T.symbol(c.root,c.quality)).join('   →   '));
 setText('#jazz-roman',k.mode==='major'?'Major: ii7 → V7 → Imaj7':'Minor: iiø7 → V7 → i');
 setText('#jazz-meaning',selected.description);
 let voice;
 let effectiveMode=mode;
 if(selected.quality==='minor' && (mode==='shell'||mode==='3'))effectiveMode='0';
 if(mode==='smooth')voice=T.smoothVoice(cs,reg())[active];
 else voice=T.realVoicing(selected.root,selected.quality,effectiveMode==='shell'?0:Number(effectiveMode),reg(),effectiveMode==='shell'?'shell':'close');
 const f=focus.value;
 if(f==='scale'){
  const names=scaleView(selected.root,selected.scale);
  setText('#jazz-explainer',`${T.SCALE[selected.scale].label}: ${N(names)}. Emphasize the current chord tones, not simply a scale run.`);
 } else {
  keyboardFromVoicing(voice);
  const full=T.chord(selected.root,selected.quality);
  setText('#jazz-explainer',`${f==='arp'?'One-note-at-a-time arpeggio':'Accompaniment voicing'}: ${N(full)}. ${mode==='smooth'?'The smooth setting compares inversions across all three chords and chooses a low-motion set.':'Try to keep common notes and move other fingers by the smallest intervals.'}${mode==='shell'&&selected.quality!=='minor'?' Seventh-chord shell omits the fifth. For iiø7, include the flattened fifth in a later full voicing to establish its quality.':''}${effectiveMode!==mode?' The basic minor tonic is a triad: a three-note shell or third inversion does not apply, so its root-position triad is shown.':''}`);
 }
 const guides=cs.map(c=>{
  const notes=T.chord(c.root,c.quality),is7=notes.length===4;
  return `<div class="guide-cell"><span>${c.roman} · ${T.symbol(c.root,c.quality)}</span><strong>${notes[1]} ${is7?'→ '+notes[3]:''}</strong><small>${is7?'3rd and 7th':'Tonic third; no chordal 7th in basic triad'}</small></div>`;
 }).join(''); $('#guide-tone-path').innerHTML=guides;
 setText('#harp-note',k.harmonica);
 setText('#minor-clarifier',k.mode==='minor'?'Minor iiø7 (half-diminished) includes ♭5. The V7 is a major-third dominant, derived from harmonic-minor practice.':'Major ii–V–I uses minor 7, dominant 7, major 7. The common tones and guide tones help the progression resolve.');
 }
 [key,voicing,focus,$('#register')].forEach(e=>e.addEventListener('change',render));render();
}
function initScales(){
 const key=$('#scale-key'),kind=$('#scale-kind'),path=$('#path'),voice=$('#scales-source');fillKeySelector(key);
 const scales=['major','naturalMinor','harmonicMinor','majorPent','minorPent','blues','dorian','mixolydian','locrian','phrygianDom'];kind.innerHTML=scales.map(s=>option(s,T.SCALE[s].label,'blues')).join('');
 const sources=[['none','Scale only'],['bluesI','Blues: tonic'],['bluesIV','Blues: IV'],['bluesV','Blues: V'],['jazzII','Jazz: ii / iiø'],['jazzV','Jazz: V7'],['jazzI','Jazz: I / i']];voice.innerHTML=sources.map(([v,l])=>option(v,l,v==='none')).join('');
 function render(){const k=T.keyObj(key.value),sc=T.scale(k.root,kind.value),seq=T.stepsSequence(sc,path.value),chSource=voice.value;
 const where=$('#scale-apply'),out=$('#scales-explainer');
 setText('#scale-title',`${k.root} ${T.SCALE[kind.value].label}`);setText('#scale-formula',N(T.SCALE[kind.value].intervals.map(String)));
 setText('#scale-notes',N(sc));setText('#ordered-pattern',N(seq));
 setText('#harp-note',k.harmonica);
 if(chSource==='none'){
   scaleView(k.root,kind.value);where.textContent='Scale tones highlighted across this reference keyboard';out.textContent='Practice short phrases, sing a response, and land on a chord tone. An entire scale is a palette, not a melody.';
 } else {
   let c; if(chSource.startsWith('blues'))c=T.blues(k.id)[{'bluesI':0,'bluesIV':1,'bluesV':2}[chSource]];
   else c=T.jazz(k.id)[{'jazzII':0,'jazzV':1,'jazzI':2}[chSource]];
   const arp=T.chord(c.root,c.quality),chosen=T.realVoicing(c.root,c.quality,0,reg());
   keyboardFromVoicing(chosen);where.textContent=`${T.symbol(c.root,c.quality)} arpeggio: ${N(arp)}`;
   out.textContent=`This highlights a playable register for the ${T.symbol(c.root,c.quality)} chord. Practice the arpeggio ${N(arp)}, then make a three-note response from the chord tones.`;
 }
 }
 [key,kind,path,voice,$('#register')].forEach(el=>el.addEventListener('change',render));render();
}
document.addEventListener('DOMContentLoaded',()=>{initSite();const p=document.body.dataset.page;if(p==='chords')initChords();if(p==='blues')initBlues();if(p==='jazz')initJazz();if(p==='scales')initScales();});
})();
