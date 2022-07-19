import { atom } from 'recoil';

interface IUser {
  id: number | null;
  nickname: string;
}
export const userState = atom<IUser>({
  key: 'user',
  default: { id: null, nickname: '배성현' },
});
