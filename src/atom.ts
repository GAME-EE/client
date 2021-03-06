import { atom } from 'recoil';

interface IUser {
  id: number | null;
  nickname: string | null;
}

export const userState = atom<IUser>({
  key: 'user',
  default: { id: null, nickname: null },
});
