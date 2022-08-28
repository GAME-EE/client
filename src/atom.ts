import { atom } from 'recoil';

interface IUser {
  id: number | null;
  nickname: string | null;
}

interface IToken {
  accessToken: string | null;
  refreshToken: string | null;
}

export const userState = atom<IUser>({
  key: 'user',
  default: { id: null, nickname: null },
});

export const token = atom<IToken>({
  key: 'token',
  default: { accessToken: null, refreshToken: null },
});
