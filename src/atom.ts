import { atom } from 'recoil';

export const userState = atom({
  key: 'user',
  default: { id: null, nickname: '배성현' },
});
