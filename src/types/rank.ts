interface IRankData {
  id: number;
  gid: number;
  score: number;
  create_at: string;
  last_at: string;
  name: string;
  userId: string;
  rank: string;
  // img: string;
}

interface IUserScores {
  gid: number;
  score: number;
  last_at: string;
}

interface IGameRank {
  name: string;
  rank: IRankData[];
}
export type { IRankData, IGameRank, IUserScores };
