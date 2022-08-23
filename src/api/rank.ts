import axios from 'axios';

// const base_url = 'http://52.79.240.156:50000';
const base_url = 'http://localhost:4000';
const allGameRankURL = '/score/rank/all';
const saveScoreURL = '/score';
const scoreURL = '/score';

const getAxios = async (url: string) => {
  return await axios.get(base_url + url);
};

const postAxios = async (url: string, param: any) => {
  return await axios.post(base_url + url, param);
};

/**
 * @param {number} gid game id
 * @returns {[ {}, {}, {} , … ]} 랭크 정보 리스트
 */
const getAllGameRankAPI = async (gid: number) => {
  try {
    const res = await getAxios(allGameRankURL + '/' + gid);
    return res.data;
  } catch (error) {
    console.warn('error: ', error);
  }
};

/**
 * @param {string} userId
 * @param {number} gid  game id
 * @param {number} score
 * @returns {boolean} 성공여부
 */
const saveScoreAPI = async (userId: string, gid: number, score: number) => {
  try {
    const res = await postAxios(saveScoreURL, { userId, gid, score });
    return res.data;
  } catch (error) {
    console.warn('error: ', error);
  }
};

const getUserScores = async (user: string) => {
  try {
    const res = await getAxios(scoreURL + '/' + user);
    return res.data;
  } catch (error) {
    console.warn('error: ', error);
  }
};
export { getAllGameRankAPI, saveScoreAPI, getUserScores };
