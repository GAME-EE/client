// start ~ end 값까지의 정수 랜덤 넘버를 만들어주는 함수
export const getRandomNumber = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start)) + start;
};

export const getAccelerate = (acceleration: number, time: number) => {
  return Math.ceil(acceleration * time * 100) / 200 > 0
    ? Math.ceil(acceleration * time * 100) / 100
    : 0;
};

//string타입 변수를 숫자로 변환하는 함수
export const stringToNumber = (number: string) => parseInt(number.replace(',', ''));

//숫자를 3자리마다 ,로 표현되는 string으로 변환
export const numberToString = (number: number) => {
  let str = '';
  let count = 0;
  while (number > 0) {
    if (count === 3) {
      str += ',';
      count = 0;
    }
    let digit = number % 10;
    str += digit;
    number = Math.floor(number / 10);
    count += 1;
  }
  return str.split('').reverse().join('');
};
