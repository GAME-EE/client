import axios from 'axios';

// const base_url = 'http://52.79.240.156:50000';
const base_url = 'http://localhost:4000';
const allGameRankURL = '/score/rank/all';
const saveScoreURL = '/score';
const getAxios = async (url: string) => {
  return await axios.get(base_url + url);
};

const postAxios = async (url: string, param: any) => {
  return await axios.post(base_url + url, param);
};

const getAllGameRankAPI = async (gid: number) => {
  try {
    const res = await getAxios(allGameRankURL + '/' + gid);
    return res.data;
  } catch (error) {
    console.log('error: ', error);
  }
};

const saveScoreAPI = async (userId: string, gid: number, score: number) => {
  try {
    const res = await postAxios(saveScoreURL, { userId, gid, score });
    console.log('res: ', res);
    return res.data;
  } catch (error) {
    console.log('error: ', error);
  }
};

export { getAllGameRankAPI, saveScoreAPI };
