(function(root){
  'use strict';
  const kinds={morning:'alarm',lunch:'menu','team-first':'chat','team-material':'document',idea:'chat',joke:'chat',comfort:'chat',break:'phone',lecture:'lecture',deadline:'submission',grade:'grade',tired:'chat',club:'notice',festival:'ticket',shopping:'receipt',presentation:'lecture','lunch-invite':'chat',seat:'seats','friends-photo':'photo'};
  function sceneKind(id){return kinds[id]||'notice';}
  function formatCountdown(seconds){const value=Math.max(0,Math.floor(seconds));return `${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`;}
  function compareSelections(scenes,answers){
    if(!Array.isArray(answers)||answers.length!==scenes.length)throw new Error('Complete answers are required');
    return scenes.map((scene,index)=>{
      const choice=answers[index];
      if(!Number.isInteger(choice)||choice<0||choice>=scene.choices.length)throw new RangeError('Invalid visitor choice');
      return {id:scene.id,title:scene.shortTitle,period:scene.period,time:scene.time,condition:scene.condition||'',visitorChoice:scene.choices[choice].text,authorAction:scene.action,authorThought:scene.inside,authorThoughtMissing:!!scene.insideMissing,same:(scene.acceptedChoices||[scene.actualChoice]).includes(choice)};
    });
  }
  function capIcon(){return '<svg class="cap-icon" viewBox="0 0 64 42" fill="none" aria-hidden="true"><path d="M12 28c0-14 7-23 20-23s22 9 22 23" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="2.4"/><path d="M32 5v23M12 28h42c4 1 7 3 7 5-11 6-24 5-36 0L12 31Z" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M23 17h7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';}
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function renderProp(scene){
    const kind=sceneKind(scene.id);
    const time=escape(scene.time);
    let body='';
    if(kind==='alarm')body=`<div class="alarm-top"><span>알람</span><span>등교 준비</span></div><div class="alarm-time">${time}</div><div class="alarm-caption">첫 수업까지 20분</div><div class="bus-strip"><span>다음 버스</span><strong>시간부터 확인</strong><span aria-hidden="true">↗</span></div>`;
    else if(kind==='chat'){
      const conversations={
        'team-first':[['팀원 1','…'],['팀원 2','…'],['팀원 3','…']],
        idea:[['팀원','이런 방향으로 해보면 어때요?'],['다른 팀원','좋아요!']],
        joke:[['친구들','장난 섞인 대화 중'],['주변 반응','하하하']],
        comfort:[['친구','시험 망쳤어…'],['친구','너무 속상하다.']],
        tired:[['친구','오늘 만날래?']],
        'lunch-invite':[['동기','밥 같이 먹을래?']]
      };
      const messages=conversations[scene.id]||[];
      body=`<div class="chat-bar"><span>${scene.id.startsWith('team')||scene.id==='idea'?'팀플 단톡방':'메시지'}</span><span>${time}</span></div><div class="chat-lines">${messages.map(([name,message])=>`<div class="chat-line"><span class="chat-avatar" aria-hidden="true">${name==='친구'?'친':'·'}</span><div><small>${escape(name)}</small><p>${escape(message)}</p></div></div>`).join('')}</div><div class="chat-compose"><span>나라면 뭐라고 할까?</span><span aria-hidden="true">↗</span></div>`;
    }else if(kind==='document')body=`<div class="file-tab"><span>팀플 자료</span><span>첨부 파일</span></div><div class="doc-sheet"><span class="doc-label">검토 중</span><i></i><i></i><i class="short"></i><p>조금 더 보완해야겠어.</p></div><div class="prop-bottom">${escape(scene.condition||'남은 시간에 따라 다른 선택')}</div>`;
    else if(kind==='submission')body='<div class="submission-bar"><span>과제 제출</span><span>작성 완료</span></div><div class="submission-clock"><small>장면 속 남은 시간</small><strong data-countdown>60:00</strong></div><div class="submission-file"><span>완성한 과제</span><span>조금 마음에 걸리는 부분</span></div><span class="submission-status">아직 제출 전</span>';
    else if(kind==='ticket')body=`<div class="ticket-edge" aria-hidden="true"></div><small>CAMPUS FESTIVAL</small><strong>오늘은<br>즐기는 날.</strong><div class="ticket-info"><span>공연 + 먹거리</span><span>친구들과 함께</span></div><div class="ticket-code" aria-hidden="true"></div><span class="ticket-stamp">LET'S GO</span>`;
    else if(kind==='phone')body=`<div class="phone-speaker" aria-hidden="true"></div><div class="phone-time">${time}</div><p class="phone-note">다음 수업까지</p><strong class="phone-gap">두 시간</strong><div class="phone-notification"><span>도서관에서</span><p>잠깐 비어 있는 하루.</p></div>`;
    else if(kind==='lecture')body=scene.id==='presentation'?`<div class="board-top">강의실 · ${time}</div><p class="board-question">“발표할 사람?”</p><div class="board-dots" aria-hidden="true">· · ·</div><span class="board-caption">${escape(scene.condition||'아무도 먼저 손을 안 드네.')}</span>`:'<div class="board-top">방금 배운 내용</div><div class="concept-chain"><span>개념</span><i>→</i><span>설명</span><i>→</i><span>적용</span></div><div class="board-question">…?</div><span class="board-caption">설명은 들었는데, 이해는 아직.</span>';
    else if(kind==='grade')body='<small>시험 결과 확인</small><div class="grade-comparison"><div><span>내 점수</span><strong>기대보다 낮음</strong></div><i aria-hidden="true">&lt;</i><div><span>친구 점수</span><strong>나보다 높음</strong></div></div><p class="prop-bottom">열심히 준비했는데.</p>';
    else if(kind==='seats')body='<div class="board-top">칠판</div><div class="seat-plan"><span></span><span class="friend-seat">친구</span><span class="empty-seat">빈자리</span><span></span><span></span><span></span></div><p class="prop-bottom">오늘은 어디에 앉을까?</p>';
    else if(kind==='photo')body='<div class="photo-scene" aria-hidden="true"><span class="photo-sun"></span><span class="paper-person"></span><span class="paper-person"></span><span class="paper-person"></span><i>✳</i></div><p class="photo-caption">친구가 올린, 재밌어 보이는 하루.</p>';
    else if(kind==='receipt')body='<small>장바구니 앞에서</small><strong class="receipt-title">갖고 싶던 물건</strong><div class="receipt-line"><span>지금 가격</span><strong>할인 중</strong></div><div class="receipt-line"><span>이번 달 여유</span><strong>얼마 안 남았어</strong></div><div class="receipt-rule"></div><p>이걸 사면 다른 데 쓸 돈을 줄여야 해.</p>';
    else if(kind==='menu')body='<small>오늘의 메뉴 회의</small><strong class="menu-question">“아무거나.”</strong><div class="menu-lines"><span>친구의 대답</span><i></i><span>내가 먹고 싶은 것</span><i></i></div><p class="prop-bottom">메뉴를 정할 차례.</p>';
    else body='<div class="notice-pin" aria-hidden="true"></div><small>동아리 모집 공지</small><strong>해보고 싶은<br>활동 발견.</strong><p>아는 사람은 없어.<br>신청하려면 혼자 해야 해.</p><span class="notice-tear">신청할까, 말까.</span>';
    return `<div class="scene-prop prop-${kind}" aria-label="${escape(scene.period)} 상황 연출"><span class="prop-mode">장면 속 화면</span>${body}</div>`;
  }
  const api={sceneKind,formatCountdown,compareSelections,capIcon,renderProp};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DayDetails=api;
})(typeof globalThis!=='undefined'?globalThis:this);
