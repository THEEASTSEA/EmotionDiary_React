
// input 요소 날짜 기본값
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10)
  // ISO 형식의 문자열을 반환, YYYY-MM-DDTHH...
}