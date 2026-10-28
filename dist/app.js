(function () {
  'use strict';
  const content = window.DAY_CONTENT;
  const story = window.DayStory;
  const details = window.DayDetails;
  let thoughtTimer;
  let stageTimer;
  const main = document.getElementById('main');
  let state = story.initialState();
  let route = [];
  let librarySlot = null;
  const chapterInfo = [
    { lead: '등교부터 발표까지, 수업 속의 나.', description: '늦게 눈을 뜬 아침, 잘 이해되지 않는 강의, 아무도 손들지 않는 발표 시간. 강의실 안팎에서 너라면 어떻게 할지 골라봐.', previews: ['morning', 'presentation'] },
    { lead: '누구와 먹고, 빈 시간에는 뭘 할까?', description: '친구와 메뉴를 정할 때도, 혼자 공강을 보낼 때도 선택은 생겨. 점심시간부터 다음 수업 전까지 같이 보내보자.', previews: ['lunch', 'break'] },
    { lead: '같이하는 일이 늘 편하지만은 않잖아.', description: '처음 만난 팀원에게 말을 걸고, 부족한 자료를 확인하고, 친구의 이야기를 듣는 오후야. 사람들 사이에서 너는 어떻게 반응할 것 같아?', previews: ['team-first', 'team-material'] },
    { lead: '해볼까, 갈까, 나도 같이 놀까?', description: '관심 가는 동아리 공지와 친구들이 가자는 축제, 재밌어 보이는 사진까지. 마음이 끌리는 순간부터 골라봐.', previews: ['club', 'festival'] },
    { lead: '남은 시간과 여유를 어디에 쓸까?', description: '과제 마감은 다가오고, 친구에게 연락도 오고, 갖고 싶던 물건은 할인 중이야. 하루가 끝나갈 때 어떤 선택을 하는지 만나보자.', previews: ['deadline', 'tired'] }
  ];
  const knownIds = new Set(content.scenes.map(scene => scene.id));
  let seen = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem('borrow-day-seen-v2') || '[]');
    if (Array.isArray(saved)) seen = new Set(saved.filter(id => knownIds.has(id)));
  } catch (_) { /* Storage is optional, including when opening from disk. */ }
  function remember(id) {
    seen.add(id);
    try { localStorage.setItem('borrow-day-seen-v2', JSON.stringify([...seen])); } catch (_) {}
  }
  function startDay(singleId) {
    const bases = singleId ? [content.scenes.find(scene => scene.id === singleId)] : story.selectDay(content.scenes, [...seen]);
    if (bases.some(scene => !scene)) return;
    if (!singleId) librarySlot = null;
    route = bases.map(scene => story.resolveScene(scene));
    state = story.start();
  }
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const lines = value => escape(value).replace(/\n/g, '<br>');
  const arrow = '<span class="arrow" aria-hidden="true">↗</span>';

  function roomArt() {
    return `<svg viewBox="0 0 560 490" role="img" aria-label="햇살이 드는 방이야. 책상 위에 노트와 커피, 휴대전화가 놓여 있어.">
      <defs><pattern id="paper-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#ded8c9" stroke-width=".5"/></pattern><clipPath id="window-clip"><path d="M272 85 453 57 453 270 272 241Z"/></clipPath></defs>
      <path d="M46 52 508 31 526 439 63 461Z" fill="#ebe5d7"/>
      <path d="M46 52 508 31 526 439 63 461Z" fill="url(#paper-grid)"/>
      <g fill="none" stroke="#777668" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
        <path d="M73 346 286 400 499 328M286 400V102M91 102 286 63 484 110" stroke="#b3ac9c"/>
        <path d="M272 85 453 57 453 270 272 241Z" fill="#f8f1d6"/>
        <g clip-path="url(#window-clip)"><circle cx="405" cy="122" r="35" fill="#eab871" stroke="none"/><path d="M257 228Q320 182 364 213T477 202V286H258Z" fill="#c4c9a5" stroke="none"/><path d="m306 72 29 203m51-211 17 218M265 158 464 150" stroke="#a79d80" stroke-width="2"/></g>
        <path d="M269 81 456 53 458 276 268 245Z" stroke="#756e58" stroke-width="2"/>
        <path d="m275 243-97 145 245-26 30-91" fill="#f7dfae" opacity=".55" stroke="none"/>
        <path d="m278 80-10 167-18-4 3-163m198-28 12 224 26 7-14-229" fill="#d3d1bc"/>
        <path d="m260 87-3 144m219-167 8 195" stroke="#acae98"/>
        <path d="m101 157 102 13 2 97-101-15Z" fill="#f7f1e1"/>
        <path d="m116 179 65 9m-65 8 43 5m-44 16 60 8m-60 8 35 4" stroke="#d2b18c"/>
        <path d="M146 155v-11" stroke="#e85532" stroke-width="3"/>
        <path d="m89 301 178-38 201 72-183 52Z" fill="#d0b294" stroke="#76654f" stroke-width="1.8"/>
        <path d="m89 301 1 14 195 79 183-52v-7m-183 52v7" fill="#b99b7d"/>
        <path d="m102 322 2 85 10 4 5-82m327 22-1 65 10-4 3-65m-175 49v61l11 4 1-69" fill="#baa082"/>
        <path d="m198 301 72-13 63 24-73 17Z" fill="#f9f4e9"/>
        <path d="m260 329 9-41m-58 18 40 15m29-26 38 14m-104-1 30 11m38-20 27 9" stroke="#beb6a2"/>
        <path d="m198 301 0 6 61 28 74-18v-5"/>
        <path d="m297 333 35-9 26 10-36 11Z" fill="#e85532" stroke="#a54b32"/>
        <path d="m306 333 22-5 17 6-22 6Z" fill="#f9d8ba" stroke="none"/>
        <path d="m151 289 3 29q17 13 32-1l2-27" fill="#f1e7cf"/>
        <ellipse cx="170" cy="290" rx="18" ry="6" fill="#a18465"/>
        <path d="m187 296q19-4 14 12-5 12-15 6m-25-41q-8-8 0-15m13 13q-8-10 1-20"/>
        <path d="m364 300 24 10m-27-6 24 10" stroke="#e85532" stroke-width="3"/>
        <path d="m411 317 14-32m-6 16q-22-3-18-15 17-1 18 15m3-5q20 1 23-12-17-6-23 12m5-10q-12-15-6-23 15 7 6 23" fill="#a6b296" stroke="#74856b"/>
        <path d="m407 311 29 9-7 22-19-6Z" fill="#bd7756"/>
        <path d="m146 369 41-11 41 16-41 13Z" fill="#d8c9aa"/>
        <path d="m146 369 3 43 12 5-1-40m68-3-3 39-10 4 1-40" fill="#d0bd99"/>
        <path d="M87 430q31 0 42 4m304-20 30-10" stroke="#c1b7a4"/>
      </g>
      <g transform="translate(355 16) rotate(7)"><rect width="137" height="43" rx="2" fill="#f8f5eb" stroke="#bfb6a2"/><text x="16" y="28" font-family="Georgia,serif" font-size="21" fill="#e85532">a day as me.</text></g>
      <g transform="translate(19 361) rotate(-8)"><rect width="103" height="74" fill="#fbf7eb" stroke="#c9bfab"/><text x="13" y="29" font-family="Georgia,serif" font-size="23" fill="#38372f">08:30</text><text x="13" y="49" font-family="sans-serif" font-size="9" letter-spacing="1" fill="#8c806b">MY ORDINARY DAY</text><path d="m12 60 72-2" stroke="#e85532" fill="none"/></g>
      <path d="M49 102q-29 14-22 49m-8-11 8 13 14-5" fill="none" stroke="#e85532" stroke-width="1.6" stroke-linecap="round"/>
      <path d="m510 297 7 8 9-3-5 9 5 8-10-3-7 6 1-10-7-6 10-1Z" fill="none" stroke="#e85532" stroke-width="1.2"/>
    </svg>`;
  }

  function progress() {
    return `<div class="story-top"><button class="back-button" type="button" data-action="back-library">${librarySlot===null?'← 장면 모음':'← 챕터로'}</button><div class="story-progress" aria-label="오늘의 진행 상황">${route.map((scene,index) => `<span class="progress-step ${index === state.sceneIndex ? 'is-current' : index < state.sceneIndex ? 'is-complete' : ''}" ${index===state.sceneIndex ? 'aria-current="step"' : ''}>${index===state.sceneIndex?details.capIcon():'<span class="progress-dot" aria-hidden="true"></span>'}<span class="progress-label">${escape(scene.period)}</span></span>`).join('')}</div><span class="step-count">${String(state.sceneIndex+1).padStart(2,'0')} / ${String(route.length).padStart(2,'0')}</span></div>`;
  }

  function introView() {
    return `<section class="intro screen-enter"><div class="hero"><div class="hero-copy"><p class="eyebrow">GACHON CAMPUS · MY LITTLE CHOICES</p><h1 id="view-title" tabindex="-1">오늘 하루,<br><span class="accent-word">나 대신</span><br>살아볼래?</h1><div class="owner-signature">${details.capIcon()}<span>급하면 모자 쓰고 바로 나가.</span></div><p class="hero-description">같은 상황이어도 사람마다 선택은 다르잖아.<br>내 하루 속에서 너라면 어떻게 할지 골라봐.<br>그다음엔 내 선택과 속마음을 들려줄게.</p><div class="start-wrap"><button type="button" class="primary-button" data-action="start">오늘 하루 빌려보기 ${arrow}</button><p class="time-estimate">한 번에 5개의 순간<span>가볍게 약 3분</span></p></div><button type="button" class="catalog-link" data-action="library">나의 19개 장면 모두 보기 <span aria-hidden="true">↗</span></button></div><div class="cover-art">${roomArt()}<div class="art-caption"><span>same day, different minds.</span><span>상황은 가상, 반응은 나답게</span></div></div></div><p class="cover-footnote">너라면 어떻게 할 것 같아? 하나씩 골라보고, 내 답이랑 비교해보자.</p></section>`;
  }

  function variantControl(scene) {
    if (!scene.variants) return '';
    return `<div class="variant-block"><span class="variant-label">상황을 바꿔보면?</span><div class="variant-options" role="group" aria-label="상황 조건">${scene.variants.map((variant,i)=>`<button type="button" class="variant-button ${i===scene.variantIndex?'selected':''}" aria-pressed="${i===scene.variantIndex}" data-action="variant" data-variant="${i}">${escape(variant.label)}</button>`).join('')}</div></div>`;
  }

  function sceneView() {
    const scene = route[state.sceneIndex];
    return `<section class="story-page screen-enter">${progress()}<div class="scene-grid"><div class="scene-copy"><div class="scene-meta"><span class="scene-time">${escape(scene.time)}</span><span class="meta-line" aria-hidden="true"></span><span>${escape(scene.place)}</span></div><h1 id="view-title" class="scene-title" tabindex="-1">${escape(scene.title)}</h1><p class="scene-context">${escape(scene.context)}</p>${variantControl(scene)}${scene.condition?`<p class="condition-note">지금의 조건 · ${escape(scene.condition)}</p>`:''}${details.renderProp(scene)}</div><div class="choices-section"><div class="choices-label"><span>지금 네가 나라면?</span><span>YOUR CHOICE</span></div><div class="choices">${scene.choices.map((choice,index)=>`<button class="choice" type="button" data-action="choose" data-choice="${index}"><span class="choice-letter" aria-hidden="true">${String.fromCharCode(65+index)}</span><span class="choice-copy"><strong>${escape(choice.text)}</strong>${choice.detail?`<small>${escape(choice.detail)}</small>`:''}</span><span class="choice-arrow" aria-hidden="true">↗</span></button>`).join('')}</div><p class="choice-note">하나 골라봐. 나는 어떻게 했을지, 속으로는 무슨 생각을 했을지 알려줄게.</p></div></div></section>`;
  }

  function revealView() {
    const scene=route[state.sceneIndex];
    const chosen=state.answers[state.sceneIndex];
    const same=(scene.acceptedChoices||[scene.actualChoice]).includes(chosen);
    const thought=scene.insideMissing?'이때 속으로 무슨 생각을 할지는 아직 얘기 안 했어.':scene.inside===null?'딱히 별생각은 없어.':scene.inside;
    return `<section class="story-page reveal-page screen-enter">${progress()}<p class="reveal-intro"><span class="tiny-line" aria-hidden="true"></span>${same?'우리, 여기서는 같은 걸 골랐네.':'이럴 때는 나랑 다른 걸 고르는구나.'}</p><p class="thought-heading">겉으로는, 이렇게.</p><h1 id="view-title" class="reveal-title action-title" tabindex="-1">${escape(scene.action)}</h1><div class="reveal-layout action-first"><div><div class="your-choice"><span class="answer-label">네 선택</span><p class="answer-value">${escape(scene.choices[chosen].text)}</p></div>${scene.condition?`<p class="condition-note">이 반응의 조건 · ${escape(scene.condition)}</p>`:''}<p class="story-copy">${escape(scene.note)}</p><div class="reaction-signature">${details.capIcon()}<span>행동만 보면 몰랐던, 나의 한 조각.</span></div></div><aside class="memory thought-envelope" aria-live="polite"><p class="memory-label">내가 답한 기록 · ${String(scene.interview).padStart(2,'0')}</p><div class="thought-wait" aria-hidden="true"><span class="fold-line"></span>${details.capIcon()}<p>속마음 메모</p></div><div class="thought-content" hidden><h2 class="memory-title">${scene.insideMissing?'아직 말하지 않은 마음':scene.inside===null?'딱히 다른 생각은 없어.':'속으로는, 이랬어.'}</h2><p class="unfolded-thought">${scene.inside!==null?'“':''}${escape(thought)}${scene.inside!==null?'”':''}</p><p class="memory-stamp">a little piece of me.</p></div></aside></div><div class="reveal-bottom"><p>겉으로 한 행동과, 말하지 않은 마음.</p><button class="primary-button" type="button" data-action="next">${state.sceneIndex===route.length-1?'우리가 보낸 순간 보기':'다음 순간으로'} ${arrow}</button></div></section>`;
  }

  function visitorComparisonSection() {
    const comparisons=details.compareSelections(route,state.answers);
    return `<section class="visitor-comparisons" aria-label="너와 나의 선택 비교"><div class="visitor-comparison-heading"><p class="eyebrow">YOUR CHOICES, MY ANSWERS</p><h2>같은 상황, 우리의 선택<span>.</span></h2><p>네가 고른 답이랑 내 답을 나란히 놓아봤어. 어디서 같고, 어디서 달랐는지 같이 보자.</p></div><div class="visitor-comparison-list">${comparisons.map(item=>`<article class="visitor-comparison-card ${item.same?'is-same':'is-different'}"><div class="visitor-card-top"><span>${escape(item.period)} · ${escape(item.time)}</span><span class="choice-match">${item.same?'같은 선택':'다른 선택'}</span></div><h3>${escape(item.title)}</h3>${item.condition?`<p class="visitor-condition">${escape(item.condition)}</p>`:''}<div class="visitor-answer-columns"><div class="visitor-answer"><span>네 선택</span><p>${escape(item.visitorChoice)}</p></div><span class="visitor-vs" aria-hidden="true">↔</span><div class="my-answer"><span>나의 선택</span><p>${escape(item.authorAction)}</p></div></div><div class="comparison-thought"><span>나의 속마음</span><p>${escape(item.authorThoughtMissing?'이때 속으로 무슨 생각을 할지는 아직 얘기 안 했어.':item.authorThought===null?'딱히 별생각은 없어.':item.authorThought)}</p></div></article>`).join('')}</div></section>`;
  }

  function resultView() {
    const result=story.summarize(state,route);
    return `<section class="result-page screen-enter"><div class="result-heading"><div class="cap-ending">${details.capIcon()}<span>같은 하루를 살아본 너와 나.</span></div><p class="eyebrow">THE MOMENTS WE SHARED</p><h1 id="view-title" class="result-title" tabindex="-1">${result.total}개의 순간 중,<br><span class="result-count">${result.matches}</span>번 같은 선택을 했네.</h1><p class="result-subtitle">${result.matches===result.total?'이번엔 우리 선택이 전부 같았네!':'어떤 순간에는 같았고, 또 어떤 순간에는 달랐을까?'}</p></div>${visitorComparisonSection()}<p class="comparison-progress">${seen.size===content.scenes.length?'19개 장면을 다 만나봤네. 이번엔 다른 걸 골라볼래?':`${seen.size} / 19개의 장면을 만나봤어.`}</p><div class="result-actions"><button class="primary-button" type="button" data-action="start">다른 하루 살아보기 <span aria-hidden="true">↻</span></button>${librarySlot!==null&&route.length===1?'<button class="text-button" type="button" data-action="back-library">이 챕터 더 보기</button>':''}<button class="text-button" type="button" data-action="library">19개 장면 모두 보기 ↗</button></div><p class="result-note">같은 것도, 다른 것도 있었지? 내 하루를 같이 살아줘서 고마워.</p></section>`;
  }

  function libraryView() {
    const selected=librarySlot!==null;
    const scenes=selected?content.scenes.filter(scene=>scene.slot===librarySlot):content.scenes;
    const visited=scenes.filter(scene=>seen.has(scene.id)).length;
    const slots=selected?[librarySlot]:content.chapters.map((_,slot)=>slot);
    return `<section class="library-page screen-enter"><div class="library-top"><button class="back-button" type="button" data-action="home">← 표지로</button><span class="library-count">${visited} / ${scenes.length}개 장면을 만나봤어</span></div><p class="eyebrow">${selected?`CHAPTER 0${librarySlot+1}`:'THE LITTLE THINGS THAT MAKE ME'}</p><h1 id="view-title" class="library-title" tabindex="-1">${selected?escape(content.chapters[librarySlot]):'나의 19가지 순간'}<span>.</span></h1>${selected?`<p class="chapter-page-lead">${escape(chapterInfo[librarySlot].lead)}</p>`:''}<p class="library-intro">${selected?escape(chapterInfo[librarySlot].description):'가천대에서 이런 일이 생기면 어떨지, 내가 직접 답해봤어.<br>실제로 있었던 일은 아니야. 궁금한 장면부터 골라봐.'}</p><nav class="chapter-nav" aria-label="장면 분류"><button type="button" data-action="library" aria-pressed="${!selected}">전체 19개</button>${content.chapters.map((chapter,slot)=>`<button type="button" data-action="chapter" data-slot="${slot}" aria-pressed="${librarySlot===slot}">${escape(chapter)}</button>`).join('')}</nav>${slots.map(slot=>`<section class="catalog-section" aria-labelledby="catalog-title-${slot}"><h2 id="catalog-title-${slot}"><span>0${slot+1}</span>${escape(content.chapters[slot])}<small>${content.scenes.filter(scene=>scene.slot===slot).length}개의 상황</small></h2>${!selected?`<p class="catalog-chapter-lead">${escape(chapterInfo[slot].lead)}</p>`:''}<div class="catalog-grid">${content.scenes.filter(scene=>scene.slot===slot).map(scene=>`<button type="button" class="catalog-card" data-action="single" data-scene="${scene.id}"><span class="catalog-meta"><span>${escape(scene.period)} · ${escape(scene.time)}</span><span class="catalog-status ${seen.has(scene.id)?'visited':''}">${seen.has(scene.id)?'만난 장면':'아직 만나기 전'}</span></span><strong>${lines(scene.title)}</strong><span class="catalog-context">${escape(scene.context)}</span><span class="catalog-bottom"><span>${scene.variants?'조건을 바꿔서도 골라볼 수 있어':'이 상황에서 선택해보기'}</span><span aria-hidden="true">↗</span></span></button>`).join('')}</div></section>`).join('')}<div class="library-end"><button class="text-button" type="button" data-action="reset-seen">본 장면 기록 지우기</button><p>다섯 장면을 이어서 만나고 싶다면</p><button type="button" class="primary-button" data-action="start">오늘 하루 빌려보기 ${arrow}</button></div></section>`;
  }

  function render(moveFocus) {
    clearTimeout(thoughtTimer);
    clearInterval(stageTimer);
    const views={intro:introView,scene:sceneView,reveal:revealView,result:resultView,library:libraryView};
    main.innerHTML=views[state.screen]();
    if(state.screen==='reveal'){
      const openThought=()=>{
        const envelope=main.querySelector('.thought-envelope');
        if(!envelope)return;
        envelope.querySelector('.thought-wait').hidden=true;
        envelope.querySelector('.thought-content').hidden=false;
        envelope.classList.add('is-open');
      };
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)openThought();
      else thoughtTimer=setTimeout(openThought,320);
    }
    const clock=main.querySelector('[data-countdown]');
    if(clock){
      const startedAt=Date.now();
      stageTimer=setInterval(()=>{
        const remaining=Math.max(0,3600-Math.floor((Date.now()-startedAt)/1000));
        clock.textContent=details.formatCountdown(remaining);
        if(remaining===0)clearInterval(stageTimer);
      },1000);
    }
    document.title=state.screen==='intro'?`${content.title} — 나의 19가지 순간`:state.screen==='library'?`${librarySlot===null?'19개 장면 모음':content.chapters[librarySlot]} — ${content.title}`:state.screen==='result'?`우리가 보낸 순간 — ${content.title}`:`${route[state.sceneIndex].period}의 나 — ${content.title}`;
    if(moveFocus){window.scrollTo({top:0,behavior:'instant'});document.getElementById('view-title').focus({preventScroll:true});}
  }
  main.addEventListener('click',event=>{
    const button=event.target.closest('button[data-action]');
    if(!button||!main.contains(button))return;
    const action=button.dataset.action;
    if(action==='start')startDay();
    else if(action==='single')startDay(button.dataset.scene);
    else if(action==='reset-seen'){seen=new Set();try{localStorage.removeItem('borrow-day-seen-v2');}catch(_){}state={...state,screen:'library'};}
    else if(action==='home'){librarySlot=null;state=story.initialState();}
    else if(action==='library'){librarySlot=null;state={...state,screen:'library'};}
    else if(action==='back-library')state={...state,screen:'library'};
    else if(action==='chapter'){
      const slot=Number(button.dataset.slot);
      if(!Number.isInteger(slot)||slot<0||slot>=content.chapters.length)return;
      librarySlot=slot;
      state={...state,screen:'library'};
    }
    else if(action==='choose'&&state.screen==='scene'){state=story.choose(state,Number(button.dataset.choice),route);remember(route[state.sceneIndex].id);}
    else if(action==='next'&&state.screen==='reveal')state=story.advance(state,route);
    else if(action==='variant'&&state.screen==='scene'){
      const base=content.scenes.find(scene=>scene.id===route[state.sceneIndex].id);
      const index=Number(button.dataset.variant);
      if(!Number.isInteger(index)||!base.variants?.[index])return;
      route[state.sceneIndex]=story.resolveScene(base,index);
    }else return;
    render(true);
  });
  document.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();librarySlot=null;state=story.initialState();render(true);});
  const brandMark=document.querySelector('.brand-mark');
  brandMark.classList.add('cap-brand');
  brandMark.innerHTML=details.capIcon();
  render(false);
})();
