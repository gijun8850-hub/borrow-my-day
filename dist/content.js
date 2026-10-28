// 가상 상황에 대해 본인이 직접 답한 19개 기록. choices는 방문자용 선택지입니다.
window.DAY_CONTENT = {
  "title": "하루, 빌려드립니다.",
  "chapters": [
    "등교와 수업",
    "점심과 공강",
    "함께하는 오후",
    "끌리는 것들",
    "하루의 끝"
  ],
  "chapterTimes": [
    "09:00",
    "12:30",
    "15:00",
    "18:00",
    "23:00"
  ],
  "scenes": [
    {
      "id": "morning",
      "interview": 1,
      "slot": 0,
      "time": "08:30",
      "period": "등교",
      "place": "집에서 학교로",
      "title": "만약, 늦게\n눈을 떴다면.",
      "shortTitle": "만약, 늦게 눈을 떴다면.",
      "context": "첫 수업까지 20분. 준비하고 이동하면 늦을 것 같아.\n실제로 있었던 일은 아니고, 만약 이런 상황이라면?",
      "choices": [
        {
          "text": "택시 불러",
          "detail": ""
        },
        {
          "text": "이미 늦은 거 천천히 가",
          "detail": ""
        },
        {
          "text": "바로 나가",
          "detail": ""
        }
      ],
      "actualChoice": 2,
      "action": "옷만 빨리 갈아입고 모자를 써. 버스 시간 확인하고 바로 나가.",
      "inside": "큰일 났다. 택시라도 탈까?",
      "note": "사실 알람엔 꼭 깨는 편이라, 이런 일은 거의 없어.",
      "art": 0
    },
    {
      "id": "lunch",
      "interview": 2,
      "slot": 1,
      "time": "12:30",
      "period": "점심",
      "place": "친구와 메뉴 고르기",
      "title": "“아무거나 먹자.”\n그럼 내가 고른다?",
      "shortTitle": "“아무거나 먹자.” 그럼 내가 고른다?",
      "context": "친구가 아무거나 먹자고 해.\n나는 지금 먹고 싶은 메뉴가 있어.",
      "choices": [
        {
          "text": "친구한테 뭐 먹고 싶냐고 물어봐",
          "detail": ""
        },
        {
          "text": "먹고 싶은 메뉴를 말해",
          "detail": ""
        },
        {
          "text": "친구가 정할 때까지 기다려",
          "detail": ""
        }
      ],
      "actualChoice": 1,
      "action": "먹고 싶은 메뉴부터 말해. 싫다고 하면 따로 먹자고 하거나 내가 원하는 곳으로 데려가.",
      "inside": "미리 좀 정해놨으면 좋겠는데.",
      "note": "먹고 싶은 게 있으면 내가 먼저 말하는 편이야.",
      "art": 1
    },
    {
      "id": "team-first",
      "interview": 3,
      "slot": 2,
      "time": "14:00",
      "period": "팀플",
      "place": "처음 모인 팀플 회의",
      "title": "아무도 말을\n안 꺼내네.",
      "shortTitle": "아무도 말을 안 꺼내네.",
      "context": "역할을 정해야 하는데 다들 눈치만 보고 있어.\n어색한 침묵이 점점 길어져.",
      "choices": [
        {
          "text": "먼저 인사하고 어떻게 할지 물어봐",
          "detail": ""
        },
        {
          "text": "누가 말할 때까지 기다려",
          "detail": ""
        },
        {
          "text": "일단 역할부터 나눠",
          "detail": ""
        }
      ],
      "actualChoice": 0,
      "action": "일단 먼저 인사해. 어떻게 하면 좋을지 의견도 물어보고.",
      "inside": "어색해 죽겠다.",
      "note": "어색하긴 해도, 일단 내가 말을 꺼내.",
      "art": 2
    },
    {
      "id": "team-material",
      "interview": 4,
      "slot": 2,
      "time": "15:00",
      "period": "팀플",
      "place": "팀원이 보낸 자료 확인",
      "title": "자료는 왔는데,\n이대로는 좀 부족해.",
      "shortTitle": "자료는 왔는데, 이대로는 좀 부족해.",
      "context": "팀원이 맡은 자료를 보내줬어.\n그런데 내용이 좀 부족해서 더 보완해야 할 것 같아.",
      "choices": [
        {
          "text": "고칠 부분 알려주고 다시 해달라고 해",
          "detail": ""
        },
        {
          "text": "그냥 이대로 내",
          "detail": ""
        },
        {
          "text": "그냥 내가 고쳐",
          "detail": ""
        }
      ],
      "actualChoice": 2,
      "action": "시간이 없으면 됐다고 하고 내가 내용을 더 보완해.",
      "inside": "이 친구 좀 아쉽네.",
      "note": "시간이 촉박하면 내가 하고, 여유가 있으면 고쳐달라고 해.",
      "art": 2,
      "variants": [
        {
          "label": "시간이 촉박해",
          "condition": "마감이 얼마 안 남았어."
        },
        {
          "label": "아직 여유가 있어",
          "condition": "수정할 시간은 꽤 있어.",
          "actualChoice": 0,
          "action": "어디를 고치면 좋을지 알려주고 더 추가해달라고 해."
        }
      ]
    },
    {
      "id": "idea",
      "interview": 5,
      "slot": 2,
      "time": "15:30",
      "period": "팀플",
      "place": "아이디어 회의 중",
      "title": "그거, 아까\n내가 말했는데?",
      "shortTitle": "그거, 아까 내가 말했는데?",
      "context": "내가 말했을 땐 별 반응이 없었어. 그런데 잠시 뒤\n다른 팀원이 비슷하게 말하니까 다들 좋다고 하네?",
      "choices": [
        {
          "text": "그냥 넘어가",
          "detail": ""
        },
        {
          "text": "아까 내가 한 말 아니냐고 물어봐",
          "detail": ""
        },
        {
          "text": "괜찮은 의견이면 나도 좋다고 해",
          "detail": ""
        }
      ],
      "actualChoice": 1,
      "action": "“아까 제가 말한 거 아니었나요?” 하고 슬쩍 물어봐.",
      "inside": "뭐지? 좀 어이없네.",
      "note": "내가 먼저 한 말이라는 건 짚고 넘어갈 것 같아.",
      "art": 2
    },
    {
      "id": "joke",
      "interview": 6,
      "slot": 2,
      "time": "16:00",
      "period": "친구",
      "place": "친구들과 이야기하다가",
      "title": "다들 웃는데,\n나는 안 웃겨.",
      "shortTitle": "다들 웃는데, 나는 안 웃겨.",
      "context": "친구가 장난으로 한 말에 기분이 좀 상했어.\n그런데 주변 사람들은 다 웃고 있어.",
      "choices": [
        {
          "text": "그냥 반응 안 해",
          "detail": ""
        },
        {
          "text": "정색해",
          "detail": ""
        },
        {
          "text": "나도 같이 웃어",
          "detail": ""
        }
      ],
      "actualChoice": 0,
      "action": "적당히 기분 나쁜 정도면 그냥 반응 없이 넘어가.",
      "inside": "어떻게 되갚아주지?",
      "note": "진짜 화가 나면 그때는 정색해.",
      "art": 1,
      "variants": [
        {
          "label": "적당히 기분 나빠",
          "condition": "기분은 상했는데, 진짜 화가 날 정도는 아니야."
        },
        {
          "label": "정말 화가 나",
          "condition": "이번 장난에는 진짜 화가 났어.",
          "actualChoice": 1,
          "action": "진짜 화가 나면 정색해."
        }
      ]
    },
    {
      "id": "comfort",
      "interview": 7,
      "slot": 2,
      "time": "16:30",
      "period": "친구",
      "place": "시험을 망친 친구 옆",
      "title": "위로도,\n처음에는 해줘.",
      "shortTitle": "위로도, 처음에는 해줘.",
      "context": "친구가 시험을 망쳤다면서 속상하다고 해.\n한참째 같은 이야기가 이어지고 있어.",
      "choices": [
        {
          "text": "그냥 계속 들어줘",
          "detail": ""
        },
        {
          "text": "딴 얘기로 돌려",
          "detail": ""
        },
        {
          "text": "위로하다가 계속 그러면 그만하라고 해",
          "detail": ""
        }
      ],
      "actualChoice": 2,
      "action": "처음엔 괜찮다고 T식으로 위로해. 계속 그러면 “그만 찡찡대라”고 해.",
      "inside": null,
      "note": "처음엔 위로해주는데, 같은 얘기가 계속되면 그만하라고 해.",
      "art": 1
    },
    {
      "id": "break",
      "interview": 8,
      "slot": 1,
      "time": "13:00",
      "period": "공강",
      "place": "도서관",
      "title": "공강 두 시간.\n오늘은 혼자다.",
      "shortTitle": "공강 두 시간. 오늘은 혼자다.",
      "context": "다음 수업까지 두 시간이나 남았어.\n친구들은 다른 수업에 들어가서 나 혼자야.",
      "choices": [
        {
          "text": "공부나 해",
          "detail": ""
        },
        {
          "text": "도서관 가서 자",
          "detail": ""
        },
        {
          "text": "도서관에서 폰 해",
          "detail": ""
        }
      ],
      "actualChoice": 1,
      "action": "도서관 가서 자거나 폰을 볼 것 같아.",
      "inside": "심심하다.",
      "note": "잠깐 잘 수도 있고, 그냥 폰을 볼 수도 있어.",
      "art": 2,
      "acceptedChoices": [
        1,
        2
      ]
    },
    {
      "id": "lecture",
      "interview": 9,
      "slot": 0,
      "time": "10:00",
      "period": "수업",
      "place": "강의실",
      "title": "다들 이해한\n표정인데, 나만?",
      "shortTitle": "다들 이해한 표정인데, 나만?",
      "context": "교수님 설명이 잘 이해가 안 돼.\n그런데 주변 사람들은 다 알아들은 표정이야.",
      "choices": [
        {
          "text": "GPT나 제미나이에 물어봐",
          "detail": ""
        },
        {
          "text": "교수님한테 다시 설명해달라고 해",
          "detail": ""
        },
        {
          "text": "일단 넘어가",
          "detail": ""
        }
      ],
      "actualChoice": 0,
      "action": "일단 제미나이나 GPT로 찾아봐.",
      "inside": "이걸 어떻게 이해했지? 망했다.",
      "note": "이해가 안 되면 우선 내용을 찾아보는 편이야.",
      "art": 2
    },
    {
      "id": "deadline",
      "interview": 10,
      "slot": 4,
      "time": "23:00",
      "period": "과제",
      "place": "과제 제출 화면 앞",
      "title": "한 시간 남았네.\n조금 더 고칠까?",
      "shortTitle": "한 시간 남았네. 조금 더 고칠까?",
      "context": "과제는 다 만들었고, 제출까지 한 시간 남았어.\n그런데 제목이나 디자인 한 부분이 좀 마음에 걸려.",
      "choices": [
        {
          "text": "그냥 제출해",
          "detail": ""
        },
        {
          "text": "마음에 안 드는 부분은 아예 다시 해",
          "detail": ""
        },
        {
          "text": "조금만 더 고쳐",
          "detail": ""
        }
      ],
      "actualChoice": 2,
      "action": "한 시간 남았으면 조금 더 고쳐봐.",
      "inside": "빠르게 해야겠다.",
      "note": "남은 시간 안에서 조금 더 손볼 것 같아.",
      "art": 2
    },
    {
      "id": "grade",
      "interview": 11,
      "slot": 2,
      "time": "17:00",
      "period": "수업",
      "place": "시험 점수 확인 후",
      "title": "준비는 했는데,\n점수가 왜 이래?",
      "shortTitle": "준비는 했는데, 점수가 왜 이래?",
      "context": "열심히 준비했는데 기대보다 점수가 낮아.\n공부를 별로 안 했다는 친구는 나보다 점수가 높네?",
      "choices": [
        {
          "text": "어떻게 공부했냐고 물어봐",
          "detail": ""
        },
        {
          "text": "좀 어이없다는 듯이 말해",
          "detail": ""
        },
        {
          "text": "그냥 잘 봤네 하고 넘어가",
          "detail": ""
        }
      ],
      "actualChoice": 1,
      "action": "좀 어이없다는 듯이 말할 것 같아.",
      "inside": "말이 안 되네.",
      "note": "열심히 준비했는데 점수가 이러면 좀 어이없지.",
      "art": 2
    },
    {
      "id": "tired",
      "interview": 12,
      "slot": 4,
      "time": "21:00",
      "period": "휴식",
      "place": "집에서 쉬고 싶은 밤",
      "title": "오늘 만나자고?\n지금은 너무 졸려.",
      "shortTitle": "오늘 만나자고? 지금은 너무 졸려.",
      "context": "수업이랑 과제로 지쳐서 그냥 쉬고 싶어.\n다른 약속은 없는데 친구가 갑자기 만나자고 해.",
      "choices": [
        {
          "text": "피곤하다고 하고 안 나가",
          "detail": ""
        },
        {
          "text": "잠깐만 보고 와",
          "detail": ""
        },
        {
          "text": "다른 약속 있다고 해",
          "detail": ""
        }
      ],
      "actualChoice": 0,
      "action": "진짜 피곤하다고 말하고 안 나가.",
      "inside": "졸려 죽겠는데. 나중에 보자.",
      "note": "피곤할 때는 그냥 피곤하다고 하고 쉬어.",
      "art": 0
    },
    {
      "id": "club",
      "interview": 13,
      "slot": 3,
      "time": "18:00",
      "period": "동아리",
      "place": "동아리 모집 공지를 보다가",
      "title": "해보고 싶긴 한데.\n신청은… 나중에?",
      "shortTitle": "해보고 싶긴 한데. 신청은… 나중에?",
      "context": "해보고 싶은 활동의 동아리 모집 공지를 봤어.\n그런데 아는 사람이 없어서 혼자 신청해야 해.",
      "choices": [
        {
          "text": "일단 신청해",
          "detail": ""
        },
        {
          "text": "한 번 가보고 정해",
          "detail": ""
        },
        {
          "text": "고민만 하다 결국 안 해",
          "detail": ""
        }
      ],
      "actualChoice": 2,
      "action": "고민은 하는데, 결국 신청은 안 해.",
      "inside": "고민되는데 귀찮다.",
      "note": "관심은 가는데 막상 신청까지는 안 하게 돼.",
      "art": 2
    },
    {
      "id": "festival",
      "interview": 14,
      "slot": 3,
      "time": "18:30",
      "period": "축제",
      "place": "친구들과 학교 축제",
      "title": "축제 간다고?\n그건 무조건 가지.",
      "shortTitle": "축제 간다고? 그건 무조건 가지.",
      "context": "친구들이 축제에 같이 가자고 해.\n공연도 있고 먹거리도 많은데, 사람도 많고 줄도 길어.",
      "choices": [
        {
          "text": "잠깐 구경만 하고 와",
          "detail": ""
        },
        {
          "text": "가서 먹고 놀아",
          "detail": ""
        },
        {
          "text": "사람 많아서 안 가",
          "detail": ""
        }
      ],
      "actualChoice": 1,
      "action": "무조건 가지. 가서 이것저것 다 먹어보고 즐겨.",
      "inside": "재밌겠다.",
      "note": "축제에 가자고 하면 일단 갈 거야.",
      "art": 1
    },
    {
      "id": "shopping",
      "interview": 15,
      "slot": 4,
      "time": "22:00",
      "period": "소비",
      "place": "할인 중인 물건을 보다가",
      "title": "갖고 싶던 물건.\n지금 할인 중.",
      "shortTitle": "갖고 싶던 물건. 지금 할인 중.",
      "context": "이번 달에 쓸 돈이 얼마 안 남았어.\n이걸 사면 다른 데 쓸 돈을 좀 줄여야 해.",
      "choices": [
        {
          "text": "안 사",
          "detail": ""
        },
        {
          "text": "사고 다른 데 덜 써",
          "detail": ""
        },
        {
          "text": "나중에 결제할 수 있나 봐",
          "detail": ""
        }
      ],
      "actualChoice": 0,
      "action": "안 사.",
      "inside": "돈 없어.",
      "note": "남은 돈이 별로 없으면 이번엔 안 살래.",
      "art": 2
    },
    {
      "id": "presentation",
      "interview": 16,
      "slot": 0,
      "time": "11:00",
      "period": "수업",
      "place": "발표 지원자를 찾는 강의실",
      "title": "발표할 사람?\n아무도 손을 안 드네.",
      "shortTitle": "발표할 사람? 아무도 손을 안 드네.",
      "context": "교수님이 발표할 사람을 찾고 계셔.\n그런데 아무도 먼저 손을 안 들어.",
      "choices": [
        {
          "text": "내가 한다고 해",
          "detail": ""
        },
        {
          "text": "친구한테 해보라고 해",
          "detail": ""
        },
        {
          "text": "먼저 손들진 않아",
          "detail": ""
        }
      ],
      "actualChoice": 2,
      "action": "모르는 내용이면 절대 손 안 들어.",
      "inside": "나만 아니면 돼.",
      "note": "확실히 알면 나설 수도 있어. 근데 굳이 먼저 하진 않아.",
      "art": 2,
      "variants": [
        {
          "label": "모르는 내용이야",
          "condition": "내가 아는 내용은 아니야."
        },
        {
          "label": "확실히 아는 내용이야",
          "condition": "이건 확실히 아는 내용이야.",
          "action": "확실히 알면 나설 수도 있어. 근데 굳이 먼저 나서진 않아.",
          "acceptedChoices": [
            2,
            0
          ],
          "inside": null,
          "insideMissing": true,
          "note": "아는 내용이면 나설 수도 있어. 이때 속으로 무슨 생각을 할지는 아직 얘기 안 했어."
        }
      ]
    },
    {
      "id": "lunch-invite",
      "interview": 17,
      "slot": 1,
      "time": "12:00",
      "period": "점심",
      "place": "수업이 끝난 뒤",
      "title": "안 친한 동기가\n밥 먹자고 하네.",
      "shortTitle": "안 친한 동기가 밥 먹자고 하네.",
      "context": "아직 별로 안 친한 동기가 같이 밥 먹자고 해.\n따로 약속은 없고, 싫어하는 사람도 아니야.",
      "choices": [
        {
          "text": "약속 있다고 해",
          "detail": ""
        },
        {
          "text": "같이 먹어",
          "detail": ""
        },
        {
          "text": "다음에 먹자고 해",
          "detail": ""
        }
      ],
      "actualChoice": 1,
      "action": "싫어하는 사람만 아니면 한 번 같이 먹을 것 같아.",
      "inside": null,
      "note": "아직 안 친해도, 싫지만 않으면 괜찮아.",
      "art": 1
    },
    {
      "id": "seat",
      "interview": 18,
      "slot": 0,
      "time": "09:30",
      "period": "수업",
      "place": "강의실에서 자리 고르기",
      "title": "혼자 있고 싶지만,\n친구 옆자리가 비었네.",
      "shortTitle": "혼자 있고 싶지만, 친구 옆자리가 비었네.",
      "context": "오늘은 조용히 혼자 있고 싶은 기분이야.\n그런데 강의실에 아는 친구가 있고, 옆자리가 비어 있어.",
      "choices": [
        {
          "text": "친구 옆에 앉아",
          "detail": ""
        },
        {
          "text": "다른 데 앉아",
          "detail": ""
        },
        {
          "text": "친구가 부르면 가",
          "detail": ""
        }
      ],
      "actualChoice": 0,
      "action": "친구 옆에 같이 앉을 것 같아.",
      "inside": "굳이 혼자 앉을 이유가 있나?",
      "note": "혼자 있고 싶은 날이어도 친구가 있으면 같이 앉아.",
      "art": 2
    },
    {
      "id": "friends-photo",
      "interview": 19,
      "slot": 3,
      "time": "19:00",
      "period": "친구",
      "place": "친구가 올린 사진을 보다가",
      "title": "어? 너희끼리\n재밌게 놀았네.",
      "shortTitle": "어? 너희끼리 재밌게 놀았네.",
      "context": "친한 친구가 다른 친구들이랑 놀았던 사진을 올렸어.\n나는 그 모임에 안 불렀는데, 재밌게 놀았나 봐.",
      "choices": [
        {
          "text": "그냥 보고 넘겨",
          "detail": ""
        },
        {
          "text": "다음엔 나도 부르라고 해",
          "detail": ""
        },
        {
          "text": "왜 안 불렀냐고 물어봐",
          "detail": ""
        }
      ],
      "actualChoice": 2,
      "action": "왜 안 불렀냐고 물어봐.",
      "inside": "재밌겠다.",
      "note": "사진을 보면 일단 왜 안 불렀는지 물어볼 것 같아.",
      "art": 1
    }
  ]
};
