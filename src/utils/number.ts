// start ~ end 값까지의 정수 랜덤 넘버를 만들어주는 함수
export const getRandomNumber = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start)) + start;
};
