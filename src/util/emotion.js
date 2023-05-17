const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ""

// 감정 배열
export const emotionList = [
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/5.png`,
    emotion_descript: '매우 좋음'
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/4.png`,
    emotion_descript: '좋음'
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/3.png`,
    emotion_descript: '보통'
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/2.png`,
    emotion_descript: '나쁨'
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/1.png`,
    emotion_descript: '최악'
  }
]