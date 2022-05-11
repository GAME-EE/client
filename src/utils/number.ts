// start ~ end 값까지의 정수 랜덤 넘버를 만들어주는 함수
export const getRandomNumber = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start)) + start;
};

export const getAccelerate = (ACCELERATION: number, time: number) => {
  return Math.ceil(ACCELERATION * time * 100) / 200 > 0
    ? Math.ceil(ACCELERATION * time * 100) / 100
    : 0;
};
