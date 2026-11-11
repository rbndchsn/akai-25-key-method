/* AKAI_How2 25-Key Performance Method | Pure music-theory helpers, offline */
(function (global) {
'use strict';
const pc = n => ((n % 12) + 12) % 12;
const NAT = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const LETTERS = ['C','D','E','F','G','A','B'];
const QUALITY = {
  major:{label:'Major', intervals:[0,4,7]}, minor:{label:'Minor',intervals:[0,3,7]},
  dim:{label:'Diminished',intervals:[0,3,6]}, aug:{label:'Augmented',intervals:[0,4,8]},
  sus2:{label:'Suspended 2',intervals:[0,2,7],steps:[0,1,4]}, sus4:{label:'Suspended 4',intervals:[0,5,7],steps:[0,3,4]},
  maj7:{label:'Major seventh',intervals:[0,4,7,11]}, dom7:{label:'Dominant seventh',intervals:[0,4,7,10]},
  m7:{label:'Minor seventh',intervals:[0,3,7,10]}, m7b5:{label:'Half-diminished seventh',intervals:[0,3,6,10]},
  dim7:{label:'Diminished seventh',intervals:[0,3,6,9]}, six:{label:'Major sixth',intervals:[0,4,7,9],steps:[0,2,4,5]},
  add9:{label:'Add ninth',intervals:[0,4,7,14],steps:[0,2,4,8]},
  m6:{label:'Minor sixth',intervals:[0,3,7,9],steps:[0,2,4,5]}, mmaj7:{label:'Minor-major seventh',intervals:[0,3,7,11]}
};
const SCALE = {
 major:{label:'Major / Ionian',intervals:[0,2,4,5,7,9,11],steps:[0,1,2,3,4,5,6]},
 naturalMinor:{label:'Natural minor / Aeolian',intervals:[0,2,3,5,7,8,10],steps:[0,1,2,3,4,5,6]},
 harmonicMinor:{label:'Harmonic minor',intervals:[0,2,3,5,7,8,11],steps:[0,1,2,3,4,5,6]},
 majorPent:{label:'Major pentatonic',intervals:[0,2,4,7,9],steps:[0,1,2,4,5]},
 minorPent:{label:'Minor pentatonic',intervals:[0,3,5,7,10],steps:[0,2,3,4,6]},
 blues:{label:'Minor blues (six notes)',intervals:[0,3,5,6,7,10],steps:[0,2,3,4,4,6],blueFifthIndex:3},
 dorian:{label:'Dorian',intervals:[0,2,3,5,7,9,10],steps:[0,1,2,3,4,5,6]},
 mixolydian:{label:'Mixolydian',intervals:[0,2,4,5,7,9,10],steps:[0,1,2,3,4,5,6]},
 locrian:{label:'Locrian',intervals:[0,1,3,5,6,8,10],steps:[0,1,2,3,4,5,6]},
 phrygianDom:{label:'Phrygian dominant',intervals:[0,1,4,5,7,8,10],steps:[0,1,2,3,4,5,6]}
};
const KEYS = [
 {id:'C',root:'C',mode:'major',harmonica:'C harp: straight harp / first position; strong match'},
 {id:'Cm',root:'C',mode:'minor',harmonica:'C diatonic harp: C minor is more specialized; bends or another harp may help'},
 {id:'D',root:'D',mode:'major',harmonica:'C harp: more specialized than C or G'},
 {id:'Dm',root:'D',mode:'minor',harmonica:'C harp: requires a specialized approach'},
 {id:'G',root:'G',mode:'major',harmonica:'C harp: cross harp / second position, classic G blues'},
 {id:'Am',root:'A',mode:'minor',harmonica:'C harp: relative minor / fourth position can work'},
 {id:'B',root:'B',mode:'major',harmonica:'C harp: another key harmonica is more straightforward'},
 {id:'Bm',root:'B',mode:'minor',harmonica:'C harp: another key harmonica is more straightforward'}
];
function parseNote(s){const m=/^([A-G])([♯#♭b]?)/.exec(s);if(!m)throw Error('Invalid note '+s);return pc(NAT[m[1]]+(m[2]==='♯'||m[2]==='#'?1:m[2]==='♭'||m[2]==='b'?-1:0));}
function noteOf(root,delta,letterStep){
 const letter= root[0],idx=LETTERS.indexOf(letter),target=LETTERS[(idx+letterStep)%7];
 const targetPc=pc(parseNote(root)+delta),natural=NAT[target];
 let diff=pc(targetPc-natural);if(diff>6) diff-=12;
 if(diff===0)return target;if(diff===1)return target+'♯';if(diff===-1)return target+'♭';
 if(diff===2)return target+'𝄪';if(diff===-2)return target+'𝄫';
 return target+' ('+targetPc+')';
}
function chord(root,quality){const q=QUALITY[quality];if(!q)throw Error('Unknown chord '+quality);
 const steps=q.steps||q.intervals.map((_,i)=>i*2);
 return q.intervals.map((d,i)=>noteOf(root,d,steps[i]));}
function scale(root,type){const s=SCALE[type];if(!s)throw Error('Unknown scale '+type);
 return s.intervals.map((d,i)=>noteOf(root,d,s.steps[i]));}
function keyObj(id){return KEYS.find(k=>k.id===id)||KEYS[0];}
function degreeRoot(key,degree,minorHarmonic=false){const k=typeof key==='string'?keyObj(key):key;
 const scaleNotes=scale(k.root,k.mode==='major'?'major':(minorHarmonic?'harmonicMinor':'naturalMinor'));
 return scaleNotes[degree-1];}
function symbol(root,quality){return root+({major:'',minor:'m',maj7:'maj7',dom7:'7',m7:'m7',m7b5:'m7♭5',dim:'dim',dim7:'dim7',aug:'aug',sus2:'sus2',sus4:'sus4',six:'6',add9:'add9',m6:'m6',mmaj7:'m(maj7)'}[quality]||quality);}
function jazz(keyId){const k=keyObj(keyId);if(k.mode==='major') {
 return [
 {roman:'ii7',root:degreeRoot(k,2),quality:'m7',description:'Predominant: minor 7th; aim for its third and seventh',scale:'dorian'},
 {roman:'V7',root:degreeRoot(k,5),quality:'dom7',description:'Dominant: tension, strong pull toward I',scale:'mixolydian'},
 {roman:'Imaj7',root:k.root,quality:'maj7',description:'Tonic: arrival and release',scale:'major'}];
 }
 return [
 {roman:'iiø7',root:degreeRoot(k,2),quality:'m7b5',description:'Half-diminished predominant: the ♭5 is part of its identity',scale:'locrian'},
 {roman:'V7',root:degreeRoot(k,5,true),quality:'dom7',description:'Major-third dominant from minor-key harmonic practice',scale:'phrygianDom'},
 {roman:'i',root:k.root,quality:'minor',description:'Minor tonic; try minor 6 and minor-major 7 colors later',scale:'naturalMinor'}];
}
function blues(keyId,dominantMinor=false){const k=keyObj(keyId),minor=k.mode==='minor';
 const root1=k.root,root4=degreeRoot(k,4),root5=degreeRoot(k,5);
 const quality=minor?'m7':'dom7';
 return [
 {roman:minor?'i7':'I7',root:root1,quality},
 {roman:minor?'iv7':'IV7',root:root4,quality},
 {roman:minor?'v7':'V7',root:root5,quality:minor&&dominantMinor?'dom7':quality}];
}
function circleFifthsName(n){return ['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'][pc(n)];}
function midiName(n,preferred=''){const oct=Math.floor(n/12)-1; return (preferred||circleFifthsName(n))+oct;}
function octaveFromMidi(n){return Math.floor(n/12)-1;}
function inversionNotes(notes,inversion){const rotated=notes.slice(); for(let i=0;i<inversion;i++)rotated.push(rotated.shift());return rotated;}
function realVoicing(root,quality,inversion=0,rangeStart=48,style='close'){
 const q=QUALITY[quality], notes=chord(root,quality);let entries=notes.map((name,i)=>({name,offset:q.intervals[i]}));
 if(style==='shell')entries=entries.filter((x,i)=>i===0||i===1||i===3); // root-3-7 for seventh chords
 let inv=Math.min(inversion,entries.length-1);for(let i=0;i<inv;i++){let x=entries.shift();x={...x,offset:x.offset+12};entries.push(x);}
 for(let i=1;i<entries.length;i++)while(entries[i].offset<=entries[i-1].offset)entries[i].offset+=12;
 const targetMid=rangeStart+12;let best=null;
 for(let base=24;base<=84;base+=12){
   const rootMidi=base+parseNote(root),mids=entries.map(x=>rootMidi+x.offset);
   const outside=mids.filter(n=>n<rangeStart||n>rangeStart+24).length;
   const avg=mids.reduce((a,b)=>a+b,0)/mids.length;
   const cost=outside*1000+Math.abs(avg-targetMid)+Math.max(0,Math.max(...mids)-Math.min(...mids)-16);
   if(!best||cost<best.cost)best={mids,cost};
 }
 return {notes:entries.map((x,i)=>({name:x.name,midi:best.mids[i],display:x.name+octaveFromMidi(best.mids[i])})),inversion:inv,quality,root,style};
}
function smoothVoice(progress,rangeStart=48){
 // Joint search over all three chord inversions to reduce total pitch displacement.
 const candidates=progress.map(c=>{
   const n=QUALITY[c.quality].intervals.length;let list=[];
   for(let i=0;i<n;i++){
    let x=realVoicing(c.root,c.quality,i,rangeStart);
    if(x.notes.every(n=>n.midi>=rangeStart&&n.midi<=rangeStart+24))list.push(x);
   }
   return list.length?list:[realVoicing(c.root,c.quality,0,rangeStart)];
 });
 let best;
 for(const a of candidates[0])for(const b of candidates[1])for(const c of candidates[2]){
  const d=(x,y)=>{let xx=x.notes.map(t=>t.midi).sort((a,b)=>a-b), yy=y.notes.map(t=>t.midi).sort((a,b)=>a-b);return xx.reduce((s,n,i)=>s+Math.abs(n-yy[Math.min(i,yy.length-1)]),0)};
  const cost=d(a,b)+d(b,c);if(!best||cost<best.cost)best={cost,voicings:[a,b,c]};
 }
 return best.voicings;
}
function formatOffboard(midiNotes,start){return midiNotes.filter(n=>n.midi<start||n.midi>start+24).map(n=>n.display);}
function progressionSequence(n){return n===2?[0,1,0,0,1,1,0,0,2,1,0,2]:[0,0,0,0,1,1,0,0,2,1,0,2];}
// SVG keyboard: 25 chromatic keys = 15 white + 10 black from C to C, actually 15 whites and 10 blacks.
function drawKeyboard(svg,notes,opts={}){
 const start=Number(opts.start??48),end=start+24,highlight=notes||[];let all=[],white=[],black=[];
 const startOct=octaveFromMidi(start),w=42,baseX=18,y=14,whiteH=170,blackH=104;
 for(let midi=start;midi<=end;midi++){
  const pitch=pc(midi),isBlack=[1,3,6,8,10].includes(pitch);const precedingWhite=[0,2,4,5,7,9,11].filter(x=>x<pitch).length;
  const octaveIndex=Math.floor((midi-start)/12);
  const x=baseX+(octaveIndex*7+precedingWhite)*w;
  const info={midi,pitch,x,isBlack}; (isBlack?black:white).push(info);all.push(info);
 }
 const hit=new Map(highlight.map((x,i)=>[Number(typeof x==='number'?x:x.midi),{...x,index:i}]));
 const colors={root:'#177e71',chord:'#f0bf63',scale:'#b6dfce'};
 let html=`<title>Two-octave chromatic keyboard, C${startOct} to C${startOct+2}. Highlighted: ${highlight.map(x=>typeof x==='number'?midiName(x):x.display||x.name).join(', ')||'none'}</title>`;
 html+=`<rect x="0" y="0" width="670" height="202" rx="12" fill="#e5e4dc"/>`;
 for(const k of white){const h=hit.get(k.midi);const color=h?(h.role==='root'?colors.root:h.role==='scale'?colors.scale:colors.chord):'#fcfbf6';
  html+=`<rect x="${k.x}" y="${y}" width="${w-1}" height="${whiteH}" rx="3" fill="${color}" stroke="#828f86" stroke-width="1.2"/>`;
  const label=(k.pitch===0?'C'+octaveFromMidi(k.midi):circleFifthsName(k.midi));
  html+=`<text x="${k.x+w/2}" y="${y+whiteH-13}" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="12" fill="${h&&h.role==='root'?'#fff':'#38443f'}">${label}</text>`;
 }
 for(const k of black){const prev=white.find(t=>t.midi===k.midi-1),x=prev.x+w-13;const h=hit.get(k.midi);const color=h?(h.role==='root'?colors.root:h.role==='scale'?'#91ceb2':colors.chord):'#263733';
  html+=`<rect x="${x}" y="${y}" width="25" height="${blackH}" rx="3" fill="${color}" stroke="#42584e" stroke-width="1.2"/>`;
  if(h){html+=`<circle cx="${x+12.5}" cy="${y+blackH-16}" r="4" fill="${h.role==='root'?'#fff':'#345046'}"/>`}
 }
 svg.setAttribute('viewBox','0 0 670 202');svg.innerHTML=html;
 svg.setAttribute('aria-label',`Keyboard C${startOct}–C${startOct+2}; highlighted ${highlight.map(x=>typeof x==='number'?midiName(x):x.display||x.name).join(', ')||'none'}`);
}
function scaleHighlights(names,tonic,start){let set=new Set(names.map(parseNote)),t=pc(parseNote(tonic)),out=[];for(let midi=start;midi<=start+24;midi++)if(set.has(pc(midi)))out.push({midi,role:pc(midi)===t?'root':'scale',display:circleFifthsName(midi)+octaveFromMidi(midi)});return out;}
function stepsSequence(notes,direction){const a=notes.slice();if(direction==='down')return a.reverse();if(direction==='thirds'){let pairs=[];for(let i=0;i<a.length;i++){pairs.push(a[i]);if(i+2<a.length)pairs.push(a[i+2]);}return pairs;}return a;}
const api={pc,parseNote,noteOf,chord,scale,degreeRoot,keyObj,KEYS,QUALITY,SCALE,symbol,jazz,blues,realVoicing,smoothVoice,formatOffboard,progressionSequence,drawKeyboard,scaleHighlights,stepsSequence,midiName,octaveFromMidi,circleFifthsName};
global.AKAITheory=api;
})(window);
