interface IRankData {
  id: number;
  name: string;
  score: number;
  img: string;
}

interface IGameRank {
  name: string;
  rank: IRankData[];
}
export type { IRankData, IGameRank };
