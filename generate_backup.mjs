import fs from 'fs';

const profileId = "profile_vuminhmeuw";

const completedModules = {};
// 21 days completed
for (let d = 1; d <= 21; d++) {
  for (let i = 1; i <= 14; i++) completedModules[`v2-d${d}-am-${i}`] = { score: 1, total: 1 };
  for (let i = 1; i <= 10; i++) completedModules[`v2-d${d}-pm-${i}`] = { score: 1, total: 1 };
}

const dayUnlockedOn = {};
for (let d = 1; d <= 22; d++) {
  dayUnlockedOn[d] = "2026-06-01";
}

const backupData = {
  "activeProfile": profileId,
  "syncMeta": {
    "deviceId": "device_manual_backup",
    "localUpdatedAt": new Date().toISOString(),
    "account": null,
    "lastSyncedAt": null
  },
  "profiles": {
    [profileId]: {
      "id": profileId,
      "name": "Bé Meuw",
      "avatarColor": "#8b5cf6",
      "createdAt": "2026-06-01T00:00:00.000Z",
      "learningStartDate": "2026-06-01",
      "currentDay": 22,
      "forceUnlockedThroughDay": 22,
      "currentWeek": 4,
      "xpTotal": 89920,
      "xpToday": 0,
      "streak": {
        "current": 21,
        "best": 21,
        "lastStudyDate": new Date().toISOString().split('T')[0]
      },
      "streakShieldsRemaining": 3,
      "completedModules": completedModules,
      "daySchedules": {},
      "earnedBadges": [],
      "earnedCards": [
        { "id": "c_table9", "title": "Bảng Cửu Chương 9", "desc": "Bí quyết nhẩm cửu chương 9 bằng đôi bàn tay kì diệu!", "rarity": "rare", "color": "purple", "earnedAt": new Date().toISOString() },
        { "id": "c_butterfly", "title": "Vòng đời của Bướm", "desc": "Từ trứng bé xíu thành sâu béo, vào kén ngủ vùi rồi hóa thành bướm xinh.", "rarity": "epic", "color": "blue", "earnedAt": new Date().toISOString() },
        { "id": "c_hanoi", "title": "Thủ đô Hà Nội", "desc": "Trái tim của Việt Nam với 36 phố phường, Hồ Gươm và lăng Bác.", "rarity": "legendary", "color": "orange", "earnedAt": new Date().toISOString() }
      ],
      "gallery": [],
      "stats": {
        "questionsAnswered": 300,
        "questionsCorrect": 300,
        "xpTotal": 89920,
        "studyTimeMinutes": 600,
        "daysStudied": 21
      },
      "settings": {
        "audioEnabled": true,
        "musicEnabled": true,
        "highContrast": false,
        "breakReminderMins": 30,
        "breakDurationMins": 5,
        "speechSpeed": 1
      },
      "dayUnlockedOn": dayUnlockedOn,
      "purchasedItems": [
        "acc_milktea", "acc_sunglasses", "acc_lollipop", "acc_crown", "acc_tophat"
      ],
      "knowledgeLedger": {
        "topicKeys": [],
        "questionSignatures": [],
        "explanationSignatures": [],
        "lessonSignatures": [],
        "recentSessions": []
      }
    }
  }
};

fs.writeFileSync('backup_vuminhmeuw.json', JSON.stringify(backupData, null, 2));
console.log('Successfully generated backup_vuminhmeuw.json');
